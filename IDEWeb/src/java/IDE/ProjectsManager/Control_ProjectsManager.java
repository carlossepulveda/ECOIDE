/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package IDE.ProjectsManager;

import FileManager.Facade_FileManager;
import Util.Separator;
import java.util.ArrayList;
import java.util.Date;
import org.w3c.dom.Document;

/**
 *
 * @author cas
 */
public class Control_ProjectsManager{
    
    private ArrayList<Project> myProjects;
    
   public Control_ProjectsManager(){
    
        myProjects=new ArrayList<Project>();
    
    }
    
   public boolean loadProject(String name,String owner,String pathOwner,String user){
   
       if(this.containProject(name, owner))return false;
       Project p=new Project();
       if(!p.load(pathOwner, name,user))return false;
       this.myProjects.add(p);
       return true;
       
   
   }
   
   public boolean createProject(String name,String owner,Date createDate,String pathOwner,ArrayList<String[]>libs){

       if(this.existProject(name,pathOwner))return false;
       Project p=new Project();
       if(!p.create(name, owner, createDate, pathOwner,libs))return false;
       return true;  
   
   }
   
   public boolean deleteProject(String name,String owner,String pathOwner){
   
       Project p=new Project();
       p.setName(name);p.setOwner(owner);
       int index=myProjects.indexOf(p);
       if(index==-1)return false;
       
       this.myProjects.get(index).deleteProject(pathOwner);   
       this.myProjects.remove(index);
       return true;
   
   }
   
   public boolean deleteProject_(String name,String owner,String pathOwner,String user){
   
       Project p=new Project();
       p.setName(name);p.setOwner(owner);
       int index=myProjects.indexOf(p); 
       if(index==-1){
           if(!loadProject(name,owner,pathOwner,user))
               return false;
           else
               index=myProjects.indexOf(p);
       }
       this.myProjects.get(index).deleteProject(pathOwner);   
       this.myProjects.remove(index);
       return true;
   
   }
   
    /**Query Methods**/  
    
    //Return a xml file that contain information about a project
    public Document getDataProjectXML(String name,String owner,String ruta){
            
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getDataProjectXML(ruta);
    
    }
    //Return a xml file that contain information about project packages
    public Document getPackagesProjectXML(String name,String owner,String ruta) {
        
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getPackagesProjectXML(ruta);
        
    }    
    //Return a xml file that containt information about project classes
    public Document getClassesProjectXML(String name,String owner,String ruta) {
        
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getClassesProjectXML(ruta); 
        
    } 
    
     public Document getClassesProjectXML_(String name,String owner,String ruta,String user) {
       
       Project p=new Project();
       p.setName(name);p.setOwner(owner);
       int index=myProjects.indexOf(p); 
       if(index==-1){
           if(!loadProject(name,owner,ruta,user))
               return null;
           else
               index=myProjects.indexOf(p);
       }
       Document d=this.myProjects.get(index).getClassesProjectXML(ruta);
       this.myProjects.remove(index);
        return d; 
        
    }
     
    //Return a xml file that containt information about project .class files
    public Document getClassFilesProjectXML(String name,String owner,String ruta) {
        
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getClassFilesProjectXML(ruta); 
        
    } 
    //Return a xml file that containt information about project files
    public Document getOtherFilesProjectXML(String name,String owner,String ruta) {
        
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getOtherFilesProjectXML(ruta);
        
    }    
    //Return a xml file that containt information about project libraries
    public Document getLibsProjectXML(String name,String owner,String ruta) {
        
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getLibsProjectXML(ruta);
        
    }
    
    //Return a xml file that containt information about project libraries
    public Document getLibsProjectXML_(String name,String owner,String ruta) {
        
       Project p=new Project();
       p.setName(name);p.setOwner(owner);
       int index=myProjects.indexOf(p); 
       if(index==-1){
           if(!loadProject(name,owner,ruta,owner))
               return null;
           else
               index=myProjects.indexOf(p);
       }
        Document d=this.myProjects.get(index).getLibsProjectXML(ruta);
        this.myProjects.remove(index);
        return d;
        
    }
    

    public String getLibsFolder(String name,String owner,String ruta) {
        
       Project p=new Project();
       p.setName(name);p.setOwner(owner);
       int index=myProjects.indexOf(p); 
       if(index==-1){
           if(!loadProject(name,owner,ruta,owner))
               return null;
           else
               index=myProjects.indexOf(p);
       }
        String d=this.myProjects.get(index).getLibsFolder();
        
        return d;
        
    }
    
    //Return a xml file that containt class plain text
    public Document getClassXML(String name, String owner,String pathOwner, String nPackage, String nameF) {
       
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getClassXML(pathOwner,nPackage, nameF);
        
    }
    
