/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package IDE.ProjectsManager;

import java.util.ArrayList;
import java.util.Date;
import org.w3c.dom.Document;

/**
 *
 * @author cas
 */
public class Facade_ProjectsManager{
   
    private Control_ProjectsManager controlProjects;
    
    public Facade_ProjectsManager(){
    
        controlProjects=new Control_ProjectsManager();
    
    }
    
    public boolean loadProject(String name,String owner,String pathOwner,String user){
   
       return controlProjects.loadProject(name,owner, pathOwner,user);       
   
   }
    
    public boolean createProject(String name,String owner,Date createDate,String pathOwner,ArrayList<String[]>libs){
   
       return controlProjects.createProject(name, owner, createDate, pathOwner,libs);
   
   }
    
    public boolean renameProject(String name,String owner,String pathOwner,String newName,String user){
        return controlProjects.renameProject(name,owner, pathOwner, newName,user);
    }
    
    public boolean renameProject_(String name,String owner,String pathOwner,String newName,String user){
        return controlProjects.renameProject_(name,owner, pathOwner, newName,user);
    }
    
    public boolean renameClass(String name,String owner,String pathOwner,String nPackage,String nameC,String newNameC){
        
        return controlProjects.renameClass(name,owner,pathOwner,nPackage,nameC,newNameC);
        
    }
    
    public boolean renameGUIClass(String name,String owner,String pathOwner,String nPackage,String nameC,String newNameC){
        
        return controlProjects.renameGUIClass(name,owner,pathOwner,nPackage,nameC,newNameC);
        
    }
    
    public boolean renameLib(String name,String owner,String pathOwner,String nameL,String newName){
        
        return controlProjects.renameLib(name, owner, pathOwner, nameL, newName);
        
    }
    
    public boolean renameFile(String name,String owner,String pathOwner,String nPackage,String nameF,String newNameF){
        
        return controlProjects.renameFile(name,owner,pathOwner,nPackage,nameF,newNameF);
    }
    
    public boolean renamePackage(String name,String owner,String pathOwner,String nPackage,String newNameP){
    
        return this.controlProjects.renamePackage(name,owner,pathOwner,nPackage,newNameP);
    }
 
    public boolean deleteProject(String name, String owner, String pathOwner) {
        
        return this.controlProjects.deleteProject(name, owner, pathOwner);
    } 
    
    public boolean deleteProject_(String name,String owner,String pathOwner,String user){
     
        return this.controlProjects.deleteProject_(name, owner, pathOwner, user);
    }
    
    public boolean closeProject(String name,String owner){
        return controlProjects.closeProject(name,owner);
    }
    
    public boolean addPackage(String name,String owner, String pathOwner, String nPackage){
    
        return this.controlProjects.addPackage(name,owner, pathOwner, nPackage);
    
    }
    
    public boolean addClass(String name,String owner,String pathOwner,String nPackage,String nameC,String user){
        return this.controlProjects.addClass(name,owner,pathOwner,nPackage,nameC,user);
    }
    
    public boolean addGUIClass(String name,String owner,String pathOwner,String nPackage,String nameC){
        
        return this.controlProjects.addGUIClass(name, owner, pathOwner, nPackage, nameC);
        
    }
    
    public boolean addNewFile(String name,String owner, String pathOwner, String nPackage, String nameFile) {
        return this.controlProjects.addNewFile(name,owner, pathOwner, nPackage, nameFile);
    }
    
    public boolean addFile(String ruta,String nameP,String owner,String pack, String name, String pathCopy){
        return this.controlProjects.addFile(ruta, nameP, owner, pack, name, pathCopy);
    }
    
    public boolean addClassExisting(String ruta,String nameP,String owner,String pack, String name, String pathCopy){
       
       return this.controlProjects.addClassExisting( ruta, nameP, owner, pack, name, pathCopy);
       
       
   }
    
     public boolean addGUIClassExisting(String ruta, String nameP, String owner, String pack, String name, String pathCopy) {
        
         return this.controlProjects.addGUIClassExisting( ruta, nameP, owner, pack, name, pathCopy);
    }
    
