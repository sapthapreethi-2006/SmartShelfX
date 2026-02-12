package com.infosys.inventoryApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.infosys.inventoryApplication.bean.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query("SELECT MAX(p.productCode) FROM Product p")
	String getMaxProductCode();
	
	Product findByProductCode(String productCode);
	
	void deleteByProductCode(String productCode);
}
