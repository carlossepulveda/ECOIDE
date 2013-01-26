package $_p_a_c_k_$_R_e_d_i_r_e_c_t_$_p_a_c_k_$;
    

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import javax.swing.JOptionPane;

/**
 *
 * @author CaS
 */
public class FlujoEntrada extends InputStream{



    public FlujoEntrada(){}

    boolean activo=false;
    public int read() throws IOException {

      int x=Integer.valueOf(JOptionPane.showInputDialog(null,"Digite entrada"));
       
       return x;
    }

    public void setActivo(boolean isActivo){
        this.activo=isActivo;

    }

}