    public String getGUIClassJSON(String name, String owner,String pathOwner, String nPackage, String nameF) {
       
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getGUIClassJSON(pathOwner,nPackage, nameF);
        
    }
    
    public Document getFileXML(String name,String owner, String pathOwner, String nPackage, String nameF) {
        
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getFileXML(pathOwner,nPackage, nameF);
    }
    
   
   private boolean containProject(String name,String owner){
       
       Project p=new Project();
       p.setName(name);
       p.setOwner(owner);
       return myProjects.contains(p);
       
   }
   
   private int getIndexProject(String name,String owner){
    
       Project p=new Project();
       p.setName(name);
       p.setOwner(owner);
       return myProjects.indexOf(p);
   
   
   }

   public boolean closeProject(String name, String owner) {
      int index=this.getIndexProject(name, owner);
      if(index<0)return false;
      this.myProjects.remove(index);
      return true;
    }

   
   /**Add methods**/
   public boolean addPackage(String name,String owner, String pathOwner, String nPackage) {
        int index=this.getIndexProject(name, owner);
        if(index<0)return false;
        return this.myProjects.get(index).addPackage(pathOwner,nPackage);
    }
   
   public boolean addClass(String name,String owner,String pathOwner,String nPackage,String nameC,String user){
       int index=this.getIndexProject(name, owner);
        if(index<0)return false;
        return this.myProjects.get(index).addClass(pathOwner,nPackage, nameC, user);
       
       
   }

   public boolean addGUIClass(String name,String owner,String pathOwner,String nPackage,String nameC){
        
       int index=this.getIndexProject(name, owner);
        if(index<0)return false;
        return this.myProjects.get(index).addGUIClass(pathOwner,nPackage, nameC);
      
    }
   
   public boolean addNewFile(String name,String owner, String pathOwner, String nPackage, String nameFile) {
        int index=this.getIndexProject(name, owner);
        if(index<0)return false;
        return this.myProjects.get(index).addNewFile(pathOwner,nPackage, nameFile);
    }
    
   public boolean addFile(String ruta,String nameP,String owner,String pack, String name, String pathCopy){
       
       int index=this.getIndexProject(nameP, owner);
        if(index<0)return false;
        return this.myProjects.get(index).addFile(ruta, pack, name, pathCopy);
   }
   
   public boolean addClassExisting(String ruta,String nameP,String owner,String pack, String name, String pathCopy){
      
       int index=this.getIndexProject(nameP, owner);
        if(index<0)return false;
        return this.myProjects.get(index).addClassExisting(ruta,pack, name,pathCopy);
       
       
   }
   
    public boolean addGUIClassExisting(String ruta, String nameP, String owner, String pack, String name, String pathCopy) {
        
        int index=this.getIndexProject(nameP, owner);
        if(index<0)return false;
        return this.myProjects.get(index).addGUIClassExisting(ruta,pack, name,pathCopy);
    }
   
   /**Delete methods**/
   
   public boolean deleteClass(String name,String owner,String pathOwner,String nPackage,String nameC){
   
       int index=this.getIndexProject(name, owner);
        if(index<0)return false;
        return this.myProjects.get(index).deleteClass(pathOwner,nPackage, nameC);   
   
   }

   public boolean deleteGUIClass(String name,String owner,String pathOwner,String nPackage,String nameC){
   
       int index=this.getIndexProject(name, owner);
        if(index<0)return false;
        return this.myProjects.get(index).deleteGUIClass(pathOwner,nPackage, nameC);   
   
   }
   
   public boolean deleteFile(String name,String owner, String pathOwner, String nPackage, String nameF) {
        
       int index=this.getIndexProject(name, owner);
        if(index<0)return false;
        return this.myProjects.get(index).deleteFile(pathOwner,nPackage, nameF);
        
    }
   
   public boolean deleteLib(String name,String owner, String pathOwner, String nameL) {
        
       int index=this.getIndexProject(name, owner);
        if(index<0)return false;
        return this.myProjects.get(index).deleteLib(pathOwner,nameL);
        
    }
   
   public boolean deletePackage(String name,String owner,String pathOwner,String nameL){
       
       int index=this.getIndexProject(name,owner);
        if(index<0)return false;
        return this.myProjects.get(index).deletePackage(pathOwner,nameL);
       
   }

   public boolean addLibJAR(String name,String owner,String pathOwner,String ap,String nameL){
         
       int index=this.getIndexProject(name,owner);
        if(index<0)return false;
        return this.myProjects.get(index).addLibJAR(pathOwner,ap,nameL);
       
   }
   
   
   /**Rename Methods**/
   
