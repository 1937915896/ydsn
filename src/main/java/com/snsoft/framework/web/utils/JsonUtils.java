package com.snsoft.framework.web.utils;

import java.util.Collection;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class JsonUtils {
	
	/**
	 * 序列化json字符串
	 * @param object
	 * @return
	 */
	public static String serialize(Object object){

		JSONObject jsonObject = new JSONObject();
		try {
			if(object != null){
				if(object instanceof Collection<?>){
					//List集合类对象
					JSONArray array = new JSONArray();
					array.put((Collection<?>) object);
					jsonObject.put("data", array);
				} else if(object instanceof  Map<?, ?>){
					//Map集合对象
					jsonObject.put("data", object);
				} else {
					jsonObject.put("data", object);
				}
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}
	
}
