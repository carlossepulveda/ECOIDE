/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package FileManagerXML;

import java.util.ArrayList;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

/**
 *
 * @author cas
 */
public interface Interface_FileManagerXML {
    
    
    public boolean cargar();
    public void limpiar();
    public Document getDocumentoXML();
    public String getURL_XML();
    public boolean closeDocument();
    public boolean leerXMLexistente(String ruta);
    public boolean crearXMLnuevo(String ruta,String rootNode);
    public boolean addChild(String nameLabel,String value,ArrayList<ParameterXML> parametros,Element padre);
}
