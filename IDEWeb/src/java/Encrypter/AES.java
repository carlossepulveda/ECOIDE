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
     private Cipher aesCipher;
    private SecretKey secretKey;
    
    public AES(String pathFile){
        try{
           
           secretKey = generateKey(pathFile);
           aesCipher = Cipher.getInstance("AES");
           aesCipher.init(Cipher.ENCRYPT_MODE,secretKey);
        
        }catch(Exception e){
            
        }
    }

    public static void main(String[] args){
        AES a=new AES("/media/8804D4CA04D4BBFE/IDEWeb/web/KeyCripter/AES.hty");
        System.out.println(a.encrypt("xxxx"));
        System.out.println(a.encrypt("xxxx"));
        System.out.println(a.encrypt("xxxx"));
        System.out.println(a.encrypt("xxxx"));
        //System.out.println("7T+/UZH6AuWicx+m+3n7Qw=="+"   es igual "+a.decrypt("7T+/UZH6AuWicx+m+3n7Qw=="));
    }
        
        public boolean isAgreeEncryptString(String encryptString, String string) {
            String res = decrypt(encryptString);
            if(res==null)return false;
            return res.equals(string);
        }
    
        public String encrypt(String strDataToEncrypt){
            try{
                /**
		 *  Step 4. Encrypt the Data
		 *  		1. Declare / Initialize the Data. Here the data is of type String
		 *  		2. Convert the Input Text to Bytes
		 *  		3. Encrypt the bytes using doFinal method 
		 */
	
                strDataToEncrypt = encode(strDataToEncrypt);  
		byte[] byteDataToEncrypt = strDataToEncrypt.getBytes();
		byte[] byteCipherText = aesCipher.doFinal(byteDataToEncrypt); 
               
                String strCipherText = new BASE64Encoder().encode(byteCipherText);
    
		return strCipherText;
            }catch(Exception e){
                System.out.println("Clase : AES  -  Metodo : encrypt(String strDataToEncript) -  Error : "+e.getMessage());
                return null;
            }
        }
        
        public String decrypt(String strCipherText){
            try{
                /**
		 *  Step 5. Decrypt the Data
		 *  		1. Initialize the Cipher for Decryption 
		 *  		2. Decrypt the cipher bytes using doFinal method 
		 */
		aesCipher.init(Cipher.DECRYPT_MODE,secretKey,aesCipher.getParameters());
		 //desCipher.init(Cipher.DECRYPT_MODE,secretKey);
		///byte[] byteDecryptedText = desCipher.doFinal(strCipherText.getBytes("ISO-8859-1"));
                byte[] byteDecryptedText = aesCipher.doFinal(new BASE64Decoder().decodeBuffer(strCipherText));
		String strDecryptedText = new String(byteDecryptedText);
                return decode(strDecryptedText);
            }catch(Exception e){
                System.out.println("Clase : AES  -  Metodo : decrypt(String strCipherText) -  Error : "+e.getMessage());
                return null;
            }
        }
        
        private SecretKey generateKey(String pathFile) {
        try{
        File file = new File(pathFile);
        FileInputStream is = new FileInputStream(file);

        long length = file.length();
        byte[] bytes = new byte[(int) length];

        // Read in the bytes
        int offset = 0;
        int numRead = 0;
        while (offset < bytes.length
                && (numRead = is.read(bytes, offset, bytes.length - offset)) >= 0) {
            offset += numRead;
        }

        return new SecretKeySpec(bytes, "AES");
        }catch(Exception e){
            KeyGenerator keyGen=null;
            try {
                keyGen = KeyGenerator.getInstance("AES");
            } catch (NoSuchAlgorithmException ex) {
               System.out.println("Clase : AES  -  Metodo : generateKey() -  Error : No fue posible generar secretKey aleatorio - "+e.getMessage());
               return null;
            }
	    SecretKey sKey = keyGen.generateKey();
            System.out.println("Clase : AES  -  Metodo : generateKey() -  Mensaje : No fue posible leer secretKey de la ruta especificada - "+pathFile);
            return sKey;
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
}