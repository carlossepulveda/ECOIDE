/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package IDE.ProjectsManager;

/**
 *
 * @author cas
 */
public class Class {
    
    private String packageName;
    private String name;
    private String path;
    private String type;//class,gui.
    
    public Class(){}
    public Class(String packageName,String name,String path,String type){
    
        this.packageName=packageName;
        this.name=name;
        this.path=path;
        this.type=type;
    
    
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
        
    public boolean equals(Object o){
        Class c=(Class)o;
        return c.getName().equals(this.name) && c.getPackageName().equals(this.packageName);
    }

    @Override
    public String toString() {
        return packageName + "." + name ;
    }
    
}
