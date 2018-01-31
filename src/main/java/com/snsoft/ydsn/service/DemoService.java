package com.snsoft.ydsn.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.snsoft.framework.web.dao.BaseDao;
import com.snsoft.framework.web.service.BaseService;
import com.snsoft.framework.web.utils.Constants;

@Service
@PreAuthorize("isAuthenticated()")
public class DemoService extends BaseService {
	@Autowired
	private BaseDao baseDao;

    @Override
    public Object doPost(HttpServletRequest request, HttpServletResponse response, UserDetails user,
            Map<String, String> reqParams) {

    	System.out.println("进入demo");
        // TODO: implement the method.
    	List<Map<String, Object>> result = baseDao.queryForListBySql("demo.queryUserInfos", null);
    	System.out.println(result.size());
        // 以 Rock Framework 的标准 JSON 格式返回对象
        return jsonResponse(result, Constants.CODE_SUCCESS, Constants.JSON_SUCCESS);

    }

    @Override
    public Object doGet(HttpServletRequest request, HttpServletResponse response, UserDetails user,
            Map<String, String> reqParams) {
        // TODO: implement the method.
    	System.out.println("进入demo");
        // TODO: implement the method.
    	List<Map<String, Object>> result = baseDao.queryForListBySql("demo.queryUserInfos", null);
    	System.out.println(result.size());
        // 以 Rock Framework 的标准 JSON 格式返回对象
        return jsonResponse(result, Constants.CODE_SUCCESS, Constants.JSON_SUCCESS);

    }
}
