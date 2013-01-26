/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package IDE.Compressor;

/**
 *
 * @author CaS
 */
public class GestorCompresion {


     /*
     * Genera un .jar con los archivos encontrados en la direccion recibida en el
     * parametro ruta;
     *
     * Retorna true en caso de llevar a cabo con exito la operacion
     */
    public static boolean getJAR(String ruta,String destino,String jarName){
         return new GJar().generarJAR(ruta, destino, jarName);
    }



    /*
     * Genera un .jar con los archivos encontrados en la direccion recibida en el
     * parametro ruta; pero no integra en el .jar los archivos que tengan extensiones
     * iguales al parametro aExclu.
     * 
     * Retorna true en caso de llevar a cabo con exito la operacion 
     */
    public static boolean getJARex(String ruta,String destino,String jarName,String aExclu){
        GJar gj=new GJar();
        gj.setExclu(aExclu);
        return gj.generarJAR(ruta, destino, jarName);
    }



     /*
     * Genera un .zip con los archivos encontrados en la direccion recibida en el
     * parametro ruta;
     *
     * Retorna true en caso de llevar a cabo con exito la operacion
   
    public static boolean getZIP(String ruta,String destino,String jarName){
        return new GZip().generarZIP(ruta, destino, jarName);
    }

**/
    
     /*
     * Genera un .zip con los archivos encontrados en la direccion recibida en el
     * parametro ruta; pero no integra en el .zip los archivos que tengan extensiones
     * iguales al parametro aExclu.
     *
     * Retorna true en caso de llevar a cabo con exito la operacion
     
    public static boolean getZIPex(String ruta, String destino, String jarName, String Exclu){
        GZip gz=new GZip();
        gz.setExclu(Exclu);
        return gz.generarZIP(ruta, destino, jarName);
    }
*/


    public static void main(String [] args){


    GestorCompresion.getJAR("E:/Compilacion","E:/","PruebaFirmador.jar");

    }
}
