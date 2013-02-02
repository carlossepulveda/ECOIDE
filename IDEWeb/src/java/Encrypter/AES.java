/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Encrypter;

import Util.Random;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.Cipher;

import java.security.NoSuchAlgorithmException;
import java.security.InvalidKeyException;
import java.security.InvalidAlgorithmParameterException;
import java.security.Key;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;

import javax.crypto.spec.SecretKeySpec;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * @author Joe Prasanna Kumar
 * This program provides the following cryptographic functionalities
 * 1. Encryption using AES
 * 2. Decryption using AES
 * 
 * High Level Algorithm :
 * 1. Generate a AES key (specify the Key size during this phase) 
 * 2. Create the Cipher 
 * 3. To Encrypt : Initialize the Cipher for Encryption
 * 4. To Decrypt : Initialize the Cipher for Decryption
 * 
 * 
 */

public class AES {
    
    private static final String EncrypInstance = "AES";
    private final byte[] keyValue;
    
        public AES(byte[] keyValue){
            this.keyValue=keyValue;
        }
    
        public String encrypt(String strDataToEncrypt){
             //codifica y encripta
            try{
                Key key = generateKey();
                Cipher c = Cipher.getInstance(EncrypInstance);
                c.init(Cipher.ENCRYPT_MODE, key);
                strDataToEncrypt = encode(strDataToEncrypt);
                byte[] encVal = c.doFinal(strDataToEncrypt.getBytes());
                String encryptedValue = new BASE64Encoder().encode(encVal);
                return encryptedValue;
            }catch( Exception e){
                System.out.println("Error al intentar encriptar - Clase : AES.java - Metodo encrypt - Error : "+e.getMessage());
                return null;
            }
            
        }
        
        public String decrypt(String strCipherText){
            //desencripta y decodifica
            try{
                Key key = generateKey();
                Cipher c = Cipher.getInstance(EncrypInstance);
                c.init(Cipher.DECRYPT_MODE, key);
                byte[] decordedValue = new BASE64Decoder().decodeBuffer(strCipherText);
                byte[] decValue = c.doFinal(decordedValue);
                String decryptedValue = new String(decValue);
                return decode(decryptedValue);
            }catch( Exception e){
                System.out.println("Error al intentar desencriptar - Clase : AES.java - Metodo decrypt - Error : "+e.getMessage());
                return null;
            }
        }
        
        private static String encode(String cad){
            String cadCod="";
            String keyCarlos=Random.getRandom(cad.length());
            for(int i=cad.length()-1;i>=0;i--){
                cadCod=cadCod+keyCarlos.charAt(cad.length()-1-i)+cad.charAt(i);
            }
            return cadCod;
        }
        
        private static String decode(String cad){
            String cadCod="";
            for(int i=cad.length()-1;i>=0;i--){
               if((cad.length()-i-1)%2==0)
                    cadCod=cadCod+cad.charAt(i);
            }
            return cadCod;
        }

        private Key generateKey() throws Exception {
            Key key = new SecretKeySpec(keyValue, EncrypInstance);
            return key;
        }

        public static void main(String [] args){
            byte[] keyValue = new byte[] { 'T', 'h', 'e', 'B', 'e', 's', 't',
'S', 'e', 'c', 'r','e', 't', 'K', 'e', 'y' };
            AES aes= new AES(keyValue);
          String ae="PERRO";
          String en= aes.encrypt(ae);

          System.out.println("a encriptar :  "+ae);
          System.out.println("encriptado :  "+en);
        }

        public boolean isAgreeEncryptString(String encryptString, String string) {
            String de=this.decrypt(encryptString);
            return de.equals(string);
        }
}