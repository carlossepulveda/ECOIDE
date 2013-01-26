/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package IDE.Compressor;

import FileManager.Facade_FileManager;
import Util.Separator;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.jar.JarEntry;
import java.util.jar.JarOutputStream;
import java.util.zip.Deflater;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

/**
 *
 * @author cas
 */
public class Control_Compressor {
    
    private GJar myControl_JAR;
    private GZip myControl_ZIP;
    
    public Control_Compressor(){
        myControl_JAR=new GJar();
        myControl_ZIP=new GZip();
    }
    
    public boolean buildJAR(String pathClass,Document classes,String pathFiles,Document files,String nameJAR,String pathOut){
       
        return buildJAR_(pathClass,classes,pathFiles,files,nameJAR,pathOut);
    }

    //GJar
    private boolean buildJAR_(String pathClass,Document classes,String pathFiles,Document files,String nameJAR,String pathOut) {
        
        try{
       
        File jarFile = new File(pathOut, nameJAR);
        byte[] buffer = new byte[1024];
        JarOutputStream outJar = new JarOutputStream(new FileOutputStream(jarFile));
        outJar.setLevel(Deflater.DEFAULT_COMPRESSION);
      
        NodeList nl=files.getDocumentElement().getChildNodes();
                 
      //add .class files
        for(int i=0;i<nl.getLength();i++){
            
            try{

                        String pathR=nl.item(i).getAttributes().getNamedItem("path").getTextContent();
                        JarEntry jarEntry = new JarEntry(pathR);
                        outJar.putNextEntry(jarEntry);

                        // Leyendo los datos del fichero y escribiendolos en el Jar

                        FileInputStream input= new FileInputStream(new File(pathFiles+Separator.getSystemSeparator()+pathR));
                        int count;
                        while( ( count = input.read(buffer, 0, 1024 ) ) != -1 ){
                            outJar.write(buffer, 0, count);
                        }

                        outJar.closeEntry();
                        input.close();
  
            
         }catch(Exception e){System.out.println("Clase : Control_Compressor  -  Metodo : buildJAR_(String pathClass,Document classes,String pathFiles,Document files,String nameJAR,String pathOut) -  Error : (Grabando archivos)\t"+e.getMessage());return false;}
        
       }
        
        
        
        
        
        nl=classes.getDocumentElement().getChildNodes();
        
        for(int i=0;i<nl.getLength();i++){
            
            try{

                        String pathR=nl.item(i).getAttributes().getNamedItem("path").getTextContent();
                        JarEntry jarEntry = new JarEntry(pathR);
                        outJar.putNextEntry(jarEntry);

                        // Leyendo los datos del fichero y escribiendolos en el Jar

                        FileInputStream input= new FileInputStream(new File(pathClass+Separator.getSystemSeparator()+pathR));
                        int count;
                        while( ( count = input.read(buffer, 0, 1024 ) ) != -1 ){
                            outJar.write(buffer, 0, count);
                        }

                        outJar.closeEntry();
                        input.close();
  
            
         }catch(Exception e){System.out.println("Clase : Control_Compressor  -  Metodo : buildJAR_(String pathClass,Document classes,String pathFiles,Document files,String nameJAR,String pathOut) - Error : (Grabando .class)\t"+e.getMessage());return false;}
        
       }//end .class for
     
            try {
                outJar.close();
            } catch (IOException ex) {
                System.out.println("Clase :  Control_Compressor  -  Metodo : builJAR_(String pathClass,Document classes,String pathFiles,Document files,String nameJAR,String pathOut) -  Error :  (Cerrando outJAR)\t"+ex.getMessage());return false;
            }
        }catch(Exception e){
            System.out.println("Clase :  Control_Compressor  -  Metodo : builJAR_(String pathClass,Document classes,String pathFiles,Document files,String nameJAR,String pathOut) -  Error :  (Cerrando outJAR)\t"+e.getMessage());
            return false;}
        return true;
     
    }
   
  
    
