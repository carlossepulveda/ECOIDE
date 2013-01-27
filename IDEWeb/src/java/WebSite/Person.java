/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package WebSite;

import Encrypter.Facade_Encrypter;
import FileManager.Facade_FileManager;
import FileManagerXML.Facade_FileManagerXML;
import Util.Random;
import Util.Separator;
import Util.uploadFile;
import WebSite.DAO.PersonDAO_XML;
import WebSite.DAO.PersonOnHoldDAO_XML;
import WebSite.DTO.PersonDTO;
import WebSite.DTO.PersonOnHoldDTO;
import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.ResourceBundle;
import javax.servlet.http.HttpServletRequest;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.w3c.dom.Text;

/**
 *
 * @author cas
 */
public class Person {
    
    private PersonDAO_XML myPersonDAO;
    //private PersonDAO_XML myPersonDAO;
    private PersonOnHoldDAO_XML myPersonOnHoldDAO;
    private String pathApp;
    private String pathUsers;
    private static final String fileProjects="projects.xml";
    private static final String fileData="user.xml";
    private static final String folderTemporal="temporal";
    private static final String folderProjects="projects";
    private Facade_Encrypter myControlEncrypter;
    
    public Person(String pathApp){
        
        myPersonDAO=new PersonDAO_XML(pathApp);
        myPersonOnHoldDAO=new PersonOnHoldDAO_XML(pathApp);
        this.pathApp=pathApp;
        myControlEncrypter=null;//new Facade_Encrypter(pathApp);
        ResourceBundle properties = ResourceBundle.getBundle("Properties.UsersProperties");
        pathUsers=properties.getString("path");
        
        
    }
    
    public boolean isValidPerson(String user,String pass){
        PersonDTO p=myPersonDAO.getPersonDTO(user);
        if(p==null)return false;
        return /**myControlEncrypter.isAgreeEncryptString(**/p.getPassword().equals(pass)/**pass)**/;//falta validar la encriptacion
          
    }
    
    public boolean isValidAdmin(String user,String pass){
        
        PersonDTO p=myPersonDAO.getPersonDTO(user);
        if(p==null)return false;
        System.out.println("login "+pass+"   "+p.getPassword()+"  type:  "+p.getType());
        return /**myControlEncrypter.isAgreeEncryptString(**/p.getPassword().equals(pass)/**, pass) **/&& p.getType().equals("administrator");//falta validar la encriptacion
          
    }
    
    public Document getPerson(String user){
      
        PersonDTO p=myPersonDAO.getPersonDTO(user);
        if(p==null)return null;
        
        Facade_FileManagerXML fm=new Facade_FileManagerXML();
        fm.crearXMLinMemory("User");
        fm.addChild("email",p.getEmail(), null, null);
        fm.addChild("type",p.getType(), null, null);
   
        return fm.getDocumentoXML();
          
    }
    
