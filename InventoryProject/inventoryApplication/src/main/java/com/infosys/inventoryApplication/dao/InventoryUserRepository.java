package com.infosys.inventoryApplication.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infosys.inventoryApplication.bean.InventoryUser;

@Repository
public interface InventoryUserRepository extends JpaRepository<InventoryUser, Long> {
	
	// Custom query method to find user by username (used for login)
	Optional<InventoryUser> findByUsername(String username);
	
	// Check if username already exists
	boolean existsByUsername(String username);
	
	// Find all users by role
	List<InventoryUser> findByRole(String role);
	
}
