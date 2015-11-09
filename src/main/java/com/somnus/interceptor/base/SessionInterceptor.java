package com.somnus.interceptor.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.apache.struts2.ServletActionContext;

import com.somnus.model.base.SessionInfo;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.MethodFilterInterceptor;

/**
 * session拦截器
 * 
 * @author Somnus
 * 
 */
public class SessionInterceptor extends MethodFilterInterceptor {

	private static final Logger logger = LoggerFactory.getLogger(SessionInterceptor.class);

	protected String doIntercept(ActionInvocation actionInvocation) throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		SessionInfo sessionInfo = (SessionInfo) request.getSession().getAttribute("sessionInfo");
		logger.info("进入session拦截器->访问路径为[" + request.getServletPath() + "]");
		if (sessionInfo == null) {
			String errMsg = "您还没有登录或登录已超时，请重新登录，然后再刷新本功能！";
			logger.info(errMsg);
			if (request.getHeader("x-requested-with") != null
                    && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")){
				logger.info("进入session拦截器->----->异步请求----->");
				response.addHeader("sessionstatus", "timeOut");
			}
			return "noSession";
		}
		return actionInvocation.invoke();
	}

}
