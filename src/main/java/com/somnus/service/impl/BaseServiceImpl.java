package com.somnus.service.impl;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.somnus.dao.base.BaseDaoI;
import com.somnus.service.BaseServiceI;
import com.somnus.util.base.HqlFilter;

/**
 * 基础业务逻辑
 * 
 * @author 孙宇
 * 
 * @param <T>
 */
@Service
public class BaseServiceImpl<T> implements BaseServiceI<T> {

	@Autowired
	private BaseDaoI<T> baseDao;

	public Serializable save(T o) {
		return baseDao.save(o);
	}

	public void delete(T o) {
		baseDao.delete(o);
	}

	public void update(T o) {
		baseDao.update(o);
	}

	
	public void saveOrUpdate(T o) {
		baseDao.saveOrUpdate(o);
	}

	
	public T getById(Serializable id) {
		Class<T> c = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
		return baseDao.getById(c, id);
	}

	public T getByHql(String hql) {
		return baseDao.getByHql(hql);
	}

	
	public T getByHql(String hql, Map<String, Object> params) {
		return baseDao.getByHql(hql, params);
	}

	
	public T getByFilter(HqlFilter hqlFilter) {
		String className = ((Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0]).getName();
		String hql = "select distinct t from " + className + " t";
		return getByHql(hql + hqlFilter.getWhereAndOrderHql(), hqlFilter.getParams());
	}

	
	public List<T> find() {
		return findByFilter(new HqlFilter());
	}

	
	public List<T> find(String hql) {
		return baseDao.find(hql);
	}

	
	public List<T> find(String hql, Map<String, Object> params) {
		return baseDao.find(hql, params);
	}

	
	public List<T> findByFilter(HqlFilter hqlFilter) {
		String className = ((Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0]).getName();
		String hql = "select distinct t from " + className + " t";
		return find(hql + hqlFilter.getWhereAndOrderHql(), hqlFilter.getParams());
	}

	
	public List<T> find(String hql, int page, int limit) {
		return baseDao.find(hql, page, limit);
	}

	
	public List<T> find(String hql, Map<String, Object> params, int page, int limit) {
		return baseDao.find(hql, params, page, limit);
	}

	
	public List<T> find(int page, int limit) {
		return findByFilter(new HqlFilter(), page, limit);
	}

	
	public List<T> findByFilter(HqlFilter hqlFilter, int page, int limit) {
		String className = ((Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0]).getName();
		String hql = "select distinct t from " + className + " t";
		return find(hql + hqlFilter.getWhereAndOrderHql(), hqlFilter.getParams(), page, limit);
	}

	
	public Long count(String hql) {
		return baseDao.count(hql);
	}

	
	public Long count(String hql, Map<String, Object> params) {
		return baseDao.count(hql, params);
	}

	
	public Long countByFilter(HqlFilter hqlFilter) {
		String className = ((Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0]).getName();
		String hql = "select count(distinct t) from " + className + " t";
		return count(hql + hqlFilter.getWhereHql(), hqlFilter.getParams());
	}

	
	public Long count() {
		return countByFilter(new HqlFilter());
	}

	
	public int executeHql(String hql) {
		return baseDao.executeHql(hql);
	}

	
	public int executeHql(String hql, Map<String, Object> params) {
		return baseDao.executeHql(hql, params);
	}

	
	public List findBySql(String sql) {
		return baseDao.findBySql(sql);
	}

	
	public List findBySql(String sql, int page, int limit) {
		return baseDao.findBySql(sql, page, limit);
	}

	
	public List findBySql(String sql, Map<String, Object> params) {
		return baseDao.findBySql(sql, params);
	}

	
	public List findBySql(String sql, Map<String, Object> params, int page, int limit) {
		return baseDao.findBySql(sql, params, page, limit);
	}

	
	public int executeSql(String sql) {
		return baseDao.executeSql(sql);
	}

	
	public int executeSql(String sql, Map<String, Object> params) {
		return baseDao.executeSql(sql, params);
	}

	
	public BigInteger countBySql(String sql) {
		return baseDao.countBySql(sql);
	}

	
	public BigInteger countBySql(String sql, Map<String, Object> params) {
		return baseDao.countBySql(sql, params);
	}

}
