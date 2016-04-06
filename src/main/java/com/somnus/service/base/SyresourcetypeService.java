package com.somnus.service.base;

import java.util.List;
import com.somnus.model.base.Syresourcetype;
import com.somnus.service.BaseService;

/**
 * 资源类型业务
 * 
 * @author Somnus
 * 
 */
public interface SyresourcetypeService extends BaseService<Syresourcetype> {

	/**
	 * 获取所有资源类型
	 */
	public List<Syresourcetype> findResourcetype();

}
