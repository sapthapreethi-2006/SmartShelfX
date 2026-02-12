package com.infosys.inventoryApplication.bean;

public class ProductSale {
	private String productName;
	private Double totalSalesValue;
	public ProductSale() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ProductSale(String productName, Double totalSalesValue) {
		super();
		this.productName = productName;
		this.totalSalesValue = totalSalesValue;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Double getTotalSalesValue() {
		return totalSalesValue;
	}
	public void setTotalSalesValue(Double totalSalesValue) {
		this.totalSalesValue = totalSalesValue;
	}
	

}
