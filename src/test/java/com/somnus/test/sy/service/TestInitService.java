package com.somnus.test.sy.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import com.somnus.service.InitServiceI;

/**
 * 测试初始化数据库
 * 
 * @author Somnus
 * 
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring.xml", "classpath:spring-hibernate.xml", "classpath:spring-druid.xml" })
public class TestInitService {

	@Autowired
	private InitServiceI initService;

	@Test
	public void initDb() {
		initService.initDb();
	}

}
