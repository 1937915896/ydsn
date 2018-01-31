package com.snsoft.framework.web.utils;

/**
 * 
 * @copyright ：神农大学生软件创新中心 版权所有 (c) 2016
 * 
 * @author Mr. Soldier
 * 
 * @version 1.0
 * 
 * @date 2016年9月16日 上午12:11:52
 * 
 * @Description TODO
 *  所以常量
 */
public interface Constants {
	
	//结果码
	int CODE_SUCCESS = 0;  //获取成功
	int CODE_ERROR = 1;    //获取错误
	int PASSWORD_ERROR = 2;      //密码错误
	int NOT_LOGIN = 3; 			//未登录
	
	String JSON_SUCCESS = "获取成功";  //获取成功
	String NOT_LOGIN_STRING = "未登录异常";
	
	String SESSION_KEY = "userDetails";   //存在session的key
	
	String DEFAULT_PICTURE = "default.jpg";  //默认头像
	
	int MESSAGE_PUSH = 1;
	int MESSAGE_CHAT = 2;
	
	String ANDROID_APP_NAME = "agriculture.apk";  //app名称
}
