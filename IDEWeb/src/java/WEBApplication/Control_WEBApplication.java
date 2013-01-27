/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package WEBApplication;

import FileManager.Facade_FileManager;
import FileManagerXML.Facade_FileManagerXML;
import IDE.Facade_IDE;
import IDE.ProjectsManager.Project;
import IDE.Signer.Facade_Signer;
import Util.Separator;
import WebSite.Facade_WebSite;
import java.util.ArrayList;
import java.util.Date;
import java.util.ResourceBundle;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

/**
 *
 * @author cas
 */
public class Control_WEBApplication {
    
    private Facade_IDE myControlIDE;
    private Facade_WebSite myControlWebSite;
    private String pathApp;
    private String pathUsers;
    private String pathWEBConsoleLibrarie;
    private String nameWEBConsoleLibrarieXML;
    private String classesWEBConsoleLibrarieXML;
    private String pathUserLibraries;
    private String idSession;
    private String user;
    private String typeUser;
    
    public Control_WEBApplication(String pathApp,String idSession){
        
        this.pathApp=pathApp;
        myControlIDE=new Facade_IDE();
        myControlWebSite=new Facade_WebSite(pathApp);
        this.idSession=idSession;
        this.loadFeatures();
    }
    
    public void setUser(String user){
        this.user=user;
    }
    public String getIdSession(){
        return this.idSession;
    }
    public String getUser(){
        return user;
    }
    
    public boolean isValidIdRegister(String user, String id) {
        boolean res= myControlWebSite.isValidIdRegister(user,id);
        System.out.println(res);
        return res;
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
        return myControlWebSite.createProgrammer(id);
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
        return myControlWebSite.registerProgrammer(id, name, profile, password);
    }
    
    public boolean restorePassUser(String np){
        return myControlWebSite.restorePassUser(user, np);
    }
       
  
    public void setPathApp(String path){
        
        pathApp=path;
    }
    
    private void loadFeatures(){
        //carga deun archivo properties las rutas de los proyectos, las librerias
        ResourceBundle properties = ResourceBundle.getBundle("Properties.UsersProperties");
        pathUsers=properties.getString("path");
        
        properties = ResourceBundle.getBundle("Properties.WEBConsoleLibrarieProperties");
        pathWEBConsoleLibrarie=properties.getString("path");
        classesWEBConsoleLibrarieXML=properties.getString("nameXML");
        nameWEBConsoleLibrarieXML=properties.getString("nameNXML");
        
        properties = ResourceBundle.getBundle("Properties.UserLibrariesProperties");
        pathUserLibraries =properties.getString("location");
    }
    
    private String getPathProjectsUserFolder(String nameUser){
    
    
        ////metodo que consulta la carpeta de trabajo del usuario
        return this.myControlWebSite.getPathProjectsUsersFolder(nameUser);
    
    }
   
    private String getPathTemporalUserFolder(String nameUser){
        
        return this.myControlWebSite.getPathTemporalUserFolder(nameUser);
    }
    
   public Document getProgrammerProjectsXML(String user){
         
        return myControlWebSite.getProgrammerProjectsXML(user);
        
     }

   public Document getProjects(){
       return myControlWebSite.getProjects();
    
    }
   
    public Document getProgrammers(){
        return myControlWebSite.getProgrammers();
    }
    