    public boolean addLibJAR(String name,String owner,String pathOwner,String ap,String nameL) {
        
       return this.controlProjects.addLibJAR(name,owner,pathOwner,ap,nameL);
        
    }
    /**Query Methods**/  
    
    //Return a xml file that contain information about a project
    public Document getDataProjectXML(String name,String owner,String ruta){
            
        return this.controlProjects.getDataProjectXML(name, owner,ruta);
    
    }
    //Return a xml file that contain information about project packages
    public Document getPackagesProjectXML(String name,String owner,String ruta) {
        
        return this.controlProjects.getPackagesProjectXML(name, owner,ruta);
        
    }    
    //Return a xml file that containt information about project classes
    public Document getClassesProjectXML(String name,String owner,String ruta) {
        
        return this.controlProjects.getClassesProjectXML(name, owner,ruta); 
        
    } 
    
    public Document getClassesProjectXML_(String name,String owner,String ruta,String user) {
        
        return this.controlProjects.getClassesProjectXML_(name, owner,ruta,user); 
        
    }
     
    public Document getClassFilesProjectXML(String name,String owner,String ruta) {
        
        return this.controlProjects.getClassFilesProjectXML(name, owner,ruta);
        
    } 
    //Return a xml file that containt information about project files
    public Document getOtherFilesProjectXML(String name,String owner,String ruta) {
        
        return this.controlProjects.getOtherFilesProjectXML(name, owner,ruta);
        
    }    
    //Return a xml file that containt information about project libraries
    public Document getLibsProjectXML(String name,String owner,String ruta) {
        
        return this.controlProjects.getLibsProjectXML(name, owner,ruta);
        
    }
    
    public Document getLibsProjectXML_(String name,String owner,String ruta) {
        
        return this.controlProjects.getLibsProjectXML_(name, owner,ruta);
    }
    
    public String getLibsFolder(String name,String owner,String ruta) {
        
        return this.controlProjects.getLibsFolder(name, owner, ruta);
    }
    public Document getClassXML(String name,String owner, String pathOwner, String nPackage, String nameF) {
        
       return this.controlProjects.getClassXML(name,owner, pathOwner, nPackage, nameF);
        
    }
    
    public String getGUIClassJSON(String name,String owner, String pathOwner, String nPackage, String nameF) {
        
       return this.controlProjects.getGUIClassJSON(name,owner, pathOwner, nPackage, nameF);
        
    }
    
    public Document getFileXML(String name,String owner, String pathOwner, String nPackage, String nameF){
        
        return this.controlProjects.getFileXML(name,owner,pathOwner,nPackage,nameF);
    }

    /**Delete methods**/
    
    public boolean deleteClass(String name,String owner,String pathOwner,String nPackage,String nameC){
        
        return this.controlProjects.deleteClass(name,owner,pathOwner,nPackage,nameC);
        
    }
    
    public boolean deleteGUIClass(String name,String owner,String pathOwner,String nPackage,String nameC){
        
        return this.controlProjects.deleteGUIClass(name,owner,pathOwner,nPackage,nameC);
        
    }
    
    public boolean deleteFile(String name,String owner, String pathOwner, String nPackage, String nameF){
     
        return this.controlProjects.deleteFile( name, owner, pathOwner, nPackage, nameF);
    }
    
    public boolean deleteLib(String name,String owner, String pathOwner, String nameL) {
        
       return this.controlProjects.deleteLib(name, owner, pathOwner, nameL);
        
    }
    
    public boolean deletePackage(String name,String owner,String pathOwner,String nameL) {
        
       return this.controlProjects.deletePackage(name,owner,pathOwner,nameL);
        
    }
   
  
    public boolean haveProject(String name,String owner){
        
        return this.controlProjects.haveProject(name, owner);
        
    }

    public boolean toRegisterClassFiles(String name, String owner,String pathOwner) {
        
        return this.controlProjects.toRegisterClassFiles(name, owner,pathOwner);
    }
    
