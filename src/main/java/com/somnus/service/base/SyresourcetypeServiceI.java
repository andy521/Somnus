package com.somnus.service.base;

import java.util.List;
import com.somnus.model.base.Syresourcetype;
import com.somnus.service.BaseServiceI;

/**
 * 资源类型业务
 * 
 * @author Somnus
 * 
 */
public interface SyresourcetypeServiceI extends BaseServiceI<Syresourcetype> {

	/**
	 * 获取所有资源类型
	 */
	public List<Syresourcetype> findResourcetype();

}
