package com.infosys.inventoryApplication.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.infosys.inventoryApplication.bean.InventoryUser;
import com.infosys.inventoryApplication.service.InventoryUserService;

@RestController
@RequestMapping("/invent")
@CrossOrigin(origins="http://localhost:3131")
public class TempLoginController{
 @Autowired InventoryUserService service;
 @GetMapping("/login-temp/{userId}")
 public String tempLogin(@PathVariable String userId){
  InventoryUser u=service.findById(userId);
  return u==null?"false":u.getRole();
 }
}
