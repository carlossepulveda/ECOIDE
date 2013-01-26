/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package IDE.ProjectsManager;

/**
 *
 * @author cas
 */
public class User {
    
    private String email;
    private String type;

    public User() {
    }

    public User(String email,String type) {
        this.email=email;
        this.type=type;
    }
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public boolean equals(Object o){
        User u =(User)o;
        return u.getEmail().equals(this.email);
    }
    
    public String toString(){
        return this.email;
    }
    
    
}
