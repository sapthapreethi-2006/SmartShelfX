package com.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.infosys.inventoryApplication.bean.ProductSale;
import com.infosys.inventoryApplication.bean.Transaction;
import com.infosys.inventoryApplication.bean.TransactionDetail;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

@Query("select max (transactionId) from Transaction t")
public Long findMaxTransactionId();

@Query("select a from Transaction a where transactionType=?1")
public List< Transaction> findTransactionsByType (String type);

@Query("SELECT new com.infosys.inventoryApplication.bean.ProductSale(p.productName, SUM(s.transactionValue)) " +
        "FROM Product p JOIN Transaction s ON p.productId = s.productId " +
        "WHERE s.transactionType='OUT' GROUP BY p.productName")
public List<ProductSale> getProductWiseTotalSale();

@Query("SELECT s.transactionValue from Transaction s WHERE s.transactionType='OUT' and productId=?1")
public List<Double> getDemandByProduct(String productId);

@Query("SELECT new com.infosys.inventoryApplication.bean.TransactionDetail(t.transactionId, t.transactionType, t.productId, p.productName, t.rate, t.quantity, t.transactionValue, p.vendorId, t.transactionDate) " +
       "FROM Transaction t JOIN Product p ON t.productId = p.productId " +
       "WHERE t.transactionType = ?1")
public List<TransactionDetail> findTransactionDetailsByType(String type);




}