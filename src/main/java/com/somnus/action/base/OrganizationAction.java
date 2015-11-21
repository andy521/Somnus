package com.somnus.action.base;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;

import com.somnus.action.BaseAction;
import com.somnus.model.base.SessionInfo;
import com.somnus.model.base.Syorganization;
import com.somnus.model.base.Syuser;
import com.somnus.model.messege.Message;
import com.somnus.model.messege.Tree;
import com.somnus.service.base.SyorganizationServiceI;
import com.somnus.service.base.SyuserServiceI;
import com.somnus.util.base.BeanUtils;
import com.somnus.util.base.HqlFilter;
import com.somnus.util.base.MessageUtil;
import com.somnus.util.base.MsgCodeList;

@Namespace("/base")
@Action
public class OrganizationAction extends BaseAction<Syorganization> {

	private static final long serialVersionUID = 3397120120217500923L;
	@Autowired
	private SyuserServiceI userService;

	/**
	 * 注入业务逻辑，使当前action调用service.xxx的时候，直接是调用基础业务逻辑
	 * 
	 * 如果想调用自己特有的服务方法时，请使用((TServiceI) service).methodName()这种形式强转类型调用
	 * 
	 * @param service
	 */
	@Autowired
	public void setService(SyorganizationServiceI service) {
		this.service = service;
	}
	
	@Autowired
	private MessageSourceAccessor msa;

	/**
	 * 保存一个机构
	 */
	public void save() {
		Message message = new Message();
		if (data != null) {
			SessionInfo sessionInfo = (SessionInfo) getSession().getAttribute("sessionInfo");
			((SyorganizationServiceI) service).saveOrganization(data, sessionInfo.getUser().getId());
			MessageUtil.createCommMsg(message);
		}
		writeJson(message);
	}

	/**
	 * 更新机构
	 */
	public void update() {
		Message message = new Message();
		if (!StringUtils.isBlank(data.getId())) {
			if (data.getSyorganization() != null && StringUtils.equals(data.getId(), data.getSyorganization().getId())) {
				MessageUtil.errRetrunInAction(message, msa.getMessage(MsgCodeList.ERROR_300001));
			} else {
				((SyorganizationServiceI) service).updateOrganization(data);
				MessageUtil.createCommMsg(message);
			}
		}
		writeJson(message);
	}

	/**
	 * 获得机构下拉树
	 */
	public void doNotNeedSecurity_comboTree() {
		HqlFilter hqlFilter = new HqlFilter();
		List<Syorganization> organizations = service.findByFilter(hqlFilter);
		List<Tree> tree = new ArrayList<Tree>();
		for(Syorganization organization:organizations){
			Tree node = new Tree();
			BeanUtils.copyNotNullProperties(organization, node);
			node.setText(organization.getName());
			tree.add(node);
		}
		writeJson(tree);
	}

	/**
	 * 机构授权
	 */
	public void grant() {
		Message message = new Message();
		((SyorganizationServiceI) service).grant(id, ids);
		MessageUtil.createCommMsg(message);
		writeJson(message);
	}

	/**
	 * 获得当前用户能看到的所有机构树
	 */
	public void doNotNeedSecurity_getSyorganizationsTree() {
		SessionInfo sessionInfo = (SessionInfo) getSession().getAttribute("sessionInfo");
		Syuser user = userService.getById(sessionInfo.getUser().getId());
		Set<Syorganization> organizations = user.getSyorganizations();
		List<Syorganization> l = new ArrayList<Syorganization>(organizations);
		Collections.sort(l, new Comparator<Syorganization>() {// 排序
					public int compare(Syorganization o1, Syorganization o2) {
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
	 * 获得当前用户的机构
	 */
	public void doNotNeedSecurity_getSyorganizationByUserId() {
		HqlFilter hqlFilter = new HqlFilter(getRequest());
		hqlFilter.addFilter("QUERY_user#id_S_EQ", id);
		List<Syorganization> organizations = ((SyorganizationServiceI) service).findOrganizationByFilter(hqlFilter);
		writeJson(organizations);
	}

}
