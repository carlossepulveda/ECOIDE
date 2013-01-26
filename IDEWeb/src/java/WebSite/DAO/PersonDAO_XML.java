/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package WebSite.DAO;

import FileManagerXML.Facade_FileManagerXML;
import FileManagerXML.ParameterXML;
import Util.Separator;
import WebSite.DTO.PersonDTO;
import java.util.ArrayList;
import java.util.ResourceBundle;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.w3c.dom.Text;

/**
 *
 * @author cas
 */
public class PersonDAO_XML {
    
    private String pathDB;
    private String pathApp;
    private String fileUsers;
    private Facade_FileManagerXML fm;
    
    public PersonDAO_XML(String pathApp){
        
        ResourceBundle properties = ResourceBundle.getBundle("Properties.DBXMLProperties");
        pathDB=properties.getString("location");
        fileUsers=properties.getString("users");
        this.pathApp=pathApp;
        
    }
    
    public PersonDTO getPersonDTO(String user){
       
       fm=new Facade_FileManagerXML();
       fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+pathDB+Separator.getSystemSeparator()+fileUsers);
        
        for(int i=0;i<fm.getDocumentoXML().getElementsByTagName("user").getLength();i++){
           
            PersonDTO p=new PersonDTO();
            p.setEmail(fm.getDocumentoXML().getElementsByTagName("email") .item(i).getTextContent());
            p.setPassword(fm.getDocumentoXML().getElementsByTagName("password").item(i).getTextContent());
            p.setType(fm.getDocumentoXML().getElementsByTagName("type").item(i).getTextContent());
            if(p.equals(new PersonDTO(user,null)))
                return p;
        }
        
