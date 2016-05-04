package com.somnus.support.pagination.impl;

import com.somnus.support.pagination.Pageable;

/**
 * @Description 分页实现-响应
 * @author Somnus
 * @date 2015年11月5日 下午10:10:58 
 * @version 1.0
 */
public class PageResponse implements Pageable {
	
	public PageResponse(Object result, Integer count){
		this.result = result;
		this.count = count;
	}

	@Override
	public Integer getPageStart() {
		throw new UnsupportedOperationException();
	}

	@Override
	public Integer getPageLimit() {
		throw new UnsupportedOperationException();
	}

	@Override
	public Integer getCount() {
		return count;
	}

	@Override
	public<RESULTTYPE> RESULTTYPE getResult(Class<RESULTTYPE> resultType) {
		return resultType.cast(result);
	}
	
	//结果集
	private Object result;
	//结果集总数
	private Integer count;
}
