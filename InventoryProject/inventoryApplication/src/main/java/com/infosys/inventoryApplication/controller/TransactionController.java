package com.infosys.inventoryApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;

import com.infosys.inventoryApplication.bean.ProductSale;
import com.infosys.inventoryApplication.bean.Transaction;
import com.infosys.inventoryApplication.bean.TransactionDetail;
import com.infosys.inventoryApplication.dao.TransactionDao;
import com.infosys.inventoryApplication.service.TransactionService;

@RestController
@RequestMapping("/invent")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.OPTIONS})
public class TransactionController {

    @Autowired
    private TransactionDao transactionDao;

    @Autowired
    private TransactionService service;

    // SAVE TRANSACTION
    @PostMapping("/stock")
    public void saveTransaction(@RequestBody Transaction transaction) {
        transactionDao.saveTransaction(transaction);
    }

    // GET TRANSACTION BY ID
    @GetMapping("/stock/{id}")
    public Transaction findTransactionById(@PathVariable Long id) {
        return transactionDao.findTransactionById(id);
    }

    // GET ALL TRANSACTIONS
    @GetMapping("/stock")
    public List<Transaction> showAllTransactions() {
        return transactionDao.showAllTransactions();
    }

    // DELETE TRANSACTION BY ID
    @DeleteMapping("/stock/{id}")
    public void removeTransactionById(@PathVariable Long id) {
        transactionDao.removeTransactionById(id);
    }

    // GENERATE TRANSACTION ID
    @GetMapping("/trans")
    public Long generateId() {
        return service.generateId();
    }

    // FIND TRANSACTIONS BY TYPE (IN / OUT)
    @GetMapping("/trans/{type}")
    public List<Transaction> findTransactionsByType(@PathVariable String type) {
        return transactionDao.findTransactionsByType(type);
    }
    
    // FIND TRANSACTION DETAILS BY TYPE WITH PRODUCT NAME AND VENDOR ID
    @GetMapping("/trans/details/{type}")
    public List<TransactionDetail> findTransactionDetailsByType(@PathVariable String type) {
        return transactionDao.findTransactionDetailsByType(type);
    }

    // PRODUCT ANALYSIS – DEMAND BY PRODUCT
    @GetMapping("/analysis/{id}")
    public List<Double> getDemandByProduct(@PathVariable String id) {
        return transactionDao.getDemandByProduct(id);
    }
    
    @GetMapping("/analysis")
    public List<ProductSale> getProductWiseTotalSale(){
    	return service.getProductWiseTotalSale();
    }

}