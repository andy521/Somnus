package com.somnus.support.pagination.impl;

import com.somnus.support.pagination.Pageable;

/**
 * @Description 分页实现-请求
 * @author Somnus
 * @date 2015年11月5日 下午10:10:58 
 * @version 1.0
 */
public class PageRequest implements Pageable {
	
	public PageRequest(Integer start, Integer limit){
		this.start = start;
		this.limit = limit;
	}

	@Override
	public Integer getPageStart() {
		return start;
	}

	@Override
	public Integer getPageLimit() {
		return limit;
	}

	@Override
	public Integer getCount() {		
		throw new UnsupportedOperationException();
	}
	
	@Override
	public <RESULTTYPE> RESULTTYPE getResult(Class<RESULTTYPE> resultType) {
		throw new UnsupportedOperationException();
	}

	//起始页
	private Integer start;
	//单页总量
	private Integer limit;
	
}