        return null;
        
    }
    
    public ArrayList<PersonDTO> getPeopleDTO(){
        
        fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+pathDB+Separator.getSystemSeparator()+fileUsers);
        NodeList nl=fm.getDocumentoXML().getDocumentElement().getChildNodes();
        ArrayList<PersonDTO> mp=new ArrayList<PersonDTO>();
        for(int i=0;i<nl.getLength();i++){
            PersonDTO p=new PersonDTO();
            p.setEmail(nl.item(i).getOwnerDocument().getElementsByTagName("email").item(0).getTextContent());
            p.setPassword(nl.item(i).getOwnerDocument().getElementsByTagName("password").item(0).getTextContent());
            p.setType(nl.item(i).getOwnerDocument().getElementsByTagName("type").item(0).getTextContent());
            mp.add(p);
        }
        
        return mp;
    }
    
    public ArrayList<PersonDTO> getProgrammersDTO(){
        
        fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+pathDB+Separator.getSystemSeparator()+fileUsers);
        NodeList nl=fm.getDocumentoXML().getDocumentElement().getElementsByTagName("user");
        Document d=fm.getDocumentoXML();
        ArrayList<PersonDTO> mp=new ArrayList<PersonDTO>();
        for(int i=0;i<nl.getLength();i++){
            PersonDTO p=new PersonDTO();
            p.setEmail(d.getDocumentElement().getElementsByTagName("email").item(i).getTextContent());
            p.setPassword(d.getDocumentElement().getElementsByTagName("password").item(i).getTextContent());
            p.setType(d.getDocumentElement().getElementsByTagName("type").item(i).getTextContent());
            if(p.getType().equals("programmer"))
               mp.add(p);
        }
        
        return mp;
    }
    
    public boolean closeSession(String user){
        
        fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+pathDB+Separator.getSystemSeparator()+fileUsers);
        
        ArrayList<PersonDTO> mp=new ArrayList<PersonDTO>();
        for(int i=0;i<fm.getDocumentoXML().getElementsByTagName("user").getLength();i++){
           
            PersonDTO p=new PersonDTO();
            p.setEmail(fm.getDocumentoXML().getElementsByTagName("email") .item(i).getTextContent());
            
            if(p.equals(new PersonDTO(user,null))){System.out.println("cerrar sesion");
                fm.getDocumentoXML().getElementsByTagName("session") .item(i).setTextContent("");
                fm.closeDocument();
                return true;
            }
        }
        
        return false;
    }
    
     public boolean openSession(String user,String id){
        
        fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+pathDB+Separator.getSystemSeparator()+fileUsers);
        
        ArrayList<PersonDTO> mp=new ArrayList<PersonDTO>();
        for(int i=0;i<fm.getDocumentoXML().getElementsByTagName("user").getLength();i++){
           
            PersonDTO p=new PersonDTO();
            p.setEmail(fm.getDocumentoXML().getElementsByTagName("email") .item(i).getTextContent());
            
            if(p.equals(new PersonDTO(user,null))){
                fm.getDocumentoXML().getElementsByTagName("session") .item(i).setTextContent(id);
                fm.closeDocument();
                return true;
            }
        }
        
        return false;
    }
     
     public String getSession(String user){
        
        fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+pathDB+Separator.getSystemSeparator()+fileUsers);
        
        ArrayList<PersonDTO> mp=new ArrayList<PersonDTO>();
        for(int i=0;i<fm.getDocumentoXML().getElementsByTagName("user").getLength();i++){
           
            PersonDTO p=new PersonDTO();
            p.setEmail(fm.getDocumentoXML().getElementsByTagName("email") .item(i).getTextContent());
            
            if(p.equals(new PersonDTO(user,null))){
                return fm.getDocumentoXML().getElementsByTagName("session") .item(i).getTextContent();
               
            }
        }
        
        return "";
    }
    
    
    public boolean addPerson(PersonDTO person,String session){
        
        fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+pathDB+Separator.getSystemSeparator()+fileUsers);
     
        Element user = fm.getDocumentoXML().createElement("user"); //creamos un nuevo elemento en el XMLLLL
       
        Element email = fm.getDocumentoXML().createElement("email");
        Text text = fm.getDocumentoXML().createTextNode(person.getEmail()); //Ingresamos la info en xmlllllllllll
        email.appendChild(text); //
        user.appendChild(email);
        
        Element password = fm.getDocumentoXML().createElement("password");
        Text textP = fm.getDocumentoXML().createTextNode(person.getPassword()); //Ingresamos la info en xmlllllllllll
        password.appendChild(textP); //
        user.appendChild(password);
        
        Element type = fm.getDocumentoXML().createElement("type");
        Text textT = fm.getDocumentoXML().createTextNode(person.getType()); //Ingresamos la info en xmlllllllllll
        type.appendChild(textT); //
        user.appendChild(type);
        
        Element se = fm.getDocumentoXML().createElement("session");
        Text textS = fm.getDocumentoXML().createTextNode(""); //Ingresamos la info en xmlllllllllll
        se.appendChild(textS); //
        user.appendChild(se);
        
        
        fm.getDocumentoXML().getDocumentElement().appendChild(user); //pegamos el elemento hijo a la raiz
      
  fm.closeDocument();
    return true;
  
        
    }
    
     public boolean updatePerson(PersonDTO person){
        
       fm=new Facade_FileManagerXML();
       fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+pathDB+Separator.getSystemSeparator()+fileUsers);
        
        for(int i=0;i<fm.getDocumentoXML().getElementsByTagName("user").getLength();i++){
           
            PersonDTO p=new PersonDTO();
            p.setEmail(fm.getDocumentoXML().getElementsByTagName("email") .item(i).getTextContent());
            if(p.equals(person)){
                fm.getDocumentoXML().getElementsByTagName("password") .item(i).setTextContent(person.getPassword());
                fm.closeDocument();
                return true;
            }
        }
        
        return false;
  
        
    }

    public boolean removePerson(String id) {
        fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+pathDB+Separator.getSystemSeparator()+fileUsers);
        for(int i=0;i<fm.getDocumentoXML().getDocumentElement().getChildNodes().getLength();i++){
          
            if(fm.getDocumentoXML().getElementsByTagName("email") .item(i).getTextContent().equals(id)){
                fm.getDocumentoXML().getDocumentElement().removeChild(fm.getDocumentoXML().getDocumentElement().getChildNodes().item(i));
                fm.closeDocument();
                return true;
                
            }
            
        }
        
        return false;
        
    }

   
    
    
}