    public Document getProgrammers(){
            
       ArrayList<PersonDTO> programmers=myPersonDAO.getProgrammersDTO();
       if(programmers==null)return null;
       Facade_FileManagerXML fm=new Facade_FileManagerXML();
       fm.crearXMLinMemory("users");
       for(PersonDTO person: programmers){

            Document d=this.getProgrammerDataXML(person.getEmail());
            if(d==null)continue;
            if(d.getDocumentElement().getChildNodes().getLength()==0)continue;
            
            Element user = fm.getDocumentoXML().createElement("programmer"); //creamos un nuevo elemento en el XMLLLL
            
            Element name = fm.getDocumentoXML().createElement("name");
            Text textN = fm.getDocumentoXML().createTextNode(d.getDocumentElement().getElementsByTagName("name").item(0).getTextContent()); //Ingresamos la info en xmlllllllllll
            name.appendChild(textN); //
            user.appendChild(name);
     
            Element email = fm.getDocumentoXML().createElement("email");
            Text text = fm.getDocumentoXML().createTextNode(person.getEmail()); //Ingresamos la info en xmlllllllllll
            email.appendChild(text); //
            user.appendChild(email);

            Element profile = fm.getDocumentoXML().createElement("profile");
            Text textP = fm.getDocumentoXML().createTextNode(d.getDocumentElement().getElementsByTagName("profile").item(0).getTextContent()); //Ingresamos la info en xmlllllllllll
            profile.appendChild(textP); //
            user.appendChild(profile);

            Element photo = fm.getDocumentoXML().createElement("photo");
            Text textPho = fm.getDocumentoXML().createTextNode(d.getDocumentElement().getElementsByTagName("photo").item(0).getTextContent()); //Ingresamos la info en xmlllllllllll
            photo.appendChild(textPho); //
            user.appendChild(photo);

            Element datam = fm.getDocumentoXML().createElement("dateMembership");
            Text textDm = fm.getDocumentoXML().createTextNode(d.getDocumentElement().getElementsByTagName("dateMembership").item(0).getTextContent()); //Ingresamos la info en xmlllllllllll
            datam.appendChild(textDm); //
            user.appendChild(datam);
            
            Element le = fm.getDocumentoXML().createElement("lastEntry");
            Text textLe = fm.getDocumentoXML().createTextNode(d.getDocumentElement().getElementsByTagName("lastEntry").item(0).getTextContent()); //Ingresamos la info en xmlllllllllll
            le.appendChild(textLe); //
            user.appendChild(le);
            
            fm.getDocumentoXML().getDocumentElement().appendChild(user);
       }
       return fm.getDocumentoXML();
        
    }
    
    public Document getProgrammersOnHold() {
        
       ArrayList<PersonOnHoldDTO> programmers=this.myPersonOnHoldDAO.getProgrammersOnHoldDTO();
       if(programmers==null)return null;
       Facade_FileManagerXML fm=new Facade_FileManagerXML();
       fm.crearXMLinMemory("users");
       for(PersonOnHoldDTO person: programmers){

            
            Element user = fm.getDocumentoXML().createElement("programmer"); //creamos un nuevo elemento en el XMLLLL
            
            Element name = fm.getDocumentoXML().createElement("name");
            Text textN = fm.getDocumentoXML().createTextNode(person.getName()); //Ingresamos la info en xmlllllllllll
            name.appendChild(textN); //
            user.appendChild(name);
     
            Element email = fm.getDocumentoXML().createElement("email");
            Text text = fm.getDocumentoXML().createTextNode(person.getEmail()); //Ingresamos la info en xmlllllllllll
            email.appendChild(text); //
            user.appendChild(email);

            
            fm.getDocumentoXML().getDocumentElement().appendChild(user);
       }
       return fm.getDocumentoXML();
        
    }
    public Document getProjects(){
        
        Document pro=this.getProgrammers();//obtiene todos los programadores
        NodeList emails=pro.getDocumentElement().getElementsByTagName("email");//obtiene emails de todos los programadores
        
        Facade_FileManagerXML ffxml=new Facade_FileManagerXML();
        ffxml.crearXMLinMemory("projects");
        Document daux=ffxml.getDocumentoXML();
        
        for(int i=0;i<emails.getLength();i++){
           Document prs=this.getProgrammerProjectsXML_Filtered( emails.item(i).getTextContent(), 2 );
           if(prs==null)continue;
           NodeList nprs=prs.getDocumentElement().getChildNodes();
           for(int j=0;j<nprs.getLength();j++){
               
               Element project = daux.createElement("project"); //creamos un nuevo elemento en el XMLLLL
       
                Element namE = daux.createElement("name");
                Text text = daux.createTextNode(nprs.item(j).getChildNodes().item(0).getTextContent()); //Ingresamos la info en xmlllllllllll
                namE.appendChild(text); //
                project.appendChild(namE);

                Element owneR = daux.createElement("owner");
                Text textP = daux.createTextNode(nprs.item(j).getChildNodes().item(1).getTextContent()); //Ingresamos la info en xmlllllllllll
                owneR.appendChild(textP); //
                project.appendChild(owneR);

                Element typE = daux.createElement("type");
                Text textT = daux.createTextNode(nprs.item(j).getChildNodes().item(2).getTextContent()); //Ingresamos la info en xmlllllllllll
                typE.appendChild(textT); //
                project.appendChild(typE);


                Element sharE = daux.createElement("shared");
                Text textS = daux.createTextNode(nprs.item(j).getChildNodes().item(3).getTextContent()); //Ingresamos la info en xmlllllllllll
                sharE.appendChild(textS); //
                project.appendChild(sharE);

             daux.getDocumentElement().appendChild(project); //pegamos el elemento hijo a la raiz
               
           }
            
        }
        
        return daux;
    }
    
