package com.somnus.action;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionSupport;
import com.somnus.util.base.DateUtil;

@ParentPackage("json-default")
@Namespace("/")
@Action(results = {@Result(name = "uploadify", type = "json",params={"excludeProperties","file,fileContentType,fileFileName"})})
public class UploadifyAction extends ActionSupport
{
	/*
	 * 成员变量的名称不能随意更改, 
	 * private File file; 						变量的名称必须和jsp中上传文件标签中的name属性的值一致.
	 * private String fileFileName;		变量的名称必须为"上传文件的名称+FileName".
	 * private String fileContentType;	变量的名称必须为"上传文件的名称+ContentType", 
	 */
	private List<File> photo;

	private List<String> photoFileName;

	private List<String> photoContentType;
	
	private List<String> newImgPath = new ArrayList<String>();

	@SuppressWarnings("deprecation")
	public String upload() throws Exception
	{
		for(int i=0;i<photo.size();i++)
		{
			String root = ServletActionContext.getRequest().getRealPath("/upload");
			
			int idx = photoFileName.get(i).lastIndexOf(".");  
			//文件后缀  
			String extention= photoFileName.get(i).substring(idx);  
			String time = DateUtil.dateToString(new Date(),"yyyyMMddHHmmssSSS");
			//新的文件名(日期+后缀)  
			String newPath = time + extention; 
			
			newImgPath.add(newPath);

			File destFile = new File(root, newPath);
			
			FileUtils.copyFile(photo.get(i), destFile);   
		}
		return "uploadify";
	}

	public List<File> getPhoto() {
		return photo;
	}

	public void setPhoto(List<File> photo) {
		this.photo = photo;
	}

	public List<String> getPhotoFileName() {
		return photoFileName;
	}

	public void setPhotoFileName(List<String> photoFileName) {
		this.photoFileName = photoFileName;
	}

	public List<String> getPhotoContentType() {
		return photoContentType;
	}

	public void setPhotoContentType(List<String> photoContentType) {
		this.photoContentType = photoContentType;
	}

	public List<String> getNewImgPath() {
		return newImgPath;
	}

	public void setNewImgPath(List<String> newImgPath) {
		this.newImgPath = newImgPath;
	}


}
