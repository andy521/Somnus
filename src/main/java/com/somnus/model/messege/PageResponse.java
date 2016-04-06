package com.somnus.model.messege;

import java.util.List;

/**
 * @Description 分页实现-响应
 * @author Somnus
 * @date 2015年11月5日 下午10:10:58 
 * @version 1.0
 */
public class PageResponse<T> {
	
	public PageResponse(List<T> result, Long count){
		this.result = result;
		this.count = count;
	}

	public Long getCount() {
		return count;
	}

	public List<T> getResult() {
		return result;
	}
	
	//结果集
	private List<T> result;
	//结果集总数
	private Long count;
}
