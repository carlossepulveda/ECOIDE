/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Util;

/**
 *
 * @author cas
 */
public class Random {
    
    private static final String string="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
    public static String getRandom(int lengthString){
        
        String r="";
        
        for(int i=0;i<lengthString;i++){
            
            r+=string.charAt(  (int) (Math.random()* string.length())   );
            
        }
        
       return r; 
    }
}
