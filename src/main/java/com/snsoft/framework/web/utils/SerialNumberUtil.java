package com.snsoft.framework.web.utils;

/**
 * 流水号生成工具类
 */
public class SerialNumberUtil {
	
	private static final String PREFIX_USER = "U";
	private static final String PREFIX_AWARD = "A";
	
	
	public static String GenerateSerialNo(){
		String DateStr = DateUtils.getDate();
		long r = (long)((Math.random()*9+1)*10000000);
		return DateStr + String.valueOf(r);
	}
	
	public static String AwardSerialNo(){
        String serialNo = GenerateSerialNo();
        return PREFIX_AWARD + serialNo;
    }
	
	/**
	 * 用户编号
	 * @return string
	 */
	public static String UserSerialNo(){
		String serialNo = GenerateSerialNo();
		return PREFIX_USER + serialNo;
	}

}
