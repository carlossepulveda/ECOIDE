/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package FileManager;

import java.util.ArrayList;

/**
 *
 * @author cas
 */
public final class Facade_FileManager{

    private static Facade_FileManager FacadeFileManager = new Facade_FileManager();
    private Control_FileManager myControlFileManager;
    
    private Facade_FileManager(){
        myControlFileManager=new Control_FileManager();
    }
    
    public static Facade_FileManager getReference() {
        return FacadeFileManager;
    }
    
   
    public boolean createFolder(String url,String name){
 
       return myControlFileManager.createFolder(url, name);    
    
    }
  
    public boolean createFile(String path){
    
        return myControlFileManager.createFile(path);
    
    }
 
    public String renameFolder(String path,String newName){
    
        return myControlFileManager.renameFolder(path, newName);
     
    }
   
    public String renameFile(String path,String newName){
    
       return myControlFileManager.renameFile(path, newName); 
    }
    
    public boolean writeFile(String url,ArrayList<String> text){
    
        return myControlFileManager.writeFile(url, text);
    
    }
  
    public String readFilePlain(String url){
    
        return myControlFileManager.readFilePlain(url);
    
    }
    
 
    public ArrayList<String> readFilePlainByLines(String path){
       
            return myControlFileManager.readFilePlainByLines(path);
    }
 
    public boolean copyFile(String start,String end){        
      
        return myControlFileManager.copyFile(start, end);        
    
    }
    
  
    public boolean copyFolder(String start,String end){
        
        return myControlFileManager.copyFolder(start, end);
    }
  
    
    public boolean deleteFile(String path){
    
        return myControlFileManager.deleteFile(path);
        
    }

    public String getFileType(String pathFile){
        
        return myControlFileManager.getFileType(pathFile);
    }


     public String[] toListFile(String folder){
         
         return myControlFileManager.toListFile(folder);
     }
     
   
     public boolean existFile(String folder,String file){
         return myControlFileManager.existFile(folder, file);
     }
             
    
     public boolean isFolder(String folder){
         
         return myControlFileManager.isFolder(folder);
     }


    public boolean deleteFilesIn(String folder) {
        
        return myControlFileManager.deleteFilesIn(folder);
        
    }
    
  
    public boolean deleteFolder(String folder) {
        
        return myControlFileManager.deleteFolder(folder);
    }
   
    
    public String getExtension(String name){
        
        return myControlFileManager.getExtension(name);
    }
    

    public boolean haveAnyExtension(String name,String[] extension){
        
        return myControlFileManager.haveAnyExtension(name,extension);
        
    }
    
}
