package com.somnus.action.base;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.somnus.action.BaseAction;
import com.somnus.model.base.Syresourcetype;
import com.somnus.model.messege.CommboBox;
import com.somnus.model.messege.Message;
import com.somnus.service.base.SyresourcetypeService;
import com.somnus.util.base.MessageUtil;

@Namespace("/base")
@Action
public class ResourcetypeAction extends BaseAction<Syresourcetype> {

	private static final long serialVersionUID = -7002295700153580687L;

	/**
	 * 注入业务逻辑，使当前action调用service.xxx的时候，直接是调用基础业务逻辑
	 * 
	 * 如果想调用自己特有的服务方法时，请使用((TServiceI) service).methodName()这种形式强转类型调用
	 * 
	 * @param service
	 */
	@Autowired
	public void setService(SyresourcetypeService service) {
		this.service = service;
	}

	/**
	 * 获得资源类型combobox
	 */
	public void doNotNeedSecurity_combobox() {
		List<Syresourcetype> list = ((SyresourcetypeService) service).findResourcetype();
		List<CommboBox> commbolist = new ArrayList<CommboBox>();
		for(Syresourcetype data:list){
			CommboBox commbo = new CommboBox();
			commbo.setLabel(data.getName());
			commbo.setValue(data.getId());
			commbolist.add(commbo);
		}
		Message message = new Message();
		MessageUtil.createCommMsg(message);
		message.setResults(commbolist);
		writeJson(message);
	}

}
