package com.somnus.service.base.impl;

import java.util.HashSet;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.somnus.dao.base.BaseDao;
import com.somnus.dao.base.SyresourceDao;
import com.somnus.dao.base.SyuserDao;
import com.somnus.model.base.Syresource;
import com.somnus.model.base.Syrole;
import com.somnus.model.base.Syuser;
import com.somnus.service.base.SyroleService;
import com.somnus.service.impl.BaseServiceImpl;
import com.somnus.support.pagination.Pageable;
import com.somnus.util.base.HqlFilter;

/**
 * 角色业务逻辑
 * 
 * @author Somnus
 * 
 */
@Service
@Transactional
public class SyroleServiceImpl extends BaseServiceImpl<Syrole> implements SyroleService {

	@Resource(name="syroleDaoImpl")
	private BaseDao<Syrole> baseDao;
	
	@Autowired
	private SyuserDao userDao;
	@Autowired
	private SyresourceDao resourceDao;

	@Transactional(readOnly = false)
	public Pageable findRoleByFilter(HqlFilter hqlFilter, Pageable pageable) {
		String hql = "select distinct t from Syrole t join t.syusers user";
		return find(hql + hqlFilter.getWhereAndOrderHql(), hqlFilter.getParams(), pageable);
	}

	@Transactional(readOnly = false)
	public List<Syrole> findRoleByFilter(HqlFilter hqlFilter) {
		String hql = "select distinct t from Syrole t join t.syusers user";
		return find(hql + hqlFilter.getWhereAndOrderHql(), hqlFilter.getParams());
	}

	public void saveRole(Syrole syrole, String userId) {
		save(syrole);

		Syuser user = userDao.getById(userId);
		user.getSyroles().add(syrole);// 把新添加的角色与当前用户关联
	}

	public void grant(String id, String resourceIds) {
		Syrole role = getById(id);
		if (role != null) {
			role.setSyresources(new HashSet<Syresource>());
			for (String resourceId : resourceIds.split(",")) {
				if (!StringUtils.isBlank(resourceId)) {
					Syresource resource = resourceDao.getById(resourceId);
					if (resource != null) {
						role.getSyresources().add(resource);
					}
				}
			}
		}
	}

}
