package com.somnus.service.base.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.somnus.dao.base.BaseDao;
import com.somnus.model.base.Syonline;
import com.somnus.service.base.SyonlineService;
import com.somnus.service.impl.BaseServiceImpl;

/**
 * 
 * @author Somnus
 * 
 */
@Service(value="onlineService")
@Transactional
public class SyonlineServiceImpl extends BaseServiceImpl<Syonline> implements SyonlineService {

	@Resource(name="syonlineDaoImpl")
	private BaseDao<Syonline> baseDao;
}
