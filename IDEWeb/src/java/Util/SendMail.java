package Util;

import java.io.File;
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;

/**
 *
 * @author HUESPED
 */
public class SendMail {

    private String smtpHost;
    private String puerto;
    private String mailBase;
    private String passMailBase;

    /**
     * @param Host es el servidor de correos electronicos(p.e. smtp.gmail.com)
     * @param port es el puerto por el cual se hara la transmision.
     * @param mail es la cuenta o mail de donde se enviaran los correos (esa cuenta pertenece al smtp estipulado)
     * @param pass es la correpondiente clave de la cuenta anteriormente estipulada
     */
    public SendMail(String Host, String port, String mail, String pass) {
        this.smtpHost = Host;
        this.puerto = port;
        this.mailBase = mail;
        this.passMailBase = pass;
    }

    /**
     * Parsea las direcciones de correo desde una cadena con las direcciones separadas por comas.
     * @param addresses Cadena con las direcciones de correo
     * @return Vector con las direcciones parseadas.
     */
    private Vector parseAddresses(String sAddresses) {
        Vector vector = new Vector();
        if (sAddresses != null) {
            StringTokenizer st = new StringTokenizer(sAddresses, ",");
            while (st.hasMoreTokens()) {
                vector.add(st.nextToken());
            }
        }
        return vector;
    }

    /**
     * Parsea los attachments desde una cadena con los attachments separados por comas.
     * @param attachments Cadena con los attachments de correo
     * @return Vector con los attachments parseados.
     */
    private Vector parseAttachments(String sAttachments) {
        return parseAddresses(sAttachments);
    }

    /**
     * Envia un correo por SMTP.
     * @param de Dirección del remitente.
     * @param para Cadena con los destinatarios separados por comas.
     * @param asunto Asunto del correo.
     * @param cuerpo Texto del correo.
     * @param cuerpoHTML Correo en html.
     * @param adjuntos Cadena con los attachments separados por comas..
     */
    protected boolean send(String de,
            String para,
            String asunto,
            String cuerpo,
            boolean isFormatHTML,
            String adjuntos) {

        String mailHost = this.smtpHost;
        String sFrom = de;
        Vector vTo = parseAddresses(para);
        Vector vAttachments = parseAttachments(adjuntos);

//Get system properties
        Properties props = System.getProperties();
//Specify the desired SMTP server
        props.put("mail.smtp.host", mailHost);
        props.setProperty("mail.smtp.starttls.enable", "true");
        props.setProperty("mail.smtp.port", this.puerto);
        props.setProperty("mail.smtp.user", this.mailBase);
        props.setProperty("mail.smtps.auth ", "true ");
        try {
// create a new Session object
            Session sesion = Session.getInstance(props, null);
// create a new MimeMessage object (using the Session created above)
            Message message = new MimeMessage(sesion);
// Message add FROM
            message.setFrom(new InternetAddress(sFrom));
// Message add TO
            for (Enumeration eToAddresses = vTo.elements(); eToAddresses.hasMoreElements();) {
                message.addRecipient(Message.RecipientType.TO, new InternetAddress((String) eToAddresses.nextElement()));
            }
// Message add Subject
            message.setSubject(asunto);



//Necesitamos crear el objeto Multipart:
            Multipart multipart = new MimeMultipart();

// Para la parte uno, creamos un BodyPart y seleccionamos el texto para
// ser un mensaje. Luego añadimos el BodyPart al Multipart recién creado.
            BodyPart messageBodyPart = new MimeBodyPart();
            if (isFormatHTML) {
                messageBodyPart.setContent(cuerpo, "text/html");
            } else {
                messageBodyPart.setText(cuerpo + "\n");
            }
            multipart.addBodyPart(messageBodyPart);


            if (adjuntos != null) {
// Create part attachments, Fill attachments and add the part
                for (Enumeration eAttachments = vAttachments.elements(); eAttachments.hasMoreElements();) {
                    String nameFile = (String) eAttachments.nextElement();
// Para la parte dos, necesitamos crear otro BodyPart, pero esta vez,
// necesitamos crear un DataSource para el fichero:
                    BodyPart messageAttachmentsPart = new MimeBodyPart();
                    File archivo = new File(nameFile);
                    DataSource source = new FileDataSource(archivo.getAbsolutePath());
// Usamos un objeto DataHandler para adjuntar los datos al mensaje.
// Simplemente creamos un DataHandler para la fuente y lo adjuntamos al
// mensaje:
                    messageAttachmentsPart.setDataHandler(new DataHandler(source));
// Debemos recordar seleccionar el nombre de fichero para el attachment.
// Esto permite al receptor conocer el nombre (y el tipo) del fichero
// recibido.
                    //StringTokenizer ftokenizer = new StringTokenizer(nameFile, "\\/:");
                    //String filename = ftokenizer.nextToken();
                    //while (ftokenizer.hasMoreTokens()) {
                    //    filename = ftokenizer.nextToken();
                    //}
                    messageAttachmentsPart.setFileName(archivo.getName());//filename);

//Adjuntamos la parte dos de la misma forma que la parte uno:
                    multipart.addBodyPart(messageAttachmentsPart);
                }
            }
// Y como paso final, antes de enviarlo, adjutamos el Multipart al Message:
            message.setContent(multipart);
            Transport t = sesion.getTransport("smtp");
            t.connect(this.mailBase, this.passMailBase);
            t.sendMessage(message, message.getAllRecipients());
            t.close();
            return true;

        } catch (Exception err) {
            System.out.println("error al enviar el mail:  " + err);
            return false;
        }
    }

    /**
     * Envia un correo por SMTP.
     * @param host Dirección del host SMTP.
     * @param sFromAddress Dirección del remitente.
     * @param sToAddress Cadena con los destinatarios separados por comas.
     * @param sSubject Asunto del correo.
     * @param sBody Texto del correo.
     */
    public void sendMail(String sFromAddress,
            String sToAddresses, String sSubject, String sBody) throws
            AddressException, MessagingException {
        send(sFromAddress, sToAddresses, sSubject, sBody, false, null);
    }

    /**
     * Envia un correo por SMTP.
     * @param sFromAddress Dirección del remitente.
     * @param sToAddress Cadena con los destinatarios separados por comas.
     * @param sSubject Asunto del correo.
     * @param sBody Texto del correo.
     * @param sFileAttachments Cadena con los attachments separados por comas..
     */
    public void sendMail(String sFromAddress,
            String sToAddresses, String sSubject, String sBody, String sFileAttachments)
            throws AddressException, MessagingException {
        send(sFromAddress, sToAddresses, sSubject, sBody, false, sFileAttachments);
    }

    /**
     * Envia un correo por SMTP.
     * @param sFromAddress Dirección del remitente.
     * @param sToAddress Cadena con los destinatarios separados por comas.
     * @param sSubject Asunto del correo.
     * @param sBody Texto del correo.
     * @param sBodyHTML Correo en html.
     * @param sFileAttachments Cadena con los attachments separados por comas..
     */
    public boolean sendMail(String sFromAddress,
            String sToAddresses, String sSubject, String sBody,boolean html, String sFileAttachments)
            throws AddressException, MessagingException {
        return send(sFromAddress, sToAddresses, sSubject, sBody, html, sFileAttachments);
    }
}
