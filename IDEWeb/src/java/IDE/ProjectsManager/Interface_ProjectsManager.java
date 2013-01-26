/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package IDE.ProjectsManager;

import java.util.Date;
import org.w3c.dom.Document;

/**
 *
 * @author cas
 */
public interface Interface_ProjectsManager {
    
    public boolean loadProject(String name,String owner,String pathOwner,String user);
    public boolean createProject(String name,String owner,Date createDate,String pathOwner);
    public boolean renameProject(String name,String owner,String pathOwner,String newName);
    public boolean renameClass(String name,String owner,String pathOwner,String nPackage,String nameC,String newNameC);    
    public boolean renameFile(String name,String owner,String pathOwner,String nPackage,String nameF,String newNameF);
    public boolean renamePackage(String name,String owner,String pathOwner,String nPackage,String newNameP);    
    public boolean deleteProject(String name,String owner,String pathOwner,String user);
    public boolean closeProject(String name,String owner);
    public boolean addPackage(String name,String owner, String pathOwner, String nPackage);    
    public boolean addClass(String name,String owner,String pathOwner,String nPackage,String nameC);
    public boolean addNewFile(String name,String owner, String pathOwner, String nPackage, String nameFile);    
    public boolean addFile(String ruta,String nameP,String owner,String pack, String name, String pathCopy);
    public boolean addClassExisting(String ruta,String nameP,String owner,String pack, String name, String pathCopy);    
    public boolean addLibJAR(String name,String owner,String pathOwner,String ap,String nameL);
    /**Query Methods**/  
    
    //Return a xml file that contain information about a project
    public Document getDataProjectXML(String name,String owner);
    //Return a xml file that contain information about project packages
    public Document getPackagesProjectXML(String name,String owner);  
    //Return a xml file that containt information about project classes
    public Document getClassesProjectXML(String name,String owner);     
    public Document getClassFilesProjectXML(String name,String owner); 
    //Return a xml file that containt information about project files
    public Document getOtherFilesProjectXML(String name,String owner);    
    //Return a xml file that containt information about project libraries
    public Document getLibsProjectXML(String name,String owner);    
    public Document getClassXML(String name,String owner, String pathOwner, String nPackage, String nameF);   
    public Document getFileXML(String name,String owner, String pathOwner, String nPackage, String nameF);
    /**Delete methods**/    
    public boolean deleteClass(String name,String owner,String pathOwner,String nPackage,String nameC);    
    public boolean deleteFile(String name,String owner, String pathOwner, String nPackage, String nameF);    
    public boolean deleteLib(String name,String owner, String pathOwner, String nameL);
    public boolean deletePackage(String name,String owner,String pathOwner,String nameL); 
    public boolean haveProject(String name,String owner);
    public boolean toRegisterClassFiles(String name, String owner,String pathOwner);    
    public boolean setMainClass(String name, String owner,String pathOwner,String nameC,String pack);     
    public String getMainClass(String name, String owner);
}
