package com.somnus.interceptor.base;

import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.ServletActionContext;

import com.somnus.model.base.SessionInfo;
import com.somnus.model.base.Syorganization;
import com.somnus.model.base.Syresource;
import com.somnus.model.base.Syrole;
import com.somnus.util.base.ConfigUtil;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.MethodFilterInterceptor;

/**
 * 权限拦截器
 * 
 * @author Somnus
 * 
 */
public class SecurityInterceptor extends MethodFilterInterceptor {

	private static final Logger logger = LoggerFactory.getLogger(SecurityInterceptor.class);

	protected String doIntercept(ActionInvocation actionInvocation) throws Exception {
		SessionInfo sessionInfo = (SessionInfo) ServletActionContext.getRequest().getSession().getAttribute(ConfigUtil.getSessionInfoName());
		String servletPath = ServletActionContext.getRequest().getServletPath();

		servletPath = StringUtils.substringBeforeLast(servletPath, ".");

		logger.info("进入权限拦截器->访问的资源为：[" + servletPath + "]");

		Set<Syrole> roles = sessionInfo.getUser().getSyroles();
		for (Syrole role : roles) {
			for (Syresource resource : role.getSyresources()) {
				if (resource != null && StringUtils.equals(resource.getUrl(), servletPath)) {
					return actionInvocation.invoke();
				}
			}
		}
		Set<Syorganization> organizations = sessionInfo.getUser().getSyorganizations();
		for (Syorganization organization : organizations) {
			for (Syresource resource : organization.getSyresources()) {
				if (resource != null && StringUtils.equals(resource.getUrl(), servletPath)) {
					return actionInvocation.invoke();
				}
			}
		}

		String errMsg = "您没有访问此功能的权限！功能路径为[" + servletPath + "]请联系管理员给你赋予相应权限。";
		
		logger.info(errMsg);
		
		ServletActionContext.getRequest().setAttribute("msg", errMsg);
		
		return "noSecurity";
	}

}
