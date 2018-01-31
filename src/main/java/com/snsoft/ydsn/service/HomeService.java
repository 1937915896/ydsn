package com.snsoft.ydsn.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.snsoft.framework.web.service.BaseService;
import com.snsoft.framework.web.utils.Constants;

@Service
@PreAuthorize("isAuthenticated()")
public class HomeService extends BaseService {

    @Override
    public Object doGet(HttpServletRequest request, HttpServletResponse response, UserDetails user,
            Map<String, String> reqParams) {

    	return viewResponse("home");
    }
}
