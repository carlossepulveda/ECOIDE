/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package FileManager;

import Util.Separator;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;

/**
 *
 * @author cas
 */
public class Control_FileManager {
    
    private static final String images="png;jpeg;jpg;gif";
    private static final String doc="doc;docx;txt";
    private static final String pdf="pdf";
    private static final String sound="mp3;wav";
    private static final String video="avi;mov;mp4;flv;mpeg";
    
    public static final String typeImage="image";
    public static final String typeDoc="document";
    public static final String typePdf="pdf";
    public static final String typeSound="sound";
    public static final String typeVideo="video";
    public static final String typeFile="file";
    
    
    public boolean createFolder(String url,String name){
    
        try{
        
            File file=new File(url+Separator.getSystemSeparator()+name);
            file.mkdir();
            file=null;
            return true;
            
        }
        catch(Exception e){
            
            System.out.println("Clase: Control_FileManager - Metodo createFolder(url,name) - Error: "+e.getMessage());
            return false;
            
        }
    
    
    }
    public boolean createFile(String path){
    
        try{new File(path).createNewFile();return true;}
        catch(Exception e){return false;}
    
    }
    
    public String renameFolder(String path,String newName){
    
        try{
        File f1=new File(path);
        File f2=new File(f1.getParent()+Separator.getSystemSeparator()+newName);
        return this.rename(f1, f2);
        
        }
        catch(Exception e){
            System.out.println("Clase Control_FileManager : Metodo: renameFolder(String path,String newName) : Error: "+e.getMessage());
            return null;
        }
    
    
    }
    
    public String renameFile(String path,String newName){
    
        try{
            
        File f1=new File(path);
        File f2=new File(f1.getParent()+Separator.getSystemSeparator()+newName);
        return this.rename(f1, f2);
        
        }
        catch(Exception e){
            System.out.println("Clase Control_FileManager : Metodo: renameFile(String path,String newName) : Error: "+e.getMessage());
            return null;
        }
    
    }
    
    private String rename(File fo,File fn){
        try{
           fo.renameTo(fn);
           return fo.getParent()+Separator.getSystemSeparator()+fn.getName();
        }catch(Exception e){
            System.out.println("Clase Control_FileManager : Metodo: rename(File f0,fn) : Error: "+e.getMessage());
            return null;
        }
    }
    public boolean writeFile(String url,ArrayList<String> text){
    
       		
	try{
	  BufferedWriter bw = 
	  new BufferedWriter(new FileWriter(url));
		
              if(text!=null){
                  for (String x:text)
                 	bw.write( x + "\n");
                   }
                          
		  bw.close();
                         
                          
        } catch (IOException ioe){
		System.out.println("Clase: Control_FileManager - Metodo: writeFile - Error: "+ioe.getMessage());
                return false;
	}
		
    
        return true;
    
    }
    public boolean copyFile(String start,String end){
       
       try{
        InputStream in = new FileInputStream(start);
        OutputStream out = new FileOutputStream(end);
        byte[] buf = new byte[1024];
        int len;
 
        while ((len = in.read(buf)) > 0) {
         out.write(buf, 0, len);
            }
        
        in.close();
        out.close();
        
        return true;
        
       }catch(Exception e){
       
           System.out.println("Clase Control_FileManager - Metodo: copyFile(start,end) - Error: "+e.getMessage());
           return false;
       
       }
        
    
    }
    public boolean copyFolder(String start,String end){
        
       try{
        File folI=new File(start);
        this.createFolder(end, folI.getName());
        String[] files=this.toListFile(start);
        
        for(String x: files)
             this.copyFiles(start+Separator.getSystemSeparator()+x,end+Separator.getSystemSeparator()+folI.getName());
        return true;
       }catch(Exception e){
       
           System.out.println("Clase Control_FileManager - Metodo: copyFile(start,end) - Error: "+e.getMessage());
           return false;
       
       }
        
    
    }
    
    private boolean copyFiles(String file,String endFolder){
       
         File f=new File(file);
        if(f.isFile())return this.copyFile(file,endFolder+Separator.getSystemSeparator()+f.getName()); 
        
        this.createFolder(endFolder, f.getName());
        String[] files=this.toListFile(file);
        if(files==null)return true;
        if(files.length==0)return false;
        for(String x:files)
            this.copyFiles(file+Separator.getSystemSeparator()+x,endFolder+Separator.getSystemSeparator()+f.getName());
        
        return true;
    }
    
