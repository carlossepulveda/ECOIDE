/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package IDE.ProjectsManager;


import FileManager.Control_FileManager;
import FileManager.Facade_FileManager;
import FileManagerXML.Facade_FileManagerXML;
import FileManagerXML.ParameterXML;
import IDE.Signer.Facade_Signer;
import Util.Separator;
import java.util.ArrayList;
import java.util.Date;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.w3c.dom.Text;

/**
 *
 * @author cas
 */
public class Project {
    
    public static final String buildFolder="build";
    public static final String buildFolderWEB="buildWEB";
    public static final String srcFolder="src";
    public static final String executeFolder="execute";
    public static final String distFolder="dist";
    public static final String confFolder="config";
    public static final String libFolder="lib";
    
    public static final String packagesXMLfile="packages.xml";
    public static final String configXMLfile="config.xml";
    public static final String javaFilesXMLfile="src.xml";
    public static final String classFilesXMLfile="class.xml";
    public static final String libsXMLfile="libs.xml";
    public static final String otherFilesXMLfile="otherFiles.xml";
    public static final String fileManifest="MANIFEST.MF";
    
    public static final String userTypeRead="Read";
    public static final String userTypeWrite="Write";
    
    //private ArrayList<Class> myJavaFiles;
    //private ArrayList<String> myPackages;
    //private ArrayList<String> myClassFiles;
    //private ArrayList<String> myLibs;
    //private ArrayList<File> myOtherFiles;
    //private String name;
    //private Date createDate;
    private String owner;
    //private Class mainClass;
    //private ArrayList<User> myUsers;
    private User myUser;
    private String nameP;
    private Facade_FileManagerXML controlFileManagerXML;
    
    
    
    public Project(){
    
        controlFileManagerXML=new Facade_FileManagerXML();
        
     
    
    }
    
    
    
     /** Create Methods**/
    
    //Create a new project
    public boolean create(String name,String owner,Date createDate,String ruta,ArrayList<String[]>libs){
  
        if(!this.createFolders(ruta, name, libs))return false;//To create the projects folders
        this.owner=owner;
        return this.createConfigurationFiles(ruta+Separator.getSystemSeparator()+name,name,createDate)&&this.addLibsJAR(ruta+Separator.getSystemSeparator()+name,libs);//To create the Configuration files
        
    
    }  
    //Create project folders
    private boolean createFolders(String ruta,String name,ArrayList<String[]>libs){
    
        Facade_FileManager.getReference().createFolder(ruta, name);//Create a project folder
       
        Facade_FileManager.getReference().createFolder(ruta+Separator.getSystemSeparator()+name, Project.buildFolder);
        Facade_FileManager.getReference().createFolder(ruta+Separator.getSystemSeparator()+name, Project.buildFolderWEB);
        Facade_FileManager.getReference().createFolder(ruta+Separator.getSystemSeparator()+name, Project.srcFolder);
        Facade_FileManager.getReference().createFolder(ruta+Separator.getSystemSeparator()+name, Project.executeFolder);
        Facade_FileManager.getReference().createFolder(ruta+Separator.getSystemSeparator()+name, Project.confFolder);
        Facade_FileManager.getReference().createFolder(ruta+Separator.getSystemSeparator()+name, Project.libFolder);
        Facade_FileManager.getReference().createFolder(ruta+Separator.getSystemSeparator()+name, Project.distFolder);
        
        Facade_FileManager.getReference().writeFile(ruta+Separator.getSystemSeparator()+name+Separator.getSystemSeparator()+Project.executeFolder+Separator.getSystemSeparator()+Separator.getSystemSeparator()+"index.jsp", 
                this.getTemplateJSPExecute(libs));
    
        return true;
    
    
    }
    //Create project configuration files
    private boolean createConfigurationFiles(String ruta,String name,Date createDate){
    
        String rcon=ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator();
        controlFileManagerXML.crearXMLnuevo(rcon+"config.xml", "structure");
            controlFileManagerXML.leerXMLexistente(rcon+"config.xml");
            controlFileManagerXML.addChild("name", name, null, null);
            controlFileManagerXML.addChild("date", createDate.getDate()+"/"+createDate.getMonth()+"/"+createDate.getYear(), null, null);
            controlFileManagerXML.addChild("owner", this.owner, null, null);
            ArrayList<ParameterXML> pr=new ArrayList<ParameterXML>();
            pr.add(new ParameterXML("name",""));
            pr.add(new ParameterXML("package",""));
            controlFileManagerXML.addChild("mainClass", "", pr, null);
            controlFileManagerXML.addChild("users", "", null, null);
            controlFileManagerXML.closeDocument();
            controlFileManagerXML.limpiar();
        controlFileManagerXML.crearXMLnuevo(rcon+"src.xml", "structure");
        controlFileManagerXML.crearXMLnuevo(rcon+"packages.xml", "structure");
        controlFileManagerXML.crearXMLnuevo(rcon+"class.xml", "structure");
        controlFileManagerXML.crearXMLnuevo(rcon+"libs.xml", "structure");
        controlFileManagerXML.crearXMLnuevo(rcon+"otherFiles.xml","structure");
        Facade_FileManager.getReference().writeFile(rcon+"MANIFEST.MF", this.getTemplateMANIFEST(null,null));
        
        return true;
        
    
    }
    
    
    
    /** Load Methods**/
    
    //Load a project
    public boolean load(String ruta,String name,String user){
    
      
        return this.loadConfigurationFiles(ruta+Separator.getSystemSeparator()+name,user);
  
    
    }
    //Load configuration files
    private boolean loadConfigurationFiles(String ruta,String user){
    
            this.loadMyInformation(ruta);
            
           
                if(!user.equals(this.owner)){
                   
                    this.myUser=this.getUser(ruta,user);
                    
                }
                else{
                    this.myUser=new User(owner,Project.userTypeWrite);
                }  
             
                if(this.myUser==null)return false;
             
                return true;
                
           // }   
       
    }   
    //Load a information about project
    private boolean loadMyInformation(String ruta){
    
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.configXMLfile);
   
        this.owner=controlFileManagerXML.getDocumentoXML().getElementsByTagName("owner").item(0).getTextContent();
        this.nameP=controlFileManagerXML.getDocumentoXML().getElementsByTagName("name").item(0).getTextContent();
       // this.createDate=new Date();
       
