package com.snsoft.framework.web.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.snsoft.framework.web.dao.BaseDao;

/**
 * 
 * 
 * @copyright ：神农大学生软件创新中心 版权所有 (c) 2016
 * 
 * @author Mr. Soldier
 * 
 * @version 1.0
 * 
 * @date 2016年9月4日 上午11:34:23
 * 
 * @Description TODO
 *为Spring Security提供UserDetails对象
 */
@Service
public class CustomeUserDetailsService implements UserDetailsService {
	
	@Autowired
	private BaseDao baseDao; 
	
	/**
	 * 这是最主要的方法
	 */
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		return baseDao.queryForObjectBySql("security.loadUserDetailByAccount", username);
	}

}
