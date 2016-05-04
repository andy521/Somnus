package com.somnus.dao.base.impl;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.somnus.dao.base.BaseDao;
import com.somnus.support.pagination.impl.PageResponse;

@Repository
public class BaseDaoImpl<T> implements BaseDao<T> {

	@Autowired
	private SessionFactory sessionFactory;

	/**
	 * 获得当前事物的session
	 * 
	 * @return org.hibernate.Session
	 */
	public Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}
	
	protected Class<?> getEntityClass() {
        return this.getGenericClass(this.getClass(), 0);
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
	public Serializable save(T o) {
		if (o != null) {
			return getCurrentSession().save(o);
		}
		return null;
	}

	@Override
	public T getById(Serializable id) {
		return (T) getCurrentSession().get(getEntityClass(), id);
	}

	@Override
	public T getByHql(String hql) {
		return getByHql(hql,null);
	}

	@Override
	public T getByHql(String hql, Map<String, Object> params) {
		Query q = getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		List<T> l = q.list();
		if (l != null && l.size() > 0) {
			return l.get(0);
		}
		return null;
	}

	@Override
	public void delete(T o) {
		if (o != null) {
			getCurrentSession().delete(o);
		}
	}

	@Override
	public void update(T o) {
		if (o != null) {
			getCurrentSession().update(o);
		}
	}

	@Override
	public void saveOrUpdate(T o) {
		if (o != null) {
			getCurrentSession().saveOrUpdate(o);
		}
	}

	@Override
	public List<T> find(String hql) {
		return find(hql,null);
	}

	@Override
	public List<T> find(String hql, Map<String, Object> params) {
		Query q = getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.list();
	}
	
	@Override
	public PageResponse find(String hql, int pageNo, int pageSize) {
		return find(hql,null,pageNo,pageSize);
	}
	
	@Override
	public PageResponse find(String hql, Map<String, Object> params, int pageNo, int pageSize) {
		Query query = getCurrentSession().createQuery(hql).setFirstResult((pageNo - 1) * pageSize).setMaxResults(pageSize);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				query.setParameter(key, params.get(key));
			}
		}
		return new PageResponse(query.list(),count(hql,params));
	}

	@Override
	public Integer count(String hql) {
		return count(hql,null);
	}

	@Override
	public Integer count(String hql, Map<String, Object> params) {
		hql = "select count(*) as nums " + hql.substring(hql.toLowerCase().indexOf("from"));
		Query q = getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return Integer.valueOf(q.uniqueResult().toString());
	}

	@Override
	public int executeHql(String hql) {
		return executeHql(hql,null);
	}

	@Override
	public int executeHql(String hql, Map<String, Object> params) {
		Query q = getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.executeUpdate();
	}

	@Override
	public List<Map<String,Object>> findBySql(String sql, int pageNo, int pageSize) {
		return findBySql(sql, null, pageNo, pageSize);
	}
	
	@Override
	public List<Map<String,Object>> findBySql(String sql, Map<String, Object> params, int pageNo, int pageSize) {
		Query q = getCurrentSession().createSQLQuery(sql).setFirstResult((pageNo - 1) * pageSize).setMaxResults(pageSize);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
	}

	@Override
	public List<Map<String,Object>> findBySql(String sql) {
		return findBySql(sql,null);
	}
	
	@Override
	public List<Map<String,Object>> findBySql(String sql, Map<String, Object> params) {
		Query q = getCurrentSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
	}

	@Override
	public int executeSql(String sql) {
		return executeSql(sql,null);
	}

	@Override
	public int executeSql(String sql, Map<String, Object> params) {
		Query q = getCurrentSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.executeUpdate();
	}

	@Override
	public BigInteger countBySql(String sql) {
		return countBySql(sql,null);
	}

	@Override
	public BigInteger countBySql(String sql, Map<String, Object> params) {
		SQLQuery q = getCurrentSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return (BigInteger) q.uniqueResult();
	}

}
