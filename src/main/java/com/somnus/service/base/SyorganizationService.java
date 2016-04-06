package com.somnus.service.base;

import java.util.List;
import com.somnus.model.base.Syorganization;
import com.somnus.service.BaseService;
import com.somnus.util.base.HqlFilter;

/**
 * 机构业务
 * 
 * @author Somnus
 * 
 */
public interface SyorganizationService extends BaseService<Syorganization> {

	/**
	 * 更新机构
	 */
	public void updateOrganization(Syorganization syorganization);

	/**
	 * 机构授权
	 * 
	 * @param id
	 *            机构ID
	 * @param resourceIds
	 *            资源IDS
	 */
	public void grant(String id, String resourceIds);

	/**
	 * 查找机构
	 */
	public List<Syorganization> findOrganizationByFilter(HqlFilter hqlFilter);

	/**
	 * 保存机构
	 * 
	 * @param data
	 *            机构信息
	 * @param id
	 *            用户ID
	 */
	public void saveOrganization(Syorganization syorganization, String userId);

}