    public boolean buildExecuteJAR(String folderSOURCE,String pathFiles, Document files, String nameJAR,String pathOut, String pathMANIFEST){
    
        return buildExecuteJAR_(folderSOURCE, pathFiles, files, nameJAR,pathOut,pathMANIFEST);
    }
    
    
    ///GJar
    private boolean buildExecuteJAR_(String folderSOURCE,String pathFiles, Document files, String nameJAR,String pathOut,String pathMANIFEST){
   
          try{

            File jarFile = new File(pathOut+Separator.getSystemSeparator()+nameJAR);
            byte[] buffer = new byte[1024];
            JarOutputStream outJar = new JarOutputStream(new FileOutputStream(jarFile));
            outJar.setLevel(Deflater.DEFAULT_COMPRESSION);
            boolean re=true;
            String[] folders=Facade_FileManager.getReference().toListFile(folderSOURCE);

            for(String cu:folders){
                 re=re&&this.generateJAR(outJar, buffer, folderSOURCE+Separator.getSystemSeparator()+cu, null, null, 1);
            }

            NodeList nl=files.getDocumentElement().getChildNodes();

          //add files
            for(int i=0;i<nl.getLength();i++){

                try{

                            String pathR=nl.item(i).getAttributes().getNamedItem("path").getTextContent();
                            JarEntry jarEntry = new JarEntry(pathR);
                            outJar.putNextEntry(jarEntry);

                            // Leyendo los datos del fichero y escribiendolos en el Jar

                            FileInputStream input= new FileInputStream(new File(pathFiles+Separator.getSystemSeparator()+pathR));
                            int count;
                            while( ( count = input.read(buffer, 0, 1024 ) ) != -1 ){
                                outJar.write(buffer, 0, count);
                            }

                            outJar.closeEntry();
                            input.close();


             }catch(Exception e){System.out.println("Clase : Control_Compressor  -  Metodo : buildJAR(String folderSOURCE,String pathFiles, Document files, String nameJAR,String pathOut) -  Error : (Grabando archivos)\t"+e.getMessage());return false;}

           }
            
            try{

                      
                        JarEntry jarEntry = new JarEntry("META-INF/MANIFEST.MF");
                        outJar.putNextEntry(jarEntry);

                        // Leyendo los datos del fichero y escribiendolos en el Jar

                        FileInputStream input= new FileInputStream(new File(pathMANIFEST));
                        int count;
                        while( ( count = input.read(buffer, 0, 1024 ) ) != -1 ){
                            outJar.write(buffer, 0, count);
                        }

                        outJar.closeEntry();
                        input.close();
  
            
           }catch(Exception e){System.out.println("Clase : Control_Compressor  -  Metodo : buildJAR_(String pathClass,Document classes,String pathFiles,Document files,String nameJAR,String pathOut) - Error : (Grabando MANIFIEST.MF)\t"+e.getMessage());return false;}
        
        

            outJar.close();
            return re;
        }
        catch(Exception e){
            System.out.println("Clase: Control_Compressor  -  Metodo buildJAR(String folderSOURCE,String pathFiles, Document files, String nameJAR,String pathOut)  -  Error : "+e.getMessage());
            return false;
        }
      
    
        
        
        
        
    }
    
    
    
    
    //GJar
     public boolean buildJAR(String folderSOURCE,String pathFiles, Document files, String nameJAR,String pathOut){
    
        try{

            File jarFile = new File(pathOut+Separator.getSystemSeparator()+nameJAR);
            byte[] buffer = new byte[1024];
            JarOutputStream outJar = new JarOutputStream(new FileOutputStream(jarFile));
            outJar.setLevel(Deflater.DEFAULT_COMPRESSION);
            boolean re=true;
            String[] folders=Facade_FileManager.getReference().toListFile(folderSOURCE);

            for(String cu:folders){
                 re=re&&this.generateJAR(outJar, buffer, folderSOURCE+Separator.getSystemSeparator()+cu, null, null, 1);
            }

            NodeList nl=files.getDocumentElement().getChildNodes();

          //add files
            for(int i=0;i<nl.getLength();i++){

                try{

                            String pathR=nl.item(i).getAttributes().getNamedItem("path").getTextContent();
                            JarEntry jarEntry = new JarEntry(pathR);
                            outJar.putNextEntry(jarEntry);

                            // Leyendo los datos del fichero y escribiendolos en el Jar

                            FileInputStream input= new FileInputStream(new File(pathFiles+Separator.getSystemSeparator()+pathR));
                            int count;
                            while( ( count = input.read(buffer, 0, 1024 ) ) != -1 ){
                                outJar.write(buffer, 0, count);
                            }

                            outJar.closeEntry();
                            input.close();


             }catch(Exception e){System.out.println("Clase : Control_Compressor  -  Metodo : buildJAR(String folderSOURCE,String pathFiles, Document files, String nameJAR,String pathOut) -  Error : (Grabando archivos)\t"+e.getMessage());return false;}

           }

            outJar.close();
            return re;
        }
        catch(Exception e){
            System.out.println("Clase: Control_Compressor  -  Metodo buildJAR(String folderSOURCE,String pathFiles, Document files, String nameJAR,String pathOut)  -  Error : "+e.getMessage());
            return false;
        }
      
    
    
    
    }
    
    
    
    
    
    
    
    /*
     * Metodo recursivo que genera un .jar con ficheros de diferentes folders
     *
     */

     public boolean generateJAR(JarOutputStream outJar,byte[] buffer,String ruta,String padre,String pj,int nivel){

      
      try{
      boolean ax=false;
        if(nivel==1){
            if(!Facade_FileManager.getReference().isFolder(ruta)){
                 
                  ax=true;
            }

        }
        else{
           ax=!Facade_FileManager.getReference().isFolder(padre+Separator.getSystemSeparator()+ruta);
           
        }
      if(ax){
          JarEntry jarEntry = new JarEntry(pj+Separator.getSystemSeparator()+ruta);
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
            if(nivel==1) this.generateJAR(outJar, buffer, r,ruta,new File(ruta).getName(),nivel+1);
            else this.generateJAR(outJar, buffer, r,padre+"/"+ruta,pj+"/"+ruta,nivel+1);
           
        }
        return true;}catch(Exception e){System.out.println("Clase :  Control_Compressor  -  Metodo : generateJAR(JarOutputStream outJar,byte[] buffer,String ruta,String padre,String pj,int nivel)  -  Error : "+e.getMessage());return false;}
    }
    
     
     
     public boolean generateZIP(ArrayList<String[]> folders,String parentFolder,String fdestino,String JarName){
         return new GZip().generateZIP(folders, parentFolder,fdestino, JarName);
     }
}
