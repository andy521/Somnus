package com.somnus.model.messege;

import java.util.ArrayList;
import java.util.List;

/**
 * extjs4 DataGrid模型
 * 
 * @author Somnus
 * 
 */
public class Grid implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	private Integer total = 0;
	private List rows = new ArrayList();

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public List getRows() {
		return rows;
	}

	public void setRows(List rows) {
		this.rows = rows;
	}

}
