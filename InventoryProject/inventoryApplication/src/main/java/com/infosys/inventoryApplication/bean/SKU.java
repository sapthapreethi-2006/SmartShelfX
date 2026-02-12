package com.infosys.inventoryApplication.bean;

import jakarta.persistence.*;

@Entity
@Table(name = "sku")
public class SKU {
	
	@Id
	@Column(name = "sku_id", length = 50)
	private String skuId;
	
	@Column(name = "sku_description", length = 500)
	private String skuDescription;
	public String getSkuId() {
		return skuId;
	}
	public void setSkuId(String skuId) {
		this.skuId = skuId;
	}
	public String getSkuDescription() {
		return skuDescription;
	}
	public void setSkuDescription(String skuDescription) {
		this.skuDescription = skuDescription;
	}
	
	
	

}
