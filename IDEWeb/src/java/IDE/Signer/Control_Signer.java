/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package IDE.Signer;


import java.security.KeyStoreException;
import java.util.ResourceBundle;
import sun.security.tools.JarSigner;

/**
 *
 * @author CaS
 */
public class Control_Signer {

    
   
    /*
     * REibe un parametro target que indica la direccion del .jar a manejar
     * storepass que indica la contraseña de almacenamiento de contraseñas del JarSigner
     * keypass que indica la contraseña del certificado
     * name que indica el sobrenombre del firmador
     * 
     * retorna true en caso de realizar la operacion con exito
     */
    public static boolean sign(String target){
        
        //obtener deun archivo .properties las contraseñas
        ResourceBundle properties = ResourceBundle.getBundle("Properties.SignerProperties");
        
       // storepass="charles";keypass="charles";name="charles";
     try{
            JarSigner f=new JarSigner();
            f.run(new String[]{"-storepass",properties.getString("storepass"),"-keypass",properties.getString("keypass"),target,properties.getString("alias")});
            return true;
        }catch(Exception e){
            System.out.println("Clase : Control_Compiler  -  Metodo : sign(String[]param) -  Error :  Ocurrio un error firmando el jar  "+e.getMessage());
            return false;
        }
    }








    public static void main(String[]args) throws KeyStoreException{
        JarSigner x=new JarSigner();
        x.run(new String[]
        {//"-keystore","mykeys",
        "-storepass","passKEYSTOREpass",
         "-keypass","passIDEpass",
         "/home/cas/Desktop/IDEWeb/web/Users/cas@/projects/primerP/lib/AbsoluteLayout.jar",
        "UFPS"
        });

    }

}
