package com.snsoft.framework.web.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.snsoft.framework.web.service.BaseService;

@Controller
public class BaseController {
	
	public static final String HTTP_METHOD_PUT = "PUT";
	public static final String HTTP_METHOD_DELETE = "DELETE";
	public static final String HTTP_METHOD_GET = "GET";
	public static final String HTTP_METHOD_POST = "POST";
	public static final String HTTP_METHOD_HEAD = "HEAD";
	public static final String HTTP_METHOD_OPTIONS = "OPTIONS";
	
	
	public static final String REQUEST_KEY = "REQUEST";
	public static final String RESPONSE_KEY = "RESPONSE";
	public static final String URL_NAME_KEY = "URL_NAME";
	
	public static final String HTTP_METHOD_STR = "method";
	
	protected Object response(BaseService service, String httpMethodHead,
			Map<String, Object> params, Model model) {
		
		HttpServletRequest request = (HttpServletRequest)params.get(REQUEST_KEY);
		HttpServletResponse response = (HttpServletResponse)params.get(RESPONSE_KEY);
		
		//提取请求参数
		Map<String,String> reqParams = new HashMap<String,String>();
		Map<String, String[]> paramsMap = request.getParameterMap();
		for(String key : paramsMap.keySet()){
			reqParams.put(key, paramsMap.get(key)[0]);
		}
		
		//获取登录信息
		SecurityContext securityContext = SecurityContextHolder.getContext();
		Authentication authentication = securityContext.getAuthentication();
		UserDetails user = null;
		if(authentication != null){
			Object object = authentication.getPrincipal();
			if(object instanceof UserDetails){
				user = (UserDetails) object;
			}
		}
		
		//分派给service对应的方法
		if(HTTP_METHOD_PUT.equals(httpMethodHead)){
			return service.doPut(request, response, user, reqParams);
		}  else if(HTTP_METHOD_DELETE.equals(httpMethodHead)){
			return service.doDelete(request, response, user, reqParams);
		}  else if(HTTP_METHOD_GET.equals(httpMethodHead)){
			return service.doGet(request, response, user, reqParams);
		}  else if(HTTP_METHOD_HEAD.equals(httpMethodHead)){
			return service.doHead(request, response, user, reqParams);
		}  else if(HTTP_METHOD_OPTIONS.equals(httpMethodHead)){
			return service.doOptions(request, response, user, reqParams);
		}  else if(HTTP_METHOD_POST.equals(httpMethodHead)){
			return service.doPost(request, response, user, reqParams);
		}
		
		return null;
	}
}
