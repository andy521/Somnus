package com.somnus.service.base.impl;

import java.util.HashSet;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.somnus.dao.base.BaseDaoI;
import com.somnus.model.base.Syresource;
import com.somnus.model.base.Syrole;
import com.somnus.model.base.Syuser;
import com.somnus.service.base.SyroleServiceI;
import com.somnus.service.impl.BaseServiceImpl;
import com.somnus.util.base.HqlFilter;

/**
 * 角色业务逻辑
 * 
 * @author Somnus
 * 
 */
@Service
@Transactional
public class SyroleServiceImpl extends BaseServiceImpl<Syrole> implements SyroleServiceI {

	@Autowired
	private BaseDaoI<Syuser> userDao;
	@Autowired
	private BaseDaoI<Syresource> resourceDao;

	@Transactional(readOnly = false)
	public List<Syrole> findRoleByFilter(HqlFilter hqlFilter, int page, int rows) {
		String hql = "select distinct t from Syrole t join t.syusers user";
		return find(hql + hqlFilter.getWhereAndOrderHql(), hqlFilter.getParams(), page, rows);
	}

	@Transactional(readOnly = false)
	public List<Syrole> findRoleByFilter(HqlFilter hqlFilter) {
		String hql = "select distinct t from Syrole t join t.syusers user";
		return find(hql + hqlFilter.getWhereAndOrderHql(), hqlFilter.getParams());
	}

	@Transactional(readOnly = false)
	public Long countRoleByFilter(HqlFilter hqlFilter) {
		String hql = "select count(distinct t) from Syrole t join t.syusers user";
		return count(hql + hqlFilter.getWhereHql(), hqlFilter.getParams());
	}

	public void saveRole(Syrole syrole, String userId) {
		save(syrole);

		Syuser user = userDao.getById(Syuser.class, userId);
		user.getSyroles().add(syrole);// 把新添加的角色与当前用户关联
	}

	public void grant(String id, String resourceIds) {
		Syrole role = getById(id);
		if (role != null) {
			role.setSyresources(new HashSet<Syresource>());
			for (String resourceId : resourceIds.split(",")) {
				if (!StringUtils.isBlank(resourceId)) {
					Syresource resource = resourceDao.getById(Syresource.class, resourceId);
					if (resource != null) {
						role.getSyresources().add(resource);
					}
				}
			}
		}
	}

}
