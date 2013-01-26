/*
 * Esta clase permite generar .jar a partir de un folder especifico
 */

package IDE.Compressor;

import FileManager.Facade_FileManager;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.jar.JarEntry;
import java.util.jar.JarOutputStream;
import java.util.zip.Deflater;

/**
 * 
 * @author Carlos Andres Sepulveda Sanchez
 */
public class GJar {
    /**
     * @param args the command line arguments
     */

    private String ex;

    public GJar(){

    }


    /*
     * Recibe un array de String que corresponden a las rutas de los ficheros que deben ser comprimidos en el .jar
     * la ruta destino donde se almacenara el .jar
     * el nombre del archivo .jar a generar
     */
    public boolean generarJAR(ArrayList<String> folders,String fdestino,String JarName){
      
        try{

        File jarFile = new File(fdestino, JarName);
        byte[] buffer = new byte[1024];
        JarOutputStream outJar = new JarOutputStream(new FileOutputStream(jarFile));
        outJar.setLevel(Deflater.DEFAULT_COMPRESSION);
        boolean re=true;
        for(String cu:folders){
        re=re&&this.generarJARdiferentesFolders(outJar, buffer, cu, null, null, 1);
        }
        outJar.close();
        return re;
        }
        catch(Exception e){
            System.out.println("Error al intentar generar el .jar, generarJARdireferentes primer metodos "+e.getMessage());
            return false;}
    }


    /*
     * Recibe la ruta o folder que contiene los archivos para comprimir dentro del jar,
     * la ruta destino donde se almacenara el .jar
     * el nombre del archivo .jar a generar
     */
    public boolean generarJAR(String folder,String fdestino,String JarName){
      
        try{
        
        File jarFile = new File(fdestino, JarName);
        byte[] buffer = new byte[1024];
        JarOutputStream outJar = new JarOutputStream(new FileOutputStream(jarFile));
        outJar.setLevel(Deflater.DEFAULT_COMPRESSION);
        boolean re=this.generarJAR(outJar, buffer,folder,null,null,0);
        outJar.close();
        return re;
        }
        catch(Exception e){
            System.out.println("Error al intentar generar el .jar eilson"+e.getMessage());
            return false;}
    }

    /*
     * Metodo recursivo que recibe el flujo de Salida del Jar, el buffer,
     * la ruta padre absoluto, la ruta padre dentro del jar, y el nivel de profundidad
     */
    public boolean generarJAR(JarOutputStream outJar,byte[] buffer,String ruta,String padre,String pj,int nivel){

        //System.out.println("Generar jar : ruta = "+ruta+"   padre = "+padre+"  pj = "+pj+"  nivel = "+nivel);
      try{

        if(!GJar.esFolder(padre+"/"+ruta)&& padre!=null){//si no es un folder, es un archivo
      //  System.out.println("Es un archivo : "+ruta);
        //Escribiendo el segundo fichero
      if(this.ex!=null){if(this.esExclu(ruta))return true;}//evalua si es un archivo a excluir

        JarEntry jarEntry = new JarEntry(pj+"/"+ruta);
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
             this.generarJAR(outJar, buffer, r, ruta,"",nivel+1);
           else{
             if(nivel==1)this.generarJAR(outJar, buffer, r,padre+"/"+ruta,ruta,nivel+1);
             else this.generarJAR(outJar, buffer, r, padre+"/"+ruta, pj+"/"+ruta,nivel+1);
           }
        }
        return true;}catch(Exception e){System.out.println(e.getMessage());return false;}
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




    /*
     * Metodo recursivo que genera un .jar con ficheros de diferentes folders
     *
     */

     public boolean generarJARdiferentesFolders(JarOutputStream outJar,byte[] buffer,String ruta,String padre,String pj,int nivel){

      
      try{
      boolean ax=false;
        if(nivel==1){
            if(!GJar.esFolder(ruta)){
                  if(this.ex!=null){if(this.esExclu(ruta))return true;}//evalua si es un archivo a excluir
                  ax=true;
            }

        }
        else{
            if(!GJar.esFolder(padre+"/"+ruta)){
                  if(this.ex!=null){if(this.esExclu(ruta))return true;}//evalua si es un archivo a excluir
                  ax=true;
            }
        }
      if(ax){
          JarEntry jarEntry = new JarEntry(pj+"/"+ruta);
          if(nivel==1){jarEntry=new JarEntry(new File(ruta).getName());}
            outJar.putNextEntry(jarEntry);

            // Leyendo los datos del fichero y escribiendolos en el Jar
            FileInputStream input;
            if(nivel==1)input= new FileInputStream(new File(ruta));
            else input= new FileInputStream(new File(padre,ruta));

            int count;
            while( ( count = input.read(buffer, 0, 1024 ) ) != -1 ){
                outJar.write(buffer, 0, count);
            }

            outJar.closeEntry();
            input.close();
            return true;
      }

        String[] rutas=null;
        if(padre!=null)rutas=Facade_FileManager.getReference().toListFile(padre+"/"+ruta);
        else rutas=Facade_FileManager.getReference().toListFile(ruta);//en caso de ser la carpeta inicial ("src")
        if(rutas==null)return true;

        for(String r:rutas){
            if(nivel==1) this.generarJAR(outJar, buffer, r,ruta,new File(ruta).getName(),nivel+1);
            else this.generarJAR(outJar, buffer, r,padre+"/"+ruta,pj+"/"+ruta,nivel+1);
           
        }
        return true;}catch(Exception e){System.out.println("Error al generar .jar, generarJArdiferentes folders, metodo recursivo2"+e.getMessage());return false;}
    }

     public static void main(String[] args){

        GJar gj=new GJar();
        ArrayList<String> am=new ArrayList<String>();
        am.add("/home/cas/Desktop/pruebaejecutable");
        gj.generarJAR(am,"/home/cas/Desktop", "Carlos.jar");
     }
}