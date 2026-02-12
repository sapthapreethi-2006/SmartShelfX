package com.infosys.inventoryApplication.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.inventoryApplication.bean.ProductSale;
import com.infosys.inventoryApplication.dao.TransactionDao;

@Service
public class TransactionService {

	@Autowired
	private TransactionDao transactionDao;

	public Long generateId() {

	Long id=transactionDao.findMaxTransactionId();

	if(id==null)

		id=100001L;

	else {

		id++;

			}

	return id;

}
	
	//new added
	public List<ProductSale> getProductWiseTotalSale(){
		 List<ProductSale> salesList=transactionDao.getProductWiseTotalSale();
		 HashMap<String,ProductSale> salesMap=new HashMap<String, ProductSale>();
		 for(ProductSale prod:salesList) {
			 if(salesMap.containsKey(prod.getProductName())){
				 Double val=salesMap.get(prod.getProductName()).getTotalSalesValue();
				 val=val+prod.getTotalSalesValue();
				 prod.setTotalSalesValue(val);
				 salesMap.put(prod.getProductName(), prod);
			 }
			 else {
				 salesMap.put(prod.getProductName(), prod);
			 }
		 }
		List<ProductSale> newList=new ArrayList<ProductSale>();
		salesMap.forEach((k,v)->newList.add(v));
		return newList;
	 }



}