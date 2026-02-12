package com.infosys.inventoryApplication.service;

import java.util.List;

import com.infosys.inventoryApplication.bean.InventoryUser;

public interface LoginService {
	
	/**
	 * Register a new user in the system
	 * @param user - InventoryUser object with username, password, and role
	 */
	public void registerUser(InventoryUser user);
	
	/**
	 * Validate user credentials and return role
	 * @param username - User's username
	 * @param password - User's password
	 * @return role - User's role (ADMIN/MANAGER/VENDOR) or "false" if invalid
	 */
	public String validateUserAndGetRole(String username, String password);
	
	/**
	 * Get all users from database
	 * @return List of all InventoryUser objects
	 */
	public List<InventoryUser> getAllUsers();
	
	/**
	 * Find user by username
	 * @param username - User's username
	 * @return InventoryUser object or null if not found
	 */
	public InventoryUser findUserByUsername(String username);
	
	/**
	 * Login and return user role
	 * @param username - User's username
	 * @param password - User's password
	 * @return role - User's role (ADMIN/MANAGER/VENDOR) or "false" if invalid
	 */
	public String login(String username, String password);
}
