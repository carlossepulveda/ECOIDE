/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Encrypter;

import Util.Separator;
import java.util.ResourceBundle;

/**
 *
 * @author cas
 */
public class Control_Encrypter {
    private String pathFile;
    private AES myAES;
    private DES myDES;
    private static final byte[] keyValueAES = new byte[] { 'K', 'e', 'Y', 'f', 'R', 'o', 'M','e', 'C', 'o', 'I','d', 'E', 'k', 'E', 'y' ,};

    public Control_Encrypter(String pathApp){
        //carga de un archivo properties las propiedades de los KEYs
        ResourceBundle properties = ResourceBundle.getBundle("Properties.KeyEncryptProperties");
        pathFile=pathApp+Separator.getSystemSeparator()+properties.getString("path")+Separator.getSystemSeparator()+properties.getString("AES");
        
        myAES=new AES(Control_Encrypter.keyValueAES);
       // myDES=new DES(pathFile);
    }
    
    public String encrypt(String string){
        return myAES.encrypt(string);
    }
    public String decrypt(String string){
        return myAES.decrypt(string);
    }
    
    public boolean isAgreeEncryptString(String encryptString,String string){
        return myAES.isAgreeEncryptString(encryptString,string);
    }
     public static void main(String [] args){
      Control_Encrypter fe=new Control_Encrypter("/media/8804D4CA04D4BBFE/IDEWeb/web/KeyCripter/AES.hty");
      String en=fe.encrypt("xxxx");
      System.out.println("xxxx    "+en+"  -  "+fe.decrypt("TsWF9NG3v7dDHzmTIhkfKQ=="));
      
  }
}
