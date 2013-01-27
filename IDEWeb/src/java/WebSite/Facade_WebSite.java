/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package WebSite;

import javax.servlet.http.HttpServletRequest;
import org.w3c.dom.Document;

/**
 *
 * @author cas
 */
public class Facade_WebSite {
    
    private Control_WebSite myControlWebSite;
    
    public Facade_WebSite(String pathApp){
       
        myControlWebSite=new Control_WebSite(pathApp);
    }
  
    public boolean isValidPerson(String email,String pass){System.out.println("isvalid person facade_website : "); 
        return myControlWebSite.isValidPerson(email, pass);
    }
    
    public boolean isValidAdmin(String email,String pass){
        return myControlWebSite.isValidAdmin(email, pass);
    }
    
    public boolean closeSession(String user){
        return myControlWebSite.closeSession(user);
    }
    
    public boolean openSession(String user,String id,String typeUser){
        return myControlWebSite.openSession(user,id,typeUser);
    }
    
    public boolean isValidSession(String user,String id){
         return myControlWebSite.isValidSession(user, id);
     }
    
    
    public boolean createProgrammer(String id){
        return myControlWebSite.createProgrammer(id);
    }
    
    public Document getProgrammerProjectsXML(String user){
         
        return myControlWebSite.getProgrammerProjectsXML(user);
        
     }
    
    public Document getProgrammers(){
         return myControlWebSite.getProgrammers();
     }
    
    public Document getProgrammersOnHold() {
        return myControlWebSite.getProgrammersOnHold();
    }
    
    public Document getProjects(){
        return myControlWebSite.getProjects();
    }
   
    public Document getProjectsShared(){
        return myControlWebSite.getProjectsShared();
    }
    
    public Document getProgrammerProjectsXML_Filtered(String user,int filter){
        
        return myControlWebSite.getProgrammerProjectsXML_Filtered(user, filter);
    }
    public Document getProgrammerDataXML(String user){
         
        return myControlWebSite.getProgrammerDataXML(user);
        
     }
    
    public boolean registerProgrammer(String id,String name,String profile,String password){
        
        return myControlWebSite.registerProgrammer(id, name, profile, password);
    }

    public boolean restorePassUser(String id,String np){
        return myControlWebSite.restorePassUser(id, np);
    }
     
    public boolean registerProject(String name, String user,String owner,String type) {
        return myControlWebSite.registerProject(name,user,owner,type);
    }
    public boolean deleteProject(String name,String owner,Document users,String user){
        return myControlWebSite.deleteProject(name,owner,users,user);
    }

    public boolean isValidIdRegister(String user, String id) {
        return myControlWebSite.isValidIdRegister(user,id);
    }

    public boolean renameProject(String name, String owner, String newName,Document users) {
        return myControlWebSite.renameProject(name,owner,newName,users);
    }

    public String getPathProjectsUsersFolder(String nameUser) {
        return myControlWebSite.getPathProjectsUsersFolder(nameUser);
    }

    public String[] uploadTemporal(String user, HttpServletRequest request, String field,String[] extension,String[] noExtension) {
       
        return myControlWebSite.uploadTemporal( user,request,field,extension,noExtension);
    }
    
    public String uploadPhoto(String user, HttpServletRequest request, String field,String[] extension,String[] noExtension) {
       
        return myControlWebSite.uploadPhoto( user,request,field,extension,noExtension);
    }

    public boolean createTemporalFolder(String user,String name){
        return myControlWebSite.createTemporalFolder(user, name);
    }
    
    public boolean deleteTemporalFolder(String user,String name){
        return myControlWebSite.deleteTemporalFolder(user, name);
        
    }
    
    public String getPathTemporalUserFolder(String nameUser) {
        return myControlWebSite.getPathTemporalUserFolder(nameUser);
    }

    public boolean deleteTemporalFile(String user, String file) {
        return myControlWebSite.deleteTemporalFile(user,file);
    }
    
    public boolean shareProject(String name,String owner,String user,String type,Document users){
        return myControlWebSite.shareProject(name,owner,user,type,users);
        
    }
    
    public boolean deleteUserProject(String name, String owner, String user) {
        
        return myControlWebSite.deleteUserProject(name,owner,user);
    }

    public boolean haveMyProject(String name, String user) {
        return myControlWebSite.haveMyProject(name,user);
    }

    public boolean changeUserPrivilege(String name, String owner, String user, String type) {
        return myControlWebSite.changeUserPrivilege(name,owner,user,type);
    }

    public boolean deleteProgrammer(String email) {
        return myControlWebSite.deleteProgrammer(email);
    }

    public boolean deleteProgrammerOnHold(String email) {
         return myControlWebSite.deleteProgrammerOnHold(email);
    }

    public Document getProgrammerByEntry(String d, String m, String a) {
        return myControlWebSite.getProgrammerByEntry(d,m,a);
    }

    public void changeProjectToNoShared(String name, String owner) {
        
        this.myControlWebSite.changeProjectToNoShared(name,owner);
    }

    public boolean getPassToEmail(String user) {
        return this.myControlWebSite.getPassToEmail(user);
    }

    public boolean existUser(String email) {
        return this.myControlWebSite.existUser(email);
    }

   
    
}
