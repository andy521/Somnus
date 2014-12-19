package com.somnus.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import com.somnus.model.easyui.Json;
import com.somnus.service.InitServiceI;

/**
 * 初始化数据库使用
 * 
 * @author Somnus
 * 
 */
@Namespace("/")
@Action
public class InitAction extends BaseAction {

	@Autowired
	private InitServiceI service;

	synchronized public void doNotNeedSessionAndSecurity_initDb() {
		Json j = new Json();
		service.initDb();
		j.setSuccess(true);
		writeJson(j);

		if (getSession() != null) {
			getSession().invalidate();
		}
	}

}
