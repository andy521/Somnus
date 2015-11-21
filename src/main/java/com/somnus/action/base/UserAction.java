package com.somnus.action.base;

import java.util.Date;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.octo.captcha.service.CaptchaService;
import com.somnus.action.BaseAction;
import com.somnus.model.base.SessionInfo;
import com.somnus.model.base.Syorganization;
import com.somnus.model.base.Syrole;
import com.somnus.model.base.Syuser;
import com.somnus.model.messege.Grid;
import com.somnus.model.messege.Json;
import com.somnus.service.base.SyroleServiceI;
import com.somnus.service.base.SyuserServiceI;
import com.somnus.util.base.BeanUtils;
import com.somnus.util.base.HqlFilter;
import com.somnus.util.base.IpUtil;

@Namespace("/base")
@Action
public class UserAction extends BaseAction<Syuser> {
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
	private CaptchaService captchaService;

	/**
	 * 注销系统
	 */
	public void doNotNeedSessionAndSecurity_logout() {
		if (getSession() != null) {
			getSession().invalidate();
		}
		Json j = new Json();
		j.setSuccess(true);
		writeJson(j);
	}

	/**
	 * 注册
	 */
	synchronized public void doNotNeedSessionAndSecurity_reg() {
		Json json = new Json();
		HqlFilter hqlFilter = new HqlFilter();
		hqlFilter.addFilter("QUERY_t#loginname_S_EQ", data.getLoginname());
		Syuser user = service.getByFilter(hqlFilter);
		if (user != null) {
			json.setMsg("用户名已存在！");
			writeJson(json);
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
		Json json = new Json();
		boolean bCaptchaCorrect = captchaService.validateResponseForID(
				(String)getSession().getId(), data.getCaptcha());		
		
		if(!bCaptchaCorrect){
			json.setMsg("验证码错误");
			writeJson(json);
			throw new RuntimeException("验证码错误");
		}
		HqlFilter hqlFilter = new HqlFilter();
		hqlFilter.addFilter("QUERY_t#loginname_S_EQ", data.getLoginname());
		hqlFilter.addFilter("QUERY_t#pwd_S_EQ", DigestUtils.md5Hex(data.getPwd()));
		Syuser user = service.getByFilter(hqlFilter);
		
		if (user != null) {
			json.setSuccess(true);

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
		} else {
			json.setMsg("用户名或密码错误！");
		}
		writeJson(json);
	}

	/**
	 * 修改自己的密码
	 */
	public void doNotNeedSecurity_updateCurrentPwd() {
		SessionInfo sessionInfo = (SessionInfo) getSession().getAttribute("sessionInfo");
		Json json = new Json();
		Syuser user = service.getById(sessionInfo.getUser().getId());
		user.setPwd(DigestUtils.md5Hex(data.getPwd()));
		user.setUpdatedatetime(new Date());
		service.update(user);
		json.setSuccess(true);
		writeJson(json);
	}

	/**
	 * 修改用户角色
	 */
	public void grantRole() {
		Json json = new Json();
		((SyuserServiceI) service).grantRole(id, ids);
		json.setSuccess(true);
		writeJson(json);
	}

	/**
	 * 修改用户机构
	 */
	public void grantOrganization() {
		Json json = new Json();
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
		Json json = new Json();
		if (data != null) {
			HqlFilter hqlFilter = new HqlFilter();
			hqlFilter.addFilter("QUERY_t#loginname_S_EQ", data.getLoginname());
			Syuser user = service.getByFilter(hqlFilter);
			if (user != null) {
				json.setMsg("新建用户失败，用户名已存在！");
			} else {
				data.setPwd(DigestUtils.md5Hex("123456"));
				service.save(data);
				json.setMsg("新建用户成功！默认密码：123456");
				json.setSuccess(true);
			}
		}
		writeJson(json);
	}

	/**
	 * 更新一个用户
	 */
	synchronized public void update() {
		Json json = new Json();
		json.setMsg("更新失败！");
		if (data != null && !StringUtils.isBlank(data.getId())) {
			HqlFilter hqlFilter = new HqlFilter();
			hqlFilter.addFilter("QUERY_t#id_S_NE", data.getId());
			hqlFilter.addFilter("QUERY_t#loginname_S_EQ", data.getLoginname());
			Syuser user = service.getByFilter(hqlFilter);
			if (user != null) {
				json.setMsg("更新用户失败，用户名已存在！");
			} else {
				Syuser t = service.getById(data.getId());
				BeanUtils.copyNotNullProperties(data, t, new String[] { "createdatetime" });
				service.update(t);
				json.setSuccess(true);
				json.setMsg("更新成功！");
			}
		}
		writeJson(json);
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
