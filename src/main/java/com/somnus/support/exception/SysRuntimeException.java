package com.somnus.support.exception;

/**
 * @Description 系统(运行时)异常
 * @author Somnus
 * @date 2015年11月5日 下午10:10:58 
 * @version 1.0
 */
public class SysRuntimeException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public SysRuntimeException() {
		super();
	}

	public SysRuntimeException(String message) {
		super(message);
	}

	public SysRuntimeException(String message, Throwable cause) {
		super(message, cause);
	}

	public SysRuntimeException(Throwable cause) {
		super(cause);
	}
}
