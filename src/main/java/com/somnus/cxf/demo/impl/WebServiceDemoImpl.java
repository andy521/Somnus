package com.somnus.cxf.demo.impl;

import javax.jws.WebService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import com.somnus.cxf.demo.WebServiceDemoI;
import com.somnus.model.base.Syuser;
import com.somnus.service.base.SyuserServiceI;

/**
 * WebService接口实现类
 * 
 * @author 孙宇
 * 
 */
@WebService(endpointInterface = "com.somnus.cxf.demo.WebServiceDemoI", serviceName = "webServiceDemo")
public class WebServiceDemoImpl implements WebServiceDemoI {

	@Autowired
	private SyuserServiceI userService;

	public String helloWs(String name) {
		if (StringUtils.isBlank(name)) {
			name = "SunYu";
		}
		String str = "hello[" + name.trim() + "]WebService test ok!";
		System.out.println(str);
		return str;
	}

	public Syuser getUser(String id) {
		if (StringUtils.isBlank(id)) {
			id = "0";
		}
		Syuser user = userService.getById(id.trim());
		Syuser u = new Syuser();
		u.setName(user.getName());
		u.setAge(user.getAge());
		u.setCreatedatetime(user.getCreatedatetime());
		u.setUpdatedatetime(user.getUpdatedatetime());
		u.setId(user.getId());
		u.setLoginname(user.getLoginname());
		u.setSex(user.getSex());
		u.setPhoto(user.getPhoto());
		return u;
	}

}
