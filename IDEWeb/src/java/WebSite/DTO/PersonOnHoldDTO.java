/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package WebSite.DTO;

/**
 *
 * @author cas
 */
public class PersonOnHoldDTO extends PersonDTO{
    
    private String name;
    private String profile;

    public PersonOnHoldDTO(String name, String profile, String email, String pass) {
        super(email, pass);
        this.name = name;
        this.profile = profile;
    }

    public PersonOnHoldDTO() {
        super();
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    @Override
    public boolean equals(Object o) {
        return super.equals(o);
    }

   
   
    
    
}
