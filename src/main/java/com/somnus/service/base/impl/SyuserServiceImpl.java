package com.somnus.service.base.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.somnus.dao.base.BaseDaoI;
import com.somnus.model.base.Syorganization;
import com.somnus.model.base.Syrole;
import com.somnus.model.base.Syuser;
import com.somnus.service.base.SyuserServiceI;
import com.somnus.service.impl.BaseServiceImpl;

/**
 * 用户业务逻辑
 * 
 * @author 孙宇
 * 
 */
@Service
public class SyuserServiceImpl extends BaseServiceImpl<Syuser> implements SyuserServiceI {

	@Autowired
	private BaseDaoI<Syrole> roleDao;

	@Autowired
	private BaseDaoI<Syorganization> organizationDao;

	public void grantRole(String id, String roleIds) {
		Syuser user = getById(id);
		if (user != null) {
			user.setSyroles(new HashSet<Syrole>());
			for (String roleId : roleIds.split(",")) {
				if (!StringUtils.isBlank(roleId)) {
					Syrole role = roleDao.getById(Syrole.class, roleId);
					if (role != null) {
						user.getSyroles().add(role);
					}
				}
			}
		}
	}

	public void grantOrganization(String id, String organizationIds) {
		Syuser user = getById(id);
		if (user != null) {
			user.setSyorganizations(new HashSet<Syorganization>());
			for (String organizationId : organizationIds.split(",")) {
				if (!StringUtils.isBlank(organizationId)) {
					Syorganization organization = organizationDao.getById(Syorganization.class, organizationId);
					if (organization != null) {
						user.getSyorganizations().add(organization);
					}
				}
			}
		}
	}

	public List<Map<String,Object>> userCreateDatetimeChart() {
		List<Map<String,Object>> l = new ArrayList<Map<String,Object>>();
		int k = 0;
		for (int i = 0; i < 12; i++) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("a", k);
			params.put("b", k + 2);
			k = k + 2;
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("name",(k-2)+"-"+k);
			map.put("data", count("select count(*) from Syuser t where HOUR(t.createdatetime)>=:a and HOUR(t.createdatetime)<:b", params));
			l.add(map);
		}
		return l;
	}

	public Long countUserByRoleId(String roleId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("roleId", roleId);
		String hql = "select count(*) from Syuser t join t.syroles role where role.id = :roleId";
		return count(hql, params);
	}

	public Long countUserByNotRoleId() {
		String hql = "select count(*) from Syuser t left join t.syroles role where role.id is null";
		return count(hql);
	}

}
