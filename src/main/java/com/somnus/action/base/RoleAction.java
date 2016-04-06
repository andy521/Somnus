package com.somnus.action.base;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;

import com.somnus.action.BaseAction;
import com.somnus.model.base.SessionInfo;
import com.somnus.model.base.Syrole;
import com.somnus.model.base.Syuser;
import com.somnus.model.messege.Grid;
import com.somnus.model.messege.Message;
import com.somnus.model.messege.PageResponse;
import com.somnus.service.base.SyroleService;
import com.somnus.service.base.SyuserService;
import com.somnus.util.base.HqlFilter;
import com.somnus.util.base.MessageUtil;

@Namespace("/base")
@Action
public class RoleAction extends BaseAction<Syrole> {

	private static final long serialVersionUID = -6844403961976605199L;
	@Autowired
	private SyuserService userService;

	/**
	 * 注入业务逻辑，使当前action调用service.xxx的时候，直接是调用基础业务逻辑
	 * 
	 * 如果想调用自己特有的服务方法时，请使用((TServiceI) service).methodName()这种形式强转类型调用
	 * 
	 * @param service
	 */
	@Autowired
	public void setService(SyroleService service) {
		this.service = service;
	}
	
	@Autowired
	private MessageSourceAccessor msa;

	/**
	 * 角色grid
	 */
	public void grid() {
		Grid grid = new Grid();
		HqlFilter hqlFilter = new HqlFilter(getRequest());
		SessionInfo sessionInfo = (SessionInfo) getSession().getAttribute("sessionInfo");
		hqlFilter.addFilter("QUERY_user#id_S_EQ", sessionInfo.getUser().getId());
		PageResponse<Syrole> page = ((SyroleService) service).findRoleByFilter(hqlFilter, pageNo, pageSize);
		grid.setTotal(page.getCount());
		grid.setRows(page.getResult());
		writeJson(grid);
	}

	/**
	 * 保存一个角色
	 */
	public void save() {
		Message message = new Message();
		if (data != null) {
			SessionInfo sessionInfo = (SessionInfo) getSession().getAttribute("sessionInfo");
			((SyroleService) service).saveRole(data, sessionInfo.getUser().getId());
			MessageUtil.createCommMsg(message);
		}
		writeJson(message);
	}

	/**
	 * 角色授权
	 */
	public void grant() {
		Message message = new Message();
		((SyroleService) service).grant(id, ids);
		MessageUtil.createCommMsg(message);
		writeJson(message);
	}

	/**
	 * 获得当前用户能看到的所有角色树
	 */
	public void doNotNeedSecurity_getRolesTree() {
		SessionInfo sessionInfo = (SessionInfo) getSession().getAttribute("sessionInfo");
		Syuser user = userService.getById(sessionInfo.getUser().getId());
		Set<Syrole> roles = user.getSyroles();
		List<Syrole> l = new ArrayList<Syrole>(roles);
		Collections.sort(l, new Comparator<Syrole>() {// 排序
					public int compare(Syrole o1, Syrole o2) {
						if (o1.getSeq() == null) {
							o1.setSeq(1000);
						}
						if (o2.getSeq() == null) {
							o2.setSeq(1000);
						}
						return o1.getSeq().compareTo(o2.getSeq());
					}
				});
		writeJson(l);
	}

	/**
	 * 获得当前用户的角色
	 */
	public void doNotNeedSecurity_getRoleByUserId() {
		HqlFilter hqlFilter = new HqlFilter(getRequest());
		hqlFilter.addFilter("QUERY_user#id_S_EQ", id);
		List<Syrole> roles = ((SyroleService) service).findRoleByFilter(hqlFilter);
		writeJson(roles);
	}

	/**
	 * 用户角色分布报表
	 */
	public void doNotNeedSecurity_userRoleChart() {
		List<Syrole> roles = service.find();
		List<Map<String, Object>> l = new ArrayList<Map<String, Object>>();
		for (Syrole role : roles) {
			Map<String, Object> m = new HashMap<String, Object>();
			m.put("name", role.getName());
			m.put("y", userService.countUserByRoleId(role.getId()));
			m.put("sliced", false);
			m.put("selected", false);
			l.add(m);
		}
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("name", "无");
		m.put("y", userService.countUserByNotRoleId());
		m.put("sliced", true);
		m.put("selected", true);
		l.add(m);
		writeJson(l);
	}
}
