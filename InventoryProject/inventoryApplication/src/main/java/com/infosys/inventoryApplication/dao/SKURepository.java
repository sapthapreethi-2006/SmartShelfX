package com.infosys.inventoryApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.infosys.inventoryApplication.bean.SKU;

public interface SKURepository extends JpaRepository<SKU, String> {

}