   public Document getProjectsShared(){
        Document pro=this.getProgrammers();//obtiene todos los programadores
        NodeList emails=pro.getDocumentElement().getElementsByTagName("email");//obtiene emails de todos los programadores
        
        Facade_FileManagerXML ffxml=new Facade_FileManagerXML();
        ffxml.crearXMLinMemory("projects");
        Document daux=ffxml.getDocumentoXML();
        
        for(int i=0;i<emails.getLength();i++){
           Document prs=this.getProgrammerProjectsXML_Filtered( emails.item(i).getTextContent(), 4 );
           if(prs==null)continue;
           NodeList nprs=prs.getDocumentElement().getChildNodes();
           for(int j=0;j<nprs.getLength();j++){
               
               Element project = daux.createElement("project"); //creamos un nuevo elemento en el XMLLLL
       
                Element namE = daux.createElement("name");
                Text text = daux.createTextNode(nprs.item(j).getChildNodes().item(0).getTextContent()); //Ingresamos la info en xmlllllllllll
                namE.appendChild(text); //
                project.appendChild(namE);

                Element owneR = daux.createElement("owner");
                Text textP = daux.createTextNode(nprs.item(j).getChildNodes().item(1).getTextContent()); //Ingresamos la info en xmlllllllllll
                owneR.appendChild(textP); //
                project.appendChild(owneR);

                Element typE = daux.createElement("type");
                Text textT = daux.createTextNode(nprs.item(j).getChildNodes().item(2).getTextContent()); //Ingresamos la info en xmlllllllllll
                typE.appendChild(textT); //
                project.appendChild(typE);


                Element sharE = daux.createElement("shared");
                Text textS = daux.createTextNode(nprs.item(j).getChildNodes().item(3).getTextContent()); //Ingresamos la info en xmlllllllllll
                sharE.appendChild(textS); //
                project.appendChild(sharE);

             daux.getDocumentElement().appendChild(project); //pegamos el elemento hijo a la raiz
               
           }
            
        }
        
        return daux;
    }
    
    public Document getPersonOnHold(String user){
      
        PersonOnHoldDTO p=myPersonOnHoldDAO.getProgrammerOnHoldDTO(user);
        if(p==null)return null;
        Facade_FileManagerXML fm=new Facade_FileManagerXML();
        fm.crearXMLinMemory("User");
        fm.addChild("email",p.getEmail(), null, null);
        fm.addChild("profile",p.getProfile(), null, null);
        fm.addChild("name",p.getName(), null, null);
   
        return fm.getDocumentoXML();
          
    }
   
    public boolean closeSession(String user){
        return myPersonDAO.closeSession(user);
    }
    
    public boolean openSession(String user,String id,String typeUser){
        if(myPersonDAO.openSession(user,id)){
            
            if(!typeUser.equals("administrator")){
                String r=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+user;
                Facade_FileManagerXML ffxml=new Facade_FileManagerXML();
                ffxml.leerXMLexistente(r+Separator.getSystemSeparator()+Person.fileData);
                Date d=new Date();
                ffxml.getDocumentoXML().getDocumentElement().getElementsByTagName("lastEntry").item(0).setTextContent((d.getDate())+"/"+(d.getMonth()+1)+"/"+(d.getYear()+1900));
                ffxml.closeDocument();
            }
            return true;
        }
        return false;
    }
    
    public boolean isValidSession(String user,String id){
         String x=myPersonDAO.getSession(user);
         if(x.equals(id))return true;
         return false;
     }
     
    public Document getProgrammerProjectsXML(String user){
         
        String r=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+user;
        Facade_FileManagerXML ffxml=new Facade_FileManagerXML();
        ffxml.leerXMLexistente(r+Separator.getSystemSeparator()+Person.fileProjects);
      
        return ffxml.getDocumentoXML();
        
     }
    
