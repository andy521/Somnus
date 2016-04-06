package com.somnus.service.base.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

}
