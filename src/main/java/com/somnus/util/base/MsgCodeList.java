/**
 * 
 */
package com.somnus.util.base;

/**
 * 300xxx 系统错误 301xxx 报文错误 302xxx 日间交易异常 303xxx 日终异常
 */
public class MsgCodeList {
	/**
	 * 处理成功
	 */
	public static final String SUCCESS_000000 = "000000";

	/**
	 * 系统异常
	 */
	public static final String ERROR_999999 = "999999";

	/**
	 * 父机构不可以是自己
	 */
	public static final String ERROR_300001 = "300001";

	/**
	 * 父资源不可以是自己
	 */
	public static final String ERROR_300002 = "300002";

	/**
	 * 用户名已存在
	 */
	public static final String ERROR_300003 = "300003";

	/**
	 * 用户名或密码错误
	 */
	public static final String ERROR_300004 = "300004";
	/**
	 * 验证码错误
	 */
	public static final String ERROR_300005 = "300005";
	
	/**
	 * 验证码已过期
	 */
	public static final String ERROR_300008 = "300008";
	
	/**
	 * 用户名已存在
	 */
	public static final String ERROR_300006 = "300006";

	/**
	 * 主键不可为空
	 */
	public static final String ERROR_300007 = "300007";


}
