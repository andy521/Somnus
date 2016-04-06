package com.somnus.dao.base.impl;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.math.BigInteger;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.somnus.dao.base.BaseDao;
import com.somnus.model.messege.PageResponse;

@Repository
public class BaseDaoImpl<T> extends HibernateTemplate implements BaseDao<T> {

	@Autowired
    public void setSessionFactory(SessionFactory sessionFactory) {
        super.setSessionFactory(sessionFactory);
    }

	@Override
    public Session getSession() {
        return super.getSession();
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
	
	@SuppressWarnings("unchecked")
	public T getById(Serializable id) {
		if (id == null)
            return null;
        return (T) get(getEntityClass(), id);
	}

	@SuppressWarnings("unchecked")
	public T getByHql(String hql) {
		List<T> l = (List<T>) super.find(hql);
		if (l != null && l.size() > 0) {
			return l.get(0);
		}
		return null;
	}

	public T getByHql(String hql, Map<String, Object> params) {
		List<T> l = this.find(hql, params);
		if (l != null && l.size() > 0) {
			return l.get(0);
		}
		return null;
	}

	public List<T> find(final String hql, final Map<String, Object> params) {
		return this.execute(new HibernateCallback<List<T>>() {
            @SuppressWarnings("unchecked")
			public List<T> doInHibernate(Session session) throws HibernateException, SQLException {
                Query query = session.createQuery(hql);
                if (params != null && !params.isEmpty()) {
        			for (String key : params.keySet()) {
        				query.setParameter(key, params.get(key));
        			}
        		}
                return query.list();
            }
        });
	}

	public PageResponse<T> find(final String hql, final Map<String, Object> params, final int pageNo, final int pageSize) {
		return this.execute(new HibernateCallback<PageResponse<T>>() {
            public PageResponse<T> doInHibernate(Session session) throws HibernateException, SQLException {
                Query query = session.createQuery(hql).setFirstResult((pageNo - 1) * pageSize)
                    .setMaxResults(pageSize);
                if (params != null && !params.isEmpty()) {
        			for (String key : params.keySet()) {
        				query.setParameter(key, params.get(key));
        			}
        		}
                return new PageResponse(query.list(),count(hql,params));
            }
        });
	}

	public PageResponse<T> find(final String hql, final int pageNo, final int pageSize) {
		return this.execute(new HibernateCallback<PageResponse<T>>() {
            public PageResponse<T> doInHibernate(Session session) throws HibernateException, SQLException {
                Query query = session.createQuery(hql).setFirstResult((pageNo - 1) * pageSize)
                    .setMaxResults(pageSize);
                return new PageResponse(query.list(),count(hql));
            }
        });
	}

	public Long count(String hql) {
		hql = "select count(*) as nums " + hql.substring(hql.toLowerCase().indexOf("from"));
		Query q = getSession().createQuery(hql);
		return (Long) q.uniqueResult();
	}

	public Long count(String hql, Map<String, Object> params) {
		hql = "select count(*) as nums " + hql.substring(hql.toLowerCase().indexOf("from"));
		Query q = getSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return (Long) q.uniqueResult();
	}

	public int executeHql(String hql) {
		Query q = getSession().createQuery(hql);
		return q.executeUpdate();
	}

	public int executeHql(String hql, Map<String, Object> params) {
		Query q = getSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.executeUpdate();
	}

	@SuppressWarnings("unchecked")
	public List<Map<String,Object>> findBySql(String sql) {
		Query query = getSession().createSQLQuery(sql);
        return query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
	}

	@SuppressWarnings("unchecked")
	public List<Map<String,Object>> findBySql(String sql, int pageNo, int pageSize) {
		Query query = getSession().createSQLQuery(sql).setFirstResult((pageNo - 1) * pageSize)
                .setMaxResults(pageSize);
            return query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
		
	}

	@SuppressWarnings("unchecked")
	public List<Map<String,Object>> findBySql(String sql, Map<String, Object> params) {
		Query query = getSession().createSQLQuery(sql);
        if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				query.setParameter(key, params.get(key));
			}
		}
        return query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
	}

	@SuppressWarnings("unchecked")
	public List<Map<String,Object>> findBySql(String sql,Map<String,Object> params,int pageNo,int pageSize) {
		Query query = getSession().createSQLQuery(sql).setFirstResult((pageNo - 1) * pageSize)
                .setMaxResults(pageSize);
        if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				query.setParameter(key, params.get(key));
			}
		}
        return query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
	}

	public int executeSql(String sql) {
		SQLQuery q = getSession().createSQLQuery(sql);
		return q.executeUpdate();
	}

	public int executeSql(String sql, Map<String, Object> params) {
		SQLQuery q = getSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.executeUpdate();
	}

	public BigInteger countBySql(String sql) {
		SQLQuery q = getSession().createSQLQuery(sql);
		return (BigInteger) q.uniqueResult();
	}

	public BigInteger countBySql(String sql, Map<String, Object> params) {
		SQLQuery q = getSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return (BigInteger) q.uniqueResult();
	}

}
