/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package IDE.Compiler;

import FileManagerXML.Facade_FileManagerXML;
import FileManagerXML.ParameterXML;
import Util.Separator;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Locale;
import javax.tools.Diagnostic;
import javax.tools.DiagnosticCollector;
import javax.tools.JavaCompiler;
import javax.tools.JavaFileObject;
import javax.tools.SimpleJavaFileObject;
import javax.tools.StandardJavaFileManager;
import javax.tools.ToolProvider;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.w3c.dom.Text;

/**
 *
 * @author cas
 */
public class Control_Compiler {
    
    
      private Facade_FileManagerXML controlFileManagerXML;
      
    
    public Control_Compiler(){
        
        controlFileManagerXML=new Facade_FileManagerXML();

    }
    
    public Document compileProject(String pathSRC,Document sourceXML,String pathLib,Document libXML, String outputFolder,boolean hidePath,String pathHide){
      

        
        String[] classes=new String[sourceXML.getDocumentElement().getChildNodes().getLength()];
        int op=4;
        String[] options=new String[op];
        options[0]="-d";
        options[1]=outputFolder;
        
        
        NodeList nl=libXML.getDocumentElement().getChildNodes();

        for(int i=0;i<nl.getLength();i++){
            if(i==0){
                options[2]="-cp";
                options[3]="";
            }
           String aux="";
            if(i!=nl.getLength()-1)aux=Separator.getJARCompilerSeparator();

            options[3] += pathLib+Separator.getSystemSeparator()+nl.item(i).getAttributes().getNamedItem("name").getTextContent()+aux;
        }
       
        nl=sourceXML.getDocumentElement().getChildNodes();
        for(int i=0;i<nl.getLength();i++){
            
            classes[i]= pathSRC+Separator.getSystemSeparator()+nl.item(i).getAttributes().getNamedItem("path").getTextContent();
            
        }
        
        return this.compile(classes,options,pathSRC,hidePath,pathHide);
        
    }

    /*
     * Recibe dos paramentros : target y destino
     * folder representa la direccion del folder donde se encuentran las clases a compilar
     * destino representa la direccion del folder donde se almacenaran los archivos .class generados
     *
     * retorna un String con el resultado de la compilacion
     */
    private Document compile(String[] classes,String[] options,String pathSRC,boolean hidePath,String pathHide){
     System.out.println("Metodo compile");
      this.controlFileManagerXML.limpiar();
      this.controlFileManagerXML.crearXMLinMemory("Compilation");
      ArrayList<ParameterXML> ps=new ArrayList<ParameterXML>(); 
       
      try{
          System.out.println("Arranco try");
         JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();System.out.println("Pidio el compilador delsistema: "+compiler);
         DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<JavaFileObject>();
         StandardJavaFileManager fileManager = compiler.getStandardFileManager(diagnostics, null, null);
         Iterable<? extends JavaFileObject> compilationUnits = fileManager
        .getJavaFileObjectsFromStrings(Arrays.asList(classes));
   System.out.println(Arrays.asList(options));
         JavaCompiler.CompilationTask task =
         compiler.getTask(null, fileManager, diagnostics, Arrays.asList(options) , null, compilationUnits);
          
         if(task.call()){
              
              ps.add(new ParameterXML("answer","true"));
              this.controlFileManagerXML.addChild("result","", ps, null);
                        
          }
        
         else{             
             ps.add(new ParameterXML("answer","false"));
             this.controlFileManagerXML.addChild("result","", ps, null);            
       
         }
         
         for (Diagnostic d : diagnostics.getDiagnostics()) {
           
                                   
            Element diagnostic = this.controlFileManagerXML.getDocumentoXML().createElement("diagnostic"); //creamos un nuevo elemento en el XMLLLL

            Element message = this.controlFileManagerXML.getDocumentoXML().createElement("message");
            String msj = d.getMessage(null).replaceAll("<", " ");
            msj = msj.replaceAll(">"," ");System.out.println("mensaje : "+d.getMessage(Locale.FRENCH));
            Text textE = this.controlFileManagerXML.getDocumentoXML().createTextNode(msj); //Ingresamos la info en xmlllllllllll
            message.appendChild(textE); //
            diagnostic.appendChild(message);

            Element line = this.controlFileManagerXML.getDocumentoXML().createElement("line");
            Text textP = this.controlFileManagerXML.getDocumentoXML().createTextNode(""+d.getLineNumber()); //Ingresamos la info en xmlllllllllll
            line.appendChild(textP); //
            diagnostic.appendChild(line);
            
            Element kind= this.controlFileManagerXML.getDocumentoXML().createElement("kind");
            Text textK = this.controlFileManagerXML.getDocumentoXML().createTextNode(d.getKind().name()); //Ingresamos la info en xmlllllllllll
            kind.appendChild(textK); //
            diagnostic.appendChild(kind);
            
            JavaFileObject jfo=(JavaFileObject)d.getSource();
            String source=jfo.toUri().getPath();
            if(hidePath)
                source=source.replace(pathSRC, pathHide);
            
            
            Element sourcE= this.controlFileManagerXML.getDocumentoXML().createElement("source");
            Text textS = this.controlFileManagerXML.getDocumentoXML().createTextNode(source); //Ingresamos la info en xmlllllllllll
            sourcE.appendChild(textS); //
            diagnostic.appendChild(sourcE);

            this.controlFileManagerXML.getDocumentoXML().getDocumentElement().appendChild(diagnostic);
      
   
        }
       
       }catch(Exception e){
           
           System.out.println("Clase : Control_Compiler  -  Metodo : compile(String[] classes,String[] options,String pathSRC,boolean hidePath,String pathHide) -  Error : "+e.getMessage());
           ps.add(new ParameterXML("answer","error"));
           this.controlFileManagerXML.addChild("result",null, ps, null);
           
       }
     
      return controlFileManagerXML.getDocumentoXML();
    }


