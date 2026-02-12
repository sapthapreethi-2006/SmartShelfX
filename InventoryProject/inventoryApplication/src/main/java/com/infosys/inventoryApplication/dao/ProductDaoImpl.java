package com.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.infosys.inventoryApplication.bean.Product;

@Service
@Repository
public class ProductDaoImpl implements ProductDao {
	@Autowired
	private ProductRepository repository;
	
	@Override
	public void saveProduct(Product product) {
		repository.save(product);
	}

	@Override
	public List<Product> getAllProducts() {
		return repository.findAll();
	}

	@Override
	public Product getProductById(Long id) {
		return repository.findById(id).orElse(null);
	}

	@Override
	public void deleteProductById(Long id) {
		repository.deleteById(id);
	}

}
