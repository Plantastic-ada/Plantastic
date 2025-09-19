package com.plantastic.backend.util;

public class StringUtil {

    public static String emptyStringToNull(String value){
        return (value == null || value.isEmpty()) ? null : value;
    }
}