    public boolean setMainClass(String name, String owner,String pathOwner,String nameC,String pack) {
        
        return this.controlProjects.setMainClass(name, owner, pathOwner,nameC,pack);
    }   
    
    
    public String getMainClass(String name, String owner,String ruta) {
        
        return this.controlProjects.getMainClass(name, owner,ruta);
    }
    
    public String getMainClass_(String name, String owner,String ruta,String user) {
        
        return this.controlProjects.getMainClass_(name, owner, ruta, user);
    }

    public Document getUsersProject(String name, String owner, String pathOwner) {
        
        return this.controlProjects.getUsersProject(name, owner,pathOwner);
    }
    
    public Document getUsersProject_(String name, String owner,String pathOwner,String user) {
        
        return this.controlProjects.getUsersProject_(name, owner,pathOwner,user);
    }

    public String getRealPathClass(String name, String owner, String nPackage, String nameC,String pathOwner) {
        return this.controlProjects.getRealPathClass(name,owner,nPackage,nameC,pathOwner);
    }

    public String getRealPathFile(String name, String owner, String nPackage, String nameF,String pathOwner) {
        
      return this.controlProjects.getRealPathFile(name,owner,nPackage,nameF,pathOwner);   
        
    }

    public String getRealPathLib(String name, String owner, String nameL, String pathOwner) {
        return this.controlProjects.getRealPathLib(name,owner,nameL,pathOwner);
    }

    public boolean saveGUIClass(String name, String owner, String nPackage, String nameG, Document d,String pathOwner) {
        return controlProjects.saveGUIClass(name,owner,nPackage,nameG,d,pathOwner);
    }
    
    public String toStringProjects(){
        return controlProjects.toStringProjects();
   }

   public boolean shareProject(String name,String owner,String user,String type,String pathOwner){
        return controlProjects.shareProject(name,owner,user,type,pathOwner);
    }
    
   public boolean shareProject_(String name,String owner,String user,String type,String pathOwner,String userE){
       
      return controlProjects.shareProject_(name,owner,user,type,pathOwner,userE);
       
    }
   public String getUserType(String name, String owner,String pathOwner) {
        return controlProjects.getUserType(name,owner,pathOwner);
    }
   public String getUserType_(String name, String owner,String user,String pathOwner) {
        return controlProjects.getUserType_(name,owner,user,pathOwner);
    }

    public boolean deleteUserProjects(String name, String owner, String user, String pathOwner) {
        return controlProjects.deleteUserProjects(name,owner,user,pathOwner);
    }

    public boolean closeProjects() {
        return controlProjects.closeProjects();
    }
   
    public ArrayList<String[]> getFoldersToCompress(String name,String owner,String pathOwner){
        
        return controlProjects.getFoldersToCompress(name,owner,pathOwner);
      
    }
    
    public ArrayList<String[]> getFoldersToExecutableCompress(String name,String owner,String pathOwner){
        
        return controlProjects.getFoldersToExecutableCompress(name,owner,pathOwner);
      
    }
    
    public void setNameProject(String name,String owner,String newName){
        
         controlProjects.setNameProject(name, owner, newName);
        
    }

    public boolean changeUserPrivilege(String name, String owner, String user, String type, String pathOwner) {
       
        return controlProjects.changeUserPrivilege(name,owner,user,type,pathOwner);
    }
    
    public boolean changeUserPrivilege_(String name, String owner, String user, String type, String pathOwner,String userE) {
       
        return controlProjects.changeUserPrivilege_(name,owner,user,type,pathOwner,userE);
    }

    public String getExecuteFolder(String name, String owner) {
        
        return controlProjects.getExecuteFolder(name,owner);
    }

    public boolean deleteViewProject(String name, String owner, String user, String pathOwner) {
        return controlProjects.deleteViewProject(name,owner,user,pathOwner);
    }
    public boolean deleteViewProject_(String name, String owner, String user, String pathOwner) {
        return controlProjects.deleteViewProject_(name,owner,user,pathOwner);
    }
  
}
