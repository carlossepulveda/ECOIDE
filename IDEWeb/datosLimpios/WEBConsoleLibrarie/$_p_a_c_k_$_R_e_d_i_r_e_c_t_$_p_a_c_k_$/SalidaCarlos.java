package $_p_a_c_k_$_R_e_d_i_r_e_c_t_$_p_a_c_k_$;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import javax.swing.JTextArea;


/**
 *
 * @author CaS
 */



/**
 *
 * @author CaS
 */
public class SalidaCarlos extends PrintStream{

    ArrayList<String> salida=new ArrayList<String>();
    PanelEjecucion pe;
   

public SalidaCarlos(PanelEjecucion pe) throws FileNotFoundException {
    
       super(new OutputStream() {

            @Override
            public void write(int i) throws IOException {
                throw new UnsupportedOperationException("Not supported yet.");
            }
        });

        this.pe=pe;

}

    public void write(byte[] bytes) throws IOException {
       
    }

    @Override
    public void println(String string) {
        this.pe.addSalida("\n"+string);
      
      }

    @Override
    public void print(String string) {
         this.pe.addSalida(string);
    }









}
