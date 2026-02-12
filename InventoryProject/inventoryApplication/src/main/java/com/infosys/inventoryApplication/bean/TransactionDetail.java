package com.infosys.inventoryApplication.bean;

public class TransactionDetail {
    private Long transactionId;
    private String transactionType;
    private Long productId;
    private String productName;
    private Double rate;
    private Double quantity;
    private Double transactionValue;
    private String vendorId;
    private String transactionDate;
    
    public TransactionDetail() {
        super();
    }
    
    public TransactionDetail(Long transactionId, String transactionType, Long productId, String productName,
                           Double rate, Double quantity, Double transactionValue, String vendorId, String transactionDate) {
        super();
        this.transactionId = transactionId;
        this.transactionType = transactionType;
        this.productId = productId;
        this.productName = productName;
        this.rate = rate;
        this.quantity = quantity;
        this.transactionValue = transactionValue;
        this.vendorId = vendorId;
        this.transactionDate = transactionDate;
    }
    
    public Long getTransactionId() {
        return transactionId;
    }
    
    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }
    
    public String getTransactionType() {
        return transactionType;
    }
    
    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }
    
    public Long getProductId() {
        return productId;
    }
    
    public void setProductId(Long productId) {
        this.productId = productId;
    }
    
    public String getProductName() {
        return productName;
    }
    
    public void setProductName(String productName) {
        this.productName = productName;
    }
    
    public Double getRate() {
        return rate;
    }
    
    public void setRate(Double rate) {
        this.rate = rate;
    }
    
    public Double getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }
    
    public Double getTransactionValue() {
        return transactionValue;
    }
    
    public void setTransactionValue(Double transactionValue) {
        this.transactionValue = transactionValue;
    }
    
    public String getVendorId() {
        return vendorId;
    }
    
    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }
    
    public String getTransactionDate() {
        return transactionDate;
    }
    
    public void setTransactionDate(String transactionDate) {
        this.transactionDate = transactionDate;
    }
}
