package com.infosys.inventoryApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.inventoryApplication.bean.Product;
import com.infosys.inventoryApplication.dao.ProductRepository;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public String generateNextProductCode() {
        String maxCode = productRepository.getMaxProductCode();
        if (maxCode == null) {
            return "P1000";
        }
        int number = Integer.parseInt(maxCode.substring(1));
        number++;
        return "P" + number;
    }

    public Product saveProduct(Product product) {
        String code = generateNextProductCode();
        product.setProductCode(code);
        return productRepository.save(product);
    }

    public String getStockStatus(Product product) {
        if (product.getStock() <= product.getReorderLevel()) {
            return "Reorder Level Reached";
        }
        return "Permitted to Issue";
    }

    public double calculateSalesPrice(double purchasePrice) {
        return purchasePrice + (purchasePrice * 0.20);
    }

    public List<Product> getAllProductsForAnalysis() {
        List<Product> products = productRepository.findAll();
        for (Product product : products) {
            product.setStockStatus(getStockStatus(product));
            product.setSalesPrice(calculateSalesPrice(product.getPurchasePrice()));
        }
        return products;
    }

    public void deleteProductByCode(String productCode) {
        productRepository.deleteByProductCode(productCode);
    }

    public Product getProductByCode(String productCode) {
        Product product = productRepository.findByProductCode(productCode);
        if (product != null) {
            product.setStockStatus(getStockStatus(product));
            product.setSalesPrice(calculateSalesPrice(product.getPurchasePrice()));
        }
        return product;
    }

    public Product updatePurchasePrice(String productCode, double newPrice) {
        Product product = productRepository.findByProductCode(productCode);
        if (product != null) {
            product.setPurchasePrice(newPrice);
            Product updated = productRepository.save(product);
            updated.setStockStatus(getStockStatus(updated));
            updated.setSalesPrice(calculateSalesPrice(updated.getPurchasePrice()));
            return updated;
        }
        return null;
    }
}
