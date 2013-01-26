/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package IDE.Compiler;

import org.w3c.dom.Document;

/**
 *
 * @author cas
 */
public class Facade_Compiler {
    
    private Control_Compiler myControlCompiler;
    
    public Facade_Compiler(){
        
        myControlCompiler=new Control_Compiler();
    }
    
    public Document compileProject(String pathSRC,Document sourceXML,String pathLib,Document libXML, String outputFolder,boolean hidePath,String pathHide){
       
        return myControlCompiler.compileProject(pathSRC, sourceXML,pathLib, libXML, outputFolder,hidePath,pathHide);
        
    }
    
     public Document compileProjectToWeb(String pathClassProject,Document javaFiles,
                                                String patheLib, Document libs,
                                                String pathWebConsoleLib, Document classWebClib,
                                                String generateClass,
                                                String pathOut,String pathHide,String nameClassGenerate){
         
         return myControlCompiler.compileProjectToWeb(pathClassProject, javaFiles, patheLib, libs, pathWebConsoleLib, classWebClib, generateClass, pathOut,pathHide, nameClassGenerate);
     }

 
}
