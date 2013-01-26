<%-- 
    Document   : login
    Created on : 6/12/2011, 07:41:26 AM
    Author     : cas
--%>

<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page contentType="text/plain" pageEncoding="UTF-8"%>
<%
    String user=request.getParameter("user");
    String password=request.getParameter("password");
    String type=request.getParameter("type");
    String answ="wrong"; System.out.println("p-----------------------------------------------"+user+"  -"+password+" - "+type);
    System.out.println(request.getRealPath("").replace("/build/web","/web"));
    Facade_WEBApplication fwa=new Facade_WEBApplication(request.getRealPath("").replace("/build/web","/web"),request.getSession().getId()); 
    
    switch(Integer.parseInt(type)){
        
               case 1:{
                   if(fwa.isValidPerson(user, password)){
                    System.out.println("pasooo  login");
                    fwa.setUser(user);
                   if(fwa.openSession()){

                        answ="ok";
                        HttpSession sesion=request.getSession();
                        sesion.setAttribute("fwa", fwa);
                        System.out.println("registroo  login   "+answ);
                       }
                    }
                   break;
             }
           
               case 2:{
                    if(fwa.isValidAdmin(user, password)){
                    fwa.setUser(user);
                   if(fwa.openSession()){

                        answ="ok";
                        HttpSession sesion=request.getSession();
                        sesion.setAttribute("fwa", fwa);
                       }
                    }
                    break;
                    }
        
    }
    
%>
{"answ":"<%=answ%>"}
