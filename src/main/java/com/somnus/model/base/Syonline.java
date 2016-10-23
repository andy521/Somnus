package com.somnus.model.base;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "SYONLINE", schema = "")
@DynamicInsert(true)
@DynamicUpdate(true)
public class Syonline implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	private String id;
	private String loginname;
	private String ip;
	private String attribution;
	private Date createdatetime;
	private String type;// 1.登录0.注销

	public Syonline() {
	}

	public Syonline(String id) {
		this.id = id;
	}

	public Syonline(String id, String loginname, String ip,String attribution, Date createdatetime, String type) {
		this.id = id;
		this.loginname = loginname;
		this.ip = ip;
		this.attribution = attribution;
		this.createdatetime = createdatetime;
		this.type = type;
	}

	@Id
	@Column(name = "ID", unique = true, nullable = false, length = 36)
	public String getId() {
		if (!StringUtils.isBlank(this.id)) {
			return this.id;
		}
		return UUID.randomUUID().toString();
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "LOGINNAME", length = 100)
	public String getLoginname() {
		return this.loginname;
	}

	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}

	@Column(name = "IP", length = 100)
	public String getIp() {
		return this.ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}
	
	@Column(name = "ATTRIBUTION", length = 100)
	public String getAttribution() {
		return this.attribution;
	}

	public void setAttribution(String attribution) {
		this.attribution = attribution;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CREATEDATETIME", length = 7)
	public Date getCreatedatetime() {
		if (this.createdatetime != null)
			return this.createdatetime;
		return new Date();
	}

	public void setCreatedatetime(Date createdatetime) {
		this.createdatetime = createdatetime;
	}

	@Column(name = "TYPE", length = 1)
	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
