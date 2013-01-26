<%-- 
    Document   : activarProgramador
    Created on : 13/12/2011, 05:02:42 PM
    Author     : cas
--%>

<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String user=request.getParameter("email");
    String id=request.getParameter("id");
    Facade_WEBApplication fwa=new Facade_WEBApplication(request.getRealPath("").replace("/build/web","/web"),request.getSession().getId());

    Object o=null;
    try{
        fwa.getProgrammerDataXML(user);
    }catch(Exception e){
        System.out.println("Se intento activas programador invalido - activarProgramador.jsp");
    }
    if(o==null){
        
        if(fwa.isValidIdRegister(user,id)){
            fwa.createProgrammer(user);
            
           }
        
        else{
            
            %>

            <jsp:forward page="../IDE/index.html"></jsp:forward>

            <%
            
         }
        
        
        
        
    }else{
            
            %>

            <jsp:forward page="../IDE/index.html"></jsp:forward>

            <%
            
         }
    

%>



<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <style>
            body{
                 background-image: url(../Images/fondo.png);
                overflow: hidden;
                color: gainsboro;
            }

        </style>
    </head>
    <body>
      <h3>Felicitaciones, su cuenta se ha activado satisfactoriamente</h3>
      <h6>Para iniciar sesion de click en el siguiente link</h6><a href="../IDE/index.html">Iniciar sesion</a>
    </body>
</html>