   public boolean renameProject(String name,String owner,String pathOwner,String newName,String user){
   
       if(this.existProject(newName,pathOwner))return false;
       int index=this.getIndexProject(name, owner);
       if(index<0)return false;
       Project p=this.myProjects.get(index);
       return p.renameProject(pathOwner,newName,user);   
   
   }
   
   public boolean renameProject_(String name,String owner,String pathOwner,String newName,String user){
  
       Project p=new Project();
       p.setName(name);p.setOwner(owner);
       int index=myProjects.indexOf(p);
       if(index==-1){
           if(!loadProject(name,owner,pathOwner,user))
               return false;
           else
               index=myProjects.indexOf(p);
       }
     
       this.myProjects.get(index).renameProject(pathOwner, newName, user);   
       this.myProjects.remove(index);
       return true;
   
   }
   
   public boolean renameClass(String name,String owner,String pathOwner,String nPackage,String nameC,String newNameC){
      
       int index=this.getIndexProject(name, owner);
       if(index<0)return false;
       Project p=this.myProjects.get(index);
       return p.renameClass(pathOwner,nPackage, nameC, newNameC);
       
       
       
   }
   
   public boolean renameGUIClass(String name,String owner,String pathOwner,String nPackage,String nameC,String newNameC){
      
       int index=this.getIndexProject(name, owner);
       if(index<0)return false;
       Project p=this.myProjects.get(index);
       return p.renameGUIClass(pathOwner,nPackage, nameC, newNameC);
       
       
       
   }
   
   public boolean renameLib(String name,String owner,String pathOwner,String nameL,String newName){
       
       int index=this.getIndexProject(name, owner);
       if(index<0)return false;
       Project p=this.myProjects.get(index);
       return p.renameLib(pathOwner, nameL, newName);
       
   }
   
   public boolean renameFile(String name,String owner,String pathOwner,String nPackage,String nameF,String newNameF){
      
       int index=this.getIndexProject(name, owner);
       if(index<0)return false;
       Project p=this.myProjects.get(index);
       return p.renameFile(pathOwner,nPackage, nameF, newNameF);
       
   }
   
   public boolean renamePackage(String name,String owner,String pathOwner,String nPackage,String newNameP){
       
       int index=this.getIndexProject(name, owner);
       if(index<0)return false;
       Project p=this.myProjects.get(index);
       return p.renamePackage(pathOwner,nPackage, newNameP);
       
   }
 
   
//
    private boolean existProject(String name, String pathOwner) {
        return Facade_FileManager.getReference().existFile(pathOwner, name);
       
    }
   

    public boolean haveProject(String name,String owner){
    
        return this.getIndexProject(name, owner)>-1;
        
    }

   
    public boolean toRegisterClassFiles(String name, String owner,String pathOwner) {
        int index=this.getIndexProject(name, owner);
        if(index<0)return false;
        return this.myProjects.get(index).toRegisterClassFiles(pathOwner);
    }
    
    public boolean setMainClass(String name, String owner,String pathOwner,String nameC,String pack) {
        int index=this.getIndexProject(name, owner);
        if(index<0)return false;
        return this.myProjects.get(index).setMainClass(pathOwner, nameC, pack);
    }
    public String getMainClass(String name, String owner,String ruta) {
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getMainClass(ruta);
    }
    
    public String getMainClass_(String name, String owner,String ruta,String user) {
       Project p=new Project();
       p.setName(name);p.setOwner(owner);
       int index=myProjects.indexOf(p);
       if(index==-1){
           if(!loadProject(name,owner,ruta,user))
               return null;
           else
               index=myProjects.indexOf(p);
       }
       String mc=this.myProjects.get(index).getMainClass(ruta);
       return mc;
    }
    
    public Document getUsersProject_(String name, String owner,String pathOwner,String user) {
        int index=this.getIndexProject(name, owner);
        if(index==-1){
           if(!loadProject(name,owner,pathOwner,user))
               return null;
           else{
               Project p=new Project();
               p.setName(name);p.setOwner(owner);
               index=myProjects.indexOf(p);
           }
               
       }
        return this.myProjects.get(index).getUsers(pathOwner);
    }
    
    public Document getUsersProject(String name, String owner,String pathOwner) {
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getUsers(pathOwner);
    }

    public void setNameProject(String name,String owner,String newName){
        int index=this.getIndexProject(name, owner);
        if(index<0)return;
        this.myProjects.get(index).setName(newName);
        
    }

    public String getRealPathClass(String name, String owner, String nPackage, String nameC,String pathOwner) {
        
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getRealPathClass(nPackage,nameC,pathOwner);
        
    }
    
    public String getRealPathFile(String name, String owner, String nPackage, String nameF,String pathOwner) {
        
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getRealPathFile(nPackage,nameF,pathOwner);
        
    }

   public String getRealPathLib(String name, String owner, String nameL, String pathOwner) {
       
       int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getRealPathLib(nameL,pathOwner);
       
    }

