/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package IDE.Signer;

/**
 *
 * @author CaS
 */
public class Facade_Signer {

    public Facade_Signer(){

    }

    public boolean sign(String target){
        return Control_Signer.sign(target);

    }

    public static void main(String[] args){
        Facade_Signer gf=new Facade_Signer();
        gf.sign("/home/cas/Escritorio/pruebaaaa.jar");
    }
}
