package com.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.infosys.inventoryApplication.bean.Transaction;
import com.infosys.inventoryApplication.bean.Product;
import com.infosys.inventoryApplication.bean.ProductSale;
import com.infosys.inventoryApplication.bean.TransactionDetail;

@Service
@Repository
public class TransactionDaoImpl implements TransactionDao {

    @Autowired
    private TransactionRepository repository;
    
    @Autowired
    private ProductDao productDao;

    @Override
    public void saveTransaction(Transaction transaction) {
        // Save the transaction
        repository.save(transaction);
        
        // Update product stock based on transaction type
        Product product = productDao.getProductById(transaction.getProductId());
        if (product != null) {
            if ("IN".equals(transaction.getTransactionType())) {
                // Purchase - increase stock
                product.setStock(product.getStock() + transaction.getQuantity().intValue());
            } else if ("OUT".equals(transaction.getTransactionType())) {
                // Issue - decrease stock
                product.setStock(product.getStock() - transaction.getQuantity().intValue());
            }
            productDao.saveProduct(product);
        }
    }

    @Override
    public Transaction findStockTransactionById(Long id) {
        return repository.findById(id).get();
    }

    @Override
    public Long findMaxTransactionId() {
        return repository.findMaxTransactionId();
    }

    @Override
    public List<Transaction> showAllTransactions() {
        return repository.findAll();
    }

    @Override
    public List<Transaction> findTransactionsByType(String type) {
        return repository.findTransactionsByType(type);
    }

    @Override
    public void removeTransactionById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Double> getDemandByProduct(String productId) {
        return repository.getDemandByProduct(productId);
    }

	@Override
	public Transaction findTransactionById(Long id) {
		return repository.findById(id).orElse(null);
	}
	
	@Override
	public List<ProductSale> getProductWiseTotalSale(){
		return repository.getProductWiseTotalSale();
	}
	
	@Override
	public List<TransactionDetail> findTransactionDetailsByType(String type) {
		return repository.findTransactionDetailsByType(type);
	}


}