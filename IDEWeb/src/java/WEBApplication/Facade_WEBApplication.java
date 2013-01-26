/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package WEBApplication;

import FileManagerXML.Facade_FileManagerXML;
import org.w3c.dom.Document;

/**
 *
 * @author cas
 */
public class Facade_WEBApplication {
 
    private Control_WEBApplication myControlWEBApplication;
    
    public Facade_WEBApplication(String pathApp,String idSession){
      
       myControlWEBApplication=new Control_WEBApplication(pathApp,idSession);       
    }
    
    public void setUser(String user){
        myControlWEBApplication.setUser(user);
    }
    public String getUser(){
        return myControlWEBApplication.getUser();
    }
    
    public String getIdSession(){
        return myControlWEBApplication.getIdSession();
    }
    
    public boolean isValidIdRegister(String user,String id){
        return myControlWEBApplication.isValidIdRegister(user,id);
    }
/**********
     * 
     * 
     * 
     * pruebaaaaaaaa momentanea
     * 
     * 
     * 
     * 
     * @param user
     * @return 
     */
    public boolean createProgrammer(String id){
        return myControlWEBApplication.createProgrammer(id);
    }
    
    
    /*
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */
    
    public boolean registerProgrammer(String id,String name,String profile,String password){
        
        return myControlWEBApplication.registerProgrammer(id, name, profile, password);
    }
    
    public boolean restorePassUser(String np){
        return myControlWEBApplication.restorePassUser(np);
    }
    public Document getProgrammerProjectsXML(String user){
         
        return myControlWEBApplication.getProgrammerProjectsXML(user);
        
     }
    
    public Document getProjects(){
        return myControlWEBApplication.getProjects();
    }
    
    public Document getProgrammers(){
        return myControlWEBApplication.getProgrammers();
    }
    
    public Document getProgrammersOnHold(){
        return myControlWEBApplication.getProgrammersOnHold();
    }
    
    public Document getProjectsShared(){
        return myControlWEBApplication.getProjectsShared();
    }
    
    public Document getProgrammerProjectsXML_Filtered(String user,int filter){
        
        return myControlWEBApplication.getProgrammerProjectsXML_Filtered(user, filter);
    }
    public Document getProgrammerDataXML(String user){
         
        return myControlWEBApplication.getProgrammerDataXML(user);
        
     }
    
    public boolean isValidPerson(String email,String pass){
        return myControlWEBApplication.isValidPerson(email, pass);
    }
    
    public boolean isValidAdmin(String email,String pass){
        return myControlWEBApplication.isValidAdmin(email, pass);
    }
    
    public String getTypeUser(){
        return myControlWEBApplication.getTypeUser();
    }
    
    public boolean closeSession(){
        return myControlWEBApplication.closeSession();
    }
    
    public boolean openSession(){
        return myControlWEBApplication.openSession();
    }
    
    public boolean isValidSession(){
         return myControlWEBApplication.isValidSession();
     }
    
    
    public Document compileProject(String name, String owner) {
        return myControlWEBApplication.compileProject(name, owner);
    }

    
    public Document executeProjectWEB(String name, String owner) {
        return myControlWEBApplication.executeProjectWEB(name, owner);
    }

    
    public boolean loadProject(String name, String owner,String user) {
        return myControlWEBApplication.loadProject(name, owner,user);
    }

   
    public boolean createProject(String name) {
        return myControlWEBApplication.createProject(name);
    }

    
    public boolean renameProject(String name, String owner, String newName) {
        return myControlWEBApplication.renameProject(name, owner, newName);
    }

    public boolean renameProject_(String name, String owner, String newName) {
        return myControlWEBApplication.renameProject_(name, owner, newName);
    }
    
    public boolean renameClass(String name, String owner, String nPackage, String nameC, String newNameC) {
        return myControlWEBApplication.renameClass(name, owner, nPackage, nameC, newNameC);
    }
    
    public boolean renameGUIClass(String name, String owner, String nPackage, String nameC, String newNameC) {
        return myControlWEBApplication.renameGUIClass(name, owner, nPackage, nameC, newNameC);
    }

    public boolean renameLib(String name,String owner,String nameL,String newName){
       return myControlWEBApplication.renameLib(name, owner, nameL, newName);
    }
    
    public boolean renameFile(String name, String owner, String nPackage, String nameF, String newNameF) {
        return myControlWEBApplication.renameFile(name, owner, nPackage, nameF, newNameF);
    }

    
    public boolean renamePackage(String name, String owner, String nPackage, String newNameP) {
        return myControlWEBApplication.renamePackage(name, owner, nPackage, newNameP);
    }

    
    public boolean deleteProject(String name, String owner) {
        return myControlWEBApplication.deleteProject(name, owner);
    }

