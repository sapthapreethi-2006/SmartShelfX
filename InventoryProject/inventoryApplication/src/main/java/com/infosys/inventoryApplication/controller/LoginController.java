package com.infosys.inventoryApplication.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.inventoryApplication.bean.InventoryUser;
import com.infosys.inventoryApplication.config.EncodeConfig;
import com.infosys.inventoryApplication.dao.InventoryUserRepository;
import com.infosys.inventoryApplication.service.InventoryUserService;

@RestController
@RequestMapping("/invent")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class LoginController {
	@Autowired
	private InventoryUserRepository repository;
	
	@Autowired
	private EncodeConfig econfig;
	
	@Autowired
    private AuthenticationManager authenticationManager;
	
	/**
	 * POST /invent/register
	 * Register new user with username, password, role
	 */
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody InventoryUser user) {
		try {
			// Validate required fields
			if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
				Map<String, String> error = new HashMap<>();
				error.put("error", "Username is required");
				return ResponseEntity.badRequest().body(error);
			}
			
			if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
				Map<String, String> error = new HashMap<>();
				error.put("error", "Password is required");
				return ResponseEntity.badRequest().body(error);
			}
			
			if (user.getRole() == null || user.getRole().trim().isEmpty()) {
				Map<String, String> error = new HashMap<>();
				error.put("error", "Role is required");
				return ResponseEntity.badRequest().body(error);
			}
			
			// Check if username already exists
			if (repository.existsByUsername(user.getUsername())) {
				Map<String, String> error = new HashMap<>();
				error.put("error", "Username already exists");
				return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
			}
			
			// Encode password
			PasswordEncoder encoder = econfig.passwordEcoding();
			String encodedPassword = encoder.encode(user.getPassword());
			user.setPassword(encodedPassword);
			
			// Save user
			InventoryUser saved = repository.save(user);
			
			Map<String, Object> response = new HashMap<>();
			response.put("id", saved.getId());
			response.put("message", "User registered successfully");
			response.put("role", saved.getRole());
			
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (Exception ex) {
			Map<String, String> error = new HashMap<>();
			ex.printStackTrace(); // Log stack trace for debugging
			error.put("error", "Registration failed: " + ex.getMessage());
			error.put("details", ex.getClass().getSimpleName());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
		}
	}
	
	/**
	 * POST /invent/login
	 * Login with username and password, return role
	 */
	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials) {
		String username = credentials.get("username");
		String password = credentials.get("password");
		
		Map<String, String> response = new HashMap<>();
		
		// Validate input
		if (username == null || username.trim().isEmpty() || password == null || password.trim().isEmpty()) {
			response.put("role", "false");
			response.put("message", "Username and password are required");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
		
		// Find user by username
		var userOpt = repository.findByUsername(username);
		
		if (userOpt.isPresent()) {
			InventoryUser user = userOpt.get();
			PasswordEncoder encoder = econfig.passwordEcoding();
			
			// Verify password
			if (encoder.matches(password, user.getPassword())) {
				response.put("role", user.getRole());
				response.put("message", "Login successful");
				response.put("username", user.getUsername());
				return ResponseEntity.ok(response);
			}
		}
		
		response.put("role", "false");
		response.put("message", "Invalid username or password");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	}
	
	// ===== LEGACY ENDPOINTS (commented - kept for backward compatibility) =====
	
	/*
	@PostMapping("/login-old")
	public void registerNewUser(@RequestBody InventoryUser user) {
		PasswordEncoder bCrypt=econfig.passwordEcoding();
		String encodedPassword=bCrypt.encode(user.getPassword());
		user.setPassword(encodedPassword);
		service.save(user);
	}
	
	@GetMapping("/login/{userId}/{password}")
	public String validateUser(@PathVariable String userId,@PathVariable String password) {
		String role="false";
		try {
			 Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userId, password));
		 	    role=service.getRole();
		 	     SecurityContextHolder.getContext().setAuthentication(authentication);
			}catch(Exception ex) {}
		return role;
	}
	
	@GetMapping("/login")
	public InventoryUser getUserDetails() {
		return service.getUser();
	}
	*/
 
}
