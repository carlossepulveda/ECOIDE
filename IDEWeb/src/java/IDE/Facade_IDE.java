/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package IDE;

import IDE.ProjectsManager.Interface_ProjectsManager;
import java.util.ArrayList;
import java.util.Date;
import org.w3c.dom.Document;

/**
 *
 * @author cas
 */
public class Facade_IDE{
    
    private Control_IDE controlIDE;
    
    public Facade_IDE(){
        controlIDE=new Control_IDE();
    }
    
    
    /**
     * 
     *
     * 
     * Methods Compile
     * 
     *
     * 
     */
    
     public Document compileProject(String name,String owner,String pathOwner,boolean hidePath,String pathHide){
        
        return controlIDE.compileProject(name,owner, pathOwner,hidePath,pathHide);
        
        
    }
    
    
     
    /**
     * 
     *
     * 
     * Methods Execute
     * 
     *
     * 
     */  
     
     
     public Document executeProjectWEB(String name,String owner,String pathOwner,String pathWebConsoleLib,Document classWebClib,Document nameWebClib,String user,String namePathHide){
       
        return this.controlIDE.executeProjectWEB(name,owner, pathOwner,pathWebConsoleLib,classWebClib,nameWebClib,user,name);
            
    }

    
   
    
     /**
     * 
     *
     * 
     * Methods Projects Manager
     * 
     *
     * 
     */
    
    
     
     //
    public boolean loadProject(String name,String owner, String pathOwner,String user) {
        
         return this.controlIDE.loadProject(name,owner,pathOwner,user);
    }

    //
    public boolean createProject(String name, String owner, Date createDate, String pathOwner,ArrayList<String[]> libs) {
        
        return this.controlIDE.createProject(name, owner, createDate, pathOwner,libs);
    }

    //
    public boolean renameProject(String name, String owner, String pathOwner, String newName,String user) {
        
        return this.controlIDE.renameProject(name, owner, pathOwner, newName,user);
    }

    public boolean renameProject_(String name,String owner,String pathOwner,String newName,String user){
        return this.controlIDE.renameProject_(name,owner, pathOwner, newName,user);
    }
    
    //
    public boolean renameClass(String name, String owner, String pathOwner, String nPackage, String nameC, String newNameC) {
        
        return this.controlIDE.renameClass(name, owner, pathOwner, nPackage, nameC, newNameC);
    }
    
    //
    public boolean renameGUIClass(String name, String owner, String pathOwner, String nPackage, String nameC, String newNameC) {
        
        return this.controlIDE.renameGUIClass(name, owner, pathOwner, nPackage, nameC, newNameC);
    }
    
    public boolean renameLib(String name,String owner,String pathOwner,String nameL,String newName){
        
        return this.controlIDE.renameLib(name, owner, pathOwner, nameL, newName);
        
    }
    

    //
    public boolean renameFile(String name, String owner, String pathOwner, String nPackage, String nameF, String newNameF) {
        
        return this.controlIDE.renameFile(name, owner, pathOwner, nPackage, nameF, newNameF);
    }

    //
    public boolean renamePackage(String name, String owner, String pathOwner, String nPackage, String newNameP) {
        
        return this.controlIDE.renamePackage(name, owner, pathOwner, nPackage, newNameP);
    }
  
    //
    public boolean deleteProject(String name, String owner, String pathOwner,String user) {
        
        return this.controlIDE.deleteProject(name, owner, pathOwner,user);
    }    

    public boolean deleteProject_(String name,String owner,String pathOwner,String user) {
        
        return this.controlIDE.deleteProject_(name, owner, pathOwner,user);
    }
     
    //
    public boolean closeProject(String name, String owner) {
        
        return this.controlIDE.closeProject(name, owner);
    }

    //
    public boolean addPackage(String name, String owner, String pathOwner, String nPackage) {
       
        return this.controlIDE.addPackage(name, owner, pathOwner, nPackage);
    }

    //
    public boolean addClass(String name, String owner, String pathOwner, String nPackage, String nameC,String user) {
     
        return this.controlIDE.addClass(name, owner, pathOwner, nPackage, nameC,user);
    }

    //
    public boolean addGUIClass(String name,String owner,String pathOwner,String nPackage,String nameC){
        
        return this.controlIDE.addGUIClass(name, owner, pathOwner, nPackage, nameC);
        
    }
    
