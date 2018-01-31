package com.snsoft.framework.web.utils;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期工具类
 */
public class DateUtils {

    public static final SimpleDateFormat FORMATER = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    public static final SimpleDateFormat NOSFORMATER = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    
    /**
	 * 按照指定的格式返回日期字符串. 默认 "yyyy-MM-dd"
	 * @param String
	 */
    public static String formatDate(String pattern) {
    	Date d = new Date();
        if (pattern == null) 
        	pattern = "yyyy-MM-dd";
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return (sdf.format(d));
    }
    
    /**
	 * 按照指定的格式返回日期字符串. 默认 "yyyy-MM-dd"
	 * 
	 * @param Date
	 * @param String
	 */
    public static String formatDate(Date date, String pattern) {
        if (date == null) return "";
        if (pattern == null) pattern = "yyyy-MM-dd";
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return (sdf.format(date));
    }
    
    /**
     * yyyy-MM-dd HH:mm:ss
     * @param date
     * @return
     */
    public static String formatDateTime(Date date) {
        return (formatDate(date, "yyyy-MM-dd HH:mm:ss"));
    }
    
    /**
     * 返回 yyyyMMddHHmmss 格式的当前日期字符串
     * @return String
     */
    public static String getDate() {
        String s = null;
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        s = sdf.format(d);
        return s;
    }
    
    public static String turnFormat(String date,DateFormat format,DateFormat toFomrat) {
        String toString = date;
        try{
            toString = toFomrat.format(format.parse(date));
        }catch (Exception e) {
            // do nothing
        }
        return toString;
    }
    public static long getTime(String str) {
        long time = 0l;
        if(str==null)
            return time;
        try {
            time = FORMATER.parse(str).getTime();
        } catch (Exception e) {
            //do nothing
        }
        if(time == 0)
            try {
                time = NOSFORMATER.parse(str).getTime();
            } catch (Exception e) {
                //do nothing
            }
        return time;
      }
   
    /**
     * 时间字符串转化为timestamp
     * @param times
     * @return
     */
	public  static Timestamp   stringToTimestamp(String times) {
		Timestamp ts = new Timestamp(System.currentTimeMillis());  
	    try {  
	        ts = Timestamp.valueOf(times);  
	    } catch (Exception e) {  
	        e.printStackTrace();  
	    }  
	    return ts;
	}
    
