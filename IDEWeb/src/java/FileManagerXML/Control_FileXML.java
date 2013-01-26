/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package FileManagerXML;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import org.w3c.dom.*;
import javax.xml.parsers.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.*;
import org.xml.sax.SAXException;

/**
 *
 * @author cas
 */
public class Control_FileXML{
    
    private Document xml;//Documento XML
    private String url;//Ubicacion del archivo XML
    private boolean inMemory;//especifica si el archivo es guardado en memoria o en disco
    
    
    public Control_FileXML(String rootNode) throws ParserConfigurationException{
    
               DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
               DocumentBuilder builder = factory.newDocumentBuilder();
               DOMImplementation implementation = builder.getDOMImplementation();
               xml = implementation.createDocument(null, rootNode , null);
               xml.setXmlVersion("1.0"); // se asigna version al XML
               inMemory=true;
               
               ///url="pruebaMemoria.xml";
    
    }
    
   
    
    //En caso de que el archivo XML ya exista, el parametro rootNode es despreciado
    public Control_FileXML(String url,boolean existe,String rootNode) throws ParserConfigurationException, IOException, SAXException{
        
        this.url=url;
        this.inMemory=false;
           if(existe){//El fichero ya existe, hay que leerlo.
                                
                 DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
                 DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
                 xml = dBuilder.parse(new File(url));
                 xml.getDocumentElement().normalize();
                       
           }//fin del if
           
           else{
              
               DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
               DocumentBuilder builder = factory.newDocumentBuilder();
               DOMImplementation implementation = builder.getDOMImplementation();
               xml = implementation.createDocument(null, rootNode , null);
               xml.setXmlVersion("1.0"); // se asigna version al XML
               this.close();
           
           
           }//fin del else
          
    }
    
    public Control_FileXML() throws ParserConfigurationException{
    
            
    
    }
    public boolean cargar(){
    
        if(this.url==null)return false;
        if(this.url.isEmpty())return false;
     
               try{
                   
                 DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
                 DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
                 xml = dBuilder.parse(new File(url));
                 xml.getDocumentElement().normalize();
               
               }catch(Exception e){
                   System.out.println("Clase: "+this.getClass().toString()+" - Metodo: Cargar() - Error al intentar leer archivo XML :");
               }
           return true;
    
    }
    
   
    public void limpiar(){
    
        this.xml=null;
        this.url=null;
        this.inMemory=true;
        
    }
    
    
    
    //En caso de que el atributo padre sea null, se agrega como un nodo principal del documento.
    public boolean addChild(String nameLabel,String value,ArrayList<ParameterXML> parametros,Element padre){

        if(nameLabel==null) return false;
        if(value==null) return false;
        if(nameLabel.isEmpty()) return false;
        
        if(padre==null)
          return this.addChild(xml.getDocumentElement(), nameLabel, value, parametros,null);
        return this.addChild(padre, nameLabel, value, parametros,null);
      
    }
    
    //En caso de que el atributo padre sea null, se agrega como un nodo principal del documento.
    public boolean addChild(String nameLabel,String value,ArrayList<ParameterXML> parametros,Element padre,String id){

        if(nameLabel==null) return false;
        if(value==null) return false;
        if(nameLabel.isEmpty()) return false;
        
        if(padre==null)
          return this.addChild(xml.getDocumentElement(), nameLabel, value, parametros,id);
        return this.addChild(padre, nameLabel, value, parametros,id);
      
    }
    
    private boolean addChild(Element e, String nameLabel,String value, ArrayList<ParameterXML> parametros,String id){
       
        Element elemento = xml.createElement(nameLabel); //creamos un nuevo elemento
       
        if(parametros!=null){
        for(ParameterXML pxml: parametros){
        
                elemento.setAttribute(pxml.getName(), pxml.getValue());
        
        }
        }
        if(!value.isEmpty()){
        Text text = xml.createTextNode(value); //Ingresamos la info
        elemento.appendChild(text); //
        }
        e.appendChild(elemento); //pegamos el elemento hijo a la raiz
        if(!inMemory)
        this.close();
  
    return true;   
   }
    
    public boolean removeNode(Node n){
        if(n==null)return false;
         this.xml.removeChild(n);
        this.close();
        return true;
        
    }
    public Document getXML(){
        
        return xml;
    }
    
    public String getURL(){
    
        return url;
    }
    
    public boolean close(){
    
        try{
         
            Source source = new DOMSource(this.xml);
            Result result = new StreamResult(new java.io.File(this.url)); //nombre del archivo
            Result console= new StreamResult(System.out);
            Transformer transformer = TransformerFactory.newInstance().newTransformer();
            transformer.transform(source, result);
            transformer.transform(source, console);  
         
        }
        catch(Exception e){System.err.println("Clase: "+this.getClass()+" - Metodo: close - Error: "+e);return false;}
        
        return true;
    }

  
    public String getDocumentHowString(){
    
    
        try{
        
               
           DOMSource domSource = new DOMSource(this.xml);
       StringWriter writer = new StringWriter();
       StreamResult result = new StreamResult(writer);
       TransformerFactory tf = TransformerFactory.newInstance();
       Transformer transformer = tf.newTransformer();
       transformer.transform(domSource, result);
       return writer.toString();
        
        }catch(Exception e){return null;}
    
    
    }
    public boolean concatenate(Document xml){
        
        NodeList nl=xml.getDocumentElement().getChildNodes();
        for(int i=0;i<nl.getLength();i++){
            
            this.xml.appendChild(nl.item(i));
            
        }
        return true;
    }

       
    public void setDocument(Document d){this.xml=d;}
    public void setURL(String url){this.url=url;}
    
}
