package com.somnus.service.base;

import java.util.List;

import com.somnus.model.base.Syrole;
import com.somnus.service.BaseService;
import com.somnus.support.pagination.Pageable;
import com.somnus.util.base.HqlFilter;

/**
 * 角色业务
 * 
 * @author Somnus
 * 
 */
public interface SyroleService extends BaseService<Syrole> {

	/**
	 * 查找角色
	 * 
	 * @param hqlFilter
	 * @param page
	 * @param rows
	 * @return
	 */
	public Pageable findRoleByFilter(HqlFilter hqlFilter, Pageable pageable);

	/**
	 * 查找角色
	 */
	public List<Syrole> findRoleByFilter(HqlFilter hqlFilter);

	/**
	 * 添加一个角色
	 * 
	 * @param data
	 * @param userId
	 */
	public void saveRole(Syrole syrole, String userId);

	/**
	 * 为角色授权
	 * 
	 * @param id
	 *            角色ID
	 * @param resourceIds
	 *            资源IDS
	 */
	public void grant(String id, String resourceIds);

}