    public Document getProgrammersOnHold() {
        return myControlWebSite.getProgrammersOnHold();
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
     
    public boolean isValidPerson(String email,String pass){
        typeUser="programmer";
        return myControlWebSite.isValidPerson(email, pass);
    }
    
    public boolean isValidAdmin(String email,String pass){
        typeUser="administrator";
        return myControlWebSite.isValidAdmin(email, pass);
    }
    
    public String getTypeUser(){
        return typeUser;
    }
    
    public boolean closeSession(){
        return myControlWebSite.closeSession(user);
    }
    
    public boolean openSession(){
        return myControlWebSite.openSession(user,this.idSession,this.getTypeUser());
    }
    
    public boolean isValidSession(){
         return myControlWebSite.isValidSession(user, this.idSession);
     }
    /**
     * 
     * 
     * 
     * Methods IDE
     * 
     * 
     * 
     * 
     */
   
    
     public Document compileProject(String name,String owner){
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return myControlIDE.compileProject(name,owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner,true,name);
        
        
    }

     
     public Document executeProjectWEB(String name,String owner){
       
         String pathOwner=this.getPathProjectsUserFolder(owner);
         Facade_FileManagerXML ffxml=new Facade_FileManagerXML();
         ffxml.leerXMLexistente(this.pathApp+Separator.getSystemSeparator()+
                 this.pathWEBConsoleLibrarie+
                 Separator.getSystemSeparator()+
                 this.classesWEBConsoleLibrarieXML);         
         Document classWebClib=ffxml.getDocumentoXML();
         
         ffxml.leerXMLexistente(this.pathApp+Separator.getSystemSeparator()+
                 this.pathWEBConsoleLibrarie+
                 Separator.getSystemSeparator()+
                 this.nameWEBConsoleLibrarieXML); 
         
         Document nameWebClib=ffxml.getDocumentoXML();

    
         
      Document res=  this.myControlIDE.executeProjectWEB(name,owner
                                    , this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner
                                    , this.pathApp+Separator.getSystemSeparator()+this.pathWEBConsoleLibrarie
                                    ,classWebClib,nameWebClib,user,name);
      
      if(!res.getElementsByTagName("return").item(0).getTextContent().equals("ok"))
          return res;
      
      //this.myControlWebSite.deleteTemporalFolder(this.user, name+"-"+owner);
      //this.myControlWebSite.createTemporalFolder(this.user, name+"-"+owner);
      String rutaExecutep=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner+Separator.getSystemSeparator()+this.myControlIDE.getExecuteFolder(name, owner); 
      String rutaTemporalE=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+this.user+Separator.getSystemSeparator()+this.myControlWebSite.getPathTemporalUserFolder(this.user)+Separator.getSystemSeparator()+name+"-"+owner;
      
      String rutaLibsP=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner+Separator.getSystemSeparator()+name+Separator.getSystemSeparator()+this.myControlIDE.getLibsFolder(name, owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner);
     
      Facade_FileManager.getReference().copyFolder(rutaExecutep, rutaTemporalE);
      Facade_FileManager.getReference().copyFolder(rutaLibsP, rutaTemporalE);
      return res;
    }
     
    public String getPathExecuteUser(String name,String owner){
        
        return this.pathUsers+Separator.getSystemSeparator()+this.user+Separator.getSystemSeparator()+this.myControlWebSite.getPathTemporalUserFolder(this.user)+Separator.getSystemSeparator()+name+"-"+owner+Separator.getSystemSeparator()+Project.executeFolder;
    }
    
    
    public boolean loadProject(String name,String owner,String user) {
       
        String pathOwner=this.getPathProjectsUserFolder(owner); System.out.println("loafd project  control web: "+this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner);
         return this.myControlIDE.loadProject(name,owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner,user);
    }

    
    public boolean createProject(String name) {
        String pathOwner=this.getPathProjectsUserFolder(user);
        Date createDate=new Date();
        
        ArrayList<String[]> libs=new ArrayList<String[]>();
        libs.add(new String[]{this.pathApp+Separator.getSystemSeparator()+pathUserLibraries+Separator.getSystemSeparator()+"AbsoluteLayout.jar","AbsoluteLayout.jar"});
        
        if(this.myControlIDE.createProject(name, user, createDate, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner,libs)){
            if(this.myControlWebSite.registerProject(name,user,user,"Write")){
    
                return true;
            }
        }
        return false;
    }

    
    public boolean renameProject(String name, String owner,String newName) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
         Document d=myControlIDE.getUsersProject(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner);
         if(this.myControlIDE.renameProject(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner , newName,this.user)){
           
            return this.myControlWebSite.renameProject(name,owner,newName,d);
        }
        return false;
    }

