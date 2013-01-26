/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Encrypter;
  import java.security.*;
   import javax.crypto.*;
   import javax.crypto.spec.*;
   import java.io.*;
import sun.misc.BASE64Decoder;

   /**
   * This program generates a AES key, retrieves its raw bytes, and
   * then reinstantiates a AES key from the key bytes.
   * The reinstantiated key is used to initialize a AES cipher for
   * encryption and decryption.
   */

   public class AES2 {

     /**
     * Turns array of bytes into string
     *
     * @param buf	Array of bytes to convert to hex string
     * @return	Generated hex string
     */
     public static String asHex (byte buf[]) {
      StringBuffer strbuf = new StringBuffer(buf.length * 2);
      int i;

      for (i = 0; i < buf.length; i++) {
       if (((int) buf[i] & 0xff) < 0x10)
	    strbuf.append("0");

       strbuf.append(Long.toString((int) buf[i] & 0xff, 16));
      }

      return strbuf.toString();
     }

     public static void main(String[] args) throws Exception {

       String message="xxxx";

       // Get the KeyGenerator

       KeyGenerator kgen = KeyGenerator.getInstance("AES");
       kgen.init(128); // 192 and 256 bits may not be available


       // Generate the secret key specs.
       SecretKey skey = kgen.generateKey();
       byte[] raw = skey.getEncoded();
 SecretKeySpec skeySpec =null;
       
         try{
        File file = new File("/media/8804D4CA04D4BBFE/IDEWeb/web/KeyCripter/AES.hty");
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

        skeySpec=new SecretKeySpec(bytes, "AES");
        }catch(Exception e){
          
        }
      


       // Instantiate the cipher

       Cipher cipher = Cipher.getInstance("AES");

       cipher.init(Cipher.ENCRYPT_MODE, skeySpec);

       byte[] encrypted =
         cipher.doFinal((args.length == 0 ?
          "xxxx" : args[0]).getBytes());
       System.out.println("encrypted string: " + asHex(encrypted));
byte[] byteDecryptedText = cipher.doFinal(new BASE64Decoder().decodeBuffer("8f4c15cf6fdd7a1cbfbc13e552d87350"));
       cipher.init(Cipher.DECRYPT_MODE, skeySpec);
       byte[] original =
         cipher.doFinal(encrypted);
       byte[]test=cipher.doFinal(byteDecryptedText);
       System.out.println("test:   "+asHex(test));
       String originalString = new String(original);
       System.out.println("Original string: " +
         originalString + " " + asHex(original));
     }
     

   }