    public Document getProgrammerProjectsXML_Filtered(String user,int filter){
      
        String r=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+user;
        Facade_FileManagerXML ffxml=new Facade_FileManagerXML();
        ffxml.leerXMLexistente(r+Separator.getSystemSeparator()+Person.fileProjects);
     
        if(filter==1)
            return ffxml.getDocumentoXML();
        
        Facade_FileManagerXML fa=new Facade_FileManagerXML();
        fa.crearXMLinMemory("Projects");
        Document daux=fa.getDocumentoXML();
        NodeList nl=ffxml.getDocumentoXML().getDocumentElement().getElementsByTagName("owner");
        NodeList nls=ffxml.getDocumentoXML().getDocumentElement().getElementsByTagName("shared");
        NodeList nlP=ffxml.getDocumentoXML().getDocumentElement().getElementsByTagName("project");
        for(int i=0;i<nl.getLength();i++){
            switch(filter){

                case 2:{//Los proyectos mios
                    if(!nl.item(i).getTextContent().equals(user)){
                        continue;
                    }
                    break;
                }
                case 3:{//Los proyectos que me comparten
                    if(nl.item(i).getTextContent().equals(user)){
                        continue;
                    }
                    break;
                }
                case 4:{//Los proyectos que comparto
                    if(!nl.item(i).getTextContent().equals(user) || !nls.item(i).getTextContent().equals("yes")  ){
                        continue;
                    }
                    break;
                }
            
            }
            
             
            Element project = daux.createElement("project"); //creamos un nuevo elemento en el XMLLLL
       
                Element namE = daux.createElement("name");
                Text text = daux.createTextNode(nlP.item(i).getChildNodes().item(0).getTextContent()); //Ingresamos la info en xmlllllllllll
                namE.appendChild(text); //
                project.appendChild(namE);

                Element owneR = daux.createElement("owner");
                Text textP = daux.createTextNode(nlP.item(i).getChildNodes().item(1).getTextContent()); //Ingresamos la info en xmlllllllllll
                owneR.appendChild(textP); //
                project.appendChild(owneR);

                Element typE = daux.createElement("type");
                Text textT = daux.createTextNode(nlP.item(i).getChildNodes().item(2).getTextContent()); //Ingresamos la info en xmlllllllllll
                typE.appendChild(textT); //
                project.appendChild(typE);


                Element sharE = daux.createElement("shared");
                Text textS = daux.createTextNode(nlP.item(i).getChildNodes().item(3).getTextContent()); //Ingresamos la info en xmlllllllllll
                sharE.appendChild(textS); //
                project.appendChild(sharE);
//int x=Integer.parseInt("ca");
             daux.getDocumentElement().appendChild(project); //pegamos el elemento hijo a la raiz
        
        }
        
        return daux;
        
     }
     
    public Document getProgrammerDataXML(String user){
        
        if(myPersonDAO.getPersonDTO(user)==null)return null;
        String r=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+user;
        Facade_FileManagerXML ffxml=new Facade_FileManagerXML();
        ffxml.leerXMLexistente(r+Separator.getSystemSeparator()+Person.fileData);
        return ffxml.getDocumentoXML();
        
     }
    
    public boolean createProgrammer(String id,String pathPhoto){
        //deberia recibir el id del usuario buscarlo en la tabla usersonhold de ahi obtener nombre y resto dedatos
        Facade_FileManager.getReference().createFolder(this.pathApp+Separator.getSystemSeparator()+this.pathUsers, id);
        Facade_FileManager.getReference().copyFile(this.pathApp+Separator.getSystemSeparator()+pathPhoto,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+id+Separator.getSystemSeparator()+"user.png" );
        Facade_FileManager.getReference().createFolder(this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+id,Person.folderProjects );
        Facade_FileManager.getReference().createFolder(this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+id,Person.folderTemporal );
        Facade_FileManagerXML fm=new Facade_FileManagerXML();
        fm.crearXMLnuevo(pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+id+Separator.getSystemSeparator()+Person.fileData, "user");
        PersonOnHoldDTO personO=myPersonOnHoldDAO.getProgrammerOnHoldDTO(id);
        if(personO==null)return false;
            fm.addChild("name", personO.getName(), null, null);
            fm.addChild("email", personO.getEmail(), null, null);
            fm.addChild("profile", personO.getProfile(), null, null);
            fm.addChild("photo", "user.png", null, null);
            Date date=new Date();
            fm.addChild("dateMembership", date.getDate()+"/"+date.getMonth()+"/"+date.getYear(), null, null);
            fm.addChild("lastEntry","", null, null);
            
        fm.crearXMLnuevo(pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+id+Separator.getSystemSeparator()+Person.fileProjects, "projects");
        
        myPersonDAO.addPerson(personO,"");
        myPersonOnHoldDAO.removeProgrammer(id);
        return true;
    }
    
