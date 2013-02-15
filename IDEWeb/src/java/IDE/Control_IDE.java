/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package IDE;

import FileManager.Facade_FileManager;
import FileManagerXML.Facade_FileManagerXML;
import FileManagerXML.ParameterXML;
import IDE.Compiler.Facade_Compiler;
import IDE.Compressor.Facade_Compressor;
import IDE.ProjectsManager.Facade_ProjectsManager;
import IDE.ProjectsManager.Project;
import IDE.Signer.Facade_Signer;
import Util.Random;
import Util.Separator;
import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.w3c.dom.Text;

/**
 *
 * @author cas
 */
public class Control_IDE {
    
    private Facade_ProjectsManager myProjectManager;
    private Facade_Compiler myCompiler;
    private Facade_Compressor myCompressor;
    private Facade_Signer mySigner;
    
    
    public Control_IDE(){
    
        myProjectManager=new Facade_ProjectsManager();
        myCompiler=new Facade_Compiler();
        myCompressor=new Facade_Compressor();
        mySigner=new Facade_Signer();
    }
    
    /**
     * 
     *
     * 
     * Methods Signer
     * 
     *
     * 
     */
    
    private boolean signerProject(String pathJAR){
        
       if(pathJAR==null)return false;
       if(pathJAR.isEmpty())return false; 
        
        return mySigner.sign(pathJAR);
    }
    
    
    /**
     * 
     *
     * 
     * Methods Executer
     * 
     *
     * 
     */
    