    public boolean renameProject_(String name, String owner,String newName){
        
        String pathOwner=this.getPathProjectsUserFolder(owner);
         Document d=myControlIDE.getUsersProject_(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner,this.user);
        if(this.myControlWebSite.haveMyProject(newName,this.user))
           return false;
        
        if(this.myControlIDE.renameProject_(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner , newName,this.user)){
           
            return this.myControlWebSite.renameProject(name,owner,newName,d);
        }
        return false;
    }
    
    public boolean renameClass(String name, String owner,String nPackage, String nameC, String newNameC) {
        
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.renameClass(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nPackage, nameC, newNameC);
    }

    public boolean renameGUIClass(String name, String owner,String nPackage, String nameC, String newNameC) {
        
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.renameGUIClass(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nPackage, nameC, newNameC);
    }
    
    public boolean renameLib(String name,String owner,String nameL,String newName){
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.renameLib(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nameL, newName);
        
    }
    
    public boolean renameFile(String name, String owner,String nPackage, String nameF, String newNameF) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.renameFile(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nPackage, nameF, newNameF);
    }

   
    public boolean renamePackage(String name, String owner, String nPackage, String newNameP) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.renamePackage(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nPackage, newNameP);
    }
  
    
    public boolean deleteProject(String name, String owner) {

       String pathOwner=this.getPathProjectsUserFolder(owner);
       Document d=myControlIDE.getUsersProject(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner);
        if(this.myControlIDE.deleteProject(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner,user)){
            this.myControlWebSite.deleteProject(name, owner,d,this.user);
            
            return true;
        }
        return false;
            
    }    

   public boolean deleteProject_(String name,String owner) {
       
       String pathOwner=this.getPathProjectsUserFolder(owner); 
       Document d=myControlIDE.getUsersProject_(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner,this.user);
        if(this.myControlIDE.deleteProject_(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner,user)){
            this.myControlWebSite.deleteProject(name, owner,d,this.user);
            
            return true;
        }
        return false;
        
    }
   
    public boolean closeProject(String name, String owner) {
        
        return this.myControlIDE.closeProject(name, owner);
    }

   
    public boolean addPackage(String name, String owner, String nPackage) {
       String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.addPackage(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nPackage);
    }

    
    public boolean addClass(String name, String owner,String nPackage, String nameC) {
     String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.addClass(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nPackage, nameC);
    }

    
    public boolean addGUIClass(String name, String owner,String nPackage, String nameC){
     String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.addGUIClass(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nPackage, nameC);
        
    }
    
    public boolean saveGUIClass(String name, String owner, String nPackage, String nameG, Document d) {
        
       String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.saveGUIClass(name, owner,nPackage,nameG,d, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner);
        
    }
    
    public boolean addNewFile(String name, String owner, String nPackage, String nameFile) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.addNewFile(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nPackage, nameFile);
    }

    
    public String addFile(String nameP, String owner, String pack,javax.servlet.http.HttpServletRequest request,String field) {
        
        ResourceBundle properties = ResourceBundle.getBundle("Properties.ExtensionFileUploadProperties");
        String[] noExtensionFiles=properties.getString("noFile").split(",");
        String[] rTemporal=this.myControlWebSite.uploadTemporal(this.user,request,field,null,noExtensionFiles);
        if(rTemporal==null)return null;
        if(rTemporal==null)return null;
        String ruta=this.getPathProjectsUserFolder(owner);
        String rutaT=this.getPathTemporalUserFolder(owner)+Separator.getSystemSeparator()+rTemporal[1];
      
        boolean r= this.myControlIDE.addFile(this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta, nameP, owner, pack,rTemporal[0], 
                                                  this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+this.user+Separator.getSystemSeparator()+rutaT);
        this.myControlWebSite.deleteTemporalFile(this.user,rTemporal[1]);
        if(r)return rTemporal[0];
        return null;
        
    }

    
    public String addClassExisting(String nameP, String owner, String pack,javax.servlet.http.HttpServletRequest request,String field) {
        
        ResourceBundle properties = ResourceBundle.getBundle("Properties.ExtensionFileUploadProperties");
        String[] extensionJava=properties.getString("java").split(",");
        String[] noExtensionFiles=properties.getString("noFile").split(",");
        String[] rTemporal=this.myControlWebSite.uploadTemporal(this.user,request,field,extensionJava,noExtensionFiles);
        if(rTemporal==null)return null;
        if(rTemporal==null)return null;
        
        
        String ruta=this.getPathProjectsUserFolder(owner);
        String rutaT=this.getPathTemporalUserFolder(this.user)+Separator.getSystemSeparator()+rTemporal[1];
        
     
        boolean r= this.myControlIDE.addClassExisting(this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta, nameP, owner, pack,rTemporal[0], 
                                                  this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+this.user+Separator.getSystemSeparator()+rutaT);
      
        this.myControlWebSite.deleteTemporalFile(this.user,rTemporal[1]);
        if(r)return rTemporal[0];
        return null;
    }

    
    public String addLibJAR(String name, String owner,javax.servlet.http.HttpServletRequest request,String field) {
      
        ResourceBundle properties = ResourceBundle.getBundle("Properties.ExtensionFileUploadProperties");
        String[] extensionJava=properties.getString("javaLibraries").split(",");
        String[] noExtensionFiles=properties.getString("noFile").split(",");
        
        String[] rTemporal=this.myControlWebSite.uploadTemporal(this.user,request,field,extensionJava,noExtensionFiles);
        if(rTemporal==null)return null;
        if(rTemporal==null)return null;
       
        String ruta=this.getPathProjectsUserFolder(owner);
        
        String rutaT=this.getPathTemporalUserFolder(this.user)+Separator.getSystemSeparator()+rTemporal[1];
     
        boolean r= this.myControlIDE.addLibJAR(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta, 
                                                this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+this.user+Separator.getSystemSeparator()+rutaT, rTemporal[0]);
      
        this.myControlWebSite.deleteTemporalFile(this.user,rTemporal[1]);
        if(r)return rTemporal[0];
        return null;
    }

    public String addPhoto(javax.servlet.http.HttpServletRequest request,String field) {
        
        ResourceBundle properties = ResourceBundle.getBundle("Properties.ExtensionFileUploadProperties");
        String[] extensionJava=properties.getString("photo").split(",");
        return this.myControlWebSite.uploadPhoto(this.user,request,field,extensionJava,null);
        
    }
    
    
    public Document getDataProjectXML(String name, String owner) {
        
        return this.myControlIDE.getDataProjectXML(name, owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+this.getPathProjectsUserFolder(owner));
    }

    
    public Document getPackagesProjectXML(String name, String owner) {
        
        return this.myControlIDE.getPackagesProjectXML(name, owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+this.getPathProjectsUserFolder(owner));
    }

    
    public Document getClassesProjectXML(String name, String owner) {
        
        return this.myControlIDE.getClassesProjectXML(name, owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+this.getPathProjectsUserFolder(owner));
    }
    
    public Document getClassesProjectXML_(String name, String owner) {
        
        return this.myControlIDE.getClassesProjectXML_(name, owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+this.getPathProjectsUserFolder(owner),user);
    }

    
    public Document getClassFilesProjectXML(String name, String owner) {
        
        return this.myControlIDE.getClassFilesProjectXML(name, owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+this.getPathProjectsUserFolder(owner));
    }

    
    public Document getOtherFilesProjectXML(String name, String owner) {
        
        return this.myControlIDE.getOtherFilesProjectXML(name, owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+this.getPathProjectsUserFolder(owner));
    }

    
    public Document getLibsProjectXML(String name, String owner) {
        
        return this.myControlIDE.getLibsProjectXML(name, owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+this.getPathProjectsUserFolder(owner));
    }

    
    public Document getClassXML(String name, String owner,String nPackage, String nameF) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.getClassXML(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nPackage, nameF);
    }
    
    public String getGUIClassJSON(String name, String owner,String nPackage, String nameF) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.getGUIClassJSON(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nPackage, nameF);
    }

    
    public Document getFileXML(String name, String owner,String nPackage, String nameF) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.getFileXML(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nPackage, nameF);
    }

    
    public boolean deleteClass(String name, String owner,  String nPackage, String nameC) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.deleteClass(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nPackage, nameC);
    }

    public boolean deleteGUIClass(String name, String owner,  String nPackage, String nameC) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.deleteGUIClass(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nPackage, nameC);
    }
    
    public boolean deleteFile(String name, String owner,String nPackage, String nameF) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.deleteFile(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nPackage, nameF);
    }

    
    public boolean deleteLib(String name, String owner,String nameL) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.deleteLib(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nameL);
    }

    
    public boolean deletePackage(String name, String owner, String nameL) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.deletePackage(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nameL);
    }

    
    public boolean moveClass(String name1, String owner1, String nPackage1, String nameC, String name2, String owner2, String nPackage2,boolean cut) {
        
        String ruta1=this.getPathProjectsUserFolder(owner1);
        String ruta2=this.getPathProjectsUserFolder(owner2);

        String pathClass=this.myControlIDE.getRealPathClass(name1,owner1,nPackage1,nameC,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta1);
       
        if(pathClass==null)return false;
        boolean r= this.myControlIDE.addClassExisting(this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta2, name2, owner2, nPackage2,nameC, 
                                                  this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta1+Separator.getSystemSeparator()+name1+Separator.getSystemSeparator()+pathClass);
      
        if(!r)return false;
        if(cut)
            this.myControlIDE.deleteClass(name1, owner1, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta1, nPackage1, nameC);
        return true;
        
    }
    
    public boolean moveGUIClass(String name1, String owner1, String nPackage1, String nameC, String name2, String owner2, String nPackage2, boolean cut) {
        
        String ruta1=this.getPathProjectsUserFolder(owner1);
        String ruta2=this.getPathProjectsUserFolder(owner2);

        String pathClass=this.myControlIDE.getRealPathClass(name1,owner1,nPackage1,nameC,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta1);
     
        if(pathClass==null)return false;
        boolean r= this.myControlIDE.addGUIClassExisting(this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta2, name2, owner2, nPackage2,nameC, 
                                                  this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta1+Separator.getSystemSeparator()+name1+Separator.getSystemSeparator()+pathClass);
   
        if(!r)return false;
        if(cut)
            this.myControlIDE.deleteGUIClass(name1, owner1, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta1, nPackage1, nameC);
        return true;
    }
    
    public boolean moveFile(String name1, String owner1, String nPackage1, String nameF, String name2, String owner2, String nPackage2,boolean cut) {
        
        String ruta1=this.getPathProjectsUserFolder(owner1);
        String ruta2=this.getPathProjectsUserFolder(owner2);

        String pathClass=this.myControlIDE.getRealPathFile(name1,owner1,nPackage1,nameF,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta1);
      
        if(pathClass==null)return false;
        boolean r= this.myControlIDE.addFile(this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta2, name2, owner2, nPackage2,nameF, 
                                                  this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta1+Separator.getSystemSeparator()+name1+Separator.getSystemSeparator()+pathClass);

        if(!r)return false;
        if(cut)
            this.myControlIDE.deleteFile(name1, owner1, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta1, nPackage1, nameF);
        return true;
        
    }
    
    public boolean moveLibrarie(String name1, String owner1, String nameL, String name2, String owner2,boolean cut) {
        
        String ruta1=this.getPathProjectsUserFolder(owner1);
        String ruta2=this.getPathProjectsUserFolder(owner2);

        String pathClass=this.myControlIDE.getRealPathLib(name1,owner1,nameL,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta1);
    
        if(pathClass==null)return false;
        boolean r= this.myControlIDE.addLibJAR(name2,
                                                owner2,
                                                this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta2,
                                             this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta1+Separator.getSystemSeparator()+name1+Separator.getSystemSeparator()+pathClass,
                                            nameL);
  
        if(!r)return false;
        if(cut)
            this.myControlIDE.deleteLib(name1, owner1, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+ruta1, nameL);
        return true;
        
    }
    
    public boolean haveProject(String name, String owner) {
        
        return this.myControlIDE.haveProject(name, owner);
    }

    
    public boolean setMainClass(String name, String owner,String nameC, String pack) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.setMainClass(name, owner, this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, nameC, pack);
    
    }

   
    public String getMainClass(String name, String owner) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.getMainClass(name, owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner);
    }
    
    public String getMainClass_(String name, String owner) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.getMainClass_(name, owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner,this.user);
    }

    

    public String toStringProjects(){
        return this.myControlIDE.toStringProjects();
   }

    
    public boolean shareProject(String name, String owner,String user,String type) {
         Document d=this.getUsersProject_(name, owner);
        if(this.myControlWebSite.shareProject(name,owner,user,type,d)){
            String pathOwner=this.getPathProjectsUserFolder(owner);
            
            return this.myControlIDE.shareProject(name,owner,user,type,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner);
        
        }
  
        
        
        return false;
    }
    
    public boolean changeUserPrivilege(String name,String owner,String user,String type){
       if(!this.user.equals(owner))return false;
        if(this.myControlWebSite.changeUserPrivilege(name,owner,user,type)){
            String pathOwner=this.getPathProjectsUserFolder(owner);
            
            return this.myControlIDE.changeUserPrivilege(name,owner,user,type,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner);
        
        }
        return false;
    }
    
    public boolean changeUserPrivilege_(String name,String owner,String user,String type){
      if(!this.user.equals(owner))return false;
        if(this.myControlWebSite.changeUserPrivilege(name,owner,user,type)){
            String pathOwner=this.getPathProjectsUserFolder(owner);
            
            return this.myControlIDE.changeUserPrivilege_(name,owner,user,type,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner,this.user);
        
        }
        return false;
    }
    
    public boolean shareProject_(String name, String owner,String user,String type) {
         Document d=this.getUsersProject_(name, owner);
        if(this.myControlWebSite.shareProject(name,owner,user,type,d)){
            String pathOwner=this.getPathProjectsUserFolder(owner);
            return this.myControlIDE.shareProject_(name,owner,user,type,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner,this.user);
        
        }
  
        
        
        return false;
    }

    public String getUserType(String name, String owner) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.getUserType(name,owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner);
    }
    
    public String getUserType_(String name, String owner) {
        String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.getUserType_(name,owner,this.user,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner);
    }

    public Document getUsersProject(String name,String owner){
         String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.getUsersProject(name,owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner);
    }
    
    public Document getUsersProject_(String name,String owner){
         String pathOwner=this.getPathProjectsUserFolder(owner);
        return this.myControlIDE.getUsersProject_(name,owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner,user);
    }

    public boolean deleteUserProject(String name, String owner, String user) {
        
        String pathOwner=this.getPathProjectsUserFolder(owner);
        Document d=this.getUsersProject_(name, owner);
        if(this.myControlIDE.deleteUserProject(name,owner,user,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner)){
           
             if(this.myControlWebSite.deleteUserProject(name, owner,user)){
                if(d!=null){//El documento no puede ser tener 0 usuario porque al menos debe estar el que solicita la eliminacion
                    if(d.getElementsByTagName("users").getLength()==1){
                         this.myControlWebSite.changeProjectToNoShared(name,owner);
                    }
                 }
                return true;
            }
            
          }
        return false;
    }
    
	

    public boolean deleteViewProject(String name, String owner,String user){
        if(!user.equals(this.user))return false;
        String pathOwner=this.getPathProjectsUserFolder(owner);
        
        if(this.myControlIDE.deleteViewProject(name,owner,user,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner)){
           
             if(this.myControlWebSite.deleteUserProject(name, owner,user)){
                Document d=this.getUsersProject_(name, owner);
                if(d==null){
                    this.myControlWebSite.changeProjectToNoShared(name,owner);
                   
                 }
                return true;
            }
            
          }
        return false;
    }
    
    public boolean deleteViewProject_(String name, String owner,String user){
        javax.swing.JOptionPane.showConfirmDialog(null,"Delete view Project_");
        if(!user.equals(this.user))return false;
        String pathOwner=this.getPathProjectsUserFolder(owner);
        Document d=this.getUsersProject_(name, owner);javax.swing.JOptionPane.showConfirmDialog(null,d.getElementsByTagName("users").getLength());
        if(this.myControlIDE.deleteViewProject_(name,owner,user,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner)){

             if(this.myControlWebSite.deleteUserProject(name, owner,user)){
                if(d!=null){//El documento no puede ser tener 0 usuario porque al menos debe estar el que solicita la eliminacion
                    if(d.getElementsByTagName("user").getLength()==1){
                         this.myControlWebSite.changeProjectToNoShared(name,owner);
                    }
                 }
                return true;
            }
            
          }
        return false;
    }

    public boolean closeIDE() {
       return this.myControlIDE.closeIDE();
    }

    public Document cleanAndBuild(String name,String owner){
        String pathOwner=this.getPathProjectsUserFolder(owner);
      
        return this.myControlIDE.cleanAndBuild(name,owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner);
    }
    
    public boolean compressProject(String name,String owner){
        String pathOwner=this.getPathProjectsUserFolder(owner);
        String pathDownload=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+this.user+Separator.getSystemSeparator()+this.myControlWebSite.getPathTemporalUserFolder(this.user)+Separator.getSystemSeparator()+name+"-"+owner;
       return this.myControlIDE.compressProject(name, owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, pathDownload);
   }
   
    public Document compressExecutableProject(String name,String owner){
        String pathOwner=this.getPathProjectsUserFolder(owner);
        String pathDownload=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+this.user+Separator.getSystemSeparator()+this.myControlWebSite.getPathTemporalUserFolder(this.user)+Separator.getSystemSeparator()+name+"-"+owner;
       return this.myControlIDE.compressExecutableProject(name, owner,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+pathOwner, pathDownload);
   }
    
   public void setNameProject(String name,String owner,String newName){
        
         myControlIDE.setNameProject(name, owner, newName);
        
    }

   public boolean deleteProgrammer(String email) {
       if(!this.typeUser.equals("administrator"))return false;
        Document mp=this.getProgrammerProjectsXML_Filtered(email,1);
        NodeList nl = mp.getDocumentElement().getChildNodes();
        for (int i = 0; i < nl.getLength(); i++) {
            this.deleteProject_(mp.getElementsByTagName("name").item(i).getTextContent(), mp.getElementsByTagName("owner").item(i).getTextContent()); 
        }
        return this.myControlWebSite.deleteProgrammer(email);
       
    }

   public boolean deleteProgrammerOnHold(String email) {
        if(!this.typeUser.equals("administrator"))return false;
        return this.myControlWebSite.deleteProgrammerOnHold(email);
    }

   public Document getProgrammerByEntry(String d, String m, String a) {
        return this.myControlWebSite.getProgrammerByEntry(d,m,a);
    }

   public boolean getPassToEmail(String email) {
       
        return this.myControlWebSite.getPassToEmail(email);
    }

    public boolean existUser(String email) {
        return this.myControlWebSite.existUser(email);
    }

    
}