    public boolean registerProgrammer(String id,String name,String profile,String password,String idU){
        PersonOnHoldDTO person=new PersonOnHoldDTO(name,profile,id,/**myControlEncrypter.encrypt(**/password/**)**/);
        person.setType("programmer");
       return myPersonOnHoldDAO.registerProgrammer(person,idU);
    }

    public boolean restorePassUser(String id,String np){
        PersonDTO person=this.myPersonDAO.getPersonDTO(id);
        np=/**myControlEncrypter.encrypt(**/np/**)**/;
        if(np==null){
            return false;
        }
        person.setPassword(/**myControlEncrypter.encrypt(**/np/**)**/);
        return this.myPersonDAO.updatePerson(person);
    }
    
    public boolean registerProject(String name, String user,String owner,String type) {
        
        String r=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+user;
        Facade_FileManagerXML fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(r+Separator.getSystemSeparator()+Person.fileProjects);
        
        
        for(int i=0;i<fm.getDocumentoXML().getDocumentElement().getChildNodes().getLength();i++){
            if(fm.getDocumentoXML().getElementsByTagName("name").item(i).getTextContent().equals(name))return false;
        }
        
        
        Element project = fm.getDocumentoXML().createElement("project"); //creamos un nuevo elemento en el XMLLLL
       
        Element namE = fm.getDocumentoXML().createElement("name");
        Text text = fm.getDocumentoXML().createTextNode(name); //Ingresamos la info en xmlllllllllll
        namE.appendChild(text); //
        project.appendChild(namE);
        
        Element owneR = fm.getDocumentoXML().createElement("owner");
        Text textP = fm.getDocumentoXML().createTextNode(owner); //Ingresamos la info en xmlllllllllll
        owneR.appendChild(textP); //
        project.appendChild(owneR);
        
        Element typE = fm.getDocumentoXML().createElement("type");
        Text textT = fm.getDocumentoXML().createTextNode(type); //Ingresamos la info en xmlllllllllll
        typE.appendChild(textT); //
        project.appendChild(typE);
        
     
        Element sharE = fm.getDocumentoXML().createElement("shared");
        Text textS = fm.getDocumentoXML().createTextNode("no"); //Ingresamos la info en xmlllllllllll
        sharE.appendChild(textS); //
        project.appendChild(sharE);
        
                
        
        fm.getDocumentoXML().getDocumentElement().appendChild(project); //pegamos el elemento hijo a la raiz
        fm.closeDocument();
        this.createTemporalFolder(user, name+"-"+owner);
  return true;
    }
     
    
    public boolean deleteProject(String name,String owner,Document users,String user){
    
        if(!user.equals(owner))
            return this.deleteProject(name,owner, user);
        if(users!=null){
            for(int i=0;i<users.getDocumentElement().getChildNodes().getLength();i++){    
                this.deleteProject(name, owner,users.getElementsByTagName("email").item(i).getTextContent());            
            }
        }
        this.deleteProject(name,owner, owner);
        return true;
    
    }
    