    public String readFilePlain(String path){
        
        String textPlain=null;
        try{
            textPlain="";
	  BufferedReader br = 
	  new BufferedReader(new FileReader(path));
	
          String sCadena;
          String div="";
          while ((sCadena = br.readLine())!=null) {
                     textPlain+=div+sCadena;
                     div="\n";
             }
        
          br.close();
          
                         
                          
        } catch (IOException ioe){
		System.out.println("Clase: Control_FileManager - Metodo: writeFile - Error: "+ioe.getMessage());
                return null;
	}
		
        return textPlain;
        
    }
    
    public ArrayList<String> readFilePlainByLines(String path){
        
        ArrayList<String> textPlain=null;
        try{
           textPlain=new ArrayList<String>();
	  BufferedReader br = 
	  new BufferedReader(new FileReader(path));
	
          String sCadena;
          while ((sCadena = br.readLine())!=null) {
                     
              textPlain.add(sCadena);
             }
        
          br.close();
          
                         
                          
        } catch (IOException ioe){
		System.out.println("Clase: Control_FileManager - Metodo: writeFile - Error: "+ioe.getMessage());
                return null;
	}
		
        return textPlain;
        
    }
    public boolean deleteFile(String path){
        
        try{
            File f=new File(path);
             if(f.exists())f.delete();
            return true;
        }catch(Exception e){System.out.println("Clase Control_FileManager - Metodo: deleteFile - Error: "+e.getMessage());return false;}
    
    }
    public String getFileType(String pathFile){
        
        try{
        
        String nameFile=new File(pathFile).getName();
        String[] sp=nameFile.split("\\.");
        if(sp.length==1)return Control_FileManager.typeFile;
        if(images.contains(sp[1]))return Control_FileManager.typeImage;
        if(doc.contains(sp[1]))return Control_FileManager.typeDoc;
        if(pdf.contains(sp[1]))return Control_FileManager.typePdf;
        if(sound.contains(sp[1]))return Control_FileManager.typeSound;
        if(video.contains(sp[1]))return Control_FileManager.typeVideo;
        return Control_FileManager.typeFile;
        
        }
        catch(Exception e){
            
            System.out.println("Clase: Control_FileManager - Metodo : getFileType - Error: "+e.getMessage());
            return null;
            
        }
    }
    public static void main(String[] args){
        String f="carlos";
       
        
    
    }
    
    
    /*
     * Recibe la direccion del folder que se desea listar
     * retorna un vector de String con los nombres de los ficheros pertenecientes a dicho folder
     */
    public String[] toListFile(String folder){

        try{
        return new File(folder).list();}
        catch(Exception e){System.out.println("Clase Control_FileManager -  Metodo : toListFile(String folder)  -  Error : "+e.getMessage());return null;}

    }
    
    /*
     * Recibe la direccion del folder que se desea listar
     * retorna un vector de String con los nombres de los ficheros pertenecientes a dicho folder
     */
    public boolean existFile(String folder,String file){

        String[] files=this.toListFile(folder);
        for(String x: files){
            if(x.equals(file))return true;
        }
     return false;
    }
    
     /*
     * Recibe un String con el nombre de la ruta a evaluar
     * Retorna un true en caso de que la ruta llegue a ser un directorio
     */
    public boolean isFolder(String folder){
        
        try{
        return new File(folder).isDirectory();}
        catch(Exception e){System.out.println("Clase Control_FileManager -  Metodo : isFolder(String folder)  -  Error : "+e.getMessage());return false;}

    }

    public boolean deleteFilesIn(String folder) {
       return this.deleteFilesIn_(folder);
    }
    
    public boolean deleteFolder(String folder) {
       return this.deleteFilesIn__(folder);
    }
    
    private boolean deleteFilesIn__(String file){
        File f=new File(file);
        if(f.isFile())return this.deleteFile(file); 
        
        String[] files=this.toListFile(file);
        if(files!=null){
        for(String x:files)
            this.deleteFilesIn__(file+Separator.getSystemSeparator()+x);
        }
        return this.deleteFile(file);
        
        
    }
    
    private boolean deleteFilesIn_(String file){
        
        File f=new File(file);
        if(f.isFile())return this.deleteFile(file); 
        
        String[] files=this.toListFile(file);
        if(files==null)return true;
        if(files.length==0)return false;
        for(String x:files)
            this.deleteFilesIn_(file+Separator.getSystemSeparator()+x);
        
        return this.deleteFile(file);
        
        
    }
    
   
    
    public String getExtension(String name){
        
      try{
          String[] s=name.split("\\.");
          if(s==null)return null;
          if(s.length<2)return null;
          return s[s.length-1];
      }
      catch(Exception e){return null;}
      
    }

    public boolean haveAnyExtension(String name,String[] extension) {
        
        if(name==null)return false;
        if(extension==null)return true;
        String nfe=this.getExtension(name);
        if(nfe==null)
        return false;
        for(String e:extension){
            if(nfe.equals(e))return true;
        }
        return false;
    }
}
