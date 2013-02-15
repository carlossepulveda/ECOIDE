/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Util;

import FileManager.Control_FileManager;
import java.util.ArrayList;
import java.util.List;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

/**
 *
 * @author cas
 */
public class ConverterJSON {
    
    
    public String srcProjectXMLtoJSON(Document p,Document c,Document f){
        
        ArrayList<String> packs=new ArrayList<String>();
        String imgC="java.png";
        String imgCG="form.png";
        String imgF="file.png";
        String imgP="package.png";
        
        if(toHaveFile(c,f,"")){
             
            String namePack="";
            String pack="{\"tipo\":\"PackageNode\",\"imagen\":\""+imgP+"\", \"nombre\":\"Default Package\"";
            
            pack+=",\"ficheros\":[";
            
            int cf=0;
            for(int j=0;j<c.getDocumentElement().getChildNodes().getLength();j++){
                
                String a=",";
                if(cf==0)a="";
                
                if(namePack.equals(c.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("package").getTextContent())){
                    
                    String tc=c.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("type").getTextContent();
                    if(tc.equals("class"))                 
                       pack+=a+"{\"tipo\":\"ClassNode\", \"nombre\":\""+c.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("name").getTextContent()+"\",\"imagen\":\""+imgC+"\"}";
                    if(tc.equals("gui"))
                       pack+=a+"{\"tipo\":\"GUINode\", \"nombre\":\""+c.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("name").getTextContent()+"\",\"imagen\":\""+imgCG+"\"}"; 
                    
                    cf++;
                }
            }
            
            cf=0;
            if(c.getDocumentElement().getChildNodes().getLength()>0 && f.getDocumentElement().getChildNodes().getLength()>0)pack+=",";
            
            for(int j=0;j<f.getDocumentElement().getChildNodes().getLength();j++){
                
                String a=",";
                if(cf==0)a="";
                
                if(namePack.equals(f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("package").getTextContent())){                    
                    if(f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("type").getTextContent().equals(Control_FileManager.typeDoc))
                        imgF="txt.png";
                    if(f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("type").getTextContent().equals(Control_FileManager.typeFile))
                        imgF="file.png";
                    if(f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("type").getTextContent().equals(Control_FileManager.typeImage))
                        imgF="image.png";
                    if(f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("type").getTextContent().equals(Control_FileManager.typePdf))
                        imgF="pdf.png";
                    if(f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("type").getTextContent().equals(Control_FileManager.typeSound))
                        imgF="audio.png";
                    if(f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("type").getTextContent().equals(Control_FileManager.typeVideo))
                        imgF="video.png";
                    pack+=a+"{\"tipo\":\"FileNode\", \"nombre\":\""+f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("name").getTextContent()+"\",\"imagen\":\""+imgF+"\" , \"tipoFichero\":\""+f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("type").getTextContent()+"\"}";
                    cf++;
                }
                
            }
            
            
            pack+="]}";
            packs.add(pack);
        
        }
        
        for(int i=0;i<p.getDocumentElement().getChildNodes().getLength();i++){
           
            String namePack=p.getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("name").getTextContent();
            String pack="{\"tipo\":\"PackageNode\",\"imagen\":\""+imgP+"\", \"nombre\":\""+namePack+"\"";
            boolean hf=toHaveFile(c,f,namePack);
            if(hf)
                pack+=",\"ficheros\":[";
            
            int cf=0;
            for(int j=0;j<c.getDocumentElement().getChildNodes().getLength();j++){
                
                String a=",";
                if(cf==0)a="";
                
                if(namePack.equals(c.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("package").getTextContent())){
                    String tc=c.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("type").getTextContent();
                    if(tc.equals("class"))
                        pack+=a+"{\"tipo\":\"ClassNode\", \"nombre\":\""+c.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("name").getTextContent()+"\",\"imagen\":\""+imgC+"\"}";
                    if(tc.equals("gui"))
                        pack+=a+"{\"tipo\":\"GUINode\", \"nombre\":\""+c.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("name").getTextContent()+"\",\"imagen\":\""+imgCG+"\"}";
                    cf++;
                }
            }
            
            cf=0;
           if(c.getDocumentElement().getChildNodes().getLength()>0 && f.getDocumentElement().getChildNodes().getLength()>0)pack+=",";
            
            for(int j=0;j<f.getDocumentElement().getChildNodes().getLength();j++){
                
                String a=",";
                if(cf==0)a="";
                
                if(namePack.equals(f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("package").getTextContent())){                    
                    
                    if(f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("type").getTextContent().equals(Control_FileManager.typeDoc))
                        imgF="txt.png";
                    if(f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("type").getTextContent().equals(Control_FileManager.typeFile))
                        imgF="file.png";
                    if(f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("type").getTextContent().equals(Control_FileManager.typeImage))
                        imgF="image.png";
                    if(f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("type").getTextContent().equals(Control_FileManager.typePdf))
                        imgF="pdf.png";
                    if(f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("type").getTextContent().equals(Control_FileManager.typeSound))
                        imgF="audio.png";
                    if(f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("type").getTextContent().equals(Control_FileManager.typeVideo))
                        imgF="video.png";
                    pack+=a+"{\"tipo\":\"FileNode\", \"nombre\":\""+f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("name").getTextContent()+"\",\"imagen\":\""+imgF+"\" , \"tipoFichero\":\""+f.getDocumentElement().getChildNodes().item(j).getAttributes().getNamedItem("type").getTextContent()+"\"}";
                    
                    cf++;
                }
                
            }
            
            if(hf)
                pack+="]";
            pack+="}";
            packs.add(pack);
            
        }
                                                
        
       String answ="";
       for(int i=0;i<packs.size();i++){
           
           String a=",";
           if(i==0)a="";
           
           answ+=a+packs.get(i);
           
           
       }
        return answ;
        
    }