   public boolean saveGUIClass(String name, String owner, String nPackage, String nameG, Document d,String pathOwner) {
       
       int index=this.getIndexProject(name, owner);
        if(index<0)return false;
        return this.myProjects.get(index).saveGUIClass(nPackage,nameG,d,pathOwner);
        
    }
   
   public String toStringProjects(){
       
       String a="";
       
       for(Project p:this.myProjects){
           a+=";"+p.toString();
       }
      
       return a;
   }

   public boolean shareProject(String name,String owner,String user,String type,String pathOwner){
       
        int index=this.getIndexProject(name, owner);
        if(index<0)return false;
        return this.myProjects.get(index).addUser(pathOwner,user,type);
       
       
    }
   
   public boolean shareProject_(String name,String owner,String user,String type,String pathOwner,String userE){
       
       Project p=new Project();
       p.setName(name);p.setOwner(owner);
       int index=myProjects.indexOf(p);
       if(index==-1){
           if(!loadProject(name,owner,pathOwner,userE))
               return false;
           else
               index=myProjects.indexOf(p);
       }
        return this.myProjects.get(index).addUser(pathOwner,user,type);
       
       
    }
   
   public String getUserType(String name, String owner,String ruta) {
       
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getMyUserType(ruta+Separator.getSystemSeparator()+name);
        
    }
   
   public String getUserType_(String name, String owner,String user,String pathOwner) {
       System.out.println(name+"   "+owner+"   "+user+"   "+pathOwner);
        Project p=new Project();
       p.setName(name);p.setOwner(owner);
       int index=myProjects.indexOf(p);
       if(index==-1){
           if(!loadProject(name,owner,pathOwner,user)){
                              return null;
           }
           else{
                              index=myProjects.indexOf(p);
           }
       }
        String  us=this.myProjects.get(index).getMyUserType(pathOwner+Separator.getSystemSeparator()+name);
        this.myProjects.remove(index);
        return us;
        
    }

    public boolean deleteUserProjects(String name, String owner, String user, String pathOwner) {
        
        int index=this.getIndexProject(name, owner);
        if(index<0)return false;
        return this.myProjects.get(index).deleteUser(pathOwner,user);
        
    }

    public boolean closeProjects() {
        
        try{
            myProjects=new ArrayList<Project>();
        }
        catch(Exception e){System.out.println("Clase : Control_ProjectsManager - Metodo: closeProjects() - Error : "+e.getMessage());return false;}
        
        return true;
    }
   
  
    public ArrayList<String[]> getFoldersToCompress(String name,String owner,String pathOwner){
        
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getFoldersToCompress(name,owner,pathOwner);
      
    }
    
    public ArrayList<String[]> getFoldersToExecutableCompress(String name,String owner,String pathOwner){
        
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getFoldersToExecutableCompress(name,owner,pathOwner);
      
    }

    public boolean changeUserPrivilege(String name, String owner, String user, String type, String pathOwner) {
        
        int index=this.getIndexProject(name, owner);
        if(index<0)return false;
        this.myProjects.get(index).changeUserPrivilege(user,type,pathOwner);
        return true;
        
    }
    
    public boolean changeUserPrivilege_(String name, String owner, String user, String type, String pathOwner,String userE) {
        
       Project p=new Project();
       p.setName(name);p.setOwner(owner);
       int index=myProjects.indexOf(p);
       if(index==-1){
           if(!loadProject(name,owner,pathOwner,userE))
               return false;
           else
               index=myProjects.indexOf(p);
       }
        this.myProjects.get(index).changeUserPrivilege(user,type,pathOwner);
        this.myProjects.remove(index);
        return true;
    }

    public String getExecuteFolder(String name, String owner) {
        
        int index=this.getIndexProject(name, owner);
        if(index<0)return null;
        return this.myProjects.get(index).getExecuteFolder();
    }

    public boolean deleteViewProject(String name, String owner, String user, String pathOwner) {
        int index=this.getIndexProject(name, owner);
        if(index<0)return false;
        if(this.myProjects.get(index).deleteViewProject(pathOwner,user)){
            this.myProjects.remove(index);
            return true;
        }
        return false;
        
    }
    
    public boolean deleteViewProject_(String name, String owner, String user, String pathOwner) {
       Project p=new Project();
       p.setName(name);p.setOwner(owner);
       int index=myProjects.indexOf(p);
       if(index==-1){
           if(!loadProject(name,owner,pathOwner,user))
               return false;
           else
               index=myProjects.indexOf(p);
       }
        if(this.myProjects.get(index).deleteViewProject(pathOwner,user)){
            this.myProjects.remove(index);
            return true;
        }
        return false;
        
    }
   
}
