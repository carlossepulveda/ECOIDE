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
    public Control_Encrypter(String pathApp){
        //carga de un archivo properties las propiedades de los KEYs
        ResourceBundle properties = ResourceBundle.getBundle("Properties.KeyEncryptProperties");
        pathFile=pathApp+Separator.getSystemSeparator()+properties.getString("path")+Separator.getSystemSeparator()+properties.getString("AES");
        
        myAES=new AES(pathFile);
        myDES=new DES(pathFile);
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
      Facade_Encrypter fe=new Facade_Encrypter("/media/8804D4CA04D4BBFE/IDEWeb/web/KeyCripter/AES.hty");
      System.out.println(fe.encrypt("xxxx"));
      
  }
}
