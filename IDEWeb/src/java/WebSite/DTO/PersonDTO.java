/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package WebSite.DTO;

/**
 *
 * @author cas
 */
public class PersonDTO {
    
    private String email;
    private String password;
    private String type;// programmer o administrator

    public PersonDTO() {
    }

    public PersonDTO(String email, String pass) {
        this.password = pass;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

  
    public boolean equals(Object o){
        
        PersonDTO p=(PersonDTO)o;
        return p.getEmail().equals(this.email);
        
    }
    
    
}
