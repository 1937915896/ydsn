package com.snsoft.framework.web.security;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * 
 * 
 * @copyright ：神农大学生软件创新中心 版权所有 (c) 2016
 * 
 * @author Mr. Soldier
 * 
 * @version 1.0
 * 
 * @date 2016年9月4日 上午11:34:37
 * 
 * @Description TODO
 *	用户信息实体类 ，Spring Security中最核心的类，存储用户信息，当认证成功后，会被用来创建Authentication对象，保存在
 *	SecurityContextHolder对象中
 */
@SuppressWarnings("deprecation")
public class CustomUserDetails implements UserDetails {
	private static final long serialVersionUID = 1L;
	private String username;
	private String password;
	private String role;
	private boolean enabled = true;

	
	public Collection<? extends GrantedAuthority> getAuthorities() {
		GrantedAuthority[] gas = new GrantedAuthority[1];
		gas[0] = new GrantedAuthorityImpl(role);
		return Arrays.asList(gas);
	}

	
	public String getPassword() {
		return password;
	}

	
	public String getUsername() {
		return username;
	}

	
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	
	public boolean isAccountNonLocked() {
		return true;
	}

	
	public boolean isCredentialsNonExpired() {
		return true;
	}

	
	public boolean isEnabled() {
		return enabled;
	}

	public void setUsername(String username){
		this.username = username;
	}
	
	public void setPassword(String password){
		this.password = password;
	}
	
	public void setRole(String role){
		this.role = role;
	}
	
	public String getRole() {
		return role;
	}

	public void setEnabled(boolean enabled){
		this.enabled = enabled;
	}

}
