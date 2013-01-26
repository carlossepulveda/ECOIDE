/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package WebSite.DAO;

import FileManagerXML.Facade_FileManagerXML;
import FileManagerXML.ParameterXML;
import Util.Separator;
import WebSite.DTO.PersonDTO;
import WebSite.DTO.PersonOnHoldDTO;
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
public class PersonOnHoldDAO_XML {
    
    private String pathDB;
    private String pathApp;
    private String fileUsersOnHold;
    private Facade_FileManagerXML fm;
    
    public PersonOnHoldDAO_XML(String pathApp){
        
        ResourceBundle properties = ResourceBundle.getBundle("Properties.DBXMLProperties");
        pathDB=properties.getString("location");
        fileUsersOnHold=properties.getString("usersonhold");
        this.pathApp=pathApp;
        
    }
    

    public PersonOnHoldDTO getProgrammerOnHoldDTO(String user){
       
       fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+pathDB+Separator.getSystemSeparator()+fileUsersOnHold);
        
        for(int i=0;i<fm.getDocumentoXML().getElementsByTagName("user").getLength();i++){
            
            if(fm.getDocumentoXML().getElementsByTagName("email") .item(i).getTextContent().equals(user)){
                
                PersonOnHoldDTO p=new PersonOnHoldDTO();
                p.setEmail(fm.getDocumentoXML().getElementsByTagName("email") .item(i).getTextContent());
                p.setPassword(fm.getDocumentoXML().getElementsByTagName("password").item(i).getTextContent());
                p.setType(fm.getDocumentoXML().getElementsByTagName("type").item(i).getTextContent());
                p.setName(fm.getDocumentoXML().getElementsByTagName("name").item(i).getTextContent());
                p.setProfile(fm.getDocumentoXML().getElementsByTagName("profile").item(i).getTextContent());System.out.println(p.getName());
                return p;
            }
        }
        
        return null;
        
    }
    
    public ArrayList<PersonOnHoldDTO> getProgrammersOnHoldDTO(){
       
       fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+pathDB+Separator.getSystemSeparator()+fileUsersOnHold);
        ArrayList<PersonOnHoldDTO> ps=new ArrayList<PersonOnHoldDTO>();
        for(int i=0;i<fm.getDocumentoXML().getElementsByTagName("user").getLength();i++){
           
            PersonOnHoldDTO p=new PersonOnHoldDTO();
            p.setEmail(fm.getDocumentoXML().getElementsByTagName("email") .item(i).getTextContent());
            p.setPassword(fm.getDocumentoXML().getElementsByTagName("password").item(i).getTextContent());
            p.setType(fm.getDocumentoXML().getElementsByTagName("type").item(i).getTextContent());
            p.setName(fm.getDocumentoXML().getElementsByTagName("name").item(i).getTextContent());
            p.setProfile(fm.getDocumentoXML().getElementsByTagName("profile").item(i).getTextContent());System.out.println(p.getName());
            ps.add(p);
        }
        
        return ps;
        
    }
  

    public boolean registerProgrammer(PersonOnHoldDTO person,String id) {
        
        fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+pathDB+Separator.getSystemSeparator()+fileUsersOnHold);
        
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
        
        Element namE = fm.getDocumentoXML().createElement("name");
        Text textS = fm.getDocumentoXML().createTextNode(person.getName()); //Ingresamos la info en xmlllllllllll
        namE.appendChild(textS); //
        user.appendChild(namE);
        
        Element profilE = fm.getDocumentoXML().createElement("profile");
        Text textPro = fm.getDocumentoXML().createTextNode(person.getProfile()); //Ingresamos la info en xmlllllllllll
        profilE.appendChild(textPro); //
        user.appendChild(profilE);
        
        Element idU = fm.getDocumentoXML().createElement("id");
        Text textID = fm.getDocumentoXML().createTextNode(id); //Ingresamos la info en xmlllllllllll
        idU.appendChild(textID); //
        user.appendChild(idU);
               
        fm.getDocumentoXML().getDocumentElement().appendChild(user); //pegamos el elemento hijo a la raiz
      
  fm.closeDocument();
        return true;
    }

    public boolean removeProgrammer(String id) {
        fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+pathDB+Separator.getSystemSeparator()+fileUsersOnHold);
        for(int i=0;i<fm.getDocumentoXML().getDocumentElement().getChildNodes().getLength();i++){
          
            if(fm.getDocumentoXML().getElementsByTagName("email") .item(i).getTextContent().equals(id)){
                fm.getDocumentoXML().getDocumentElement().removeChild(fm.getDocumentoXML().getDocumentElement().getChildNodes().item(i));
                fm.closeDocument();
                return true;
                
            }
            
        }
        
        return false;
        
    }
    
    public boolean isValidIdRegister(String user,String id){
       fm=new Facade_FileManagerXML();
        fm.leerXMLexistente(pathApp+Separator.getSystemSeparator()+pathDB+Separator.getSystemSeparator()+fileUsersOnHold);
        
        for(int i=0;i<fm.getDocumentoXML().getElementsByTagName("user").getLength();i++){
           
            PersonOnHoldDTO p=new PersonOnHoldDTO();
            p.setEmail(fm.getDocumentoXML().getElementsByTagName("email") .item(i).getTextContent());
            p.setPassword(fm.getDocumentoXML().getElementsByTagName("password").item(i).getTextContent());
            p.setType(fm.getDocumentoXML().getElementsByTagName("type").item(i).getTextContent());
            p.setName(fm.getDocumentoXML().getElementsByTagName("name").item(i).getTextContent());
            p.setProfile(fm.getDocumentoXML().getElementsByTagName("profile").item(i).getTextContent());System.out.println(p.getName());
            System.out.println(fm.getDocumentoXML().getElementsByTagName("id").item(i).getTextContent()+"   "+(p.equals(new PersonOnHoldDTO(null,null,user,null)) && fm.getDocumentoXML().getElementsByTagName("id").item(i).getTextContent().equals(id)));
            if(p.equals(new PersonOnHoldDTO(null,null,user,null)) && fm.getDocumentoXML().getElementsByTagName("id").item(i).getTextContent().equals(id))
                return true;
        }
        
        return false;
        
    }
    
}
