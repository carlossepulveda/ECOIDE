/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Encrypter;

/**
 *
 * @author cas
 */
public class Facade_Encrypter {
    
    private Control_Encrypter myControlEncrypter;
    
    public Facade_Encrypter(String pathApp){
        myControlEncrypter=new Control_Encrypter(pathApp);
    }
    
    public String encrypt(String string){
        return myControlEncrypter.encrypt("yyyy");
    }
    
    public String decrypt(String string){
        return myControlEncrypter.decrypt(string);
    }
    
    public boolean isAgreeEncryptString(String encryptString,String string){
        return myControlEncrypter.isAgreeEncryptString(encryptString,string);
    }
    /**
 public static void main(String[]args){
     Facade_Encrypter fe=new Facade_Encrypter("/media/8804D4CA04D4BBFE/IDEWeb/web");
     System.out.println(fe.encrypt("yyyy"));
     System.out.println(fe.encrypt("yyyy"));
     System.out.println(fe.isAgreeEncryptString("ngkzqnc1BWI8GzLNnLx7dg==", "xxxx"));
 }**/
    
}
