package com.somnus.action.base;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.somnus.action.BaseAction;
import com.somnus.model.base.Syresourcetype;
import com.somnus.model.messege.CommboBox;
import com.somnus.model.messege.Message;
import com.somnus.service.base.SyresourcetypeService;
import com.somnus.support.constant.Constants;
import com.somnus.support.exception.BizException;
import com.somnus.util.base.MessageUtil;

@Namespace("/base")
@Action
public class ResourcetypeAction extends BaseAction<Syresourcetype> {

	private static final long serialVersionUID = -7002295700153580687L;
	
	private transient Logger	log = LoggerFactory.getLogger(this.getClass());

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
		Message message = new Message();
		try {
			List<Syresourcetype> list = ((SyresourcetypeService) service).findResourcetype();
			List<CommboBox> commbolist = new ArrayList<CommboBox>();
			for(Syresourcetype data:list){
				CommboBox commbo = new CommboBox();
				commbo.setLabel(data.getName());
				commbo.setValue(data.getId());
				commbolist.add(commbo);
			}
			MessageUtil.createCommMsg(message);
			message.setResults(commbolist);
		} catch (BizException e) {
			log.error(Constants.BUSINESS_ERROR, e);
			// 组织错误报文
			MessageUtil.errRetrunInAction(message, e);
		} catch (Exception ex) {
			log.error(Constants.EXCEPTION_ERROR, ex);
			// 组织错误报文
			MessageUtil.createErrorMsg(message);
		}
		writeJson(message);
	}

}
