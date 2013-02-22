/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package WebSite;

import FileManager.Facade_FileManager;
import Util.Random;
import Util.SendMail;
import Util.Separator;
import java.util.ArrayList;
import java.util.ResourceBundle;
import javax.servlet.http.HttpServletRequest;
import org.w3c.dom.Document;

/**
 *
 * @author cas
 */
public class Control_WebSite {
    
    private Person myPerson;
    private String pathApp;
    private String server;
    private String pageMailActivation;
    private String matchFileNodeJS;
    private String pathPhotoProgrammerDefault;
    private String mail;
    private String passMail;
	private String contenidoHtmlCorreo;
    
    public Control_WebSite(String pathApp){
         System.out.println("control web site: "+pathApp);
        this.pathApp=pathApp;
        myPerson=new Person(pathApp);
        
        ResourceBundle properties = ResourceBundle.getBundle("Properties.WebSiteProperties");
        server=properties.getString("server");
        pathPhotoProgrammerDefault=properties.getString("photoDefaultUser");
        mail=properties.getString("email");
        passMail=properties.getString("passEmail");
		contenidoHtmlCorreo=properties.getString("htmlCorreo");
        
        properties = ResourceBundle.getBundle("Properties.RegisterUserProperties");
        pageMailActivation=properties.getString("page");
        
        properties = ResourceBundle.getBundle("Properties.MatchFolderProperties");
        matchFileNodeJS=properties.getString("path");
    }
    
    public boolean isValidPerson(String email,String pass){
        
        return myPerson.isValidPerson(email, pass);
    }
    
    public boolean isValidAdmin(String email,String pass){
        return myPerson.isValidAdmin(email, pass);
    }
    
    public boolean closeSession(String user){
        return myPerson.closeSession(user);
    }
    
    public boolean openSession(String user,String id,String typeUser){
        if(myPerson.openSession(user,id,typeUser)){
            
            String text=Facade_FileManager.getReference().readFilePlain(this.pathApp+Separator.getSystemSeparator()+this.matchFileNodeJS);
            String[] session=text.split(";");
            for(int i=0;i<session.length;i++){
                
                String []us=session[i].split(":");
                if(user.equals(us[0])){
                    session[i]=us[0]+":"+id;
                }
                
            }
            
            String text2="";
            for(String x: session){
                text2+=x+";";
            }
            ArrayList<String> ar=new ArrayList<String>();
            ar.add(text2);
            Facade_FileManager.getReference().writeFile(this.pathApp+Separator.getSystemSeparator()+this.matchFileNodeJS, ar);
            return true;
        }
        return false;
    }
    
    public boolean isValidSession(String user,String id){
         return myPerson.isValidSession(user, id);
     }
    
    public boolean createProgrammer(String id){
        if(myPerson.createProgrammer(id,pathPhotoProgrammerDefault)){
            String text=Facade_FileManager.getReference().readFilePlain(this.pathApp+Separator.getSystemSeparator()+this.matchFileNodeJS);
            text+=id+":*.*;";
            ArrayList<String> ar=new ArrayList<String>();
            ar.add(text);
            Facade_FileManager.getReference().writeFile(this.pathApp+Separator.getSystemSeparator()+this.matchFileNodeJS, ar);
            return true;
        }
        return  false;
    }
    
    public Document getProgrammers(){
         return myPerson.getProgrammers();
     }
    
    public Document getProgrammersOnHold() {
        return myPerson.getProgrammersOnHold();
    }
     
    public Document getProjects(){
        return myPerson.getProjects();
    }
    
    public Document getProjectsShared(){
        return myPerson.getProjectsShared();
    }
    
    public Document getProgrammerProjectsXML(String user){
         
        return myPerson.getProgrammerProjectsXML(user);
        
     }
    
    public Document getProgrammerProjectsXML_Filtered(String user,int filter){
        
        return myPerson.getProgrammerProjectsXML_Filtered(user, filter);
    }
    
    public Document getProgrammerDataXML(String user){
         
        return myPerson.getProgrammerDataXML(user);
        
     }
    
    public boolean registerProgrammer(String id,String name,String profile,String password){
        if(myPerson.getPersonOnHold(id)!=null)return false;
        if(myPerson.getPerson(id)!=null)return false;
        String ran=Random.getRandom(50);
        if(myPerson.registerProgrammer(id, name, profile, password,ran)){
            SendMail mail=new SendMail("74.125.134.109","587",this.mail,this.passMail);
			String tmp=contenidoHtmlCorreo;
			tmp=tmp.replace("@titulo","Correo de Activación de Cuenta");
			tmp=tmp.replace("@contenido","ECO IDE  ha registrado temporalmente su cuenta, pero es necesario completar su registro. A través del siguiente enlace podrá activar su cuenta: <a href='http://"+server+"/"+pageMailActivation+"?email="+id+"&id="+ran+"'>De click para activar</a>.");
            try{
                mail.sendMail(this.mail,id,"Confirmacion cuenta IDE", tmp,true,null);
            }
            catch(Exception e){
                System.err.print("Error al intentar enviar email: "+e.toString());
            }
            return true;
        }
        return false;
    }

