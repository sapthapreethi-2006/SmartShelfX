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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.inventoryApplication.bean.SKU;
import com.infosys.inventoryApplication.dao.SKUDao;
import com.infosys.inventoryApplication.dao.SKURepository;

@RestController
@RequestMapping("/invent/")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3131"}, allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class SKUController {
	@Autowired
	private SKUDao skuDao;
	
	@PostMapping("/sku")
	public void saveSKU(@RequestBody SKU sku) {
		skuDao.saveSKU(sku);

	}
	
	@PostMapping("/sku/add")
	public void addSKU(@RequestBody SKU sku) {
		skuDao.saveSKU(sku);
	}

	@GetMapping("/sku")
	public List<SKU> getAllSKUs() {
		return skuDao.getAllSKUs();
	}

	@GetMapping("/sku/dropdown")
	public List<String> getSkuDropdown() {
		return skuDao.getAllSKUs().stream().map(SKU::getSkuId).toList();
	}

	@GetMapping("/sku/{id}")
	public SKU getSKUById(@PathVariable String id) {
		return skuDao.getSKUById(id);
	}

	@PutMapping("/sku")
	public void updateSKU(@RequestBody SKU sku) {
		skuDao.saveSKU(sku);
	}

	@DeleteMapping("/sku/{id}")
	public void deleteSKUById(@PathVariable String id) {
		skuDao.deleteSKUById(id);
	}

}
