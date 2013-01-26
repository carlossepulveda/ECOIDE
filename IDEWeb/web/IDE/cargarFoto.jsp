<%-- 
    Document   : cargarFichero
    Created on : 22/12/2011, 10:30:00 AM
    Author     : cas
--%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

 <%@page import="org.w3c.dom.Document"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>

<%


String answ="wrong";


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


String respuesta=fwa.addPhoto(request,"fileUpload");
String img="";
  if(respuesta!=null){
      img="<img src=\"../Images/SupportWindow/ok.png\"/>";
  } 
else{
     respuesta="false";
     img="<img src=\"../Images/SupportWindow/close.png\"/>";
}          
%>
        
        
<html>
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel=StyleSheet HREF="../css/styleTabla.css" type="text/css" media="screen">
        <script type="text/javascript" src="../javaScript/jquery.js"></script>
        
     <body>
         <div id="cR"> 
             <%=img%>
             <script>
		var respuesta='<%=respuesta%>';
		if(respuesta=='false')respuesta=null;
                window.parent.cerrarVentanaCarga(respuesta);
             </script>
         </div>
        
     </body>
  
</html>