	public  static String  timesstampToString() {
		Timestamp ts = new Timestamp(System.currentTimeMillis());  
        String tsStr = "";  
        DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
        try {  
            //方法一  
            tsStr = sdf.format(ts);  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
		return tsStr;
	}
	
	
	
	
    public static String getDayDate() {
        String s = null;
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        s = sdf.format(d);
        return s;
    }
    /**
     * 获取年月
     * 
     * @param date
     * @param dateformat
     * @return
     */
    public static String getYearMonth(Date date, String dateformat) {
        SimpleDateFormat dd = new SimpleDateFormat(dateformat);
        return dd.format(date);
    }

    /**
     * 字符串转日期
     * 
     * @param date
     * @return
     */
    public static Date StringToDate(String dateStr, String dateformat) {
        SimpleDateFormat dd = new SimpleDateFormat(dateformat);
        Date date = null;
        try {
            date = dd.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    /**
     * get time(one hour,one day,one week)
     * 
     * @param n
     * @return
     */
    public static String getPastTime(int n) {
        Date date = new Date(System.currentTimeMillis());
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
        String dt = df.format(date);
        date = new Date(System.currentTimeMillis() - n * 60 * 60 * 1000);
        dt = df.format(date);
        return dt;
    }
    
    public static String getPastTime( Date date) {
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
        String dt = df.format(date);
        return dt;
    }
    
    /**
     * get time(one hour,one day,one week)
     * 
     * @param n
     * @return
     */
    public static String getPastTimeByDay(int n) {
        Date date = new Date(System.currentTimeMillis());
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
        String dt = df.format(date);
        date = new Date(System.currentTimeMillis() - n * 60 * 60 * 1000);
        dt = df.format(date);
        return dt;
    }

    /**
     * function get the days of one year
     * 
     * @return days
     */
    public static boolean getLeapYear() {
        boolean tag = false;
        Date date = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy");
        String dt = df.format(date);
        int pastYear = Integer.parseInt(dt) - 1;
        if (pastYear % 4 == 0 && (pastYear % 100 != 0 || pastYear % 400 == 0)) tag = true;
        return tag;
    }

    /**
     * function get days's date
     * 
     * @param date
     * @param days
     * @return
     */
    public static String decDays(int days) {
        String dateStr = null;
        Date date = new Date();
        Date dt = add(date, days, Calendar.DATE);
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        dateStr = df.format(dt);
        return dateStr;
    }

    /**
     * function get pastyear date
     * 
     * @return date
     */
    public static String getPastYearDate() {
        String dateStr = null;
        if (getLeapYear()) {
            dateStr = decDays(-366);
        } else {
            dateStr = decDays(-365);
        }
        return dateStr;
    }

    /**
     * 给时间加上或减去指定毫秒，秒，分，时，天、月或年等，返回变动后的时间
     *
     * @param date   要加减前的时间，如果不传，则为当前日期
     * @param field  时间域，有Calendar.MILLISECOND,Calendar.SECOND,Calendar.MINUTE,<br>
     *               Calendar.HOUR,Calendar.DATE, Calendar.MONTH,Calendar.YEAR
     * @param amount 按指定时间域加减的时间数量，正数为加，负数为减。
     * @return 变动后的时间
     */
    public static Date add(Date date, int amount, int field) {
    	if (date == null) {
            date = new Date();
        }
    	Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(field, amount);
        return calendar.getTime();
    }
    
    public static void main(String args[]){
    	//System.out.println(formatDateTime(DateUtils.addDay(new Date(),1)));
    	
    }
    
    /**
     * d2 - d1  的年份数
     * @param d1
     * @param d2
     * @return
     */
    @SuppressWarnings("deprecation")
	public static long difYear(Date d1,Date d2){
  	  long age = d2.getYear() - d1.getYear();
  	  if(d2.getMonth()<d1.getMonth()){
  		  age--;
  		  return age;
  	  }
  	  if(d2.getMonth()>d1.getMonth()){
  		  return age;
  	  }
  	  if(d2.getDate()<d1.getDate()){
  		  age--;
  		  return age;
  	  }
  	  return age;
    }

    /**
     * function format time
     * 
     * @param str
     * @return
     */
    public static String getFormatDate(String str) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        String dateStr = null;
        try {
            date = sdf.parse(str);
            dateStr = sdf.format(date).replaceAll("-", "");
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return dateStr;
    }

    /**
     * function format time
     * 
     * @param str
     * @return
     */
    public static String getFormatDate(String str,String format) {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        Date date = null;
        String dateStr = null;
        try {
            date = sdf.parse(str);
            dateStr = sdf.format(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return dateStr;
    }
    
    /**
     * 得到某年某月的第一天
     * 
     * @param year
     * @param month
     * @return
     */
    public static String getFirstDayOfMonth(int year, int month) {

        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, month - 1);
        cal.set(Calendar.DAY_OF_MONTH, cal.getMinimum(Calendar.DATE));
        return new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
    }

    /**
     * 得到某年某月的最后一天
     * 
     * @param year
     * @param month
     * @return
     */
    public static String getLastDayOfMonth(int year, int month) {

        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, month - 1);
        cal.set(Calendar.DAY_OF_MONTH, 1);
        int value = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        cal.set(Calendar.DAY_OF_MONTH, value);
        return new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());

    }

    /**
     * 获取年月
     * @return
     */
    public static String getYearMonth(String datestr) {
        Date date = StringToDate(datestr, "yyy-MM-dd");
        return getYearMonth(date, "yyyy-MM");
    }
    
    public static Date addDay(Date date, int amount) {
        return add(date, amount ,Calendar.DATE);
    }
    
    public static Date addMonth(Date date, int amount) {
        return add(date, amount,Calendar.MONTH);
    }

    public static Date addYear(Date date, int amount) {
        return add(date, amount, Calendar.YEAR);
    }

}
