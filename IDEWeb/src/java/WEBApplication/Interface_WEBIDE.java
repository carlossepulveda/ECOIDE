/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package WEBApplication;

import org.w3c.dom.Document;

/**
 *
 * @author cas
 */
public interface Interface_WEBIDE {
  
    public Document compileProject(String name,String owner);
     
    public String executeProjectWEB(String name,String owner);
     
    public boolean loadProject(String name,String owner,String user);
    
    public boolean renameProject(String name, String owner,String newName);
    
    public boolean renameClass(String name, String owner,String nPackage, String nameC, String newNameC);
    
    public boolean renameFile(String name, String owner,String nPackage, String nameF, String newNameF);
   
    public boolean renamePackage(String name, String owner, String nPackage, String newNameP);
    
    public boolean deleteProject(String name, String owner);

   
    public boolean closeProject(String name, String owner);
   
    public boolean addPackage(String name, String owner, String nPackage);
    
    public boolean addClass(String name, String owner,String nPackage, String nameC);

    
    public boolean addNewFile(String name, String owner, String nPackage, String nameFile);
    
    public boolean addFile(String nameP, String owner, String pack, String name, String pathCopy);
    
    public boolean addClassExisting(String nameP, String owner, String pack, String name, String pathCopy);
    
    public boolean addLibJAR(String name, String owner,String ap, String nameL);

    
    public Document getDataProjectXML(String name, String owner);

    
    public Document getPackagesProjectXML(String name, String owner);
    
    public Document getClassesProjectXML(String name, String owner);

    
    public Document getClassFilesProjectXML(String name, String owner);

    
    public Document getOtherFilesProjectXML(String name, String owner);

    
    public Document getLibsProjectXML(String name, String owner);

    
    public Document getClassXML(String name, String owner,String nPackage, String nameF);
    
    public Document getFileXML(String name, String owner,String nPackage, String nameF);
    
    public boolean deleteClass(String name, String owner,  String nPackage, String nameC);
    
    public boolean deleteFile(String name, String owner,String nPackage, String nameF);

    
    public boolean deleteLib(String name, String owner,String nameL);
    
    public boolean deletePackage(String name, String owner, String nameL);

    
    public boolean haveProject(String name, String owner);

    public boolean setMainClass(String name, String owner,String nameC, String pack);

   
    public String getMainClass(String name, String owner);
    
}
