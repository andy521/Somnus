package com.somnus.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.somnus.model.messege.Message;
import com.somnus.service.InitService;

/**
 * 初始化数据库使用
 * 
 * @author Somnus
 * 
 */
@Namespace("/")
@Action
public class InitAction extends BaseAction {

	private static final long serialVersionUID = 515728369692931207L;
	@Autowired
	private InitService service;

	synchronized public void doNotNeedSessionAndSecurity_initDb() {
		Message j = new Message();
		service.initDb();
		j.setSuccess(true);
		writeJson(j);

		if (getSession() != null) {
			getSession().invalidate();
		}
	}

}
