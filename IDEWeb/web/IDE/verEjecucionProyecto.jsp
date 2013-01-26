<%-- 
    Document   : verEjecucionProyecto
    Created on : Mar 15, 2012, 9:53:19 AM
    Author     : cas
--%>

<!DOCTYPE html>
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

String name=request.getParameter("name");
String owner=request.getParameter("owner");
String clase=request.getParameter("c");
String jar=request.getParameter("j");

String ruta=null;
if(true){//pregunta si hay archivos para ejecutar, debido a que pueden pedir esta url por medio del navegador sin haber llevado a caboelproceso de contruccion de ejecutable web
//deberia pedir la ruta de ejecucion al facade web application
    String user=fwa.getUser();
    String tem=fwa.getPathExecuteUser(name, owner);
ruta="../"+tem+"/index.jsp?clase="+clase+"&jar="+jar+"&r="+request.getParameter("ran");
//ruta="../run/project/"+name+"/"+owner+"/"+clase+"/"+jar+"/"+request.getParameter("ran");

//response.sendRedirect();


}


%>

<html>

<body>
  
     <div class="Cdespliegue" id="Cdespliegue">

         Espere un momento mientras se cargar el Applet<br></br>
         La velocidad de carga depende de varios factores dentro de  los cuales se encuentran<br></br>
         <ul>
             <li>La velocidad de su conexion a internet</li>
             <li>Si su maquina virtual java va a ser cargada por primera vez</li>
         </ul>
         <script>
          
            //var randomnumber=Math.random()*95532293939113939773123456789123456789;
       
    location.href="<%=ruta%>";
     
         </script>


                </div>
    
    </body>
</html>