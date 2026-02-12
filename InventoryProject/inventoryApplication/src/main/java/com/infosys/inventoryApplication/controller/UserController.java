package com.infosys.inventoryApplication.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.inventoryApplication.bean.InventoryUser;
import com.infosys.inventoryApplication.dao.InventoryUserRepository;

@RestController
@RequestMapping("/invent")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class UserController {

    @Autowired
    private InventoryUserRepository repository;

    /**
     * GET /invent/user/{username}
     * Returns full user details for a given username.
     */
    @GetMapping("/user/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        Optional<InventoryUser> userOpt = repository.findByUsername(username);
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("User not found: " + username);
    }

    /**
     * GET /invent/users
     * Returns all registered users.
     */
    @GetMapping("/users")
    public ResponseEntity<List<InventoryUser>> getAllUsers() {
        List<InventoryUser> users = repository.findAll();
        return ResponseEntity.ok(users);
    }
}
