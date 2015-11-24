package com.somnus.action.base;

import java.util.Date;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;

import com.octo.captcha.service.CaptchaService;
import com.somnus.action.BaseAction;
import com.somnus.model.base.SessionInfo;
import com.somnus.model.base.Syorganization;
import com.somnus.model.base.Syrole;
import com.somnus.model.base.Syuser;
import com.somnus.model.messege.Grid;
import com.somnus.model.messege.Message;
import com.somnus.service.base.SyuserServiceI;
import com.somnus.support.captcha.CustomGenericManageableCaptchaService;
import com.somnus.util.base.BeanUtils;
import com.somnus.util.base.HqlFilter;
import com.somnus.util.base.IpUtil;
import com.somnus.util.base.MessageUtil;
import com.somnus.util.base.MsgCodeList;

@Namespace("/base")
@Action
public class UserAction extends BaseAction<Syuser> {
	private static final long serialVersionUID = 4204388266989531679L;
	/**
	 * 注入业务逻辑，使当前action调用service.xxx的时候，直接是调用基础业务逻辑
	 * 
	 * 如果想调用自己特有的服务方法时，请使用((TServiceI) service).methodName()这种形式强转类型调用
	 * 
	 * @param service
	 */
	@Autowired
	public void setService(SyuserServiceI service) {
		this.service = service;
	}
	
	@Autowired
	private CustomGenericManageableCaptchaService captchaService;
	
	@Autowired
	private MessageSourceAccessor msa;

	/**
	 * 注销系统
	 */
	public void doNotNeedSessionAndSecurity_logout() {
		if (getSession() != null) {
			getSession().invalidate();
		}
		Message message = new Message();
		MessageUtil.createCommMsg(message);
		writeJson(message);
	}

	/**
	 * 注册
	 */
	synchronized public void doNotNeedSessionAndSecurity_reg() {
		Message message = new Message();
		HqlFilter hqlFilter = new HqlFilter();
		hqlFilter.addFilter("QUERY_t#loginname_S_EQ", data.getLoginname());
		Syuser user = service.getByFilter(hqlFilter);
		if (user != null) {
			MessageUtil.errRetrunInAction(message,msa.getMessage(MsgCodeList.ERROR_300003));
			writeJson(message);
		} else {
			Syuser u = new Syuser();
			u.setLoginname(data.getLoginname());
			u.setPwd(DigestUtils.md5Hex(data.getPwd()));
			service.save(u);
			doNotNeedSessionAndSecurity_login();
		}
	}

	/**
	 * 登录
	 */
	public void doNotNeedSessionAndSecurity_login() {
		Message message = new Message();
		boolean bCaptchaCorrect = captchaService.validateResponseForID(
				(String)getSession().getId(), data.getCaptcha());		
		
		if(!bCaptchaCorrect){
			MessageUtil.errRetrunInAction(message, msa.getMessage(MsgCodeList.ERROR_300005));
			writeJson(message);
			throw new RuntimeException(msa.getMessage(MsgCodeList.ERROR_300005, new Object[]{data.getCaptcha()}));
		}
		HqlFilter hqlFilter = new HqlFilter();
		hqlFilter.addFilter("QUERY_t#loginname_S_EQ", data.getLoginname());
		hqlFilter.addFilter("QUERY_t#pwd_S_EQ", DigestUtils.md5Hex(data.getPwd()));
		Syuser user = service.getByFilter(hqlFilter);
		
		if (user != null) {
		    //成功以后移除验证码信息
		    captchaService.removeCaptcha((String)getSession().getId());
			SessionInfo sessionInfo = new SessionInfo();
			Hibernate.initialize(user.getSyroles());
			Hibernate.initialize(user.getSyorganizations());
			for (Syrole role : user.getSyroles()) {
				Hibernate.initialize(role.getSyresources());
			}
			for (Syorganization organization : user.getSyorganizations()) {
				Hibernate.initialize(organization.getSyresources());
			}
			user.setIp(IpUtil.getIpAddr(getRequest()));
			sessionInfo.setUser(user);
			getSession().setAttribute("sessionInfo", sessionInfo);
			MessageUtil.createCommMsg(message);
		} else {
			MessageUtil.errRetrunInAction(message, msa.getMessage(MsgCodeList.ERROR_300004));
		}
		writeJson(message);
	}
	
