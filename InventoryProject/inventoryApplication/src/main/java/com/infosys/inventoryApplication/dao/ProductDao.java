package com.infosys.inventoryApplication.dao;

import java.util.List;

import com.infosys.inventoryApplication.bean.Product;

public interface ProductDao {
	public void saveProduct(Product product);
	public List<Product> getAllProducts();
	public Product getProductById(Long id);
	public void deleteProductById(Long id);
}
