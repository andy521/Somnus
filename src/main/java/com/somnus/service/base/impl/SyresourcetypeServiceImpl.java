package com.somnus.service.base.impl;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.somnus.model.base.Syresourcetype;
import com.somnus.service.base.SyresourcetypeService;
import com.somnus.service.impl.BaseServiceImpl;

/**
 * 资源类型业务逻辑
 * 
 * @author Somnus
 * 
 */
@Service
@Transactional
public class SyresourcetypeServiceImpl extends BaseServiceImpl<Syresourcetype> implements SyresourcetypeService {

	/**
	 * 为列表添加了缓存，查询一次过后，只要不重启服务，缓存一直存在，不需要再查询数据库了，节省了一些资源
	 * 
	 * 在ehcache.xml里面需要有对应的value
	 * 
	 * <cache name="SyresourcetypeServiceCache"
	 * 
	 * key是自己设定的一个ID，用来标识缓存
	 */
	@Cacheable(value = "SyresourcetypeServiceCache", key = "'SyresourcetypeList'")
	@Transactional(readOnly = false)
	public List<Syresourcetype> findResourcetype() {
		return find();
	}

}
