/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package FileManagerXML;

/**
 *
 * @author cas
 */
public class ParameterXML {
    
    private String name;
    private String value;
    
    public ParameterXML(String name,String value){
    
        this.name=name;
        this.value=value;
    
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
    
    
    
}