        return true;
        
        
    }
 
 
       
    
    
    /** Delete Methods**/
    
    //Delete actual project
    public boolean deleteProject(String ruta){
       
        if(this.myUser.getEmail().equals(this.owner)){
            return deleteProject_(ruta+Separator.getSystemSeparator()+nameP);
        }else{
            return this.deleteUser(ruta,this.myUser.getEmail() );
        }
    }
   
    //Delete project
    private boolean deleteProject_(String ruta){
        
        Facade_FileManager.getReference().deleteFolder(ruta);
   
        owner=null;
        ruta=null;
        
        
        return true;
    }
    //Delete a set of packages
    private boolean deletePackages_(String ruta,ArrayList<String> packages){
       
        if(packages==null)return false;
        if(packages.isEmpty())return true;
        int x=0;
      
        for(String p:packages ){
           
            int y=p.split("\\.").length;
            if(y>x)x=y;
        }
       
        ArrayList<String> aux=new ArrayList<String>();
        
        for(String p:packages){        
           
            if(p.split("\\.").length==x)
                aux.add(p);            
        
        }
        
        for(String p:aux){
        
            packages.remove(p);
            String[] mp=p.split("\\.");
            String mpath=ruta+Separator.getSystemSeparator()+srcFolder;
            for(String xx:mp)
                mpath+=Separator.getSystemSeparator()+xx;
           
            Facade_FileManager.getReference().deleteFile(mpath);
        
        }
        
        return deletePackages_(ruta,packages);
        
    }
    //Delete a package
    public boolean deletePackage(String ruta,String name){
      ruta+=Separator.getSystemSeparator()+nameP; 
      if(this.getMyUserType(ruta).equals(Project.userTypeRead))return false;
      ArrayList<String> aux=new ArrayList<String>();
        
      
      controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.packagesXMLfile);
        NodeList nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
        for(int i=0;i<nl.getLength();i++)
            if(this.isParentPackage(name, nl.item(i).getAttributes().getNamedItem("name").getTextContent()))
                aux.add(nl.item(i).getAttributes().getNamedItem("name").getTextContent());
        
    
         
        ArrayList<Class> myClass=new ArrayList<Class>();
        ArrayList<File> myFile=new ArrayList<File>();
        for(String x:aux){
            
            
            controlFileManagerXML.limpiar();
            controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.javaFilesXMLfile);
            nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
            for(int i=0;i<nl.getLength();i++){

                if(nl.item(i).getAttributes().getNamedItem("package").getTextContent().equals(x))
                myClass.add(new Class(nl.item(i).getAttributes().getNamedItem("package").getTextContent(),nl.item(i).getAttributes().getNamedItem("name").getTextContent(),nl.item(i).getAttributes().getNamedItem("path").getTextContent(),nl.item(i).getAttributes().getNamedItem("type").getTextContent()));
               
            }
            
            
            controlFileManagerXML.limpiar();
            controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.otherFilesXMLfile);
            nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
            for(int i=0;i<nl.getLength();i++){

                if(nl.item(i).getAttributes().getNamedItem("package").getTextContent().equals(x))
                myFile.add(new File(nl.item(i).getAttributes().getNamedItem("path").getTextContent(), nl.item(i).getAttributes().getNamedItem("package").getTextContent(),nl.item(i).getAttributes().getNamedItem("name").getTextContent(),nl.item(i).getAttributes().getNamedItem("type").getTextContent()));
               
            }
                   
           for(Class cc:myClass){
            
                this.deleteClass(ruta,cc);
            
            }
            
            for(File ff:myFile){
            
                this.deleteFile(ruta,ff);
            
            } 
                     
                 Node n=null;
                 String ppp="";
                 controlFileManagerXML.limpiar();
                 controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.packagesXMLfile);
                 nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
                 for(int i=0;i<nl.getLength();i++){//recorre todo el xml que contiene los paquetes
                     if(nl.item(i).getAttributes().getNamedItem("name").getTextContent().equals(x)){
                         Element element = (Element)nl.item(i);
                         controlFileManagerXML.getDocumentoXML().getDocumentElement().removeChild(element);
                         break;
                         
                     }
                 }
                 this.controlFileManagerXML.closeDocument();
        }//end of for
        
        return deletePackages_(ruta,aux);
    }
    //Delete a file
    public boolean deleteFile(String ruta,String pack,String name){
       if(this.getMyUserType(ruta+Separator.getSystemSeparator()+nameP).equals(Project.userTypeRead))return false;
        File f=this.getFile(pack, name,ruta+Separator.getSystemSeparator()+nameP);
        if(f==null)return false;
        deleteFile(ruta+Separator.getSystemSeparator()+nameP,f);
        return true;
    }
    //Delete a file
    private boolean deleteFile(String ruta,File file){
       
        if(Facade_FileManager.getReference().deleteFile(ruta+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+file.getPath())){
        
                 controlFileManagerXML.limpiar();
                 controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.otherFilesXMLfile);
                 
                 NodeList nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
                 Node n=null;
                 for(int i=0;i<nl.getLength();i++){
                     if(nl.item(i).getAttributes().getNamedItem("path").getTextContent().equals(file.getPath())){
                         
                      Element element = (Element)nl.item(i);
                    
                      if(null!=controlFileManagerXML.getDocumentoXML().getDocumentElement().removeChild(element)){
                      controlFileManagerXML.closeDocument();
                      return true;
                      }
                       return false;
                         
                     }
                 }
    
        }
        return false;
    }
    //Delete a class
    public boolean deleteClass(String ruta,String pack,String name){
        if(this.getMyUserType(ruta+Separator.getSystemSeparator()+nameP).equals(Project.userTypeRead))return false;
        Class c=this.getClass(ruta+Separator.getSystemSeparator()+nameP,name, pack);
        if(c==null)return false;
        deleteClass(ruta+Separator.getSystemSeparator()+nameP,c);
        return true;
        
    }
    public boolean deleteGUIClass(String ruta,String pack,String name){
       
        Class c=this.getClass(ruta+Separator.getSystemSeparator()+nameP,name, pack);
        if(c==null)return false;
        if(this.deleteClass(ruta,pack,name)){
           
            return Facade_FileManager.getReference().deleteFile(ruta+Separator.getSystemSeparator()+nameP+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+c.getPath().replace(".java", ".frml"));
            
        }
        return false;
        
    }
    //Delete a class
    private boolean deleteClass(String ruta,Class classe){
        if(this.getMyUserType(ruta).equals(Project.userTypeRead))return false;
        if(Facade_FileManager.getReference().deleteFile(ruta+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+classe.getPath())){
        
                 controlFileManagerXML.limpiar();
                 controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.javaFilesXMLfile);
                 NodeList nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
                 
                 for(int i=0;i<nl.getLength();i++){
                    if(nl.item(i).getAttributes().getNamedItem("package").getTextContent().equals(classe.getPackageName()) && nl.item(i).getAttributes().getNamedItem("name").getTextContent().equals(classe.getName()) ){
                                       
                      Element element = (Element)nl.item(i);
                    //element.getParentNode().removeChild(element);
                      if(null!=controlFileManagerXML.getDocumentoXML().getDocumentElement().removeChild(element)){
                      controlFileManagerXML.closeDocument();
                            if(this.getMainClass_(ruta).equals(classe))this.deleteMainClass(ruta);
                      return true;
                      }
                       return false;
                     }
                 }
    
        }
        return false;
    }
    //Delete main class
    private void deleteMainClass(String ruta) {
       
        ruta+=Separator.getSystemSeparator();
        this.controlFileManagerXML.leerXMLexistente(ruta+Project.confFolder+Separator.getSystemSeparator()+Project.configXMLfile);
        this.controlFileManagerXML.getDocumentoXML().getElementsByTagName("mainClass").item(0).getAttributes().getNamedItem("name").setTextContent("");
        this.controlFileManagerXML.getDocumentoXML().getElementsByTagName("mainClass").item(0).getAttributes().getNamedItem("package").setTextContent("");
        this.controlFileManagerXML.closeDocument();
    }
    //Delete librarie
    public boolean deleteLib(String ruta,String name){
        if(name.equals("AbsoluteLayout.jar"))return false;
        if(this.getMyUserType(ruta+Separator.getSystemSeparator()+nameP).equals(Project.userTypeRead))return false;
        if(name==null)return false;
        if(name.isEmpty())return false;
        String index=this.getLib(ruta+Separator.getSystemSeparator()+nameP,name);
        if(index==null)return false;
        return this.deleteLib_(ruta+Separator.getSystemSeparator()+nameP,name);
    }
    //Delete librarie
    private boolean deleteLib_(String ruta,String name){
        
        if(Facade_FileManager.getReference().deleteFile(ruta+Separator.getSystemSeparator()+Project.libFolder+Separator.getSystemSeparator()+name)){
        
                 controlFileManagerXML.limpiar();
                 controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.libsXMLfile);
                 NodeList nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
                 Node n=null;
                 for(int i=0;i<nl.getLength();i++){
                    if(nl.item(i).getAttributes().getNamedItem("name").getTextContent().equals(name)){
                         n=nl.item(i);
                         if(controlFileManagerXML.getDocumentoXML().getDocumentElement().removeChild(nl.item(i))!=null){this.controlFileManagerXML.closeDocument();return true;}
                         return false;
                     }
                 }
    
        }
        return false;
        
        
        
    }
    
    
    
    
    /**Rename Methods**/
    
    
    
    public boolean renameProject(String ruta,String newName,String user){
        if(!user.equals(owner))return false;
        String path=Facade_FileManager.getReference().renameFolder(ruta+Separator.getSystemSeparator()+nameP, newName);
        if(path!=null){
            ruta=path;
            controlFileManagerXML.limpiar();
            controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.configXMLfile);
            controlFileManagerXML.getDocumentoXML().getDocumentElement().getElementsByTagName("name").item(0).setTextContent(newName);
            controlFileManagerXML.closeDocument();
            this.nameP=newName;
            return true;
        
        
        }
        return false;
    
    }
    
  
    
    public boolean renameClass(String ruta,String pack,String name,String newName){
        if(this.getMyUserType(ruta+Separator.getSystemSeparator()+nameP).equals(Project.userTypeRead))return false;
        if(!this.javaFileIsValid(newName))return false;//if the parameters is invalid, dont create it
        if(newName==null || name==null)return false;
        if(newName.isEmpty() || name.isEmpty())return false;
        if(pack==null)pack="";
        Class index=this.getClass(ruta+Separator.getSystemSeparator()+this.getName(), name, pack);
        if(index==null)return false;
                
        return renameClass(ruta+Separator.getSystemSeparator()+nameP,index,newName);
  
    }    
    private boolean renameClass(String ruta,Class c,String newName){
        
        String n=Facade_FileManager.getReference().renameFile(ruta+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+c.getPath(), newName);
        if(n!=null){
            controlFileManagerXML.limpiar();
            controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.javaFilesXMLfile);
            NodeList nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
            
            for(int i=0;i<nl.getLength();i++){
                if(nl.item(i).getAttributes().getNamedItem("package").getTextContent().equals(c.getPackageName()) &&
                   nl.item(i).getAttributes().getNamedItem("name").getTextContent().equals(c.getName())){
                   
                    String pathSrc=c.getPackageName().replace(".", Separator.getSystemSeparator());
                    if(pathSrc.isEmpty())pathSrc+=newName;
                    else pathSrc+=Separator.getSystemSeparator()+newName;
                    if(c.equals(this.getMainClass_(ruta)))this.renameMainClass(newName,ruta);
                    
                    controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.javaFilesXMLfile);
                    controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("name").setTextContent(newName);
                    controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("path").setTextContent(pathSrc);
                    controlFileManagerXML.closeDocument();
                    
                    return true;
                }
            }
            
         
        }
       
        return false;
    }  
    
    public boolean renameGUIClass(String ruta,String pack,String name,String newName){
     
        Class c=this.getClass(ruta+Separator.getSystemSeparator()+nameP,name, pack);
        if(c==null)return false;
        if(this.renameClass(ruta,pack,name,newName)){
           
            Facade_FileManager.getReference().renameFile(ruta+Separator.getSystemSeparator()+nameP+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+c.getPath().replace(".java", ".frml"),newName.replace(".java", ".frml"));
            return true;
        }
        return false;
    }
    public boolean renameFile(String ruta,String pack,String name,String newName){
        
        if(this.getMyUserType(ruta+Separator.getSystemSeparator()+nameP).equals(Project.userTypeRead))return false;
        if(newName==null || name==null)return false;
        if(newName.isEmpty() || name.isEmpty())return false;
        if(pack==null)pack="";
        File f=this.getFile(pack, name,ruta+Separator.getSystemSeparator()+nameP);
        if(f==null)return false;
                
        return renameFile(ruta+Separator.getSystemSeparator()+nameP,f,newName);
  
    }    
    private boolean renameFile(String ruta,File f,String newName){
        
        String n=Facade_FileManager.getReference().renameFile(ruta+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+f.getPath(), newName);
        if(n!=null){
            controlFileManagerXML.limpiar();
            controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.otherFilesXMLfile);
            NodeList nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
            for(int i=0;i<nl.getLength();i++){
                if(nl.item(i).getAttributes().getNamedItem("package").getTextContent().equals(f.getPack()) &&
                   nl.item(i).getAttributes().getNamedItem("name").getTextContent().equals(f.getName())){
                   
                    String pathSrc=f.getPack().replace(".", Separator.getSystemSeparator());
                    if(pathSrc.isEmpty())pathSrc+=newName;
                    else pathSrc+=Separator.getSystemSeparator()+newName;
                    
                    controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("name").setTextContent(newName);
                    controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("path").setTextContent(pathSrc);
                    controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("type").setTextContent(Facade_FileManager.getReference().getFileType(n));
                    controlFileManagerXML.closeDocument();
                    return true;
                }
            }
            
         
        }
       
        return false;
    }
    
    
    public boolean renameLib(String ruta,String name,String newName){
       if(name.equals("AbsoluteLayout.jar"))return false;
        if(this.getMyUserType(ruta+Separator.getSystemSeparator()+nameP).equals(Project.userTypeRead))return false;
        if(newName==null || name==null)return false;
        if(newName.isEmpty() || name.isEmpty())return false;
       
        String f=this.getLib(ruta+Separator.getSystemSeparator()+nameP,name);
      
        if(f==null)return false;
        if(f.isEmpty())return false;
                
        return renameLib_(ruta+Separator.getSystemSeparator()+nameP,f,newName);
  
    }    
    private boolean renameLib_(String ruta,String name,String newName){
        
        String n=Facade_FileManager.getReference().renameFile(ruta+Separator.getSystemSeparator()+Project.libFolder+Separator.getSystemSeparator()+name, newName);
        if(n!=null){
            controlFileManagerXML.limpiar();
            controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.libsXMLfile);
            NodeList nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
            for(int i=0;i<nl.getLength();i++){
                if(nl.item(i).getAttributes().getNamedItem("name").getTextContent().equals(name)){
                   
                    controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("name").setTextContent(newName);
                    controlFileManagerXML.closeDocument();
                    return true;
                }
            }
            
         
        }
       
        return false;
    }
    
    
    public boolean renamePackage(String ruta,String namePackage,String newName){
        if(this.getMyUserType(ruta+Separator.getSystemSeparator()+nameP).equals(Project.userTypeRead))return false;
        return renamePackage_(ruta+Separator.getSystemSeparator()+nameP,namePackage,newName);
    }
    private boolean renamePackage_(String ruta,String namePackage,String newName){
        if(namePackage==null || newName==null)return false;
        if(namePackage.isEmpty() || newName.isEmpty())return false;
     
        if(this.getPackage(ruta, namePackage)==null || this.getPackage(ruta, newName)!=null)return false;
        
        
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.packagesXMLfile);
        NodeList nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
        for(int i=0;i<nl.getLength();i++){
                    
            if(nl.item(i).getAttributes().getNamedItem("name").getTextContent().equals(namePackage))continue;
            if(this.isFatherPackage(namePackage,nl.item(i).getAttributes().getNamedItem("name").getTextContent())){
              renamePackage_(ruta,nl.item(i).getAttributes().getNamedItem("name").getTextContent(),newName+"."+this.getNamePackage(nl.item(i).getAttributes().getNamedItem("name").getTextContent()));
            }
            
            
        }
      
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.javaFilesXMLfile);
        nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
        for(int i=0;i<nl.getLength();i++){
            Class c=new Class(nl.item(i).getAttributes().getNamedItem("package").getTextContent(),nl.item(i).getAttributes().getNamedItem("name").getTextContent(),nl.item(i).getAttributes().getNamedItem("path").getTextContent(),nl.item(i).getAttributes().getNamedItem("type").getTextContent());
            if(c.getPackageName().equals(namePackage))
                    this.renamePackage_Class(ruta,c,newName);  
        }
              
    
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.otherFilesXMLfile);
        nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
            for(int i=0;i<nl.getLength();i++){
                File f=new File(nl.item(i).getAttributes().getNamedItem("path").getTextContent(), nl.item(i).getAttributes().getNamedItem("package").getTextContent(),nl.item(i).getAttributes().getNamedItem("name").getTextContent(),nl.item(i).getAttributes().getNamedItem("type").getTextContent());
                if(f.getPack().equals(namePackage))
                    this.renamePackage_File(ruta,f, newName);
               
            }
        
            
               
            controlFileManagerXML.limpiar();
            controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.packagesXMLfile);
            nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
                 for(int i=0;i<nl.getLength();i++){//recorre todo el xml que contiene los paquetes
                     if(nl.item(i).getAttributes().getNamedItem("name").getTextContent().equals(namePackage)){
                         controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("name").setTextContent(newName);
                         if(!this.getNamePackage(namePackage).equals(this.getNamePackage(newName))){
                            String path=namePackage.replace(".",Separator.getSystemSeparator());
                            Facade_FileManager.getReference().renameFolder(ruta+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+path , this.getNamePackage(newName));
                         }
                            break;
                         
                     }
                 }
            this.controlFileManagerXML.closeDocument();
      
        
        return true;
    
    
    
    
    
    
    
    }
    
    public boolean renamePackage_Class(String ruta,Class c,String newName){
        
            if(this.getMyUserType(ruta).equals(Project.userTypeRead))return false;
            controlFileManagerXML.limpiar();
            controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.javaFilesXMLfile);
            NodeList nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
            for(int i=0;i<nl.getLength();i++){
                
                if(nl.item(i).getAttributes().getNamedItem("package").getTextContent().equals(c.getPackageName()) &&
                   nl.item(i).getAttributes().getNamedItem("name").getTextContent().equals(c.getName())){
                   
                    
                    String path=newName.replace(".",Separator.getSystemSeparator())+Separator.getSystemSeparator()+c.getName();
                    
                    
        
                    controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("package").setTextContent(newName);
                    controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("path").setTextContent(path);
                    this.renameMainClass_Package(newName, ruta);
                    controlFileManagerXML.closeDocument();
                    return true;
                }
                
            }
            
         
        
        return false;
        
    }
    public boolean renamePackage_File(String ruta,File f,String newName){
        
         controlFileManagerXML.limpiar();
            controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.otherFilesXMLfile);
            NodeList nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
            for(int i=0;i<nl.getLength();i++){
                if(nl.item(i).getAttributes().getNamedItem("package").getTextContent().equals(f.getPack()) &&
                   nl.item(i).getAttributes().getNamedItem("name").getTextContent().equals(f.getName())){
                  
                    String path=newName.replace("\\.",Separator.getSystemSeparator())+Separator.getSystemSeparator()+f.getName();
                            
                    controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("path").setTextContent(path);
                    controlFileManagerXML.closeDocument();
                    return true;
                }
            }
        
        return true;
        
    }
    
    
    /**Add Methods**/
    
    //Add a new package
    public boolean addPackage(String ruta,String name){//the name of the package is for example "package.subpackage"
        
        if(this.getMyUserType(ruta+Separator.getSystemSeparator()+nameP).equals(Project.userTypeRead))return false;
        if(!this.packageIsValid())return false;//if the package name isnt valid, dont create it
        if(name==null)return false;//if the name is null, dont create it
        if(name.isEmpty())return false;//if the name is empty, dont create it
        if(this.getPackage(ruta+Separator.getSystemSeparator()+nameP, name)!=null)return false;//the package exist
     
        return this.addPackage_(ruta+Separator.getSystemSeparator()+nameP, name); 
        
    }
    private boolean addPackage_(String ruta,String totalName){
        
        
        String [] packs=totalName.split("\\.");
        if(packs.length==1){//its a package, else its a subpackage
             Facade_FileManager.getReference().createFolder(ruta+Separator.getSystemSeparator()+Project.srcFolder, totalName);
            this.toRegisterPackage(ruta,totalName);
            return true;
        }
        String path=ruta+Separator.getSystemSeparator()+Project.srcFolder;
        String namep="";
        for(int i=0;i<packs.length;i++){ 
             if(i==packs.length-1){
               Facade_FileManager.getReference().createFolder(path, packs[i]);
               this.toRegisterPackage(ruta,totalName);
               break;
            }

                       
             
            if(namep.isEmpty()){namep+=packs[i];}
            else{namep+="."+packs[i];}
         
            if(this.getPackage(ruta, namep)==null){
               Facade_FileManager.getReference().createFolder(path, packs[i]);
               this.toRegisterPackage(ruta,namep);
            
            }
            
            path+=Separator.getSystemSeparator()+packs[i];
        
        }
 
         return true;
    }
    private boolean toRegisterPackage(String ruta,String name){
    
        ///add name to mypackages and save the xml file.
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.packagesXMLfile);
        ArrayList<ParameterXML> param=new ArrayList<ParameterXML>();
        param.add(new ParameterXML("name",name));
        controlFileManagerXML.addChild("package", "", param, null);
        controlFileManagerXML.limpiar();
        return true;
    }
    private boolean packageIsValid(){return true;}
    
    //Add a new java file
    public boolean addClass(String ruta,String pack,String name){
        
        if(this.getMyUserType(ruta+Separator.getSystemSeparator()+nameP).equals(Project.userTypeRead))return false;
        if(!this.javaFileIsValid(name))return false;//if the parameters is invalid, dont create it
        if(name==null)return false;
        if(name.isEmpty())return false;
        
        if(pack==null)pack="";
        if(this.getClass(ruta+Separator.getSystemSeparator()+this.getName(), name, pack)!=null)      return false;
        
        String pathSrc=pack.replace(".", Separator.getSystemSeparator());
        if(pathSrc.isEmpty())pathSrc+=name;
        else pathSrc+=Separator.getSystemSeparator()+name;
        
        return addClass(ruta+Separator.getSystemSeparator()+nameP,pack,pathSrc,name);
      
    }
    private boolean addClass(String ruta,String pack,String path,String name){
    
        if(Facade_FileManager.getReference().writeFile(ruta+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+path, this.getTemplateJava("CaS", name,pack))){
            this.toRegisterClass(ruta,pack,name,path,"class");
            return true;
        }
       
        return false;
    }    
    private boolean toRegisterClass(String ruta,String pack,String name, String path,String type){
    
        ///add name to myJavaFiles and save the xml file.
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.javaFilesXMLfile);
        ArrayList<ParameterXML> att=new ArrayList<ParameterXML>();
        att.add(new ParameterXML("package",pack));
        att.add(new ParameterXML("path",path));
        att.add(new ParameterXML("name",name));
        att.add(new ParameterXML("type",type));
        controlFileManagerXML.addChild("class", "", att, null);
        controlFileManagerXML.limpiar();
        return true;
       
    
    }
    
    
    
    
    //Add a new GUI
    public boolean addGUIClass(String ruta,String pack,String name){
       
        
        if(this.getMyUserType(ruta+Separator.getSystemSeparator()+nameP).equals(Project.userTypeRead))return false;
        if(!this.javaFileIsValid(name))return false;//if the parameters is invalid, dont create it
        if(name==null)return false;
        if(name.isEmpty())return false;
        
        if(pack==null)pack="";
        if(this.getClass(ruta+Separator.getSystemSeparator()+this.getName(), name, pack)!=null)      return false;
        
        String pathSrc=pack.replace(".", Separator.getSystemSeparator());
       
        if(pathSrc.isEmpty())pathSrc+=name;
        else pathSrc+=Separator.getSystemSeparator()+name;
        
        if(addGUIClass(ruta+Separator.getSystemSeparator()+nameP,pack,pathSrc,name)){
         
          return Facade_FileManager.getReference().writeFile(ruta+Separator.getSystemSeparator()+this.getName()+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+pathSrc.replace(".java",".frml"), this.getTemplateJSONGUIJava());
    
        }
   
        return false;
      
    }
     
    private boolean addGUIClass(String ruta,String pack,String path,String name){
    
        if(Facade_FileManager.getReference().writeFile(ruta+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+path, this.getTemplateGUIJava("acavaelusuarios", name,pack))){
            this.toRegisterClass(ruta,pack,name,path,"gui");
            return true;
        }
       
        return false;
    } 
    
    
    
    
    
    
    
    private boolean javaFileIsValid(String name){return true;}
    
    //Add a class existing
    public boolean addClassExisting(String ruta,String pack, String name, String pathCopy){
     
        if(this.getMyUserType(ruta+Separator.getSystemSeparator()+this.nameP).equals(Project.userTypeRead))return false;
        if(!this.javaFileIsValid(name))return false;//if the parameters is invalid, dont create it
        if(name==null || pathCopy==null)return false;
        if(name.isEmpty() || pathCopy.isEmpty())return false;
       
        if(pack==null)pack="";
        if(this.getClass(ruta+Separator.getSystemSeparator()+this.nameP, name, pack)!=null)      return false;
                
        return addClassExisting_(ruta+Separator.getSystemSeparator()+nameP, pack, name, pathCopy);
    
    
    
    
    }
    private boolean addClassExisting_(String ruta,String pack,String name,String pathCopy){
  
        String pathSrc=pack.replace(".", Separator.getSystemSeparator());
        if(pathSrc.isEmpty())pathSrc+=name;
        else pathSrc+=Separator.getSystemSeparator()+name;
        String path=ruta+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+pathSrc;
          if(Facade_FileManager.getReference().copyFile(pathCopy,path)){
           return this.toRegisterClass(ruta,pack,name,pathSrc,"class");
       }
        return false;   
    }
    
    public boolean addGUIClassExisting(String ruta, String pack, String name, String pathCopy) {
        
        if(this.getMyUserType(ruta+Separator.getSystemSeparator()+nameP).equals(Project.userTypeRead))return false;
        if(!this.javaFileIsValid(name))return false;//if the parameters is invalid, dont create it
        if(name==null || pathCopy==null)return false;
        if(name.isEmpty() || pathCopy.isEmpty())return false;
       
        if(pack==null)pack="";
        if(this.getClass(ruta+Separator.getSystemSeparator()+this.nameP, name, pack)!=null)      return false;
                
        return addGUIClassExisting_(ruta+Separator.getSystemSeparator()+nameP, pack, name, pathCopy);
    }
    
    private boolean addGUIClassExisting_(String ruta,String pack,String name,String pathCopy){
    
        String pathSrc=pack.replace(".", Separator.getSystemSeparator());
        if(pathSrc.isEmpty())pathSrc+=name;
        else pathSrc+=Separator.getSystemSeparator()+name;
        String path=ruta+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+pathSrc;
          if(Facade_FileManager.getReference().copyFile(pathCopy,path) && Facade_FileManager.getReference().copyFile(pathCopy.replace(".java", ".frml"),path.replace(".java",".frml"))){
           return this.toRegisterClass(ruta,pack,name,pathSrc,"gui");
       }
        return false; 
    
    }
    
    //Add Create a new empty file
    public boolean addNewFile(String ruta,String pack,String name){
        if(this.getMyUserType(ruta+Separator.getSystemSeparator()+nameP).equals(Project.userTypeRead))return false;
        if(name==null)return false;
        if(name.isEmpty())return false;
        
        if(pack==null)pack="";
     
        String pathSrc=pack.replace(".", Separator.getSystemSeparator());
        if(pathSrc.isEmpty())pathSrc+=name;
        else pathSrc+=Separator.getSystemSeparator()+name;
        
        if(this.getFile(pack, name,ruta+Separator.getSystemSeparator()+nameP)!=null)      return false;
        
        return this.addNewFile(ruta+Separator.getSystemSeparator()+nameP,pathSrc,pack,name);
        
    
    }    
    private boolean addNewFile(String ruta,String path,String pack,String name){
    
       if(Facade_FileManager.getReference().createFile(ruta+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+path)){
           return this.toRegisterFile(ruta,pack, path,name,Facade_FileManager.getReference().getFileType(path));
       }
        return false;
    
    }        
    private boolean toRegisterFile(String ruta,String pack,String path,String name,String type){
    
        ///add name to myOthersFiles and save the xml file.
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.otherFilesXMLfile);
        ArrayList<ParameterXML> att=new ArrayList<ParameterXML>();
        att.add(new ParameterXML("package",pack));
        att.add(new ParameterXML("path",path));
        att.add(new ParameterXML("name",name));
        att.add(new ParameterXML("type",type));
        controlFileManagerXML.addChild("file", "", att, null);
        controlFileManagerXML.limpiar();
        return true;
        
          
    
    }
    
    //Copy a file that was uploaded by owner
    public boolean addFile(String ruta,String pack, String name, String pathCopy){
        if(this.getMyUserType(ruta+Separator.getSystemSeparator()+nameP).equals(Project.userTypeRead))return false;
        if(name==null || pathCopy==null)return false;
        if(name.isEmpty() || pathCopy==null)return false;
        
        String path=ruta+Separator.getSystemSeparator()+nameP+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator();
        if(pack==null)pack="";
                
        String[] np=pack.split("\\.");
        for(String x: np){
           if(!x.isEmpty()) path+=x+Separator.getSystemSeparator();
        }
        path+=name;
        if(this.getFile(pack,name, ruta+Separator.getSystemSeparator()+nameP)!=null)     return false;
        
        return this.addFile_(ruta+Separator.getSystemSeparator()+nameP, pack, name, pathCopy);
    }
    private boolean addFile_(String ruta,String pack,String name,String pathCopy){
        
        String pathSrc=pack.replace(".", Separator.getSystemSeparator());
        if(pathSrc.isEmpty())pathSrc+=name;
        else pathSrc+=Separator.getSystemSeparator()+name;
        String path=ruta+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+pathSrc;
        if(Facade_FileManager.getReference().copyFile(pathCopy,path)){
           return this.toRegisterFile(ruta,pack,pathSrc,name,Facade_FileManager.getReference().getFileType(path));
       }
        return false;
    }
    
    private boolean addLibsJAR(String ruta,ArrayList<String[]>libs){
        if(libs==null)return true;
        if(libs.isEmpty())return true;
        
       
        for(String[] x: libs){
           /**if(**/this.addLibJAR(ruta,ruta+Separator.getSystemSeparator()+Project.libFolder+Separator.getSystemSeparator()+x[1],x[1],x[0]);//)
               // signJAR(ruta+Separator.getSystemSeparator()+Project.libFolder+Separator.getSystemSeparator()+x[1]);
          /** else
               return false;**/
        }
    return true;
    }
    //Add a .jar
    public boolean addLibJAR(String ruta,String pathCopy,String name){
        ruta+=Separator.getSystemSeparator()+nameP; 
        if(this.getMyUserType(ruta).equals(Project.userTypeRead))return false;
      
        if(name==null || pathCopy==null)return false;
        if(name.isEmpty() || pathCopy==null)return false;
        
        
        String path=ruta+Separator.getSystemSeparator()+Project.libFolder+Separator.getSystemSeparator()+name;
       
        if(this.getLib(ruta, name)!=null)return false;

        return this.addLibJAR(ruta,path,name,pathCopy);  
    
    }
    private boolean addLibJAR(String ruta,String path,String name,String pathCopy){
    
         if(Facade_FileManager.getReference().copyFile(pathCopy,path)){
           return this.toRegisterLibJAR(ruta,path,name);
       }
        return false;
    
    
    }    
    private boolean toRegisterLibJAR(String ruta,String path,String name){
    
    
        ///add name to myJavaFiles and save the xml file.
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.libsXMLfile);
        ArrayList<ParameterXML> att=new ArrayList<ParameterXML>();
        att.add(new ParameterXML("name",name));
        controlFileManagerXML.addChild("lib", "", att, null);
        controlFileManagerXML.limpiar();
        return true;
    
    
    
    }
   
    
    
    /**Query Methods**/  
    
    //Return a xml file that contain information about the project
    public Document getDataProjectXML(String ruta){
            
        this.controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+nameP+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.configXMLfile);
        Document d=controlFileManagerXML.getDocumentoXML();
        controlFileManagerXML.limpiar();
        return d;
    
    }
    //Return a xml file that contain information about packages of the project
    public Document getPackagesProjectXML(String ruta) {
        
        this.controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+nameP+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.packagesXMLfile);
        Document d=controlFileManagerXML.getDocumentoXML();
        controlFileManagerXML.limpiar();
        return d;
        
    }    
    //Return a xml file that containt information about classes of the project
    public Document getClassesProjectXML(String ruta) {
        
        this.controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+nameP+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.javaFilesXMLfile);
        Document d=controlFileManagerXML.getDocumentoXML();
        controlFileManagerXML.limpiar();
        return d;
        
    } 
    //Return a xml file that containt information about .class of the project
    public Document getClassFilesProjectXML(String ruta) {
       
        return null;//////////////falta implementarrrrrrr
        
    } 
    //Return a xml file that containt information about files of the project
    public Document getOtherFilesProjectXML(String ruta) {
        
        this.controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+nameP+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.otherFilesXMLfile);
        Document d=controlFileManagerXML.getDocumentoXML();
        controlFileManagerXML.limpiar();
        return d;
        
    }    
    //Return a xml file that containt information about libraries of the project
    public Document getLibsProjectXML(String ruta) {
        
        this.controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+nameP+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.libsXMLfile);
        Document d=controlFileManagerXML.getDocumentoXML();
        controlFileManagerXML.limpiar();
        return d;
        
    }
    //Return a xml file that containt information about a class
    public Document getClassXML(String ruta,String pack,String name){
     
     
        Class c=this.getClass(ruta+Separator.getSystemSeparator()+this.getName(), name, pack);
           
        if(c==null)return null;
        return this.getClassXML(ruta+Separator.getSystemSeparator()+this.getName(),c);
    
    
    }
    //Return a xml file that containt information about a class
    private Document getClassXML(String ruta,Class classe){
        if(classe==null)return null;
        ArrayList<String> t=Facade_FileManager.getReference().readFilePlainByLines(ruta+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+classe.getPath());
       
        if(t==null)return null;
        this.controlFileManagerXML.limpiar();
        this.controlFileManagerXML.crearXMLinMemory("answ");
            
            Element user = this.controlFileManagerXML.getDocumentoXML().createElement("class"); //creamos un nuevo elemento en el XMLLLL

            Element name = this.controlFileManagerXML.getDocumentoXML().createElement("name");
            Text textE = this.controlFileManagerXML.getDocumentoXML().createTextNode(classe.getName()); //Ingresamos la info en xmlllllllllll
            name.appendChild(textE); //
            user.appendChild(name);

            Element pack = this.controlFileManagerXML.getDocumentoXML().createElement("package");
            Text textP = this.controlFileManagerXML.getDocumentoXML().createTextNode(classe.getPackageName()); //Ingresamos la info en xmlllllllllll
            pack.appendChild(textP); //
            user.appendChild(pack);
            
            Element lines = this.controlFileManagerXML.getDocumentoXML().createElement("lines");
            user.appendChild(lines);
            
            for(String x:t){
                
                Element line=this.controlFileManagerXML.getDocumentoXML().createElement("line");
                Text textC = this.controlFileManagerXML.getDocumentoXML().createTextNode(x); //Ingresamos la info en xmlllllllllll
                line.appendChild(textC);
                lines.appendChild(line); 
            
            }
            
            
            
            this.controlFileManagerXML.getDocumentoXML().getDocumentElement().appendChild(user);
                 
        return this.controlFileManagerXML.getDocumentoXML();
        
    }
    //Return a xml file that containt information about a class
    public String getGUIClassJSON(String ruta,String pack,String name){
       
        Class c=this.getClass(ruta+Separator.getSystemSeparator()+this.getName(), name, pack);
            
        if(c==null)return null;
         String t=Facade_FileManager.getReference().readFilePlain(ruta+Separator.getSystemSeparator()+this.nameP+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+c.getPath().replace(".java",".frml"));
     
       return t;
    
    }
    //Return a xml file that containt information about a file
    public Document getFileXML(String ruta,String nPackage, String nameF) {
        
        File f=this.getFile(nPackage, nameF, ruta+Separator.getSystemSeparator()+this.getName());
        
        if(f==null)return null;
        return this.getFileXML(ruta+Separator.getSystemSeparator()+this.getName(), f);
        
    }
    //Return a xml file that containt information about a file
    private Document getFileXML(String ruta,File file){
       
        if(file.getType()==null)return null;
        
        if(file.getType().equals(Control_FileManager.typeDoc))
            return getFileDocXML(ruta,file);
        
        if(file.getType().equals(Control_FileManager.typeImage))
            return getFileImgXML(file);
        
        if(file.getType().equals(Control_FileManager.typePdf))
            return getFilePdfXML(file);
        
        if(file.getType().equals(Control_FileManager.typeSound))
            return getFileSoundXML(file);
        
        if(file.getType().equals(Control_FileManager.typeVideo))
            return getFileVideoXML(file);
        
         if(file.getType().equals(Control_FileManager.typeFile))
            return this.getFileFileXML(file);
      
        return null;
    }
    //Return a xml file that containt information about a docFile
    private Document getFileDocXML(String ruta,File f){
    
        this.controlFileManagerXML.limpiar();
        this.controlFileManagerXML.crearXMLinMemory("DataFile");
        String textPlain=Facade_FileManager.getReference().readFilePlain(ruta+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+f.getPath());
       
            ArrayList<ParameterXML> ps=new ArrayList<ParameterXML>();
            ps.add(new ParameterXML("name",f.getName()));
            ps.add(new ParameterXML("package",f.getPack()));
            ps.add(new ParameterXML("type",f.getType()));
            this.controlFileManagerXML.addChild("file",textPlain, ps, null);
      
        
        Document d=controlFileManagerXML.getDocumentoXML();
        controlFileManagerXML.limpiar();
        return d;
    
    
    }
    //Return a xml file that containt information about a imgFile
    private Document getFileImgXML(File f){
 
        this.controlFileManagerXML.limpiar();
        this.controlFileManagerXML.crearXMLinMemory("DataFile");
       
            ArrayList<ParameterXML> ps=new ArrayList<ParameterXML>();
            ps.add(new ParameterXML("name",f.getName()));
            ps.add(new ParameterXML("package",f.getPack()));
            ps.add(new ParameterXML("type",f.getType()));
            this.controlFileManagerXML.addChild("file",f.getPath(), ps, null);
      
        
        Document d=controlFileManagerXML.getDocumentoXML();
        controlFileManagerXML.limpiar();
        return d;
    
    
    }
    //Return a xml file that containt information about a pdfFile
    private Document getFilePdfXML(File f){
    
        this.controlFileManagerXML.limpiar();
        this.controlFileManagerXML.crearXMLinMemory("DataFile");
       
            ArrayList<ParameterXML> ps=new ArrayList<ParameterXML>();
            ps.add(new ParameterXML("name",f.getName()));
            ps.add(new ParameterXML("package",f.getPack()));
            ps.add(new ParameterXML("type",f.getType()));
            this.controlFileManagerXML.addChild("file",f.getPath(), ps, null);
      
        
        Document d=controlFileManagerXML.getDocumentoXML();
        controlFileManagerXML.limpiar();
        return d;
    
    
    
    }
    //Return a xml file that containt information about a soundFile
    private Document getFileSoundXML(File f){
    
        this.controlFileManagerXML.limpiar();
        this.controlFileManagerXML.crearXMLinMemory("DataFile");
       
            ArrayList<ParameterXML> ps=new ArrayList<ParameterXML>();
            ps.add(new ParameterXML("name",f.getName()));
            ps.add(new ParameterXML("package",f.getPack()));
            ps.add(new ParameterXML("type",f.getType()));
            this.controlFileManagerXML.addChild("file",f.getPath(), ps, null);
      
        
        Document d=controlFileManagerXML.getDocumentoXML();
        controlFileManagerXML.limpiar();
        return d;
        
    
    
    
    }
    //Return a xml file that containt information about a videoFile
    private Document getFileVideoXML(File f){
    
        this.controlFileManagerXML.limpiar();
        this.controlFileManagerXML.crearXMLinMemory("DataFile");
       
            ArrayList<ParameterXML> ps=new ArrayList<ParameterXML>();
            ps.add(new ParameterXML("name",f.getName()));
            ps.add(new ParameterXML("package",f.getPack()));
            ps.add(new ParameterXML("type",f.getType()));
            this.controlFileManagerXML.addChild("file",f.getPath(), ps, null);
      
        
        Document d=controlFileManagerXML.getDocumentoXML();
        controlFileManagerXML.limpiar();
        return d;
    
    
    
    
    
    }
    //Return a xml file that containt information about a FileFile
    private Document getFileFileXML(File f){
    
        this.controlFileManagerXML.limpiar();
        this.controlFileManagerXML.crearXMLinMemory("DataFile");
       
            ArrayList<ParameterXML> ps=new ArrayList<ParameterXML>();
            ps.add(new ParameterXML("name",f.getName()));
            ps.add(new ParameterXML("package",f.getPack()));
            ps.add(new ParameterXML("type",f.getType()));
            this.controlFileManagerXML.addChild("file",f.getPath(), ps, null);
      
        
        Document d=controlFileManagerXML.getDocumentoXML();
        controlFileManagerXML.limpiar();
        return d;
    
    
    
    
    
    }
    
    
    
    
    private File getFile(String pack,String name,String ruta){
        
        if(pack==null || name==null)return null;
        if(name.isEmpty())return null;
     
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.otherFilesXMLfile);
        NodeList nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
            for(int i=0;i<nl.getLength();i++){
                
                if(nl.item(i).getAttributes().getNamedItem("package").getTextContent().equals(pack) && nl.item(i).getAttributes().getNamedItem("name").getTextContent().equals(name))
                return new File(nl.item(i).getAttributes().getNamedItem("path").getTextContent(), nl.item(i).getAttributes().getNamedItem("package").getTextContent(),nl.item(i).getAttributes().getNamedItem("name").getTextContent(),nl.item(i).getAttributes().getNamedItem("type").getTextContent());
               
            }
      
        return null;
    }
    
    

    
    /**Objects Methods**/    
    
    public String getName() {
        return this.nameP;
    }
    public void setName(String name) {
        this.nameP=name;
    }
    public String getOwner() {
        return owner;
    }
  
    public void setOwner(String owner) {
        this.owner = owner;
    }

    private Class getMainClass_(String ruta) {

        this.controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.configXMLfile);
        Class c=new Class(this.controlFileManagerXML.getDocumentoXML().getElementsByTagName("mainClass").item(0).getAttributes().getNamedItem("package").getTextContent(),
                this.controlFileManagerXML.getDocumentoXML().getElementsByTagName("mainClass").item(0).getAttributes().getNamedItem("name").getTextContent(),null,null);
        this.controlFileManagerXML.closeDocument();
        return c;
    }
    
    public String getMainClass(String ruta) {
        Class c=this.getMainClass_(ruta+Separator.getSystemSeparator()+this.nameP);
        if(c==null)return "";
        String s=".";
        if(c.getPackageName().isEmpty())s="";
        String nc=c.getPackageName()+s+(c.getName().replace(".java",""));
      
        return nc;
    }

    public Document getUsers(String ruta) {
        this.controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+nameP+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.configXMLfile);
        Document d=controlFileManagerXML.getDocumentoXML();
        if(controlFileManagerXML.getDocumentoXML().getElementsByTagName("users").getLength()==0)return null;
        Facade_FileManagerXML fm=new Facade_FileManagerXML();
        fm.crearXMLinMemory("users");
        
     
        
        for(int i=0;i<controlFileManagerXML.getDocumentoXML().getDocumentElement().getElementsByTagName("users").item(0).getChildNodes().getLength();i++){

            Element user = fm.getDocumentoXML().createElement("user"); //creamos un nuevo elemento en el XMLLLL

            Element email = fm.getDocumentoXML().createElement("email");
            Text textE = fm.getDocumentoXML().createTextNode(controlFileManagerXML.getDocumentoXML().getElementsByTagName("email").item(i).getTextContent()); //Ingresamos la info en xmlllllllllll
            email.appendChild(textE); //
            user.appendChild(email);

            Element type = fm.getDocumentoXML().createElement("type");
            Text textP = fm.getDocumentoXML().createTextNode(controlFileManagerXML.getDocumentoXML().getElementsByTagName("type").item(i).getTextContent()); //Ingresamos la info en xmlllllllllll
            type.appendChild(textP); //
            user.appendChild(type);

            fm.getDocumentoXML().getDocumentElement().appendChild(user);
            
        }
        
        
        return fm.getDocumentoXML();
        
        
    }
    
    public boolean setMainClass(String ruta,String name,String pack) {
  
        
        Class c=this.getClass(ruta+Separator.getSystemSeparator()+this.nameP, name, pack);
        String cp=null;
        if(name.isEmpty() && pack.isEmpty()){
            c=new Class("","","","");
        }
        if(c!=null){
            String pa="";
            if(!c.getPackageName().isEmpty())
                pa=c.getPackageName().replace("\\.", "/")+"/";
            cp=pa+c.getName().split("\\.")[0];
             this.controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+this.nameP+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.configXMLfile);
                this.controlFileManagerXML.getDocumentoXML().getElementsByTagName("mainClass").item(0).getAttributes().getNamedItem("name").setTextContent(name);
                this.controlFileManagerXML.getDocumentoXML().getElementsByTagName("mainClass").item(0).getAttributes().getNamedItem("package").setTextContent(pack);
                this.controlFileManagerXML.closeDocument();
                
                ArrayList<String> textManifiest=this.getTemplateMANIFEST(c.toString(), ruta);
                 Facade_FileManager.getReference().writeFile(ruta+Separator.getSystemSeparator()+this.nameP+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.fileManifest,textManifiest);
                 return true;
        }
       
        return false;
     
    }
  
      
    public boolean equals(Object o){
    
        Project p=(Project)o;
        return p.getOwner().equals(this.owner) && p.getName().equals(this.nameP);  
    
    }
    
    
    /**Utility Methods**/
    
    private ArrayList<String> getTemplateJava(String author,String name,String pack){
        
       ArrayList<String> template=new ArrayList<String>();
        
        template.add("/** \n*This template was generated by littleIDE\n**/");
       if(pack!=null) {if(!pack.isEmpty()) template.add("\npackage "+pack+";");}
        template.add("/** \n*\n*@author "+author+"\n**/");
        template.add("\npublic class "+name.split("\\.java")[0] +"{");
        template.add("\n\n/**\n*Attributes\n*\n*\tFor example:\n*\n*\t\tprivate String att;\n*\t\tprivate int num;\n**/\n\n\n");
        template.add("\n\n/**\n*Methods\n*\n*\tFor example:\n*\n*\t\tpublic void doSomething(){\n*\t\t\t//instructions\n*\t\t}\n*\t\tpublic int getSomething(){\n*\t\t\t//instructions\n*\t\t\tint x=3;\n*\t\t\treturn x;\n*\t\t}\n**/\n\n");
        template.add("}\n\n//End Class");
        
        return template;
        
    }

    private boolean isParentPackage(String nameParent, String x) {
        
        String[] parent=nameParent.split("\\.");
        String[] son=x.split("\\.");
        if(son.length<parent.length)return false;
        boolean anw=true;
        for(int i=0;i<parent.length;i++){
            if(!parent[i].equals(son[i]))anw=false;
        }
        return anw;
    }

    private boolean isFatherPackage(String nameF,String x){
        
        
        String[] parent=nameF.split("\\.");
        String[] son=x.split("\\.");
        if(son.length<parent.length || son.length-1!=parent.length)return false;
        boolean anw=true;
        for(int i=0;i<parent.length;i++){
            if(!parent[i].equals(son[i]))anw=false;
        }
        return anw;
    }
    private String getNamePackage(String x) {
        String[] res=x.split("\\.");
        return res[res.length-1];
    }

    public boolean toRegisterClassFiles(String path) {
        path+=Separator.getSystemSeparator()+this.nameP;
            Facade_FileManager.getReference().deleteFile(path+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.classFilesXMLfile);
            controlFileManagerXML.crearXMLnuevo(path+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.classFilesXMLfile, "structure");
          
 
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(path+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.classFilesXMLfile);
    
        this.toRegisterClassFile(path, Project.buildFolder);
            
        controlFileManagerXML.limpiar();
        return true;
      
    }


    private boolean toRegisterClassFile(String path,String file){
       
        try{
            String h=path+Separator.getSystemSeparator()+file;
           if(!Facade_FileManager.getReference().isFolder(h)){
              
               if(file.endsWith(".class")){
                   
                     ArrayList<ParameterXML> att=new ArrayList<ParameterXML>();
                     att.add(new ParameterXML("path",file));
                     controlFileManagerXML.addChild("classFile", "", att, null);
               }
               
           }
           
           if(Facade_FileManager.getReference().isFolder(h)){
               
               String[] filesF=Facade_FileManager.getReference().toListFile(h);
            
               
              if(filesF==null)return false;
                
              for(String f: filesF){
               
               this.toRegisterClassFile(path, file+Separator.getSystemSeparator()+f);
               
              }
           return true;    
               
           }
            
           return false; 
        }       
        catch(Exception e){System.out.println("Clase Project  -  Metodo : toRegisterClassFile(String path,String file)"+e.getMessage());return false;}
    }

    
    public String getMyUserType(String ruta){
        User myUserAux=this.getUser(ruta, this.myUser.getEmail());
        if(this.myUser.getEmail().equals(this.owner))
            return Project.userTypeWrite;
        if(myUserAux==null)
            return null;
        return myUserAux.getType();
    }

    private User getUser(String ruta, String user) {
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.configXMLfile);
   
        NodeList nl=controlFileManagerXML.getDocumentoXML().getElementsByTagName("users").item(0).getChildNodes();
     
       for(int i=0;i<nl.getLength();i++){
         
            if(controlFileManagerXML.getDocumentoXML().getElementsByTagName("email").item(i).getTextContent().equals(user))
             return new User(controlFileManagerXML.getDocumentoXML().getElementsByTagName("email").item(i).getTextContent(),controlFileManagerXML.getDocumentoXML().getElementsByTagName("type").item(i).getTextContent());
           
        }
        return null;
        
    }

    private Class getClass(String ruta,String nameC,String packageC){
     
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.javaFilesXMLfile);
        NodeList nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
        for(int i=0;i<nl.getLength();i++){
            
            if(nl.item(i).getAttributes().getNamedItem("name").getTextContent().equals(nameC) && nl.item(i).getAttributes().getNamedItem("package").getTextContent().equals(packageC))
                return new Class(packageC,nameC,nl.item(i).getAttributes().getNamedItem("path").getTextContent(),nl.item(i).getAttributes().getNamedItem("type").getTextContent());
        }
        return null;
    }
    
    private String getLib(String ruta,String name){
        
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.libsXMLfile);
        NodeList nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
        for(int i=0;i<nl.getLength();i++){
            
            if(nl.item(i).getAttributes().getNamedItem("name").getTextContent().equals(name))
                return name;
        }
        return null;
    }

    private String getPackage(String ruta,String name){
        
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.packagesXMLfile);
        NodeList nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getChildNodes();
        for(int i=0;i<nl.getLength();i++){
           
            if(nl.item(i).getAttributes().getNamedItem("name").getTextContent().equals(name))
                return nl.item(i).getAttributes().getNamedItem("name").getTextContent();
        }
        return null;
    }
    
    private void renameMainClass(String newName,String ruta) {
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.configXMLfile);
        controlFileManagerXML.getDocumentoXML().getElementsByTagName("mainClass").item(0).getAttributes().getNamedItem("name").setTextContent(newName);
        controlFileManagerXML.closeDocument();
        
    }
    
    private void renameMainClass_Package(String newPackage,String ruta) {
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(ruta+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.configXMLfile);
        controlFileManagerXML.getDocumentoXML().getElementsByTagName("mainClass").item(0).getAttributes().getNamedItem("package").setTextContent(newPackage);
        controlFileManagerXML.closeDocument();
        
    }

   @Override
   public String toString() {
       System.out.println("nameP "+this.nameP);
       System.out.println("owner "+this.owner);
       System.out.println("user "+this.myUser);
        return this.nameP+","+this.owner+","+this.myUser.getEmail()+","+this.myUser.getType();
    }

    public String getRealPathClass(String nPackage, String nameC, String pathOwner) {
        
        Class c=this.getClass(pathOwner+Separator.getSystemSeparator()+this.nameP, nameC, nPackage);
       
        if(c==null);
        return Project.srcFolder+Separator.getSystemSeparator()+c.getPath();
    }
    
    public String getRealPathFile(String nPackage, String nameF, String pathOwner) {
        
        File c=this.getFile(nPackage,nameF,pathOwner+Separator.getSystemSeparator()+this.nameP);
        if(c==null)return null;
        return Project.srcFolder+Separator.getSystemSeparator()+c.getPath();
    }

    public String getRealPathLib(String nameL, String pathOwner) {
        
        String  c=this.getLib(pathOwner+Separator.getSystemSeparator()+this.nameP, nameL);
        if(c==null);
        return Project.libFolder+Separator.getSystemSeparator()+nameL;
        
    }

    public boolean saveGUIClass(String nPackage, String nameG, Document d, String pathOwner) {
       
        Class c=this.getClass(pathOwner+Separator.getSystemSeparator()+this.getName(), nameG, nPackage);
        if(c==null)return false;
        
        return this.saveGUIClass(pathOwner+Separator.getSystemSeparator()+this.getName(), c,d);
    }

    private boolean saveGUIClass(String ruta, Class c, Document d) {
        //faltaria considerar guardar los cambios en el .java por medio del node.js...por el momento solo modifica .frml
       
        if(d==null)return false;
        
        controlFileManagerXML.limpiar();
        controlFileManagerXML.setDocument(d);
        controlFileManagerXML.setURL(ruta+Separator.getSystemSeparator()+Project.srcFolder+Separator.getSystemSeparator()+c.getPath().replace(".java",".frml"));
        return controlFileManagerXML.closeDocument();
        
    }

    public boolean addUser(String pathOwner,String user,String type){
       
       if(!this.myUser.getEmail().equals(this.owner))return false;
        String r=pathOwner+Separator.getSystemSeparator()+this.getName();
        controlFileManagerXML.leerXMLexistente(r+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.configXMLfile);
       
        
        Element usuario = controlFileManagerXML.getDocumentoXML().createElement("user"); //creamos un nuevo elemento en el XMLLLL
       
        Element mail = controlFileManagerXML.getDocumentoXML().createElement("email");
        Text text = controlFileManagerXML.getDocumentoXML().createTextNode(user); //Ingresamos la info en xmlllllllllll
        mail.appendChild(text); //
        usuario.appendChild(mail);
        
        Element typeu = controlFileManagerXML.getDocumentoXML().createElement("type");
        Text textt = controlFileManagerXML.getDocumentoXML().createTextNode(type); //Ingresamos la info en xmlllllllllll
        typeu.appendChild(textt); //
        usuario.appendChild(typeu);
        
                      
        
        controlFileManagerXML.getDocumentoXML().getDocumentElement().getElementsByTagName("users").item(0).appendChild(usuario); //pegamos el elemento hijo a la raiz
         controlFileManagerXML.closeDocument();     
        return true;
        
    }
    
    public boolean changeUserPrivilege(String user, String type,String pathOwner) {
      
        if(!this.myUser.getEmail().equals(this.owner))return false;
        String r=pathOwner+Separator.getSystemSeparator()+this.getName();
        controlFileManagerXML.leerXMLexistente(r+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.configXMLfile);
        NodeList nl=controlFileManagerXML.getDocumentoXML().getDocumentElement().getElementsByTagName("user");
        for(int i=0;i<nl.getLength();i++){
            
            if(controlFileManagerXML.getDocumentoXML().getDocumentElement().getElementsByTagName("email").item(i).getTextContent().equals(user))
            {
                controlFileManagerXML.getDocumentoXML().getDocumentElement().getElementsByTagName("type").item(i).setTextContent(type);
                controlFileManagerXML.closeDocument();
                this.myUser.setType(type);
                return true;
            }
        }
        
        return false;
    }
    
 
    public boolean deleteViewProject(String pathOwner, String user){
        return this.deleteUser(pathOwner, user);
    }
    public boolean deleteUser(String pathOwner, String user) {
       
        controlFileManagerXML.limpiar();
        controlFileManagerXML.leerXMLexistente(pathOwner+Separator.getSystemSeparator()+this.nameP+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.configXMLfile);
   
        NodeList nl=controlFileManagerXML.getDocumentoXML().getElementsByTagName("users").item(0).getChildNodes();
     
       for(int i=0;i<nl.getLength();i++){
         
            if(controlFileManagerXML.getDocumentoXML().getElementsByTagName("email").item(i).getTextContent().equals(user)){
                
                 Element element = (Element)nl.item(i);
                    //element.getParentNode().removeChild(element);
                      if(null!=element.getParentNode().removeChild(element)){//controlFileManagerXML.getDocumentoXML().getDocumentElement().removeChild(element)){
                      controlFileManagerXML.closeDocument();
                      return true;
                         }
       
           
        }
       }
        return false;
    }
   
    private ArrayList<String> getTemplateJSPExecute(ArrayList<String[]> libs){
        String lb="";
        for(String[] x: libs){
            char s=',';
            lb+=s+"../lib/"+x[1];
      
        }
        String x="<%@page contentType=\"text/html\" pageEncoding=\"UTF-8\"%>"
                + "          <%"
                + "                String clase=request.getParameter(\"clase\");"
                + "                String jar=request.getParameter(\"jar\");"
                + "           %>"
                + "           <html>"
                + "                 <applet CODE= \"<%=clase%>.class\""
                + "                 archive=\"<%=jar%>.jar"+lb+"\""
                + "                 CODEBASE=\".\" WIDTH=\"800\"   HEIGHT=\"800\" value=\"Su navegador debe soportar la visualizacion de applet para poder visualizar\">"
                + "           </html>";
        ArrayList<String> jsp=new ArrayList<String>();
        jsp.add(x);
        return jsp;
    }
    
    private ArrayList<String> getTemplateGUIJava(String author, String name,String pack){
    
       ArrayList<String> template=new ArrayList<String>();
        
        template.add("/** \n*This template was generated by littleIDE\n**/");
       if(pack!=null) {if(!pack.isEmpty()) template.add("\npackage "+pack+";");}
        template.add("/** \n*\n*@author "+author+"\n**/");
        template.add("\npublic class "+name.split("\\.java")[0] +" extends javax.swing.JFrame {");
        
        template.add("\n\tpublic "+name.split("\\.java")[0]+"(){ ");
        template.add("\n\t\tinit();");
        template.add("\n\t} ");
        
        template.add("\nprivate void init(){");
	template.add("\n   this.setSize(new java.awt.Dimension(300,300));");
        template.add("   this.setPreferredSize(new java.awt.Dimension(300,300));");
	template.add("   setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);");
        template.add("   getContentPane().setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());");
        template.add("\n\n\t pack();");
        template.add("\n\t}\n///\n\n");
        
        template.add(" public static void main(String args[]) {");
        template.add("\n\ttry{");
        template.add("\n\t\tjavax.swing.UIManager.setLookAndFeel(javax.swing.UIManager.getSystemLookAndFeelClassName());");
        template.add("\n\t}catch(Exception e){");
        template.add("\n}\n");
        template.add("\njava.awt.EventQueue.invokeLater(new Runnable() {");
        template.add("\npublic void run() {");
        template.add("\nnew "+name.split("\\.java")[0]+"().setVisible(true);");
        template.add("\n}");
        template.add("\n});");
        template.add("\n}");
        
        template.add("}\n\n//End Class");
        
        return template;
    
    }
    
    private ArrayList<String> getTemplateJSONGUIJava(){
        ArrayList<String> lines=new ArrayList<String>();
          lines.add("{\"width\":300,\"height\":300,\"li\":16,\"cl\":12,\"lai\":7,\"components\":[]}");
          return lines;
    }
    
    private ArrayList<String> getTemplateMANIFEST(String mc,String pathOwner){
        ArrayList<String> lines=new ArrayList<String>();
     
        lines.add("Manifest-Version: 1.0");
        lines.add("Created-By: LittleIDE");
        String libs="";
        if(mc!=null && !mc.isEmpty()){
            if(mc.endsWith(".java")){
                mc=mc.replace(".java","");
            }
            Document d=this.getLibsProjectXML(pathOwner);
            if(d!=null){
                NodeList nl=d.getDocumentElement().getChildNodes();
                for(int i=0;i<nl.getLength();i++){
                    libs=Project.libFolder+Separator.getSystemSeparator()+nl.item(i).getAttributes().getNamedItem("name").getTextContent();
                }
              
              
            }
            lines.add("Class-Path: "+libs);
            lines.add("X-COMMENT: Main-Class will be added automatically by build");
            lines.add("Main-Class: "+mc);
        
        }
        return lines;
        
    }
  /**  private boolean signJAR(String pathJAR){
      
       if(pathJAR==null)return false;
       if(pathJAR.isEmpty())return false;  
        return new Facade_Signer().sign(pathJAR);
    }**/
