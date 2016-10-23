package com.somnus.model.messege;

/**
 * @Description: 下拉模型
 * @author Somnus
 * @date 2015年11月14日 下午11:06:23 
 * @version 1.0
 */
public class CommboBox  implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	private String label;
	private String value;
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}

}
