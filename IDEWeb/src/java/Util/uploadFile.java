/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package Util;
import FileManager.Facade_FileManager;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javazoom.upload.*;
import java.util.Hashtable;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author cas
 */
public class uploadFile {


    private UploadBean upBean=new UploadBean();
    private HttpServletRequest request;
    UploadFile file=null;
    private String nombreCampoFile="";

    
    public uploadFile(HttpServletRequest request, String ruta, String campo) {
        this.request = request;
        this.nombreCampoFile=campo;
        try {
            this.upBean.setFolderstore(ruta);
        } catch (UploadException ex) {
            Logger.getLogger(uploadFile.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public boolean uploadFile()
    {
       
       try {
            if (!MultipartFormDataRequest.isMultipartFormData(this.request))
               return(false);
            MultipartFormDataRequest mrequest = new MultipartFormDataRequest(this.request);
            Hashtable files = mrequest.getFiles();
                if ( (files != null) && (!files.isEmpty()) )
                {
                    this.file = (UploadFile) files.get(this.nombreCampoFile);
                    if (this.file == null)
                        return(false);
                    upBean.store(mrequest, this.nombreCampoFile);
                    return(true);
                }
                else
                   return(false);
        } catch (UploadException ex) {
            Logger.getLogger(uploadFile.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(uploadFile.class.getName()).log(Level.SEVERE, null, ex);
        }
     return(false);
    }


    public String[] uploadFile(String nname,String[] extension,String[] noFile)
    {

       try {
            if (!MultipartFormDataRequest.isMultipartFormData(this.request))
               return null;

            MultipartFormDataRequest mrequest = new MultipartFormDataRequest(this.request);
            
            Hashtable files = mrequest.getFiles();
            
                if ( (files != null) && (!files.isEmpty()) )
                {
                    this.file = (UploadFile) files.get(this.nombreCampoFile);
                    if (this.file == null)
                        return null;
                  
                    String ext=Facade_FileManager.getReference().getExtension(this.file.getFileName());
                  
                    if(ext==null)return null;
                    nname=nname+"."+ext;
                    String[] names={this.file.getFileName(),nname};
        
                    if(extension!=null){
                        if(!Facade_FileManager.getReference().haveAnyExtension(nname,extension))return null;
                        if(!Facade_FileManager.getReference().haveAnyExtension(this.file.getFileName(),extension))return null;
                    }
                    if(noFile!=null){
                        if(Facade_FileManager.getReference().haveAnyExtension(nname,noFile))return null;
                        if(Facade_FileManager.getReference().haveAnyExtension(this.file.getFileName(),noFile))return null;
                    }
           
                    this.file.setFileName(nname);
                    upBean.store(mrequest, this.nombreCampoFile);     
                    return names;
                }
                else
                   return null;
        } catch (UploadException ex) {
            Logger.getLogger(uploadFile.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(uploadFile.class.getName()).log(Level.SEVERE, null, ex);
        }
     return null;
    }
    
public String getNombreCampoFile() {
        return nombreCampoFile;
    }

    public void setNombreCampoFile(String nombreCampoFile) {
        this.nombreCampoFile = nombreCampoFile;
    }

    public HttpServletRequest getRequest() {
        return request;
    }

    public void setRequest(HttpServletRequest request) {
        this.request = request;
    }

    public UploadBean getUpBean() {
        return upBean;
    }

    public String getTipoArchivo()
    {
            if(this.file==null)
                return ("Error no hay archivo subido");
            return (this.file.getContentType());
    }

    public String getNombreArchivo()
    {
        if(this.file==null)
                return ("Error no hay archivo subido");
            return (this.file.getFileName());

    }

    public String getSizeArchivo()
    {
        if(this.file==null)
                return ("Error no hay archivo subido");
            return (this.file.getFileSize()+" Bytes");
    }

}