///comprime el proyecto completo con archivos fuentes
    public ArrayList<String[]> getFoldersToCompress(String name, String owner, String pathOwner) {
       
        ArrayList<String[]> folders=new ArrayList<String[]>();
        String path=pathOwner+Separator.getSystemSeparator()+this.getName();
        folders.add(new String[]{Project.buildFolder,path});
        folders.add(new String[]{Project.distFolder,path});
        folders.add(new String[]{Project.libFolder,path});
        folders.add(new String[]{Project.srcFolder,path});
        return folders;
        
    }
    
    public ArrayList<String[]> getFoldersToExecutableCompress(String name, String owner, String pathOwner) {
       
        String path=pathOwner+Separator.getSystemSeparator()+this.getName();
        
        String[] lf=Facade_FileManager.getReference().toListFile(path+Separator.getSystemSeparator()+Project.distFolder);
        if(lf==null)return null;
        if(lf.length==0)return null;
        ArrayList<String[]> folders=new ArrayList<String[]>();
     
        folders.add(new String[]{this.getName()+".jar",path+Separator.getSystemSeparator()+Project.distFolder});
        folders.add(new String[]{Project.libFolder,path});
        return folders;
        
    }

   public String getExecuteFolder() {
        return this.nameP+Separator.getSystemSeparator()+Project.executeFolder;
    }

   public String getLibsFolder() {
        return Project.libFolder;
    }

    
}


