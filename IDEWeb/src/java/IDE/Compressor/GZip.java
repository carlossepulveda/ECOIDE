/*
 * Esta clase permite generar .jar a partir de un folder especifico
 */

package IDE.Compressor;

import FileManager.Facade_FileManager;
import IDE.Compressor.GJar;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.jar.JarEntry;
import java.util.jar.JarOutputStream;
import java.util.zip.Deflater;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 *
 * @author Carlos Andres Sepulveda Sanchez
 */
public class GZip {
    /**
     * @param args the command line arguments
     */

    private String ex;

    public GZip(){

    }
    /*
     * Recibe la ruta o folder que contiene los archivos para comprimir dentro del jar,
     * la ruta destino donde se almacenara el .jar
     * el nombre del archivo .jar a generar
     */
    public boolean generateZIP(ArrayList<String[]> folders,String parentFolder,String fdestino,String JarName){
        try{

        File jarFile = new File(fdestino, JarName);
        byte[] buffer = new byte[1024];
        ZipOutputStream outJar = new ZipOutputStream(new FileOutputStream(jarFile));
        outJar.setLevel(Deflater.DEFAULT_COMPRESSION);
        boolean re=true;
        
        int nivel=0;
        if(parentFolder!=null){
            if(!parentFolder.isEmpty()){
                 
                 nivel=1;
            }
        }
          for(String[] folder: folders)
             re=re&&this.generateZIP(outJar, buffer,folder[0],folder[1],parentFolder,nivel);
          
          
        outJar.close();
        return re;
        }
        catch(Exception e){
            System.out.println("Error al intentar generar el .zip");
            return false;}
    }

    /*
     * Metodo recursivo que recibe el flujo de Salida del Jar, el buffer,
     * la ruta padre absoluto, la ruta padre dentro del jar, y el nivel de profundidad
     */
    private boolean generateZIP(ZipOutputStream outJar,byte[] buffer,String ruta,String padre,String pj,int nivel){

        System.out.println("Generar Zip : ruta = "+ruta+"   padre = "+padre+"  pj = "+pj+"  nivel = "+nivel);
      try{

        if(!GJar.esFolder(padre+"/"+ruta)&& padre!=null){//si no es un folder, es un archivo
        System.out.println("Es un archivo : "+ruta);
        //Escribiendo el segundo fichero

if(this.ex!=null){if(this.esExclu(ruta))return true;}//evalua si es un archivo a excluir

        ZipEntry jarEntry = new ZipEntry(pj+"/"+ruta);
            outJar.putNextEntry(jarEntry);

            // Leyendo los datos del fichero y escribiendolos en el Jar

            FileInputStream input= new FileInputStream(new File(padre,ruta));
            int count;
            while( ( count = input.read(buffer, 0, 1024 ) ) != -1 ){
                outJar.write(buffer, 0, count);
            }

            outJar.closeEntry();
            input.close();
            return true;
        }//fin del if que valida si es un archivo
        String[] rutas=null;
        if(padre!=null)rutas=Facade_FileManager.getReference().toListFile(padre+"/"+ruta);
        else rutas=Facade_FileManager.getReference().toListFile(ruta);//en caso de ser la carpeta inicial ("src")
        if(rutas==null)return true;

        for(String r:rutas){
           if(nivel==0)
             this.generateZIP(outJar, buffer, r, ruta,"",nivel+1);
           else{
             if(nivel==1)this.generateZIP(outJar, buffer, r,padre+"/"+ruta,pj+"/"+ruta,nivel+1);
             else this.generateZIP(outJar, buffer, r, padre+"/"+ruta, pj+"/"+ruta,nivel+1);
           }
        }
        return true;}catch(Exception e){System.out.println(e.getMessage());return false;}
    }
    /*
     * Recibe la direccion del folder que se desea listar
     * retorna un vector de String con los nombres de los ficheros pertenecientes a dicho folder
     */
    public static String[] listarFicheros(String folder){

        return new File(folder).list();

    }

    /*
     * Recibe un String con el nombre de la ruta a evaluar
     * Retorna un true en caso de que la ruta llegue a ser un directorio
     */
    public static boolean esFolder(String folder){
        return new File(folder).isDirectory();
    }


    /*
     * Recibe el nombre de un fichero y evalua si su extension es igual
     * a lo almacenado en el atributo ex
     */
    private boolean esExclu(String file){
        return file.endsWith(this.ex);
    }



    /*
     * Asigna a el atributo ex lo que contenga el parametro exc
     */
    public void setExclu(String exc){
        this.ex=exc;
    }
}