    public Document executeProjectWEB(String name,String owner,String pathOwner,String pathWebConsoleLib,Document classWebClib,Document nameWebClib,String user,String namePathHide){
       
          ///validaciones de la clase principal...que tenga una clase principal y que esta tengaun main
        
        if(!this.myProjectManager.haveProject(name, owner))return null;
        String clasePrincipal=this.myProjectManager.getMainClass(name, owner, pathOwner);
        if(clasePrincipal.equals("") || clasePrincipal==null){
            
            Facade_FileManagerXML fm=new Facade_FileManagerXML();
            fm.crearXMLinMemory("Run");
            Element message = fm.getDocumentoXML().createElement("return");
            Text textE = fm.getDocumentoXML().createTextNode("noMain"); //Ingresamos la info en xmlllllllllll
            message.appendChild(textE); //
            fm.getDocumentoXML().getDocumentElement().appendChild(message);
            return fm.getDocumentoXML();
        }
        String path=pathOwner+Separator.getSystemSeparator()+name;
        String ran=Random.getRandom(10);
        String claseApplet="Clase"+ran;
       this.cleanExecute(path+Separator.getSystemSeparator()+Project.executeFolder);
        
        String imports="import java.awt.*;"+

                        "import java.awt.event.ActionEvent;"+
                        "import java.awt.event.ActionListener;"+
                        "import java.io.IOException;"+
                        "import java.util.logging.Level;"+
                        "import java.util.logging.Logger;"+
                        "import javax.swing.*;"+
                        "import javax.swing.JTextField;"+
                        "import javax.swing.JApplet;" +
                        "import $_p_a_c_k_$_R_e_d_i_r_e_c_t_$_p_a_c_k_$.RedirectIO;" +
                        "import javax.swing.JTextArea;";
        String dClase="public class "+claseApplet+" extends JApplet{";
        String componenetesGUI="";
        String dMetodo="";
        
         
        componenetesGUI="private JButton b;"+
                        "JButton mf;"+
                        "JButton es;"+
                        "JButton leer;"+
                        "private JTextField t;"+
                        "JPanel pa;"+
                        "private JTextArea jta=new JTextArea();";
                                
         
        
       dMetodo=" public void init(){ \n " +

                        "RedirectIO r=new RedirectIO();"+
                        "this.setContentPane(r.getPanelEjecucion());"+
    
                        "r.moverFlujo();" +

                     " r.getPanelEjecucion().getBotonEjecutar().addActionListener(new ActionListener()"+
                      "  {"+
                      "      public void actionPerformed(ActionEvent e)"+
                      "      {"+
                      "         "+clasePrincipal+" c=new "+clasePrincipal+"(); " +
                                "c.main(null);"+
                      "      }"+
                      "  });  "+
                      "}" +               
                   "static{"+
                            "try{"+
                               "UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());"+
                            "}catch(Exception e){"+
                            "}"
                   + "}";
                
        String generateClass=
                imports+"\n"+
                dClase+"\n"+
                componenetesGUI+"\n" +
                dMetodo+
                "}";
     System.out.println("clase generada:\n"+generateClass);
        Document rCompilation=compileProjectToExecuteWEB(path+Separator.getSystemSeparator()+Project.srcFolder,this.myProjectManager.getClassesProjectXML(name, owner,pathOwner),
                                   path+Separator.getSystemSeparator()+Project.libFolder,this.myProjectManager.getLibsProjectXML(name, owner,pathOwner),
                                   pathWebConsoleLib,classWebClib,
                                   generateClass, path+Separator.getSystemSeparator()+Project.buildFolderWEB,namePathHide,claseApplet);

     
        if(!rCompilation.getDocumentElement().getElementsByTagName("result").item(0).getAttributes().getNamedItem("answer").getTextContent().equals("true")){
        
            if(rCompilation.getDocumentElement().getElementsByTagName("source").item(0).getTextContent().equals("IDE.Compiler.Control_Compiler$InMemoryJavaFileObject[string:///"+claseApplet+".java]")){
                
                Element message = rCompilation.createElement("return");
                Text textE = rCompilation.createTextNode("noMain"); //Ingresamos la info en xmlllllllllll
                message.appendChild(textE); //
                rCompilation.getDocumentElement().appendChild(message);
                
            }
            else{
                Element message = rCompilation.createElement("return");
                Text textE = rCompilation.createTextNode("noCompilation"); //Ingresamos la info en xmlllllllllll
                message.appendChild(textE); //
                rCompilation.getDocumentElement().appendChild(message);
            }
               return rCompilation; 
        }
   
        //falta averiguar si se construyo bien
        this.buildProjectWEB(
                path+Separator.getSystemSeparator()+Project.buildFolderWEB, 
                path+Separator.getSystemSeparator()+Project.srcFolder, 
                this.myProjectManager.getOtherFilesProjectXML(name, owner,pathOwner), 
                name+ran+".jar",
                path+Separator.getSystemSeparator()+Project.executeFolder);
        
       
        //falta averiguar si se firmo bien
        signerProject(path+Separator.getSystemSeparator()+Project.executeFolder+Separator.getSystemSeparator()+name+ran+".jar");
        
        Facade_FileManagerXML fmxml=new Facade_FileManagerXML();
        fmxml.crearXMLinMemory("Run");
            Element message = fmxml.getDocumentoXML().createElement("return");
            Text textE = fmxml.getDocumentoXML().createTextNode("ok"); //Ingresamos la info en xmlllllllllll
            message.appendChild(textE); //
            fmxml.getDocumentoXML().getDocumentElement().appendChild(message);
            
            Element clase = fmxml.getDocumentoXML().createElement("class");
            Text textC = fmxml.getDocumentoXML().createTextNode(claseApplet); //Ingresamos la info en xmlllllllllll
            clase.appendChild(textC); //
            fmxml.getDocumentoXML().getDocumentElement().appendChild(clase);
            
            Element jar = fmxml.getDocumentoXML().createElement("jar");
            Text textJ = fmxml.getDocumentoXML().createTextNode(name+ran); //Ingresamos la info en xmlllllllllll
            jar.appendChild(textJ); //
            fmxml.getDocumentoXML().getDocumentElement().appendChild(jar);
            
       //String [] respuesta={ claseApplet , name+ran};

        return fmxml.getDocumentoXML();
        
     
    
    }
    
    public Document cleanAndBuild(String name,String owner,String pathOwner){
        String path=pathOwner+Separator.getSystemSeparator()+name;
        this.cleanFolder(path+Separator.getSystemSeparator()+Project.buildFolder);
        this.cleanFolder(path+Separator.getSystemSeparator()+Project.distFolder);
        Document d=this.compileProject(name, owner, pathOwner, true, name);
        if(!d.getElementsByTagName("result").item(0).getAttributes().getNamedItem("answer").getTextContent().equals("true"))
            return d;
        
        this.buildProject(
                path+Separator.getSystemSeparator()+Project.buildFolder,
                path+Separator.getSystemSeparator()+Project.srcFolder, 
                this.myProjectManager.getOtherFilesProjectXML(name, owner,pathOwner), 
                name+".jar",
                path+Separator.getSystemSeparator()+Project.distFolder,
                path);
        Facade_FileManagerXML controlFileManagerXML=new Facade_FileManagerXML();
        controlFileManagerXML.crearXMLinMemory("Compilation");
        ArrayList<ParameterXML> ps=new ArrayList<ParameterXML>();
        ps.add(new ParameterXML("answer","true"));
        controlFileManagerXML.addChild("result","", ps, null);
        return controlFileManagerXML.getDocumentoXML();
    }
    