    //
    public boolean addNewFile(String name, String owner, String pathOwner, String nPackage, String nameFile) {
        
        return this.controlIDE.addNewFile(name, owner, pathOwner, nPackage, nameFile);
    }

    //
    public boolean addFile(String ruta, String nameP, String owner, String pack, String name, String pathCopy) {
        
        return this.controlIDE.addFile(ruta, nameP, owner, pack, name, pathCopy);
    }

    //
    public boolean addClassExisting(String ruta, String nameP, String owner, String pack, String name, String pathCopy) {
        
        return this.controlIDE.addClassExisting(ruta, nameP, owner, pack, name, pathCopy);
    }

    //
    public boolean addGUIClassExisting(String ruta, String nameP, String owner, String pack, String name, String pathCopy) {
        
        return this.controlIDE.addGUIClassExisting(ruta, nameP, owner, pack, name, pathCopy);
    }
    
    //
    public boolean addLibJAR(String name, String owner, String pathOwner, String ap, String nameL) {
        
        return this.controlIDE.addLibJAR(name, owner, pathOwner, ap, nameL);
    }

    //
    public Document getDataProjectXML(String name, String owner,String ruta) {
        
        return this.controlIDE.getDataProjectXML(name, owner,ruta);
    }

    //
    public Document getPackagesProjectXML(String name, String owner,String ruta) {
        
        return this.controlIDE.getPackagesProjectXML(name, owner,ruta);
    }

    //
    public Document getClassesProjectXML(String name, String owner,String ruta) {
        
        return this.controlIDE.getClassesProjectXML(name, owner,ruta);
    }
    
    public Document getClassesProjectXML_(String name, String owner,String ruta,String user) {
        
        return this.controlIDE.getClassesProjectXML_(name, owner,ruta,user);
    }

    //
    public Document getClassFilesProjectXML(String name, String owner,String ruta) {
        
        return this.controlIDE.getClassFilesProjectXML(name, owner,ruta);
    }

    //
    public Document getOtherFilesProjectXML(String name, String owner,String ruta) {
        
        return this.controlIDE.getOtherFilesProjectXML(name, owner,ruta);
    }

    //
    public Document getLibsProjectXML(String name, String owner,String ruta) {
        
        return this.controlIDE.getLibsProjectXML(name, owner,ruta);
    }

    //
    public Document getClassXML(String name, String owner, String pathOwner, String nPackage, String nameF) {
        
        return this.controlIDE.getClassXML(name, owner, pathOwner, nPackage, nameF);
    }

    //
    public String getGUIClassJSON(String name, String owner, String pathOwner, String nPackage, String nameF) {
        
        return this.controlIDE.getGUIClassJSON(name, owner, pathOwner, nPackage, nameF);
    }
    
    //
    public Document getFileXML(String name, String owner, String pathOwner, String nPackage, String nameF) {
        
        return this.controlIDE.getFileXML(name, owner, pathOwner, nPackage, nameF);
    }

    //
    public boolean deleteClass(String name, String owner, String pathOwner, String nPackage, String nameC) {
        
        return this.controlIDE.deleteClass(name, owner, pathOwner, nPackage, nameC);
    }
    
    //
    public boolean deleteGUIClass(String name, String owner, String pathOwner, String nPackage, String nameC) {
        
        return this.controlIDE.deleteGUIClass(name, owner, pathOwner, nPackage, nameC);
    }

    //
    public boolean deleteFile(String name, String owner, String pathOwner, String nPackage, String nameF) {
        
        return this.controlIDE.deleteFile(name, owner, pathOwner, nPackage, nameF);
    }

    //
    public boolean deleteLib(String name, String owner, String pathOwner, String nameL) {
        
        return this.controlIDE.deleteLib(name, owner, pathOwner, nameL);
    }

    //
    public boolean deletePackage(String name, String owner, String pathOwner, String nameL) {
        
        return this.controlIDE.deletePackage(name, owner, pathOwner, nameL);
    }

    //
    public boolean haveProject(String name, String owner) {
        
        return this.controlIDE.haveProject(name, owner);
    }

