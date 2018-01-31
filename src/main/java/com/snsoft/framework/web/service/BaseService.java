package com.snsoft.framework.web.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.servlet.ModelAndView;

public class BaseService {

	public Object doGet(HttpServletRequest request,
			HttpServletResponse response, UserDetails user,
			Map<String, String> reqParams){
		return null;
	}

	public  Object doPost(HttpServletRequest request,
			HttpServletResponse response, UserDetails user,
			Map<String, String> reqParams){
		return null;
	}
	
	public  Object doPut(HttpServletRequest request,
			HttpServletResponse response, UserDetails user,
			Map<String, String> reqParams){
		return null;
	}
	
	public  Object doDelete(HttpServletRequest request,
			HttpServletResponse response, UserDetails user,
			Map<String, String> reqParams){
		return null;
	}
	
	public  Object doHead(HttpServletRequest request,
			HttpServletResponse response, UserDetails user,
			Map<String, String> reqParams){
		return null;
	}
	
	public  Object doOptions(HttpServletRequest request,
			HttpServletResponse response, UserDetails user,
			Map<String, String> reqParams){
		return null;
	}

	
	/**
	 * 返回json字符串
	 * @param data
	 * @param code
	 * @param msg
	 * @return
	 */
	public Object jsonResponse(Object data, int code, String msg){
		HashMap<String, Object> resultMap= new HashMap<String, Object>();  //返回结果
		resultMap.put("code", code);
		resultMap.put("msg", msg);
		resultMap.put("data", data);
		return resultMap;
	}
	
	/**
	 * 返回对应视图
	 * @param viewName 视图名称，必须在template目录下
	 * @return
	 */
	public Object viewResponse(String viewName){
		ModelAndView mav = new ModelAndView();
    	mav.setViewName(viewName);
    	return mav;
	}
	
}
