package test;

import java.io.File;

public class TestMain
 {
     static
     {
         System.load("D:" + File.separator + "Hello.dll");
     }
     public native static void Hello();
     
     public static void main(String[] args)
     {
         Hello();
     }
 }