    //
    public boolean setMainClass(String name, String owner, String pathOwner, String nameC, String pack) {
        
        return this.controlIDE.setMainClass(name, owner, pathOwner, nameC, pack);
    
    }

    //
    public String getMainClass(String name, String owner,String ruta) {
        
        return this.controlIDE.getMainClass(name, owner,ruta);
    }
    
    public String getMainClass_(String name, String owner,String ruta,String user) {
        
        return this.controlIDE.getMainClass_(name, owner,ruta,user);
    }

    public Document getUsersProject(String name, String owner, String pathOwner) {
        return this.controlIDE.getUsersProject(name, owner, pathOwner);
    }

    public Document getUsersProject_(String name, String owner,String pathOwner,String user) {
        
        return this.controlIDE.getUsersProject_(name, owner,pathOwner,user);
    }
    
    public String getRealPathClass(String name, String owner, String nPackage, String nameC,String pathOwner) {
        return this.controlIDE.getRealPathClass(name,owner,nPackage,nameC,pathOwner);
    }

    public String getRealPathFile(String name, String owner, String nPackage, String nameF,String pathOwner) {
        
      return this.controlIDE.getRealPathFile(name,owner,nPackage,nameF,pathOwner);   
        
    }

    public String getRealPathLib(String name, String owner, String nameL,String pathOwner) {
        return this.controlIDE.getRealPathLib(name,owner,nameL,pathOwner);
    }

    public boolean saveGUIClass(String name, String owner, String nPackage, String nameG, Document d,String pathOwner) {
        return  controlIDE.saveGUIClass(name,owner,nPackage,nameG,d,pathOwner);
    }
     
    public String toStringProjects(){
        return controlIDE.toStringProjects();
   }
    
    public boolean shareProject(String name,String owner,String user,String type,String pathOwner){
        return controlIDE.shareProject(name,owner,user,type,pathOwner);
    }
    
    public boolean shareProject_(String name,String owner,String user,String type,String pathOwner,String userE){
       
      return controlIDE.shareProject_(name,owner,user,type,pathOwner,userE);
       
    }
    
    public boolean changeUserPrivilege(String name,String owner,String user,String type,String pathOwner){
     
        return controlIDE.changeUserPrivilege(name,owner,user,type,pathOwner);
    }
    
    public boolean changeUserPrivilege_(String name,String owner,String user,String type,String pathOwner,String userE){
     
        return controlIDE.changeUserPrivilege_(name,owner,user,type,pathOwner,userE);
    }
    
    public String getUserType(String name, String owner,String pathOwner) {
        return this.controlIDE.getUserType(name,owner,pathOwner);
    }
    
    public String getUserType_(String name, String owner,String user,String pathOwner) {
        return this.controlIDE.getUserType_(name,owner,user,pathOwner);
    }

    public boolean deleteUserProject(String name, String owner, String user, String pathOwner) {
        return this.controlIDE.deleteUserProjects(name,owner,user,pathOwner);
    }
    
    public boolean deleteViewProject(String name, String owner, String user, String pathOwner) {
        return this.controlIDE.deleteViewProject(name,owner,user,pathOwner);
    }
    public boolean deleteViewProject_(String name, String owner, String user, String pathOwner) {
        return this.controlIDE.deleteViewProject_(name,owner,user,pathOwner);
    }

    public boolean closeIDE() {
        return this.controlIDE.closeIDE();
    }
    
    public Document cleanAndBuild(String name,String owner,String pathOwner){
       
        return this.controlIDE.cleanAndBuild(name, owner, pathOwner);
        
    }
 
   public boolean compressProject(String name,String owner,String pathOwner,String outFolder){
       return this.controlIDE.compressProject(name, owner, pathOwner, outFolder);
   }
   
   public Document compressExecutableProject(String name,String owner,String pathOwner,String outFolder){
       return this.controlIDE.compressExecutableProject(name, owner, pathOwner, outFolder);
   }
   
   public void setNameProject(String name,String owner,String newName){
        
         this.controlIDE.setNameProject(name, owner, newName);
        
    }
   
   public String getExecuteFolder(String name,String owner){
        
        return this.controlIDE.getExecuteFolder(name,owner);
    }

    public String getLibsFolder(String name, String owner,String pathOwner) {
        return this.controlIDE.getLibsFolder(name,owner,pathOwner);
    }

   
}
