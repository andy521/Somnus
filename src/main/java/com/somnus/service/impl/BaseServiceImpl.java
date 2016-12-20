package com.somnus.service.impl;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.somnus.dao.base.BaseDao;
import com.somnus.service.BaseService;
import com.somnus.support.pagination.Pageable;
import com.somnus.util.base.HqlFilter;

/**
 * 基础业务逻辑
 * 
 * @author Somnus
 * 
 * @param <T>
 */
public abstract class BaseServiceImpl<T> implements BaseService<T> {

	protected  BaseDao<T> baseDao;
	
	protected String getEntityName() {
        return this.getGenericClass(this.getClass(), 0).getName();
    }
	
	private Class<?> getGenericClass(Class<?> clazz, int index) {
        Type genType = clazz.getGenericSuperclass();
        if (genType instanceof ParameterizedType) {
            Type[] params = ((ParameterizedType) genType).getActualTypeArguments();
            if ((params != null) && (params.length >= (index - 1))) {
                return (Class<?>) params[index];
            }
        }
        return null;
    }
	
	@Override
	@Transactional
	public Serializable save(T o) {
		return baseDao.save(o);
	}
	
	@Override
	@Transactional
	public void delete(T o) {
		baseDao.delete(o);
	}
	
	@Override
	@Transactional
	public void update(T o) {
		baseDao.update(o);
	}

	@Override
	@Transactional
	public void saveOrUpdate(T o) {
		baseDao.saveOrUpdate(o);
	}

	@Override
	public T getById(Serializable id) {
		return baseDao.getById(id);
	}
	
	@Override
	public T getByHql(String hql) {
		return baseDao.getByHql(hql);
	}

	@Override
	public T getByHql(String hql, Map<String, Object> params) {
		return baseDao.getByHql(hql, params);
	}

	@Override
	public T getByFilter(HqlFilter hqlFilter) {
		String hql = "select distinct t from " + getEntityName() + " t";
		return getByHql(hql + hqlFilter.getWhereAndOrderHql(), hqlFilter.getParams());
	}

	@Override
	public List<T> find() {
		return findByFilter(new HqlFilter());
	}

	@Override
	public List<T> find(String hql) {
		return baseDao.find(hql);
	}

	@Override
	public List<T> find(String hql, Map<String, Object> params) {
		return baseDao.find(hql, params);
	}

	@Override
	public List<T> findByFilter(HqlFilter hqlFilter) {
		String hql = "select distinct t from " + getEntityName() + " t";
		return find(hql + hqlFilter.getWhereAndOrderHql(), hqlFilter.getParams());
	}

	@Override
	public Pageable find(String hql, Pageable pageable) {
		return baseDao.find(hql, pageable.getPageStart(), pageable.getPageLimit());
	}

	@Override
	public Pageable find(String hql, Map<String, Object> params, Pageable pageable) {
		return baseDao.find(hql, params, pageable.getPageStart(), pageable.getPageLimit());
	}

	@Override
	public Pageable find(Pageable pageable) {
		return findByFilter(new HqlFilter(), pageable);
	}

	@Override
	public Pageable findByFilter(HqlFilter hqlFilter,Pageable pageable) {
		String hql = "select distinct t from " + getEntityName() + " t";
		return find(hql + hqlFilter.getWhereAndOrderHql(), hqlFilter.getParams(),pageable);
	}

	@Override
	public Integer count(String hql) {
		return baseDao.count(hql);
	}

	@Override
	public Integer count(String hql, Map<String, Object> params) {
		return baseDao.count(hql, params);
	}

	@Override
	@Deprecated
	public Integer countByFilter(HqlFilter hqlFilter) {
		String hql = "select count(distinct t) from " + getEntityName() + " t";
		return count(hql + hqlFilter.getWhereHql(), hqlFilter.getParams());
	}

	@Override
	public Integer count() {
		return countByFilter(new HqlFilter());
	}

	@Override
	@Transactional
	public int executeHql(String hql) {
		return baseDao.executeHql(hql);
	}

	@Override
	@Transactional
	public int executeHql(String hql, Map<String, Object> params) {
		return baseDao.executeHql(hql, params);
	}

	
	public List<Map<String, Object>> findBySql(String sql) {
		return baseDao.findBySql(sql);
	}

	@Override
	public List<Map<String, Object>> findBySql(String sql, int pageNo, int pageSize) {
		return baseDao.findBySql(sql, pageNo, pageSize);
	}

	@Override
	public List<Map<String, Object>> findBySql(String sql, Map<String, Object> params) {
		return baseDao.findBySql(sql, params);
	}

	@Override
	public List<Map<String, Object>> findBySql(String sql, Map<String, Object> params, int pageNo, int pageSize) {
		return baseDao.findBySql(sql, params, pageNo, pageSize);
	}

	@Override
	@Transactional
	public int executeSql(String sql) {
		return baseDao.executeSql(sql);
	}

	@Override
	@Transactional
	public int executeSql(String sql, Map<String, Object> params) {
		return baseDao.executeSql(sql, params);
	}

	@Override
	public BigInteger countBySql(String sql) {
		return baseDao.countBySql(sql);
	}
	
	@Override
	public BigInteger countBySql(String sql, Map<String, Object> params) {
		return baseDao.countBySql(sql, params);
	}

	public void setBaseDao(BaseDao<T> baseDao) {
		this.baseDao = baseDao;
	}

}
