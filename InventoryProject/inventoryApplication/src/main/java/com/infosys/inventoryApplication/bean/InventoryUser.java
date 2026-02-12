package com.infosys.inventoryApplication.bean;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Collection;


@Entity
@Table(name = "users")
public class InventoryUser extends User{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "username", unique = true, nullable = false, length = 100)
	private String username;
	
	@Column(name = "password", nullable = false, length = 255)
	private String password;
	
	@Column(name = "name", length = 100)
	private String personalName;
	
	@Column(name = "email", length = 100)
	private String email;
	
	@Column(name = "role", nullable = false, length = 20)
	private String role;
	public InventoryUser() {
		super("abc","pqr",new ArrayList<>());
	}
	
	public InventoryUser(String username, String password, Collection<? extends GrantedAuthority> authorities,
			String username2, String personalName2,String email2, String password2, String role2) {
		super(username, password, authorities);
		this.username = username2;
		this.password = password2;
		this.personalName = personalName2;
		this.email = email2;
		this.role = role2;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPersonalName() {
		return personalName;
	}
	public void setPersonalName(String personalName) {
		this.personalName = personalName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	

}
