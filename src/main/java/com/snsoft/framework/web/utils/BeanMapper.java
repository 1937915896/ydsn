package com.snsoft.framework.web.utils;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

/**
 * 
 * @copyright ：神农大学生软件创新中心 版权所有 (c) 2016
 * 
 * @author Mr. Soldier
 * 
 * @version 1.0
 * 
 * @date 2016年9月4日 下午12:02:24
 * 
 * @Description TODO JavaBean 和 Map的转换工具
 */
public class BeanMapper {

	/**
	 * 将 Map 对象 转为 destinationClass 对象
	 * @param source
	 * @param destinationClass
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public static <T> T map(Map<?, ?> source, Class<T> destinationClass) {
		if (source == null || destinationClass == null)
			return null;
		try {
			T obj = destinationClass.newInstance();
			for (Entry<?, ?> entry : source.entrySet()) {
				Field field = destinationClass.getDeclaredField((String) entry.getKey());
				field.setAccessible(true);
				if (field.getType() == Integer.class) {
					field.set(obj, Integer.parseInt((String) entry.getValue()));
				} else if (field.getType() == String.class) {
					field.set(obj, (String) entry.getValue());
				} else if (field.getType() == Date.class) {
					field.set(obj, Date.parse((String) entry.getValue()));
				} else if (field.getType() == Double.class) {
					field.set(obj, Double.parseDouble((String) entry.getValue())); // 由于时间类型比较特殊，所以我自己写了个方法处理时间类型，这一段不能直接用，可以自己写个方法替掉。
				} else if (field.getType() == Float.class) {
					field.set(obj, Float.parseFloat((String) entry.getValue()));
				} else if (field.getType() == Long.class) {
					field.set(obj, Long.parseLong((String) entry.getValue()));
				} else if (field.getType() == Boolean.class) {
					field.set(obj, Boolean.parseBoolean((String) entry.getValue()));
				} else if (field.getType() == Short.class) {
					field.set(obj, Short.parseShort((String) entry.getValue()));
				}
			}
			return obj;
		} catch (NoSuchFieldException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (NumberFormatException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 将 List<Map<?,?>>对象转为List<destinationClass>对象
	 * @param sourceList
	 * @param destinationClass
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public static <T> List<T> mapList(Collection<Map<?,?>> sourceList,
			Class<T> destinationClass) {
		if (sourceList == null || destinationClass == null)
			return null;
		List<T> objs = new ArrayList<T>();
		for(Map<?, ?> source : sourceList){
			try {
				T obj = destinationClass.newInstance();
				for (Entry<?, ?> entry : source.entrySet()) {
					Field field = destinationClass.getDeclaredField((String) entry.getKey());
					field.setAccessible(true);
					if (field.getType() == Integer.class) {
						field.set(obj, Integer.parseInt((String) entry.getValue()));
					} else if (field.getType() == String.class) {
						field.set(obj, (String) entry.getValue());
					} else if (field.getType() == Date.class) {
						field.set(obj, Date.parse((String) entry.getValue()));
					} else if (field.getType() == Double.class) {
						field.set(obj, Double.parseDouble((String) entry.getValue())); // 由于时间类型比较特殊，所以我自己写了个方法处理时间类型，这一段不能直接用，可以自己写个方法替掉。
					} else if (field.getType() == Float.class) {
						field.set(obj, Float.parseFloat((String) entry.getValue()));
					} else if (field.getType() == Long.class) {
						field.set(obj, Long.parseLong((String) entry.getValue()));
					} else if (field.getType() == Boolean.class) {
						field.set(obj, Boolean.parseBoolean((String) entry.getValue()));
					} else if (field.getType() == Short.class) {
						field.set(obj, Short.parseShort((String) entry.getValue()));
					}
				}
				objs.add(obj);
			} catch (NoSuchFieldException e) {
				e.printStackTrace();
			} catch (SecurityException e) {
				e.printStackTrace();
			} catch (NumberFormatException e) {
				e.printStackTrace();
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (InstantiationException e) {
				e.printStackTrace();
			}
		}
		
		return objs;
	}

}