    public boolean compressProject(String name,String owner,String pathOwner,String outFolder){
    
        ArrayList<String[]> folders= this.myProjectManager.getFoldersToCompress(name, owner, pathOwner);
        if(folders==null)return false;
        if(folders.isEmpty())return false;
        
        return this.myCompressor.generateZIP(folders,name, outFolder, name+"_"+owner+".zip");
       
    }
    
    public Document compressExecutableProject(String name,String owner,String pathOwner,String outFolder){
      
        ArrayList<String[]> folders= this.myProjectManager.getFoldersToExecutableCompress(name, owner, pathOwner);
        Facade_FileManagerXML controlFileManagerXML=new Facade_FileManagerXML();
        controlFileManagerXML.crearXMLinMemory("Compress");
        ArrayList<ParameterXML> ps=new ArrayList<ParameterXML>();
        
        
        if(folders==null){
            ps.add(new ParameterXML("answer","false"));
            controlFileManagerXML.addChild("result","", ps, null);
            return controlFileManagerXML.getDocumentoXML();
        }
        if(folders.isEmpty()){
            ps.add(new ParameterXML("answer","false"));
            controlFileManagerXML.addChild("result","", ps, null);
            return controlFileManagerXML.getDocumentoXML();
        }
        
        String nameFile=name+"_"+owner+"_JAR.zip";
        if( this.myCompressor.generateZIP(folders,name, outFolder,nameFile )){
            ps.add(new ParameterXML("answer","true"));
            ps.add(new ParameterXML("fileName",nameFile));
            controlFileManagerXML.addChild("result","", ps, null);
            return controlFileManagerXML.getDocumentoXML();
        }
        else{
        ps.add(new ParameterXML("answer","wrong"));
        controlFileManagerXML.addChild("result","", ps, null);
        return controlFileManagerXML.getDocumentoXML();
        }
    }
    
    private void cleanExecute(String path){
    
        File f=new File(path);
        if(f.isFile())return; 
        
        String[] files=f.list();
        for(String x: files){
            if(!x.equals("index.jsp")){
                Facade_FileManager.getReference().deleteFile(path+Separator.getSystemSeparator()+x);
            }
               
        }
    
    }
    
    private void cleanFolder(String path){
    
        File f=new File(path);
        if(f.isFile())return; 
        
        String[] files=f.list();
        for(String x: files){
               Facade_FileManager.getReference().deleteFile(path+Separator.getSystemSeparator()+x);
        }
    
    }
    
    /**
     * 
     *
     * 
     * Methods Compiler
     * 
     *
     * 
     */
    
    
    public Document compileProject(String name,String owner,String pathOwner,boolean hidePath,String pathHide){
        
        if(!this.myProjectManager.haveProject(name, owner))return null;
        String path=pathOwner+Separator.getSystemSeparator()+name;
        if(path==null)return null;
        Document d=  myCompiler.compileProject(
                path+Separator.getSystemSeparator()+Project.srcFolder,
                this.myProjectManager.getClassesProjectXML(name, owner,pathOwner)
                , path+Separator.getSystemSeparator()+Project.libFolder
                , this.myProjectManager.getLibsProjectXML(name, owner,pathOwner)
                , path+Separator.getSystemSeparator()+Project.buildFolder
                ,hidePath
                ,pathHide);
      
       // this.myProjectManager.toRegisterClassFiles(name,owner,pathOwner);
        return d;
    }
    
