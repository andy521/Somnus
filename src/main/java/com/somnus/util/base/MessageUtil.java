package com.somnus.util.base;

import com.somnus.model.messege.Message;

public class MessageUtil {
	
	/**
	 * 业务异常返回
	 * 
	 * @param ex
	 * @return
	 * @throws Exception
	 */
	public static Message errRetrunInAction(String errMsg) {
		Message message = new Message();
		if (errMsg != null && errMsg.split("[|]").length > 1) {
			String[] errs = errMsg.split("[|]");
			// 错误信息设置
			message.setRepCode(errs[0]);
			message.setRepMsg(errs[1]);
		} else {
			// 错误信息设置
			message.setRepCode(MsgCodeList.ERROR_999999);
			message.setRepMsg("处理失败!");
		}
		return message;
	}
	
	/**
	 * createCommMsg创建公共成功返回报文
	 * 
	 * @param reqHead
	 * @return repHead
	 */
	public static Message createCommMsg() {
		Message message = new Message();
		message.setRepCode(MsgCodeList.SUCCESS_000000);
		message.setRepMsg("处理成功!");
		return message;
	}
	
	/**
	 * 系统异常返回
	 * @return
	 */
	public static Message createErrorMsg() {
		Message message = new Message();
		message.setRepCode(MsgCodeList.ERROR_999999);
		message.setRepMsg("处理失败!");
		return message;
	}
	
	public static void errRetrunInAction(Message message,String errMsg) {
		if (errMsg != null && errMsg.split("[|]").length > 1) {
			String[] errs = errMsg.split("[|]");
			// 错误信息设置
			message.setRepCode(errs[0]);
			message.setRepMsg(errs[1]);
		} else {
			// 错误信息设置
			message.setRepCode(MsgCodeList.ERROR_999999);
			message.setRepMsg("处理失败!");
		}
	}
	
	/**
	 * createCommMsg创建公共成功返回报文
	 * 
	 * @param reqHead
	 * @return repHead
	 */
	public static void createCommMsg(Message message) {
		message.setRepCode(MsgCodeList.SUCCESS_000000);
		message.setRepMsg("处理成功!");
	}
	
	/**
	 * 系统异常返回
	 * @return
	 */
	public static void createErrorMsg(Message message) {
		message.setRepCode(MsgCodeList.ERROR_999999);
		message.setRepMsg("处理失败!");
	}
	
}
