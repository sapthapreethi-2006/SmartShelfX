package com.infosys.inventoryApplication.dao;

import java.util.List;

import com.infosys.inventoryApplication.bean.ProductSale;
import com.infosys.inventoryApplication.bean.Transaction;
import com.infosys.inventoryApplication.bean.TransactionDetail;

public interface TransactionDao {

    public void saveTransaction(Transaction transaction);

    public Transaction findStockTransactionById(Long id);

    public Long findMaxTransactionId();

    public List<Transaction> showAllTransactions();

    public List<Transaction> findTransactionsByType(String type);

    public void removeTransactionById(Long id);

    public List<Double> getDemandByProduct(String id);

	public Transaction findTransactionById(Long id);
	
	public List<ProductSale> getProductWiseTotalSale();
	
	public List<TransactionDetail> findTransactionDetailsByType(String type);


}