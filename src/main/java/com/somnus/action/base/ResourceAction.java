package com.somnus.action.base;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;

import com.somnus.action.BaseAction;
import com.somnus.model.base.SessionInfo;
import com.somnus.model.base.Syresource;
import com.somnus.model.messege.Message;
import com.somnus.model.messege.Tree;
import com.somnus.service.base.SyresourceService;
import com.somnus.util.base.BeanUtils;
import com.somnus.util.base.HqlFilter;
import com.somnus.util.base.MessageUtil;
import com.somnus.util.base.MsgCodeList;

@Namespace("/base")
@Action
public class ResourceAction extends BaseAction<Syresource> {

	private static final long serialVersionUID = -8075796405277817L;

	/**
	 * 注入业务逻辑，使当前action调用service.xxx的时候，直接是调用基础业务逻辑
	 * 
	 * 如果想调用自己特有的服务方法时，请使用((TServiceI) service).methodName()这种形式强转类型调用
	 * 
	 * @param service
	 */
	@Autowired
	public void setService(SyresourceService service) {
		this.service = service;
	}
	
	@Autowired
	private MessageSourceAccessor msa;

	/**
	 * 更新资源
	 */
	public void update() {
		Message message = new Message();
		if (!StringUtils.isBlank(data.getId())) {
			if (data.getSyresource() != null && StringUtils.equals(data.getId(), data.getSyresource().getId())) {
				MessageUtil.errRetrunInAction(message, msa.getMessage(MsgCodeList.ERROR_300002));
			} else {
				((SyresourceService) service).updateResource(data);
				MessageUtil.createCommMsg(message);
			}
		}
		writeJson(message);
	}

	/**
	 * 获得主菜单tree，也用于获得上级资源菜单combotree
	 */
	public void doNotNeedSecurity_getMainMenu() {
		HqlFilter hqlFilter = new HqlFilter(getRequest());
		SessionInfo sessionInfo = (SessionInfo) getSession().getAttribute("sessionInfo");
		hqlFilter.addFilter("QUERY_user#id_S_EQ", sessionInfo.getUser().getId());
		hqlFilter.addFilter("QUERY_t#syresourcetype#id_S_EQ", "0");// 0就是只查菜单
		List<Syresource> resources = ((SyresourceService) service).getMainMenu(hqlFilter);
		List<Tree> tree = new ArrayList<Tree>();
		for (Syresource resource : resources) {
			Tree node = new Tree();
			BeanUtils.copyNotNullProperties(resource, node);
			node.setText(resource.getName());
			Map<String, String> attributes = new HashMap<String, String>();
			attributes.put("url", resource.getUrl());
			attributes.put("target", resource.getTarget());
			node.setAttributes(attributes);
			tree.add(node);
		}
		writeJson(tree);
	}

	/**
	 * 获得资源treeGrid
	 */
	public void treeGrid() {
		HqlFilter hqlFilter = new HqlFilter(getRequest());
		SessionInfo sessionInfo = (SessionInfo) getSession().getAttribute("sessionInfo");
		hqlFilter.addFilter("QUERY_user#id_S_EQ", sessionInfo.getUser().getId());
		writeJson(((SyresourceService) service).resourceTreeGrid(hqlFilter));
	}

	/**
	 * 获得角色的资源列表
	 */
	public void doNotNeedSecurity_getRoleResources() {
		HqlFilter hqlFilter = new HqlFilter(getRequest());
		hqlFilter.addFilter("QUERY_role#id_S_EQ", id);
		writeJson(((SyresourceService) service).findResourceByFilter(hqlFilter));
	}

	/**
	 * 获得机构的资源列表
	 */
	public void doNotNeedSecurity_getOrganizationResources() {
		HqlFilter hqlFilter = new HqlFilter(getRequest());
		hqlFilter.addFilter("QUERY_organization#id_S_EQ", id);
		writeJson(((SyresourceService) service).findResourceByFilter(hqlFilter));
	}

	/**
	 * 获得资源树
	 */
	public void doNotNeedSecurity_getResourcesTree() {
		treeGrid();
	}

	/**
	 * 保存一个资源
	 */
	public void save() {
		Message message = new Message();
		SessionInfo sessionInfo = (SessionInfo) getSession().getAttribute("sessionInfo");
		((SyresourceService) service).saveResource(data, sessionInfo.getUser().getId());
		MessageUtil.createCommMsg(message);
		writeJson(message);
	}

}