	/**
	 * 解锁登录
	 */
	public void doNotNeedSessionAndSecurity_logon() {
		Message message = new Message();
		HqlFilter hqlFilter = new HqlFilter();
		hqlFilter.addFilter("QUERY_t#loginname_S_EQ", data.getLoginname());
		hqlFilter.addFilter("QUERY_t#pwd_S_EQ", DigestUtils.md5Hex(data.getPwd()));
		Syuser user = service.getByFilter(hqlFilter);
		
		if (user != null) {
			SessionInfo sessionInfo = new SessionInfo();
			Hibernate.initialize(user.getSyroles());
			Hibernate.initialize(user.getSyorganizations());
			for (Syrole role : user.getSyroles()) {
				Hibernate.initialize(role.getSyresources());
			}
			for (Syorganization organization : user.getSyorganizations()) {
				Hibernate.initialize(organization.getSyresources());
			}
			user.setIp(IpUtil.getIpAddr(getRequest()));
			sessionInfo.setUser(user);
			getSession().setAttribute("sessionInfo", sessionInfo);
			MessageUtil.createCommMsg(message);
		} else {
			MessageUtil.errRetrunInAction(message, msa.getMessage(MsgCodeList.ERROR_300004));
		}
		writeJson(message);
	}

	/**
	 * 修改自己的密码
	 */
	public void doNotNeedSecurity_updateCurrentPwd() {
		SessionInfo sessionInfo = (SessionInfo) getSession().getAttribute("sessionInfo");
		Message message = new Message();
		Syuser user = service.getById(sessionInfo.getUser().getId());
		user.setPwd(DigestUtils.md5Hex(data.getPwd()));
		user.setUpdatedatetime(new Date());
		service.update(user);
		MessageUtil.createCommMsg(message);
		writeJson(message);
	}

	/**
	 * 修改用户角色
	 */
	public void grantRole() {
		Message json = new Message();
		((SyuserServiceI) service).grantRole(id, ids);
		json.setSuccess(true);
		writeJson(json);
	}

	/**
	 * 修改用户机构
	 */
	public void grantOrganization() {
		Message json = new Message();
		((SyuserServiceI) service).grantOrganization(id, ids);
		json.setSuccess(true);
		writeJson(json);
	}

	/**
	 * 统计用户注册时间图表
	 */
	public void doNotNeedSecurity_userCreateDatetimeChart() {
		writeJson(((SyuserServiceI) service).userCreateDatetimeChart());
	}

	/**
	 * 新建一个用户
	 */
	synchronized public void save() {
		Message message = new Message();
		if (data != null) {
			HqlFilter hqlFilter = new HqlFilter();
			hqlFilter.addFilter("QUERY_t#loginname_S_EQ", data.getLoginname());
			Syuser user = service.getByFilter(hqlFilter);
			if (user != null) {
				MessageUtil.errRetrunInAction(message, msa.getMessage(MsgCodeList.ERROR_300006));
			} else {
				data.setPwd(DigestUtils.md5Hex("123456"));
				service.save(data);
				MessageUtil.createCommMsg(message);
				message.setRepMsg("新建用户成功！默认密码：123456");
			}
		}
		writeJson(message);
	}

	/**
	 * 更新一个用户
	 */
	synchronized public void update() {
		Message message = new Message();
		if (data != null && !StringUtils.isBlank(data.getId())) {
			HqlFilter hqlFilter = new HqlFilter();
			hqlFilter.addFilter("QUERY_t#id_S_NE", data.getId());
			hqlFilter.addFilter("QUERY_t#loginname_S_EQ", data.getLoginname());
			Syuser user = service.getByFilter(hqlFilter);
			if (user != null) {
				MessageUtil.errRetrunInAction(message, msa.getMessage(MsgCodeList.ERROR_300006));
			} else {
				Syuser t = service.getById(data.getId());
				BeanUtils.copyNotNullProperties(data, t, new String[] { "createdatetime" });
				service.update(t);
				MessageUtil.createCommMsg(message);
			}
		}
		writeJson(message);
	}

	/**
	 * 用户登录页面的自动补全
	 */
	public void doNotNeedSessionAndSecurity_loginNameComboBox() {
		HqlFilter hqlFilter = new HqlFilter();
		hqlFilter.addFilter("QUERY_t#loginname_S_LK", "%%" + StringUtils.defaultString(q) + "%%");
		hqlFilter.addSort("t.loginname");
		hqlFilter.addOrder("asc");
		writeJsonByIncludesProperties(service.findByFilter(hqlFilter, 1, 10), new String[] { "loginname" });
	}

	/**
	 * 用户登录页面的grid自动补全
	 */
	public void doNotNeedSessionAndSecurity_loginNameComboGrid() {
		Grid grid = new Grid();
		HqlFilter hqlFilter = new HqlFilter(getRequest());
		hqlFilter.addFilter("QUERY_t#loginname_S_LK", "%%" + StringUtils.defaultString(q) + "%%");
		grid.setTotal(service.countByFilter(hqlFilter));
		grid.setRows(service.findByFilter(hqlFilter, pageNo, pageSize));
		writeJson(grid);
	}

}
