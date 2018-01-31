package com.snsoft.framework.web.utils;

import java.util.UUID;
/**
 * 生成UUID工具类
 */
public class UUIDGenerator {
	public UUIDGenerator() {
		
	}
	/**
	 * 获取UUID（带'-'）
	 * @return
	 */
	public static String uuid() {
		String s = UUID.randomUUID().toString();
		return s;
	}
	/**
	 * 获得一个UUID (去除'-')
	 * 
	 * @return String UUID
	 */
	public static String getUUID() {
		String s = UUID.randomUUID().toString();
		// 去掉“-”符号
		return s.substring(0, 8) + s.substring(9, 13) + s.substring(14, 18)
				+ s.substring(19, 23) + s.substring(24);
	}

	/**
	 * 获得指定数目的UUID(生成多个UUID)
	 * 
	 * @param number
	 *            int 需要获得的UUID数量
	 * @return String[] UUID数组
	 */
	public static String[] getUUID(int number) {
		if (number < 1) {
			return null;
		}
		String[] ss = new String[number];
		for (int i = 0; i < number; i++) {
			ss[i] = getUUID();
		}
		return ss;
	}

}