    private boolean deleteProject(String name,String owner,String user){
      
        Facade_FileManagerXML fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+user+Separator.getSystemSeparator()+Person.fileProjects);
        for(int i=0;i<fm.getDocumentoXML().getDocumentElement().getChildNodes().getLength();i++){
            if(fm.getDocumentoXML().getDocumentElement().getElementsByTagName("name").item(i).getTextContent().equals(name) && fm.getDocumentoXML().getDocumentElement().getElementsByTagName("owner").item(i).getTextContent().equals(owner)){
                fm.getDocumentoXML().getDocumentElement().removeChild(fm.getDocumentoXML().getDocumentElement().getChildNodes().item(i));
                fm.closeDocument();
                return true;
            }
        }
        return false;
        
    }
    
    private boolean renameProject(String name,String owner,String newName){
        
        Facade_FileManagerXML fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+owner+Separator.getSystemSeparator()+Person.fileProjects);
        for(int i=0;i<fm.getDocumentoXML().getDocumentElement().getChildNodes().getLength();i++){
            if(fm.getDocumentoXML().getDocumentElement().getElementsByTagName("name").item(i).getTextContent().equals(name)){
                fm.getDocumentoXML().getElementsByTagName("name").item(i).setTextContent(newName);
                fm.closeDocument();
                return true;
            }
        }
        return false;
        
    }

    public boolean isValidIdRegister(String user, String id) {
        
        return myPersonOnHoldDAO.isValidIdRegister(user, id);
        
    }

    public boolean renameProject(String name, String owner, String newName,Document users) {
        for(int i=0;i<users.getDocumentElement().getChildNodes().getLength();i++){    
            this.renameProject(name, users.getElementsByTagName("email").item(i).getTextContent(),newName);            
        }
        this.renameProject(name, owner,newName);
        return true;
        
    }

    public String getPathProjectsUsersFolder(String nameUser) {
        return nameUser+Separator.getSystemSeparator()+Person.folderProjects;
    }

    public String[] uploadTemporal(String user, HttpServletRequest request, String field,String[] extension,String[] noExtension) {

        uploadFile sa=new uploadFile(request,this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+user+Separator.getSystemSeparator()+Person.folderTemporal,field);
        String nn=Random.getRandom(50);
        return sa.uploadFile(nn,extension,noExtension);
            
    }
    
    public String uploadPhoto(String user, HttpServletRequest request, String field,String[] extension,String[] noExtension) {
        
        String[] res=this.uploadTemporal(user, request, field, extension, noExtension);
        if(res==null)return null;
        String sp[]=res[1].split("\\.");
        Facade_FileManagerXML fm=new Facade_FileManagerXML();
        
        fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+user+Separator.getSystemSeparator()+Person.fileData);
        Facade_FileManager.getReference().deleteFile(this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+user+Separator.getSystemSeparator()+fm.getDocumentoXML().getDocumentElement().getElementsByTagName("photo").item(0).getTextContent());
        Facade_FileManager.getReference().copyFile(this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+user+Separator.getSystemSeparator()+Person.folderTemporal+Separator.getSystemSeparator()+res[1], this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+user+Separator.getSystemSeparator()+res[1]);
        Facade_FileManager.getReference().deleteFile(res[1]);
        
       
        fm.getDocumentoXML().getDocumentElement().getElementsByTagName("photo").item(0).setTextContent(res[1]);
        fm.closeDocument();
        return res[1];
    }

    public String getPathTemporalUserFolder(String nameUser) {
        return Person.folderTemporal;
    }

    public boolean deleteTemporalFile(String user, String file) {
        return Facade_FileManager.getReference().deleteFile(this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+user+Separator.getSystemSeparator()+Person.folderTemporal+Separator.getSystemSeparator()+file);
    }
    
    public boolean createTemporalFolder(String user,String name){
        String r=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+user+Separator.getSystemSeparator()+Person.folderTemporal;
        return Facade_FileManager.getReference().createFolder(r,name);
    }
   
    
    public boolean deleteTemporalFolder(String user,String name){
        String r=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+user+Separator.getSystemSeparator()+Person.folderTemporal+Separator.getSystemSeparator()+name;
        return Facade_FileManager.getReference().deleteFolder(r);
        
    }
    public boolean shareProject(String name,String owner,String user,String type,Document users){
        String r=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+user;
        Facade_FileManagerXML fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(r+Separator.getSystemSeparator()+Person.fileProjects);
        
        
        for(int i=0;i<fm.getDocumentoXML().getDocumentElement().getChildNodes().getLength();i++){
            if(fm.getDocumentoXML().getElementsByTagName("name").item(i).getTextContent().equals(name) && fm.getDocumentoXML().getElementsByTagName("owner").item(i).getTextContent().equals(owner))return false;
        }
        
      
        Element project = fm.getDocumentoXML().createElement("project"); //creamos un nuevo elemento en el XMLLLL
       
        Element namE = fm.getDocumentoXML().createElement("name");
        Text text = fm.getDocumentoXML().createTextNode(name); //Ingresamos la info en xmlllllllllll
        namE.appendChild(text); //
        project.appendChild(namE);
        
        Element owneR = fm.getDocumentoXML().createElement("owner");
        Text textP = fm.getDocumentoXML().createTextNode(owner); //Ingresamos la info en xmlllllllllll
        owneR.appendChild(textP); //
        project.appendChild(owneR);
        
        Element typE = fm.getDocumentoXML().createElement("type");
        Text textT = fm.getDocumentoXML().createTextNode(type); //Ingresamos la info en xmlllllllllll
        typE.appendChild(textT); //
        project.appendChild(typE);
        
     
        Element sharE = fm.getDocumentoXML().createElement("shared");
        Text textS = fm.getDocumentoXML().createTextNode("yes"); //Ingresamos la info en xmlllllllllll
        sharE.appendChild(textS); //
        project.appendChild(sharE);
        
                
        
        fm.getDocumentoXML().getDocumentElement().appendChild(project); //pegamos el elemento hijo a la raiz
        fm.closeDocument();
             
        r=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+owner;
        fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(r+Separator.getSystemSeparator()+Person.fileProjects);
        
        
        for(int i=0;i<fm.getDocumentoXML().getDocumentElement().getChildNodes().getLength();i++){
            if(fm.getDocumentoXML().getElementsByTagName("name").item(i).getTextContent().equals(name) && fm.getDocumentoXML().getElementsByTagName("owner").item(i).getTextContent().equals(owner) && users.getDocumentElement().getChildNodes().getLength()+1>0){
                fm.getDocumentoXML().getDocumentElement().getElementsByTagName("shared").item(i).setTextContent("yes");
                fm.closeDocument();
                this.createTemporalFolder(user, name+"-"+owner);
                return true;
            }
        }
        
        return true;
        
    }

    public boolean deleteUserProject(String name, String owner, String user) {
        return deleteProject(name,owner,user);
    }

    public boolean haveMyProject(String name, String user) {
        Document d= getProgrammerProjectsXML_Filtered(user,2);
        for(int i=0;i<d.getDocumentElement().getChildNodes().getLength();i++){
            if(d.getDocumentElement().getElementsByTagName("name").item(0).getTextContent().equals(name))
                return true;
        }
        return false;
    }

    public boolean changeUserPrivilege(String name, String owner, String user, String type) {
        String r=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+user;
        Facade_FileManagerXML fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(r+Separator.getSystemSeparator()+Person.fileProjects);
        
        for(int i=0;i<fm.getDocumentoXML().getDocumentElement().getChildNodes().getLength();i++){
            if(fm.getDocumentoXML().getElementsByTagName("name").item(i).getTextContent().equals(name) && fm.getDocumentoXML().getElementsByTagName("owner").item(i).getTextContent().equals(owner)){
                fm.getDocumentoXML().getDocumentElement().getElementsByTagName("type").item(i).setTextContent(type);
                fm.closeDocument();
                return true;
            }
        }
        return false;
    }

    public boolean deleteProgrammer(String email) {
        this.myPersonDAO.removePerson(email);
        String r=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+email;
        return Facade_FileManager.getReference().deleteFolder(r);
    }

    public boolean deleteProgrammerOnHold(String email) {
        return this.myPersonOnHoldDAO.removeProgrammer(email);
    }

    public Document getProgrammerByEntry(String day, String m, String a) {
       ArrayList<PersonDTO> programmers=myPersonDAO.getProgrammersDTO();
       if(programmers==null)return null;
       Facade_FileManagerXML fm=new Facade_FileManagerXML();
       fm.crearXMLinMemory("users");
       for(PersonDTO person: programmers){

            Document d=this.getProgrammerDataXML(person.getEmail());
            if(d==null)continue;
            if(d.getDocumentElement().getChildNodes().getLength()==0)continue;
            
            String[] fecha=d.getDocumentElement().getElementsByTagName("lastEntry").item(0).getTextContent().split("/");
            if(fecha.length<3)continue;
            if(Integer.valueOf(fecha[2])<=Integer.valueOf(a)){
                if(Integer.valueOf(fecha[1])<=Integer.valueOf(m)){
                    if(Integer.valueOf(fecha[0])>Integer.valueOf(day)){
                        continue;
                    }
                }
                else
                    continue;
                
            }else
                continue;
            
            Element user = fm.getDocumentoXML().createElement("programmer"); //creamos un nuevo elemento en el XMLLLL
            
            Element name = fm.getDocumentoXML().createElement("name");
            Text textN = fm.getDocumentoXML().createTextNode(d.getDocumentElement().getElementsByTagName("name").item(0).getTextContent()); //Ingresamos la info en xmlllllllllll
            name.appendChild(textN); //
            user.appendChild(name);
     
            Element email = fm.getDocumentoXML().createElement("email");
            Text text = fm.getDocumentoXML().createTextNode(person.getEmail()); //Ingresamos la info en xmlllllllllll
            email.appendChild(text); //
            user.appendChild(email);

            Element profile = fm.getDocumentoXML().createElement("profile");
            Text textP = fm.getDocumentoXML().createTextNode(d.getDocumentElement().getElementsByTagName("profile").item(0).getTextContent()); //Ingresamos la info en xmlllllllllll
            profile.appendChild(textP); //
            user.appendChild(profile);

            Element photo = fm.getDocumentoXML().createElement("photo");
            Text textPho = fm.getDocumentoXML().createTextNode(d.getDocumentElement().getElementsByTagName("photo").item(0).getTextContent()); //Ingresamos la info en xmlllllllllll
            photo.appendChild(textPho); //
            user.appendChild(photo);

            Element datam = fm.getDocumentoXML().createElement("dateMembership");
            Text textDm = fm.getDocumentoXML().createTextNode(d.getDocumentElement().getElementsByTagName("dateMembership").item(0).getTextContent()); //Ingresamos la info en xmlllllllllll
            datam.appendChild(textDm); //
            user.appendChild(datam);
            
            Element le = fm.getDocumentoXML().createElement("lastEntry");
            Text textLe = fm.getDocumentoXML().createTextNode(d.getDocumentElement().getElementsByTagName("lastEntry").item(0).getTextContent()); //Ingresamos la info en xmlllllllllll
            le.appendChild(textLe); //
            user.appendChild(le);
            
            fm.getDocumentoXML().getDocumentElement().appendChild(user);
       }
       return fm.getDocumentoXML();
    }

    public void changeProjectToNoShared(String name, String owner) {
        String r=this.pathApp+Separator.getSystemSeparator()+this.pathUsers+Separator.getSystemSeparator()+owner;
        Facade_FileManagerXML fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(r+Separator.getSystemSeparator()+Person.fileProjects);
        NodeList nl=fm.getDocumentoXML().getDocumentElement().getElementsByTagName("owner");
        NodeList nlP=fm.getDocumentoXML().getDocumentElement().getElementsByTagName("name");
        for(int i=0;i<nl.getLength();i++){
            if(nlP.item(i).getTextContent().equals(name) && nl.item(i).getTextContent().equals(owner)){
                fm.getDocumentoXML().getDocumentElement().getElementsByTagName("shared").item(i).setTextContent("no");
                fm.closeDocument();
                break;
            }
        }
        
    }

  
public String getPass(String user){
      
        PersonDTO p=myPersonDAO.getPersonDTO(user);
        if(p==null)return null;
        return p.getPassword();
}

public boolean existUser(String email) {
    PersonDTO p=myPersonDAO.getPersonDTO(email);
    if(p==null)return false;
    return true;
}
  

    
}
