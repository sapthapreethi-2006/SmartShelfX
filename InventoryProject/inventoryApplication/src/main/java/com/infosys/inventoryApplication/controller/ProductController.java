package com.infosys.inventoryApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.inventoryApplication.bean.Product;
import com.infosys.inventoryApplication.bean.InventoryUser;
import com.infosys.inventoryApplication.dao.ProductDao;
import com.infosys.inventoryApplication.dao.InventoryUserRepository;
import com.infosys.inventoryApplication.service.ProductService;

@RestController
@RequestMapping("/invent/")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3131"}, allowedHeaders = "*")
public class ProductController {
	@Autowired
	private ProductDao productDao;
    
	@Autowired
	private ProductService productService;
	
	@Autowired
	private InventoryUserRepository userRepository;
	
	@PostMapping("/product")
	public void saveProduct(@RequestBody Product product) {
		productDao.saveProduct(product);
	}
	
	@PostMapping("/product/add")
	public Product addProduct(@RequestBody Product product) {
		return productService.saveProduct(product);
	}

	@GetMapping("/product")
	public List<Product> getAllProducts() {
		return productDao.getAllProducts();
	}

	@GetMapping("/product/{id}")
	public Product getProductById(@PathVariable Long id) {
		return productDao.getProductById(id);
	}
    
	@GetMapping("/product/next-code")
	public String getNextProductCode() {
		return productService.generateNextProductCode();
	}
	
	@GetMapping("/product/code/{productCode}")
	public Product getProductByCode(@PathVariable String productCode) {
		return productService.getProductByCode(productCode);
	}
	
	@GetMapping("/product/analysis")
	public List<Product> getProductAnalysis() {
		return productService.getAllProductsForAnalysis();
	}
	
	@DeleteMapping("/product/delete/{productCode}")
	public void deleteProduct(@PathVariable String productCode) {
		productService.deleteProductByCode(productCode);
	}
	
	@PutMapping("/product/update-price/{productCode}")
	public Product updatePrice(
		@PathVariable String productCode,
		@RequestParam double price
	) {
		return productService.updatePurchasePrice(productCode, price);
	}
	
	@PutMapping("/product")
	public void updateProduct(@RequestBody Product product) {
		productDao.saveProduct(product);
	}

	@DeleteMapping("/product/{id}")
	public void deleteProductById(@PathVariable Long id) {
		productDao.deleteProductById(id);
	}
	
	@GetMapping("/vendors")
	public List<InventoryUser> getVendors() {
		return userRepository.findByRole("VENDOR");
	}

	@GetMapping("/vendors/dropdown")
	public List<InventoryUser> getVendorDropdown() {
		return userRepository.findByRole("VENDOR");
	}

}
