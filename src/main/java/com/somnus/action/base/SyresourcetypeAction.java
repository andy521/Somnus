package com.somnus.action.base;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.somnus.action.BaseAction;
import com.somnus.model.base.Syresourcetype;
import com.somnus.model.easyui.CommboBox;
import com.somnus.model.easyui.Json;
import com.somnus.service.base.SyresourcetypeServiceI;

/**
 * 资源类型
 * 
 * @author 孙宇
 * 
 */
@Namespace("/base")
@Action
public class SyresourcetypeAction extends BaseAction<Syresourcetype> {

	/**
	 * 注入业务逻辑，使当前action调用service.xxx的时候，直接是调用基础业务逻辑
	 * 
	 * 如果想调用自己特有的服务方法时，请使用((TServiceI) service).methodName()这种形式强转类型调用
	 * 
	 * @param service
	 */
	@Autowired
	public void setService(SyresourcetypeServiceI service) {
		this.service = service;
	}

	/**
	 * 获得资源类型combobox
	 */
	public void doNotNeedSecurity_combobox() {
		List<Syresourcetype> list = ((SyresourcetypeServiceI) service).findResourcetype();
		List<CommboBox> commbolist = new ArrayList<CommboBox>();
		for(Syresourcetype data:list){
			CommboBox commbo = new CommboBox();
			commbo.setLabel(data.getTypeName());
			commbo.setValue(data.getId());
			commbolist.add(commbo);
		}
		Json json = new Json();
		json.setSuccess(true);
		json.setResults(commbolist);
		writeJson(json);
	}

}
