package com.somnus.service.impl;

import java.util.HashSet;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.somnus.model.base.Syorganization;
import com.somnus.model.base.Syresource;
import com.somnus.model.base.Syresourcetype;
import com.somnus.model.base.Syrole;
import com.somnus.model.base.Syuser;
import com.somnus.service.InitService;
import com.alibaba.fastjson.JSON;

/**
 * 初始化数据库
 * 
 * @author Somnus
 * 
 */
@Service
@Transactional
public class InitServiceImpl implements InitService ,InitializingBean,ApplicationContextAware{

	private static final Logger logger = LoggerFactory.getLogger(InitServiceImpl.class);

	private static final String FILEPATH = "init/initDataBase.xml";

	private Session session;
	
	@Resource
	private JdbcTemplate jdbcTemplate;
	
	@Override
	public void afterPropertiesSet() throws Exception {
		Transaction tx = this.session.beginTransaction();
		initDb();
		tx.commit();
		this.session.close();
	}
	
	@Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		SessionFactory sessionFactory = (SessionFactory)applicationContext.getBean("sessionFactory");
        this.session = sessionFactory.openSession();
    }

	@Override
	@Transactional
	synchronized public void initDb() {
		
		try {
			Document document = new SAXReader().read(Thread.currentThread().getContextClassLoader().getResourceAsStream(FILEPATH));

			initResourcetype(document);// 初始化资源类型

			initResource(document);// 初始化资源

			initRole(document);// 初始化角色

			initRoleResource(document);// 初始化角色和资源的关系

			initOrganization(document);// 初始化机构

			initOrganizationResource(document);// 初始化机构和资源的关系

			initUser(document);// 初始化用户

			initUserRole(document);// 初始化用户和角色的关系

			initUserOrganization(document);// 初始化用户和机构的关系

		} catch (DocumentException e) {
			e.printStackTrace();
		}
	}

	private void initResourcetype(Document document) {
		List childNodes = document.selectNodes("//resourcetypes/resourcetype");
		for (Object obj : childNodes) {
			Node node = (Node) obj;
			Syresourcetype type = (Syresourcetype) getSession().get(Syresourcetype.class, node.valueOf("@id"));
			if (type == null) {
				type = new Syresourcetype();
			}
			type.setId(node.valueOf("@id"));
			type.setName(node.valueOf("@name"));
			type.setDescription(node.valueOf("@description"));
			logger.info(JSON.toJSONStringWithDateFormat(type, "yyyy-MM-dd HH:mm:ss"));
			getSession().saveOrUpdate(type);
		}
	}

	private void initResource(Document document) {
		List childNodes = document.selectNodes("//resources/resource");
		for (Object obj : childNodes) {
			Node node = (Node) obj;
			Syresource resource = (Syresource) getSession().get(Syresource.class, node.valueOf("@id"));
			if (resource == null) {
				resource = new Syresource();
			}
			resource.setId(node.valueOf("@id"));
			resource.setName(node.valueOf("@name"));
			resource.setUrl(node.valueOf("@url"));
			resource.setDescription(node.valueOf("@description"));
			resource.setIconCls(node.valueOf("@iconCls"));
			resource.setSeq(Integer.parseInt(node.valueOf("@seq")));

			if (!StringUtils.isBlank(node.valueOf("@target"))) {
				resource.setTarget(node.valueOf("@target"));
			} else {
				resource.setTarget("");
			}

			if (!StringUtils.isBlank(node.valueOf("@pid"))) {
				resource.setSyresource((Syresource) getSession().get(Syresource.class, node.valueOf("@pid")));
			} else {
				resource.setSyresource(null);
			}

			Node n = node.selectSingleNode("resourcetype");
			Syresourcetype type = (Syresourcetype) getSession().get(Syresourcetype.class, n.valueOf("@id"));
			if (type != null) {
				resource.setSyresourcetype(type);
			}

			logger.info(JSON.toJSONStringWithDateFormat(resource, "yyyy-MM-dd HH:mm:ss"));
			getSession().saveOrUpdate(resource);
		}
	}

	private void initRole(Document document) {
		List childNodes = document.selectNodes("//roles/role");
		for (Object obj : childNodes) {
			Node node = (Node) obj;
			Syrole role = (Syrole) getSession().get(Syrole.class, node.valueOf("@id"));
			if (role == null) {
				role = new Syrole();
			}
			role.setId(node.valueOf("@id"));
			role.setName(node.valueOf("@name"));
			role.setDescription(node.valueOf("@description"));
			role.setSeq(Integer.parseInt(node.valueOf("@seq")));
			logger.info(JSON.toJSONStringWithDateFormat(role, "yyyy-MM-dd HH:mm:ss"));
			getSession().saveOrUpdate(role);
		}
	}

	private void initRoleResource(Document document) {
		List<Node> childNodes = document.selectNodes("//roles_resources/role");
		for (Node node : childNodes) {
			Syrole role = (Syrole) getSession().get(Syrole.class, node.valueOf("@id"));
			if (role != null) {
				role.setSyresources(new HashSet());
				List<Node> cNodes = node.selectNodes("resource");
				for (Node n : cNodes) {
					Syresource resource = (Syresource) getSession().get(Syresource.class, n.valueOf("@id"));
					if (resource != null) {
						role.getSyresources().add(resource);
					}
				}
				logger.info(JSON.toJSONStringWithDateFormat(role, "yyyy-MM-dd HH:mm:ss"));
				getSession().saveOrUpdate(role);
			}
		}

		Syrole role = (Syrole) getSession().get(Syrole.class, "0");// 将角色为0的超级管理员角色，赋予所有权限
		if (role != null) {
			role.getSyresources().addAll(getSession().createQuery("from Syresource t").list());
			logger.info(JSON.toJSONStringWithDateFormat(role, "yyyy-MM-dd HH:mm:ss"));
			getSession().saveOrUpdate(role);
		}
	}

	private void initOrganization(Document document) {
		List childNodes = document.selectNodes("//organizations/organization");
		for (Object obj : childNodes) {
			Node node = (Node) obj;
			Syorganization organization = (Syorganization) getSession().get(Syorganization.class, node.valueOf("@id"));
			if (organization == null) {
				organization = new Syorganization();
			}
			organization.setId(node.valueOf("@id"));
			organization.setName(node.valueOf("@name"));
			organization.setAddress(node.valueOf("@address"));
			organization.setSeq(Integer.parseInt(node.valueOf("@seq")));
			organization.setIconCls(node.valueOf("@iconCls"));

			if (!StringUtils.isBlank(node.valueOf("@pid"))) {
				organization.setSyorganization((Syorganization) getSession().get(Syorganization.class, node.valueOf("@pid")));
			} else {
				organization.setSyorganization(null);
			}

			logger.info(JSON.toJSONStringWithDateFormat(organization, "yyyy-MM-dd HH:mm:ss"));
			getSession().saveOrUpdate(organization);
		}
	}

	private void initOrganizationResource(Document document) {
		List<Node> childNodes = document.selectNodes("//organizations_resources/organization");
		for (Node node : childNodes) {
			Syorganization organization = (Syorganization) getSession().get(Syorganization.class, node.valueOf("@id"));
			if (organization != null) {
				organization.setSyresources(new HashSet());
				List<Node> cNodes = node.selectNodes("resource");
				for (Node n : cNodes) {
					Syresource resource = (Syresource) getSession().get(Syresource.class, n.valueOf("@id"));
					if (resource != null) {
						organization.getSyresources().add(resource);
					}
				}
				logger.info(JSON.toJSONStringWithDateFormat(organization, "yyyy-MM-dd HH:mm:ss"));
				getSession().saveOrUpdate(organization);
			}
		}
	}

	private void initUser(Document document) {
		List<Node> childNodes = document.selectNodes("//users/user");
		for (Node node : childNodes) {
			Syuser user = (Syuser) getSession().get(Syuser.class, node.valueOf("@id"));
			if (user == null) {
				user = new Syuser();
			}
			user.setId(node.valueOf("@id"));
			user.setName(node.valueOf("@name"));
			user.setLoginname(node.valueOf("@loginname"));
			user.setPwd(DigestUtils.md5Hex(node.valueOf("@pwd")));
			user.setSex(node.valueOf("@sex"));
			user.setAge(Integer.valueOf(node.valueOf("@age")));
			user.setPhoto(node.valueOf("@photo"));
			user.setStatus(node.valueOf("@status"));
			logger.info(JSON.toJSONStringWithDateFormat(user, "yyyy-MM-dd HH:mm:ss"));
			List<Syuser> ul = getSession().createQuery("from Syuser u where u.loginname = '" 
			+ user.getLoginname() + "' and u.id != '" + user.getId() + "'").list();
			for (Syuser u : ul) {
				getSession().delete(u);
			}
			getSession().saveOrUpdate(user);
		}
	}

	private void initUserRole(Document document) {
		List<Node> childNodes = document.selectNodes("//users_roles/user");
		for (Node node : childNodes) {
			Syuser user = (Syuser) getSession().get(Syuser.class, node.valueOf("@id"));
			if (user != null) {
				user.setSyroles(new HashSet());
				List<Node> cNodes = node.selectNodes("role");
				for (Node n : cNodes) {
					Syrole role = (Syrole) getSession().get(Syrole.class, n.valueOf("@id"));
					if (role != null) {
						user.getSyroles().add(role);
					}
				}
				logger.info(JSON.toJSONStringWithDateFormat(user, "yyyy-MM-dd HH:mm:ss"));
				getSession().saveOrUpdate(user);
			}
		}

		Syuser user = (Syuser) getSession().get(Syuser.class, "0");// 用户为0的超级管理员，赋予所有角色
		if (user != null) {
			user.getSyroles().addAll(getSession().createQuery("from Syrole").list());
			logger.info(JSON.toJSONStringWithDateFormat(user, "yyyy-MM-dd HH:mm:ss"));
			getSession().saveOrUpdate(user);
		}
	}

	private void initUserOrganization(Document document) {
		List<Node> childNodes = document.selectNodes("//users_organizations/user");
		for (Node node : childNodes) {
			Syuser user = (Syuser) getSession().get(Syuser.class, node.valueOf("@id"));
			if (user != null) {
				user.setSyorganizations(new HashSet());
				List<Node> cNodes = node.selectNodes("organization");
				for (Node n : cNodes) {
					Syorganization organization = (Syorganization) getSession().get(Syorganization.class, n.valueOf("@id"));
					if (organization != null) {
						user.getSyorganizations().add(organization);
					}
				}
				logger.info(JSON.toJSONStringWithDateFormat(user, "yyyy-MM-dd HH:mm:ss"));
				getSession().saveOrUpdate(user);
			}
		}

		Syuser user = (Syuser) getSession().get(Syuser.class, "0");// 用户为0的超级管理员，赋予所有机构
		if (user != null) {
			user.getSyorganizations().addAll(getSession().createQuery("from Syorganization").list());
			logger.info(JSON.toJSONStringWithDateFormat(user, "yyyy-MM-dd HH:mm:ss"));
			getSession().saveOrUpdate(user);
		}
	}

	public Session getSession() {
		return session;
	}

	public void setSession(Session session) {
		this.session = session;
	}

}