    public boolean deleteProject_(String name,String owner) {
        return myControlWEBApplication.deleteProject_(name, owner);
    }
    
    public boolean closeProject(String name, String owner) {
        return myControlWEBApplication.closeProject(name, owner);
    }

    
    public boolean addPackage(String name, String owner, String nPackage) {
        return myControlWEBApplication.addPackage(name, owner, nPackage);
    }

    
    public boolean addClass(String name, String owner, String nPackage, String nameC) {
        return myControlWEBApplication.addClass(name, owner, nPackage, nameC);
    }

    public boolean addGUIClass(String name, String owner,String nPackage, String nameC){
     
        return myControlWEBApplication.addGUIClass(name, owner, nPackage, nameC);
        
    }
    
    public boolean addNewFile(String name, String owner, String nPackage, String nameFile) {
        return myControlWEBApplication.addNewFile(name, owner, nPackage, nameFile);
    }

    
    public String addFile(String nameP, String owner, String pack,javax.servlet.http.HttpServletRequest request,String field) {
        return myControlWEBApplication.addFile(nameP, owner, pack, request,field);
    }

    
    public String addClassExisting(String nameP, String owner, String pack,javax.servlet.http.HttpServletRequest request,String field) {
        return myControlWEBApplication.addClassExisting(nameP, owner, pack, request,field);
    }

   
    public String addLibJAR(String name, String owner,javax.servlet.http.HttpServletRequest request,String field) {
        return myControlWEBApplication.addLibJAR(name, owner, request,field);
    }

    public String addPhoto(javax.servlet.http.HttpServletRequest request,String field) {
        return myControlWEBApplication.addPhoto(request,field);
    }
    
    public Document getDataProjectXML(String name, String owner) {
        return myControlWEBApplication.getDataProjectXML(name, owner);
    }

   
    public Document getPackagesProjectXML(String name, String owner) {
        return myControlWEBApplication.getPackagesProjectXML(name, owner);
    }

    
    public Document getClassesProjectXML(String name, String owner) {
        return myControlWEBApplication.getClassesProjectXML(name, owner);
    }
    
    public Document getClassesProjectXML_(String name, String owner) {
        return myControlWEBApplication.getClassesProjectXML_(name, owner);
    }

    
    public Document getClassFilesProjectXML(String name, String owner) {
        return myControlWEBApplication.getClassFilesProjectXML(name, owner);
    }

    
    public Document getOtherFilesProjectXML(String name, String owner) {
        return myControlWEBApplication.getOtherFilesProjectXML(name, owner);
    }

    
    public Document getLibsProjectXML(String name, String owner) {
        return myControlWEBApplication.getLibsProjectXML(name, owner);
    }

    
    public Document getClassXML(String name, String owner, String nPackage, String nameF) {
        return myControlWEBApplication.getClassXML(name, owner, nPackage, nameF);
    }

    public String getGUIClassJSON(String name, String owner, String nPackage, String nameF) {
        return myControlWEBApplication.getGUIClassJSON(name, owner, nPackage, nameF);
    }
    
    public Document getFileXML(String name, String owner, String nPackage, String nameF) {
        return myControlWEBApplication.getFileXML(name, owner, nPackage, nameF);
    }

    
    public boolean deleteClass(String name, String owner, String nPackage, String nameC) {
        return myControlWEBApplication.deleteClass(name, owner, nPackage, nameC);
    }

    public boolean deleteGUIClass(String name, String owner, String nPackage, String nameC) {
        return myControlWEBApplication.deleteGUIClass(name, owner, nPackage, nameC);
    }
    
    public boolean deleteFile(String name, String owner, String nPackage, String nameF) {
        return myControlWEBApplication.deleteFile(name, owner, nPackage, nameF);
    }

    
    public boolean deleteLib(String name, String owner, String nameL) {
        return myControlWEBApplication.deleteLib(name, owner, nameL);
    }

    
    public boolean deletePackage(String name, String owner, String nameL) {
        return myControlWEBApplication.deletePackage(name, owner, nameL);
    }

    public boolean saveGUIClass(String name,String owner,String nPackage,String nameG,Document d){
        return myControlWEBApplication.saveGUIClass(name,owner,nPackage,nameG,d);
    }
    
