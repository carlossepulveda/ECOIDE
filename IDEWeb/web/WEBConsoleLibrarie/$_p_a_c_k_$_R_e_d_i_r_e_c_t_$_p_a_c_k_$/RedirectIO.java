package $_p_a_c_k_$_R_e_d_i_r_e_c_t_$_p_a_c_k_$;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



/**
 *
 * @author CaS
 */


import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.PrintStream;

public class RedirectIO
{

    PrintStream orgStream ;
    PanelEjecucion pe;

         public RedirectIO(){

        pe=new PanelEjecucion();
        orgStream=System.out;
    }
         public PanelEjecucion getPanelEjecucion(){return this.pe;}
         public void setSalida(){}
         public FlujoEntrada moverFlujo()
	{
           
		PrintStream fileStream 	= null;
                InputStream fileEntrada =null;
                SalidaCarlos sc=null;
                FlujoEntrada fc=null;
		try
		{
			
		
                        fc=new FlujoEntrada();
                        sc=new SalidaCarlos(this.pe);
			// Redirecting console output to file

                        System.setOut(sc);

                        // Redirecting runtime exceptions to file
	


                        
                        System.setIn(fc);
			//throw new Exception("Test Exception");


		}
		catch (FileNotFoundException fnfEx)
		{
			System.out.println("Error in IO Redirection");
			fnfEx.printStackTrace();
		}
		catch (Exception ex)
		{
			//Gets printed in the file
			System.out.println("Redirecting output & exceptions to file");
			ex.printStackTrace();
		}
		return fc;

	}
         public void flujoDefault(){
            //Restoring back to console
			System.setOut(this.orgStream);
			//Gets printed in the console
			System.out.println("Redirecting file output back to console");
                        System.out.println("carlos prueba de salida por System");
        }


















        public static void main(String [] args){
        RedirectIO rd=new RedirectIO();
       // rd.moverFlujo();
        rd.flujoDefault();
        System.out.println("holaa mundo");

        }
}