    public boolean restorePassUser(String id,String np){
        return myPerson.restorePassUser(id, np);
    }
    
    public boolean registerProject(String name, String user,String owner,String type) {
        return myPerson.registerProject(name,user,owner,type);
    }
    
    public boolean deleteProject(String name,String owner,Document users,String user){
        return myPerson.deleteProject(name,owner,users,user);
    }

    public boolean isValidIdRegister(String user, String id) {
        
        return myPerson.isValidIdRegister(user,id);
        
    }

    public boolean renameProject(String name, String owner, String newName,Document users) {
        return myPerson.renameProject(name,owner,newName,users);
    }

    public String getPathProjectsUsersFolder(String nameUser) {
        return myPerson.getPathProjectsUsersFolder(nameUser);
    }

    public String[] uploadTemporal(String user, HttpServletRequest request, String field,String[] extension,String[] noExtension) {
        return myPerson.uploadTemporal(user,request,field,extension,noExtension);
    }
    
    public String uploadPhoto(String user, HttpServletRequest request, String field,String[] extension,String[] noExtension) {
        return myPerson.uploadPhoto(user,request,field,extension,noExtension);
    }

    public boolean createTemporalFolder(String user,String name){
        return myPerson.createTemporalFolder(user, name);
    }
    
    public boolean deleteTemporalFolder(String user,String name){
        return myPerson.deleteTemporalFolder(user, name);
        
    }
    
    public String getPathTemporalUserFolder(String nameUser) {
       
        return myPerson.getPathTemporalUserFolder(nameUser);
        
    }

    public boolean deleteTemporalFile(String user, String file) {
        return myPerson.deleteTemporalFile(user,file);
    }
    
    public boolean shareProject(String name,String owner,String user,String type,Document users){
        return myPerson.shareProject(name,owner,user,type,users);
        
    }
    public boolean deleteUserProject(String name, String owner, String user) {
        
        return myPerson.deleteUserProject(name,owner,user);
    }

    public boolean haveMyProject(String name, String user) {
        return myPerson.haveMyProject(name,user);
    }

    public boolean changeUserPrivilege(String name, String owner, String user, String type) {
        return myPerson.changeUserPrivilege(name,owner,user,type);
    }

    public boolean deleteProgrammer(String email) {
        if(myPerson.deleteProgrammer(email)){
           try{
              SendMail mail=new SendMail("74.125.134.109","587",this.mail,this.passMail);
			  String tmp=contenidoHtmlCorreo;
			  tmp=tmp.replace("@titulo","Correo de Eliminación");
			  tmp=tmp.replace("@contenido","Su cuenta en ECO IDE ha sido eliminada. Para mayor información contactese con el Administrador");
         
              mail.sendMail(this.mail,email,"Su cuenta en ECO IDE ha sido eliminada",tmp,true,null);
        
            return true; 
           } catch(Exception e){
               System.out.println("Clase : Control_WebSite  -  Metodo : deleteProgrammer(String email) -  Error : "+e.getMessage());
           }
        }
        return false;
    }

    public boolean deleteProgrammerOnHold(String email) {
        if(myPerson.deleteProgrammerOnHold(email)){
            try{
				SendMail mail=new SendMail("74.125.134.109","587",this.mail,this.passMail);
				String tmp=contenidoHtmlCorreo;
				tmp=tmp.replace("@titulo","Correo de Eliminación");
				tmp=tmp.replace("@contenido","Su cuenta en ECO IDE temporal ha sido eliminada. Para mayor información contactese con el Administrador");
         
                mail.sendMail(this.mail,email,"Su cuenta en espera ECO IDE ha sido eliminada", tmp,true,null);
        
            return true; 
           } catch(Exception e){
               System.out.println("Clase : Control_WebSite  -  Metodo : deleteProgrammerOnHold(String email) -  Error : "+e.getMessage());
           }
        }
        return false;
    }

    public Document getProgrammerByEntry(String d, String m, String a) {
       return this.myPerson.getProgrammerByEntry(d,m,a);
    }

    public void changeProjectToNoShared(String name, String owner) {
        this.myPerson.changeProjectToNoShared(name,owner);
    }

    public boolean getPassToEmail(String user) {
        if(this.myPerson.getPerson(user)==null){
            return false;
        }
        
        String pass=this.myPerson.getPass(user);
        SendMail mail=new SendMail("74.125.134.109","587",this.mail,this.passMail);
            try{
				String tmp=contenidoHtmlCorreo;
				tmp=tmp.replace("@titulo","Restablecer Contraseña");
				tmp=tmp.replace("@contenido","ECO IDE ha detectado una solicitud de restablece contraseña. <h3>Su contraseña es: </h3> "+pass+"<br/>");
                mail.sendMail(this.mail,user,"Solicitud de contraseña IDE", tmp ,true,null);
                return true;
            }
            catch(Exception e){
                 System.out.println("Clase : Control_WebSite  -  Metodo : getPassToEmail(String user) -  Error : "+e.getMessage());
            }
        return false;
    }

    public boolean existUser(String email) {
        return this.myPerson.existUser(email);
    }

  
}