    public boolean moveClass(String name1,String owner1,String nPackage1,String nameC,String name2,String owner2,String nPackage2,boolean cut){
        
        return myControlWEBApplication.moveClass(name1,owner1,nPackage1,nameC,name2,owner2,nPackage2,cut);
    }
    
    public boolean moveGUIClass(String name1,String owner1,String nPackage1,String nameC,String name2,String owner2,String nPackage2,boolean cut){
        
        return myControlWEBApplication.moveGUIClass(name1,owner1,nPackage1,nameC,name2,owner2,nPackage2,cut);
    }
    
    public boolean moveFile(String name1,String owner1,String nPackage1,String nameF,String name2,String owner2,String nPackage2,boolean cut){
        
        return myControlWEBApplication.moveFile(name1,owner1,nPackage1,nameF,name2,owner2,nPackage2,cut);
    }
    
    public boolean moveLibrarie(String name1,String owner1,String nameL,String name2,String owner2,boolean cut){
        
        return myControlWEBApplication.moveLibrarie(name1,owner1,nameL,name2,owner2,cut);
    }
    
    public boolean haveProject(String name, String owner) {
        return myControlWEBApplication.haveProject(name, owner);
    }

    
    public boolean setMainClass(String name, String owner, String nameC, String pack) {
        return myControlWEBApplication.setMainClass(name, owner, nameC, pack);
    }

    
    public String getMainClass(String name, String owner) {
        return myControlWEBApplication.getMainClass(name, owner);
    }
    
    public String getMainClass_(String name, String owner) {
        return myControlWEBApplication.getMainClass_(name, owner);
    }
   
    public String toStringProjects(){
        return myControlWEBApplication.toStringProjects();
   }
    
    public boolean shareProject(String name, String owner,String user,String type) {
        return myControlWEBApplication.shareProject(name,owner,user,type);
    }
    
    public boolean changeUserPrivilege(String name,String owner,String user,String type){
        return myControlWEBApplication.changeUserPrivilege(name,owner,user,type);
    }
    
    public boolean changeUserPrivilege_(String name,String owner,String user,String type){
        return myControlWEBApplication.changeUserPrivilege_(name,owner,user,type);
    }
    
    public boolean shareProject_(String name, String owner,String user,String type) {
        return myControlWEBApplication.shareProject_(name,owner,user,type);
    }
    
    public String getUserType(String name,String owner){
        return myControlWEBApplication.getUserType(name,owner);
    }
    
    public String getUserType_(String name,String owner){
        return myControlWEBApplication.getUserType_(name,owner);
    }
    
    public Document getUsersProject(String name,String owner){
        return myControlWEBApplication.getUsersProject(name,owner);
    }
    
    public Document getUsersProject_(String name,String owner){
        return myControlWEBApplication.getUsersProject_(name,owner);
    }
    
    public boolean deleteUserProject(String name, String owner,String user){
        return myControlWEBApplication.deleteUserProject(name, owner,user);
    }
    
    public boolean closeIDE(){
        return myControlWEBApplication.closeIDE();
    }
    public Document cleanAndBuild(String name,String owner){
        return myControlWEBApplication.cleanAndBuild(name, owner);
    }
    
    public boolean compressProject(String name,String owner){
        return myControlWEBApplication.compressProject(name, owner);
     }
    
    public Document compressExecutableProject(String name,String owner){
       
       return this.myControlWEBApplication.compressExecutableProject(name,owner);
   }
    public void setNameProject(String name,String owner,String newName){
        
         this.myControlWEBApplication.setNameProject(name, owner, newName);
        
    }
    
    public boolean deleteProgrammer(String email){
        return this.myControlWEBApplication.deleteProgrammer(email);
    }
    
    public boolean deleteProgrammerOnHold(String email){
        return this.myControlWEBApplication.deleteProgrammerOnHold(email);
    }
    
    public String getPathExecuteUser(String name,String owner){
        
        return this.myControlWEBApplication.getPathExecuteUser(name, owner);
    }
    
    public Document getProgrammersByEntry(String d,String m,String a){
       return this.myControlWEBApplication.getProgrammerByEntry(d,m,a); 
    }
    
    public boolean deleteViewProject(String name, String owner,String user){
        return this.myControlWEBApplication.deleteViewProject(name, owner, user);
    }
    public boolean deleteViewProject_(String name, String owner,String user){
        return this.myControlWEBApplication.deleteViewProject_(name, owner, user);
    }
    
    public boolean getPassToEmail(String email){
        return this.myControlWEBApplication.getPassToEmail(email);
    }
    
}
