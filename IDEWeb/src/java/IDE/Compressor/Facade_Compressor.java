/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package IDE.Compressor;

import java.util.ArrayList;
import org.w3c.dom.Document;

/**
 *
 * @author cas
 */
public class Facade_Compressor {
    
    private Control_Compressor myControlCompressor;
    
    public Facade_Compressor(){
        
        myControlCompressor=new Control_Compressor();
    }
    
    public boolean buildJAR(String pathClass,Document classes,String pathFiles,Document files,String nameJAR,String pathOut){
       
        return myControlCompressor.buildJAR(pathClass, classes, pathFiles, files, nameJAR, pathOut);
    }
    
    public boolean buildJAR(String folderSOURCE,String pathFiles, Document files, String nameJAR,String pathOut){
        
        return myControlCompressor.buildJAR(folderSOURCE, pathFiles, files, nameJAR, pathOut);
    }
    
    public boolean buildExecutableJAR(String folderSOURCE,String pathFiles, Document files, String nameJAR,String pathOut,String pathMANIFEST){
        return myControlCompressor.buildExecuteJAR(folderSOURCE, pathFiles, files, nameJAR, pathOut,pathMANIFEST);
    }
    
    public boolean generateZIP(ArrayList<String[]> folders,String parentFolder,String fdestino,String JarName){
        return myControlCompressor.generateZIP(folders,parentFolder, fdestino, JarName);
    }
}