    private Document compileProjectToExecuteWEB(String pathClassProject,Document javaFiles,
                                                String pathLib, Document libs,
                                                String pathWebConsoleLib, Document classWebClib,
                                                String generateClass,
                                                String pathOut,String namePathHide,String nameClassGenerate){
        
        
        return   myCompiler.compileProjectToWeb(
                pathClassProject,
                javaFiles
                , pathLib
                , libs
                , pathWebConsoleLib,classWebClib
                ,generateClass
                ,pathOut,namePathHide,nameClassGenerate);
      
     
    }
    

    
    
    
    /**
     * 
     *
     * 
     * Methods Compress
     * 
     *
     * 
     */
    
    
    private boolean buildProject(String folderSOURCE,String pathFiles, Document files, String nameJAR,String pathOut,String pathProject){
       
        String pathMANIFIEST=pathProject+Separator.getSystemSeparator()+Project.confFolder+Separator.getSystemSeparator()+Project.fileManifest;;
        return myCompressor.buildExecutableJAR(folderSOURCE, pathFiles, files, nameJAR, pathOut, pathMANIFIEST);
    }
    
    private boolean buildProjectWEB(String folderSOURCE,String pathFiles, Document files, String nameJAR,String pathOut){
     
        return myCompressor.buildJAR(folderSOURCE, pathFiles, files, nameJAR, pathOut);
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
   public boolean loadProject(String name,String owner,String pathOwner,String user){
   
       return myProjectManager.loadProject(name,owner, pathOwner,user);       
   
   }
    
    //
    public boolean createProject(String name,String owner,Date createDate,String pathOwner,ArrayList<String[]>libs){
   
        
      if(myProjectManager.createProject(name, owner, createDate, pathOwner,libs)){
          Facade_Signer fs=new Facade_Signer();
          Document d=myProjectManager.getLibsProjectXML_(name, owner, pathOwner);
          NodeList nl=d.getDocumentElement().getChildNodes();
          String libFolder=this.myProjectManager.getLibsFolder(name, owner, pathOwner);
          for(int i=0;i<nl.getLength();i++){
              fs.sign(pathOwner+Separator.getSystemSeparator()+name+Separator.getSystemSeparator()+libFolder+Separator.getSystemSeparator()+nl.item(i).getAttributes().getNamedItem("name").getTextContent());
          }
          return true;
      }
      return false;
   
   }
    
    //
    public boolean renameProject(String name,String owner,String pathOwner,String newName,String user){
        return myProjectManager.renameProject(name,owner, pathOwner, newName,user);
    }
    
    public boolean renameProject_(String name,String owner,String pathOwner,String newName,String user){
        return myProjectManager.renameProject_(name,owner, pathOwner, newName,user);
    }
    
    //
    public boolean renameClass(String name,String owner,String pathOwner,String nPackage,String nameC,String newNameC){
        
        return myProjectManager.renameClass(name,owner,pathOwner,nPackage,nameC,newNameC);
        
    }
    
    //
    public boolean renameGUIClass(String name,String owner,String pathOwner,String nPackage,String nameC,String newNameC){
        
        return myProjectManager.renameGUIClass(name,owner,pathOwner,nPackage,nameC,newNameC);
        
    }
    
    public boolean renameLib(String name,String owner,String pathOwner,String nameL,String newName){
        
        return myProjectManager.renameLib(name, owner, pathOwner, nameL, newName);
        
    }
    
    //
    public boolean renameFile(String name,String owner,String pathOwner,String nPackage,String nameF,String newNameF){
        
        return myProjectManager.renameFile(name,owner,pathOwner,nPackage,nameF,newNameF);
    }
    
    //
    public boolean renamePackage(String name,String owner,String pathOwner,String nPackage,String newNameP){
    
        return this.myProjectManager.renamePackage(name,owner,pathOwner,nPackage,newNameP);
    }
    
  
    //
    public boolean deleteProject(String name, String owner, String pathOwner,String user) {
        
        return this.myProjectManager.deleteProject(name, owner, pathOwner);
    } 
    
    public boolean deleteProject_(String name,String owner,String pathOwner,String user) {
        
        return this.myProjectManager.deleteProject_(name, owner, pathOwner,user);
    }
    
    
    //
    public boolean closeProject(String name,String owner){
        return myProjectManager.closeProject(name,owner);
    }
    
    //
    public boolean addPackage(String name,String owner, String pathOwner, String nPackage){
    
        return this.myProjectManager.addPackage(name,owner, pathOwner, nPackage);
    
    }
    
    //
    public boolean addClass(String name,String owner,String pathOwner,String nPackage,String nameC,String user){
        return this.myProjectManager.addClass(name,owner,pathOwner,nPackage,nameC,user);
    }
    
    //
    public boolean addGUIClass(String name,String owner,String pathOwner,String nPackage,String nameC){
        
        return this.myProjectManager.addGUIClass(name, owner, pathOwner, nPackage, nameC);
        
    }
    
    //
    public boolean addNewFile(String name,String owner, String pathOwner, String nPackage, String nameFile) {
        return this.myProjectManager.addNewFile(name,owner, pathOwner, nPackage, nameFile);
    }
    
    //
    public boolean addFile(String ruta,String nameP,String owner,String pack, String name, String pathCopy){
        return this.myProjectManager.addFile(ruta, nameP, owner, pack, name, pathCopy);
    }
    
    //
    public boolean addClassExisting(String ruta,String nameP,String owner,String pack, String name, String pathCopy){
       
       return this.myProjectManager.addClassExisting( ruta, nameP, owner, pack, name, pathCopy);
       
       
   }
    
    public boolean addGUIClassExisting(String ruta, String nameP, String owner, String pack, String name, String pathCopy) {
        
        return this.myProjectManager.addGUIClassExisting( ruta, nameP, owner, pack, name, pathCopy);
    }
    
    //
    public boolean addLibJAR(String name,String owner,String pathOwner,String ap,String nameL) {
        
       if(this.myProjectManager.addLibJAR(name,owner,pathOwner,ap,nameL)){
           Facade_Signer fs=new Facade_Signer();
           String libsFolder=this.myProjectManager.getLibsFolder(name, owner, pathOwner);
           fs.sign(pathOwner+Separator.getSystemSeparator()+name+Separator.getSystemSeparator()+libsFolder+Separator.getSystemSeparator()+nameL);
           return true;
       }
       return false;
        
    }
    /**Query Methods**/  
    
    //Return a xml file that contain information about a project
    //
    public Document getDataProjectXML(String name,String owner,String ruta){
            
        return this.myProjectManager.getDataProjectXML(name, owner,ruta);
    
    }
    //Return a xml file that contain information about project packages
    //
    public Document getPackagesProjectXML(String name,String owner,String ruta) {
        
        return this.myProjectManager.getPackagesProjectXML(name, owner,ruta);
        
    }    
    //Return a xml file that containt information about project classes
    //
    public Document getClassesProjectXML(String name,String owner,String ruta) {
        
        return this.myProjectManager.getClassesProjectXML(name, owner,ruta); 
        
    }
    
    public Document getClassesProjectXML_(String name,String owner,String ruta,String user) {
        
        return this.myProjectManager.getClassesProjectXML_(name, owner,ruta,user); 
        
    }
     
    //
    public Document getClassFilesProjectXML(String name,String owner,String ruta) {
        
        return this.myProjectManager.getClassFilesProjectXML(name, owner,ruta);
        
    } 
    //Return a xml file that containt information about project files
    //
    public Document getOtherFilesProjectXML(String name,String owner,String ruta) {
        
        return this.myProjectManager.getOtherFilesProjectXML(name, owner,ruta);
        
    }    
    //Return a xml file that containt information about project libraries
    //
    public Document getLibsProjectXML(String name,String owner,String ruta) {
        
        return this.myProjectManager.getLibsProjectXML(name, owner,ruta);
        
    }
    
    //
    public Document getClassXML(String name,String owner, String pathOwner, String nPackage, String nameF) {
        
       return this.myProjectManager.getClassXML(name,owner, pathOwner, nPackage, nameF);
        
    }
    
    //
    public String getGUIClassJSON(String name,String owner, String pathOwner, String nPackage, String nameF) {
        
       return this.myProjectManager.getGUIClassJSON(name,owner, pathOwner, nPackage, nameF);
        
    }
    
    //
    public Document getFileXML(String name,String owner, String pathOwner, String nPackage, String nameF){
        
        return this.myProjectManager.getFileXML(name,owner,pathOwner,nPackage,nameF);
    }

    /**Delete methods**/
    
    //
    public boolean deleteClass(String name,String owner,String pathOwner,String nPackage,String nameC){
        
        return this.myProjectManager.deleteClass(name,owner,pathOwner,nPackage,nameC);
        
    }
    
     //
    public boolean deleteGUIClass(String name,String owner,String pathOwner,String nPackage,String nameC){
        
        return this.myProjectManager.deleteGUIClass(name,owner,pathOwner,nPackage,nameC);
        
    }
    
    //
    public boolean deleteFile(String name,String owner, String pathOwner, String nPackage, String nameF){
     
        return this.myProjectManager.deleteFile( name, owner, pathOwner, nPackage, nameF);
    }
    
    //
    public boolean deleteLib(String name,String owner, String pathOwner, String nameL) {
        
       return this.myProjectManager.deleteLib(name, owner, pathOwner, nameL);
        
    }
    
    //
    public boolean deletePackage(String name,String owner,String pathOwner,String nameL) {
        
       return this.myProjectManager.deletePackage(name,owner,pathOwner,nameL);
        
    }
   
  
    //
    public boolean haveProject(String name,String owner){
        
        return this.myProjectManager.haveProject(name, owner);
        
    }

    //
    public boolean setMainClass(String name, String owner,String pathOwner,String nameC,String pack) {
        
        return this.myProjectManager.setMainClass(name, owner, pathOwner,nameC,pack);
    }   
    
    
    //
    public String getMainClass(String name, String owner,String ruta) {
        
        return this.myProjectManager.getMainClass(name, owner,ruta);
    }
    
    public String getMainClass_(String name, String owner,String ruta,String user) {
        
        return this.myProjectManager.getMainClass_(name, owner,ruta,user);
    }

    public Document getUsersProject(String name, String owner, String pathOwner) {
        
        return this.myProjectManager.getUsersProject(name, owner,pathOwner);
    }
    
    public Document getUsersProject_(String name, String owner,String pathOwner,String user) {
        
        return this.myProjectManager.getUsersProject_(name, owner,pathOwner,user);
    }

    public String getRealPathClass(String name, String owner, String nPackage, String nameC,String pathOwner) {
        
        return this.myProjectManager.getRealPathClass(name,owner,nPackage,nameC,pathOwner);
        
    }

    public String getRealPathFile(String name, String owner, String nPackage, String nameF,String pathOwner) {
        
      return this.myProjectManager.getRealPathFile(name,owner,nPackage,nameF,pathOwner);   
        
    }

    public String getRealPathLib(String name, String owner, String nameL, String pathOwner) {
       return this.myProjectManager.getRealPathLib(name,owner,nameL,pathOwner);
    }

    public boolean saveGUIClass(String name, String owner, String nPackage, String nameG, Document d,String pathOwner) {
         return myProjectManager.saveGUIClass(name,owner,nPackage,nameG,d,pathOwner);
    }
 
    public String toStringProjects(){
        return myProjectManager.toStringProjects();
   }
    public boolean shareProject(String name,String owner,String user,String type,String pathOwner){
        return myProjectManager.shareProject(name,owner,user,type,pathOwner);
    }

    public boolean shareProject_(String name,String owner,String user,String type,String pathOwner,String userE){
       
      return myProjectManager.shareProject_(name,owner,user,type,pathOwner,userE);
       
    }
    
    public String getUserType(String name, String owner,String pathOwner) {
        return myProjectManager.getUserType(name,owner,pathOwner);
    }
    
    public String getUserType_(String name, String owner,String user,String pathOwner) {
        return myProjectManager.getUserType_(name,owner,user,pathOwner);
    }

    public boolean deleteUserProjects(String name, String owner, String user, String pathOwner) {
        return myProjectManager.deleteUserProjects(name,owner,user,pathOwner);
    }

    public boolean closeIDE() {
        return myProjectManager.closeProjects();
    }
    
    public void setNameProject(String name,String owner,String newName){
        
         myProjectManager.setNameProject(name, owner, newName);
        
    }

    public boolean changeUserPrivilege(String name, String owner, String user, String type, String pathOwner) {
        
        return myProjectManager.changeUserPrivilege(name,owner,user,type,pathOwner);
    }
    
    public boolean changeUserPrivilege_(String name, String owner, String user, String type, String pathOwner,String userE) {
        
        return myProjectManager.changeUserPrivilege_(name,owner,user,type,pathOwner,userE);
    }
   
    public String getExecuteFolder(String name,String owner){
        
        return myProjectManager.getExecuteFolder(name,owner);
    }

    public String getLibsFolder(String name, String owner,String pathOwner) {
        
        return myProjectManager.getLibsFolder(name, owner, pathOwner);
    }

    public boolean deleteViewProject(String name, String owner, String user, String pathOwner) {
        return myProjectManager.deleteViewProject(name, owner, user, pathOwner);
    }
    public boolean deleteViewProject_(String name, String owner, String user, String pathOwner) {
        return myProjectManager.deleteViewProject_(name, owner, user, pathOwner);
    }
}