    public Document compileProjectToWeb(String pathClassProject,Document javaFiles,
                                                String pathLib, Document libs,
                                                String pathWebConsoleLib, Document classWebClib,
                                                String generateClass,
                                                String pathOut,String pathHide,String nameClassGenerate){
        
        
        NodeList nl=javaFiles.getDocumentElement().getChildNodes();
    
        ArrayList<File> acom=new ArrayList<File>();
        for(int i=0;i<nl.getLength();i++){
            
            acom.add(new File(pathClassProject+Separator.getSystemSeparator()+nl.item(i).getAttributes().getNamedItem("path").getTextContent()));
            
        }
        nl=classWebClib.getDocumentElement().getChildNodes();
        for(int i=0;i<nl.getLength();i++){
            
            acom.add(new File(pathWebConsoleLib+Separator.getSystemSeparator()+nl.item(i).getAttributes().getNamedItem("path").getTextContent()));
            
        }
        StringBuilder contents = new StringBuilder(generateClass);
        
        JavaFileObject so = null;
        try
        {
            so = new InMemoryJavaFileObject(nameClassGenerate, contents.toString());
         System.out.println("Creo el InMemoryJAvaFileObject");
        }
        catch (Exception exception)
        {
            System.out.println("Excepcion de la clase Executer, en el metodo compile");
            exception.printStackTrace();
        }
        
       JavaCompiler compiler = javax.tools.ToolProvider.getSystemJavaCompiler();
       System.out.println("Creo el javaCompiler");
       DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<JavaFileObject>();
       System.out.println("Creo el almacen de diagnostico");
       StandardJavaFileManager fileManager = null;
        
       try{
           fileManager = compiler.getStandardFileManager(diagnostics, Locale.FRENCH, null);
       }catch(Exception e ){System.out.println("Error al crear el manejador de archivos "+e.getMessage());}
       
       
       
       
       ArrayList<JavaFileObject> acM=new ArrayList<JavaFileObject>();
        acM.add(so);
         System.out.println("Ya creo el array de acompilar y agrego la clase creada "+compiler);
        Iterable<? extends JavaFileObject> compilationUnits =compiler.getStandardFileManager(null,null,null).getJavaFileObjectsFromFiles(acom);
        Iterator f=compilationUnits.iterator();
        while(f.hasNext()){
            acM.add((JavaFileObject)f.next());
        }
       
       for(JavaFileObject fo: acM){
           System.out.println("javaf : "+fo.getName());
       }
        
       
       
       /***************************************************************************************/
     
        int op=4;
        String[] options=new String[op];
        options[0]="-d";
        options[1]=pathOut;
        
        
        NodeList nlL=libs.getDocumentElement().getChildNodes();
        options[2]="-cp";
        for(int i=0;i<nlL.getLength();i++){
            String aux="";
            if(i!=nlL.getLength()-1)aux=Separator.getJARCompilerSeparator();
            options[3]=pathLib+Separator.getSystemSeparator()+nlL.item(i).getAttributes().getNamedItem("name").getTextContent()+aux;
        }
       
        Iterable optionsI = Arrays.asList(options);//"-d", pathOut,"-cp",pathLib+Separator.getSystemSeparator()+"AbsoluteLayout.jar");
        //Arrays.asList(un array string )
        
        
        
        
        
        /**************************************************************************************/
        
        
        JavaCompiler.CompilationTask task = compiler.getTask(null, fileManager,
                                                          diagnostics, optionsI, null,
                                                             acM);
        
        this.controlFileManagerXML.limpiar();
        this.controlFileManagerXML.crearXMLinMemory("Compilation");
        ArrayList<ParameterXML> ps=new ArrayList<ParameterXML>(); 
        if(task.call()){
            ps.add(new ParameterXML("answer","true"));
              this.controlFileManagerXML.addChild("result","", ps, null);
        }else{
            ps.add(new ParameterXML("answer","false"));
             this.controlFileManagerXML.addChild("result","", ps, null); 
        }
       
        for (Diagnostic d : diagnostics.getDiagnostics()) {
          
                                   
            Element diagnostic = this.controlFileManagerXML.getDocumentoXML().createElement("diagnostic"); //creamos un nuevo elemento en el XMLLLL

            Element message = this.controlFileManagerXML.getDocumentoXML().createElement("message");
            Text textE = this.controlFileManagerXML.getDocumentoXML().createTextNode(d.getMessage(null)); //Ingresamos la info en xmlllllllllll
            message.appendChild(textE); //
            diagnostic.appendChild(message);

            Element line = this.controlFileManagerXML.getDocumentoXML().createElement("line");
            Text textP = this.controlFileManagerXML.getDocumentoXML().createTextNode(""+d.getLineNumber()); //Ingresamos la info en xmlllllllllll
            line.appendChild(textP); //
            diagnostic.appendChild(line);
            
            Element kind= this.controlFileManagerXML.getDocumentoXML().createElement("kind");
            Text textK = this.controlFileManagerXML.getDocumentoXML().createTextNode(d.getKind().name()); //Ingresamos la info en xmlllllllllll
            kind.appendChild(textK); //
            diagnostic.appendChild(kind);
            
            String source=d.getSource().toString();
            source=source.replace(pathClassProject, pathHide);
            
            Element sourcE= this.controlFileManagerXML.getDocumentoXML().createElement("source");
            Text textS = this.controlFileManagerXML.getDocumentoXML().createTextNode(source); //Ingresamos la info en xmlllllllllll
            sourcE.appendChild(textS); //
            diagnostic.appendChild(sourcE);

            this.controlFileManagerXML.getDocumentoXML().getDocumentElement().appendChild(diagnostic);
            
   
        
   
        }
       
       Document dd=controlFileManagerXML.getDocumentoXML();
       controlFileManagerXML.limpiar();
   
        return dd;
        
        
        
        
    }
    
    
    
    
      /** java File Object represents an in-memory java source file <br>
     * so there is no need to put the source file on hard disk  **/
    public static class InMemoryJavaFileObject extends SimpleJavaFileObject
    {
        private String contents = null;

        public InMemoryJavaFileObject(String className, String contents) throws Exception
        {
            super(URI.create("string:///" + className.replace('.', '/')
                             + Kind.SOURCE.extension), Kind.SOURCE);
            this.contents = contents;
        }

        public CharSequence getCharContent(boolean ignoreEncodingErrors)
                throws IOException
        {
            return contents;
        }
    }
   
}
