<%-- 
    Document   : cargarLibreria
    Created on : 22/12/2011, 07:41:35 PM
    Author     : cas
--%>

<%@page import="java.util.Enumeration"%>
<%@page import="javazoom.upload.MultipartFormDataRequest"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

 <%@page import="org.w3c.dom.Document"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>

<%


Facade_WEBApplication fwa=(Facade_WEBApplication)request.getSession().getAttribute("fwa");

if(fwa==null){
    
%>
    <jsp:forward page="../IDE/index.html"></jsp:forward>
<%

}


if(!fwa.isValidSession()){
    
      
 %>
    
    <jsp:forward page="../IDE/index.html"></jsp:forward>
    
<%

}

String name=(String)request.getParameter("name");
String owner=(String)request.getParameter("owner");


String r=fwa.addLibJAR(name,owner,request,"fileUpload");


String respuesta="*.*";
  
if(r!=null){
    
    respuesta=r;

}  
  


%>
        
        
<html>
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel=StyleSheet HREF="../css/styleTabla.css" type="text/css" media="screen">
        <script type="text/javascript" src="../javaScript/jquery.js"></script>
        <script>
            
            var r='<%=r%>';
            function validar(){
 
               if(r=='null'){
                              
                   document.getElementById("cR").innerHTML='<img src="../Images/SupportWindow/ok.png"/>';
                   
               }
               
               
            }
            
        </script>
     <body onload="validar()">
         <div id="cR"> 
         <form method="post" name="frm">
             <input type="hidden" value="<%=respuesta%>" name="respuesta" id="respuesta"/>
         </form>
         </div>
     </body>
  
</html>