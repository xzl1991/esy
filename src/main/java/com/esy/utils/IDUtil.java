package com.esy.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class IDUtil {
	/**返回 str+当前时间（秒）*/
	public static String getIdstr(String str) {
		DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		String date = df.format(new Date());
		return str + date;
	}
	
	public static void main(String[] args) {
		System.out.println(getIdstr("contract"));
	}
}
