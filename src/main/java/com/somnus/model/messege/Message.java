package com.somnus.model.messege;

/**
 * 
 * JSON模型
 * 
 * 用户后台向前台返回的JSON对象
 * 
 * @author Somnus
 * 
 */
public class Message implements java.io.Serializable {

	private static final long serialVersionUID = 1L;

	private boolean success = true;
	
	private boolean unique = true;

	//响应码
    private String repCode;
    //响应消息
    private String repMsg;
	
	private Object results;
	
	private Object data;

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public Object getResults() {
		return results;
	}

	public void setResults(Object results) {
		this.results = results;
	}

	public boolean isUnique() {
		return unique;
	}

	public void setUnique(boolean unique) {
		this.unique = unique;
	}

	public String getRepCode() {
		return repCode;
	}

	public void setRepCode(String repCode) {
		this.repCode = repCode;
	}

	public String getRepMsg() {
		return repMsg;
	}

	public void setRepMsg(String repMsg) {
		this.repMsg = repMsg;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

}
