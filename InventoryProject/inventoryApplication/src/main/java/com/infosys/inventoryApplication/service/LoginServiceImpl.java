package com.infosys.inventoryApplication.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.infosys.inventoryApplication.bean.InventoryUser;
import com.infosys.inventoryApplication.config.EncodeConfig;
import com.infosys.inventoryApplication.dao.InventoryUserRepository;

@Service
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	private InventoryUserRepository repository;
	
	@Autowired
	private EncodeConfig encodeConfig;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Override
	public void registerUser(InventoryUser user) {
		// Encode password before saving
		PasswordEncoder encoder = encodeConfig.passwordEcoding();
		String encodedPassword = encoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		repository.save(user);
	}

	@Override
	public String validateUserAndGetRole(String username, String password) {
		try {
			// Authenticate user
			Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(username, password)
			);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			
			// Fetch user and return role
			Optional<InventoryUser> userOpt = repository.findByUsername(username);
			if (userOpt.isPresent()) {
				return userOpt.get().getRole();
			}
		} catch (Exception ex) {
			// Authentication failed
			return "false";
		}
		return "false";
	}

	@Override
	public List<InventoryUser> getAllUsers() {
		return repository.findAll();
	}

	@Override
	public InventoryUser findUserByUsername(String username) {
		Optional<InventoryUser> userOpt = repository.findByUsername(username);
		return userOpt.orElse(null);
	}

	@Override
	public String login(String username, String password) {
		// This is an alternative login method that returns role
		return validateUserAndGetRole(username, password);
	}
}