    private boolean toHaveFile(Document c, Document f,String pack) {
        for(int i=0;i<c.getDocumentElement().getChildNodes().getLength();i++){
        
            if(c.getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("package").getTextContent().equals(pack))
                return true;
            
        }
        for(int i=0;i<f.getDocumentElement().getChildNodes().getLength();i++){
        
            if(f.getDocumentElement().getChildNodes().item(i).getAttributes().getNamedItem("package").getTextContent().equals(pack))
                return true;
            
        }
        
        return false;
    }
    

    public String myProjectsXMLtoJSON(Document p){
    
        String json="{ \"Projects\" : [";
        
        NodeList nl=p.getDocumentElement().getChildNodes();
        for(int i=0;i<nl.getLength();i++){
            
            String x="";
            if(i!=0)x=",";
                
            json+=x+"{ \"name\": \""+p.getElementsByTagName("name").item(i).getTextContent() +"\" , \"owner\":\""+p.getElementsByTagName("owner").item(i).getTextContent()+"\" , \"type\": \""+p.getElementsByTagName("type").item(i).getTextContent()+"\" , \"shared\": \""+p.getElementsByTagName("shared").item(i).getTextContent()+"\" }";
            
        }
        
        json+="]}";
        return json;
    
    
    
    }
    
    public String programmersXMLtoJSON(Document p){
        String json="{ \"Programmers\" : [";
        
        NodeList nl=p.getDocumentElement().getChildNodes();
        for(int i=0;i<nl.getLength();i++){
            
            String x="";
            if(i!=0)x=",";
                
            json+=x+"{ \"email\": \""+p.getElementsByTagName("email").item(i).getTextContent() +"\","
                    + "\"name\": \""+p.getElementsByTagName("name").item(i).getTextContent() +"\","
                    + "\"profile\": \""+p.getElementsByTagName("profile").item(i).getTextContent() +"\","
                    + "\"photo\": \""+p.getElementsByTagName("photo").item(i).getTextContent() +"\", "
                    + "\"dateMembership\": \""+p.getElementsByTagName("dateMembership").item(i).getTextContent() +"\","
                    + "\"lastEntry\": \""+p.getElementsByTagName("lastEntry").item(i).getTextContent() +"\" }";
            
        }
        
        json+="]}";
        return json;
    
    
    
    }
    
    public String programmersOnHoldXMLtoJSON(Document p){
   
        String json="{ \"Programmers\" : [";
        
        NodeList nl=p.getDocumentElement().getChildNodes();
        for(int i=0;i<nl.getLength();i++){
            
            String x="";
            if(i!=0)x=",";
                
            json+=x+"{ \"email\": \""+p.getElementsByTagName("email").item(i).getTextContent() +"\","
                    + "\"name\": \""+p.getElementsByTagName("name").item(i).getTextContent() +"\"}";
            
        }
        
        json+="]}";
        return json;
    
    
    
    }
    
    public static String answsCompilerToJson(Document d){
        
        String r="{\"answ\": \""+d.getElementsByTagName("result").item(0).getAttributes().getNamedItem("answer").getTextContent()+"\"";
        
        for(int i=0;i<d.getElementsByTagName("diagnostic").getLength();i++){
            if(i==0)r+=", \"diagnostic\": [";
            String s=",";
            if(i==0)
                s="";
            
            r+=s+"{  \"message\": \""+d.getElementsByTagName("message").item(i).getTextContent().replace("'","") +"'\" ,"
                    + " \"line\": \""+d.getElementsByTagName("line").item(i).getTextContent()+"\" , "
                    + "\"kind\": \""+d.getElementsByTagName("kind").item(i).getTextContent()+"\" ,"
                    + " \"source\": \""+d.getElementsByTagName("source").item(i).getTextContent()+"\" "
                    + "}";
            
            if(i==d.getElementsByTagName("diagnostic").getLength()-1)
                r+="]";
            
        }
        
        System.out.println(r);
        return r+"}";
    }
    
    public static String formXMLtoJSON(Document d){
    
        d.getDocumentElement().getElementsByTagName("canvas").item(0).getChildNodes().item(0);
        
        String r="{\"form\": {\"height\": \""+d.getDocumentElement().getElementsByTagName("canvas").item(0).getChildNodes().item(0).getTextContent()+"\","
                            + "\"width\": \""+d.getDocumentElement().getElementsByTagName("canvas").item(0).getChildNodes().item(0).getTextContent()+"\"";
                   //         + "\"components\": [{}]";
        
        
        NodeList nl = d.getDocumentElement().getElementsByTagName("components").item(0).getChildNodes();
       
        for(int i=0;i<nl.getLength();i++){
           
            if(i==0)
                r+=",\"components\": [";
            
            NodeList nl2= nl.item(i).getChildNodes();
         
               for(int j=0;j<nl2.getLength();j++){
                   
                   if(j==0)
                      r+="{";
                   
                   String s=",";
                   if(j==0)s="";
                   
                   r+=s+"\""+nl2.item(j).getNodeName() +"\" : \""+nl2.item(j).getTextContent()+"\"";

                   if(j==nl2.getLength()-1)
                       r+="}";

               }
             
            if(i==nl.getLength()-1)
                r+="]";
            
           
        }
        
        r+="}}";
        
        return r;
    }
    
}
