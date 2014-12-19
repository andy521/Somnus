package com.somnus.cxf.demo;

import javax.jws.WebParam;
import javax.jws.WebService;
import com.somnus.model.base.Syuser;

/**
 * WebService接口定义
 * 
 * @author Somnus
 * 
 */
@WebService
public interface WebServiceDemoI {

	public String helloWs(@WebParam(name = "userName") String name);

	public Syuser getUser(@WebParam(name = "userId") String id);

}
