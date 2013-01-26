/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Encrypter;

import Util.Random;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
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
 * @author CaS (Modificacion)
 * This program provides the following cryptographic functionalities
 * 1. Encryption using DES
 * 2. Decryption using DES
 * 
 * The following modes of DES encryption are supported by SUNJce provider 
 * 1. ECB (Electronic code Book) - Every plaintext block is encrypted separately 
 * 2. CBC (Cipher Block Chaining) - Every plaintext block is XORed with the previous ciphertext block
 * 3. PCBC (Propogating Cipher Block Chaining) - 
 * 4. CFB (Cipher Feedback Mode) - The previous ciphertext block is encrypted and this enciphered block is XORed with the plaintext block to produce the corresponding ciphertext block 
 * 5. OFB (Output Feedback Mode) - 
 *
 *	High Level Algorithm :
 * 1. Generate a DES key
 * 2. Create the Cipher (Specify the Mode and Padding)
 * 3. To Encrypt : Initialize the Cipher for Encryption
 * 4. To Decrypt : Initialize the Cipher for Decryption
 * 
 * Need for Padding :
 * Block ciphers operates on data blocks on fixed size n. 
 * Since the data to be encrypted might not always be a multiple of n, the remainder of the bits are padded.
 * PKCS#5 Padding is what will be used in this program 
 * 
 */

public class DES {
    
    private Cipher desCipher;
    private SecretKey secretKey;
    
    public DES(String pathFile){
        try{
            secretKey = generateKey(pathFile);
            
            /**
		 *  Step2. Create a Cipher by specifying the following parameters
		 * 			a. Algorithm name - here it is DES
		 * 			b. Mode - here it is CBC
		 * 			c. Padding - PKCS5Padding
		 */
		
	    desCipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
                
            /**
		 *  Step 3. Initialize the Cipher for Encryption 
		 */
		
	    desCipher.init(Cipher.ENCRYPT_MODE,secretKey);
        }catch(Exception e){
            
        }
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
		byte[] byteCipherText = desCipher.doFinal(byteDataToEncrypt); 
                String strCipherText = new BASE64Encoder().encode(byteCipherText);
		return strCipherText;
            }catch(Exception e){
                return null;
            }
        }
        
        public boolean isAgreeEncryptString(String encryptString,String string){
            String res=decode(encryptString);
            return res.equals(string);
        }
        private String decrypt(String strCipherText){
            try{
                /**
		 *  Step 5. Decrypt the Data
		 *  		1. Initialize the Cipher for Decryption 
		 *  		2. Decrypt the cipher bytes using doFinal method 
		 */
		desCipher.init(Cipher.DECRYPT_MODE,secretKey,desCipher.getParameters());
		 //desCipher.init(Cipher.DECRYPT_MODE,secretKey);
		///byte[] byteDecryptedText = desCipher.doFinal(strCipherText.getBytes("ISO-8859-1"));
                byte[] byteDecryptedText = desCipher.doFinal(new BASE64Decoder().decodeBuffer(strCipherText));
		String strDecryptedText = new String(byteDecryptedText);
		System.out.println(" Decrypted Text message is " +strDecryptedText);
                System.out.println("Cadena original:"+decode(strDecryptedText));
                return decode(strCipherText);
            }catch(Exception e){
                System.out.println("Clase : DES  -  Metodo : decrypt(String strCipherText) -  Error : "+e.getMessage());
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

        return new SecretKeySpec(bytes, "DES");
        }catch(Exception e){
            KeyGenerator keyGen=null;
            try {
                keyGen = KeyGenerator.getInstance("DES");
            } catch (NoSuchAlgorithmException ex) {
               System.out.println("Clase : DES  -  Metodo : generateKey() -  Error : No fue posible generar secretKey aleatorio - "+e.getMessage());
               return null;
            }
	    SecretKey sKey = keyGen.generateKey();
            System.out.println("Clase : DES  -  Metodo : generateKey() -  Mensaje : No fue posible leer secretKey de la ruta especificada - "+pathFile);
            return sKey;
        }
     
    }
}
