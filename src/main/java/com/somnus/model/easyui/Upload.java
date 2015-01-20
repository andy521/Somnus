package com.somnus.model.easyui;

import java.util.ArrayList;
import java.util.List;

public class Upload {
	/**
	* 表示图片是否已上传成功。
	*/
	private Boolean success = false;
	/**
	* 自定义的附加消息。
	*/
	private String msg;
	/**
	* 表示原始图片的保存地址。
	*/
	private String sourceUrl;
	/**
	* 表示所有头像图片的保存地址，该变量为一个数组。
	*/
	private List<String> avatarUrls = new ArrayList<String>();
	public Boolean getSuccess() {
		return success;
	}
	public void setSuccess(Boolean success) {
		this.success = success;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getSourceUrl() {
		return sourceUrl;
	}
	public void setSourceUrl(String sourceUrl) {
		this.sourceUrl = sourceUrl;
	}
	public List<String> getAvatarUrls() {
		return avatarUrls;
	}
	public void setAvatarUrls(List<String> avatarUrls) {
		this.avatarUrls = avatarUrls;
	}
}
