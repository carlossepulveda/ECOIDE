/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package IDE.ProjectsManager;

/**
 *
 * @author cas
 */
public class File {
    
    private String path;
    private String pack;
    private String name;
    private String type;

    public File(String path, String pack,String name,String type) {
        this.path = path;
        this.pack = pack;
        this.name=name;
        this.type=type;
    }

    public File() {
    }

    public String getPack() {
        return pack;
    }

    public void setPack(String pack) {
        this.pack = pack;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    
    public boolean equals(Object o){
    
        File x=(File)o;
        return x.getPath().equals(this.path);
    
    
    }

    @Override
    public String toString() {
        return this.pack+"."+this.name;
    }
    
}
