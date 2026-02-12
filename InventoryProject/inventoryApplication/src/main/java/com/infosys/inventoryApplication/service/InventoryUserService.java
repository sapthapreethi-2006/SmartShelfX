package com.infosys.inventoryApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.infosys.inventoryApplication.bean.InventoryUser;
import com.infosys.inventoryApplication.dao.InventoryUserRepository;
//to save user and check his passwords with existing passworddd
@Service
public class InventoryUserService implements UserDetailsService{
	@Autowired
	private InventoryUserRepository repository;
	
	private String role;
	private InventoryUser user;
	private String email;
	private String userId;
	
	public String getRole() {
        return role;
    }

    public InventoryUser getUser() {
        return user;
    }

    public String getEmail() {
        return email;
    }

    public String getUserId() {
        return userId;
    }
    
    public void save (InventoryUser user)
    {
		repository.save(user);
	}
	
	public InventoryUser findById(String username) {
		return repository.findByUsername(username).orElse(null);
	}
	
	public java.util.List<InventoryUser> getAllUsers() {
		return repository.findAll();
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException  {
		this.user = repository.findByUsername(username)
			.orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
		this.userId = user.getUsername();
		this.role = user.getRole();
		return user;
	}

}
