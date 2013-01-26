/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package FileManagerXML;

import java.io.IOException;
import java.util.ArrayList;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

/**
 *
 * @author cas
 */
public class Facade_FileManagerXML{
    
    private Control_FileXML fileXML;
    
    public Facade_FileManagerXML(){
    
        try{
        fileXML=new Control_FileXML();}catch(Exception e){}
    }
    
    public boolean leerXMLexistente(String ruta){
    
        try{
           
        fileXML=new Control_FileXML(ruta,true,null);
        return true;
        
       }catch(Exception e){
       
           System.out.println("Clase: "+this.getClass()+" - Metodo: leerXMLexistente(ruta,rootNode) - Error: "+e.getMessage());
           return false;
           
       }
        
    }
    
    public boolean crearXMLnuevo(String ruta,String rootNode){
    
       try{
           
        fileXML=new Control_FileXML(ruta,false,rootNode);
        return true;
        
       }catch(Exception e){
       
           System.out.println("Clase: "+this.getClass()+" - Metodo: crearXMLnuevo(ruta,rootNode) - Error: "+e.getMessage());
           return false;
           
       }
               
    }
    public boolean crearXMLinMemory(String rootNode){
    
        
        try{
           
        fileXML=new Control_FileXML(rootNode);
        return true;
        
       }catch(Exception e){
       
           System.out.println("Clase: "+this.getClass()+" - Metodo: crearXMLinMemory(rootNode) - Error: "+e.getMessage());
           return false;
           
       }
        
    }
    
    public Document getDocumentoXML(){
        
        return this.fileXML.getXML();
        
    }
    
    public boolean cargar(){
    
        return this.fileXML.cargar();
        
    }
    
    public void limpiar(){
        
       if(this.fileXML!=null) this.fileXML.limpiar();
        
    }
    
    public boolean closeDocument(){
        
        return this.fileXML.close();
        
    }

    public String getDocumentHowString(){
    
        return this.fileXML.getDocumentHowString();
    }
    public String getURL_XML() {
        return this.fileXML.getURL();
    }
    
    public boolean addChild(String nameLabel,String value,ArrayList<ParameterXML> parametros,Element padre){
    
        return this.fileXML.addChild(nameLabel, value, parametros, padre);
    
    }
    
    public boolean addChild(String nameLabel,String value,ArrayList<ParameterXML> parametros,Element padre,String id){
    
        return this.fileXML.addChild(nameLabel, value, parametros, padre,id);
    
    }

    public boolean removeNode(Node n) {
        return this.fileXML.removeNode(n);
    }

    public boolean concatenate(Document xml){
        return this.fileXML.concatenate(xml);
    }
    
    public void setDocument(Document d){this.fileXML.setDocument(d);}
    public void setURL(String url){this.fileXML.setURL(url);
    }
}
