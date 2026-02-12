package com.infosys.inventoryApplication.dao;

import java.util.List;

import com.infosys.inventoryApplication.bean.SKU;

public interface SKUDao {
	
	public void saveSKU(SKU sku);
	public List<SKU> getAllSKUs();
	public SKU getSKUById(String id);
	public void deleteSKUById(String id);
	

}
