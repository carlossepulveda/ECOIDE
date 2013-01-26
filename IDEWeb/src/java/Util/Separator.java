/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Util;


/**
 *
 * @author cas
 */
public class Separator {
    
    public static String getSystemSeparator(){
    
        if(System.getProperty("os.name").toUpperCase().contains("WINDOWS"))
            return "\\";
       // System.getProperty("os.name").toUpperCase().equals("MAC");
       // System.getProperty("os.name").toUpperCase().equals("LINUX");
        return ("/");
    
    }
    
    public static String getJARCompilerSeparator(){
        
       if(System.getProperty("os.name").toUpperCase().contains("WINDOWS"))
            return ";";
       // System.getProperty("os.name").toUpperCase().equals("LINUX");
       // System.getProperty("os.name").toUpperCase().equals("MAC");
        return (":");
    }
    
 
}
