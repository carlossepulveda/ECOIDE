<%-- 
    Document   : compartirProyecto
    Created on : 7/02/2012, 04:15:18 PM
    Author     : cas
--%>

<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="WEBApplication.Facade_WEBApplication"%>
<%@page session="true"%>

<%
    Facade_WEBApplication fwa = (Facade_WEBApplication) request.getSession().getAttribute("fwa");
    String answ="{\"answ\":\"no\"}";

    if (fwa == null) {
        System.out.println("facade nulo IDE " + fwa);
%>
<jsp:forward page="../IDE/index.html"></jsp:forward>
<%

    }


    if (!fwa.isValidSession()) {

        System.out.println("sesion invelida IDE " + fwa);

%>

<jsp:forward page="../IDE/index.html"></jsp:forward>

<%
    }
  
    String user=fwa.getUser();
    String p= fwa.toStringProjects();
    String owner=request.getParameter("owner");
 
    
 if(user.equals(owner)){
 
        int typeC=Integer.parseInt(request.getParameter("type"));
        String name=request.getParameter("name");
        String users=request.getParameter("users");
        String[] types=request.getParameter("types").split(";");
        ArrayList<String> fallidos=new ArrayList<String>();
        String[] correos=users.split(";");

        for(int i=0;i<correos.length;i++){
                String type=types[i];
                if(type.equals("W"))type="Write";
                else type="Read";
                switch(typeC){

                       case 1:{
                              if(!fwa.changeUserPrivilege(name,user,correos[i],type))
                                fallidos.add(correos[i]);  
                               break;

                            }
                       case 2:{
                              if(!fwa.changeUserPrivilege_(name,user,correos[i],type))
                                fallidos.add(correos[i]);  
                               break;

                       }


                     }
        }            
       answ="{\"answ\":\"ok\"}";
        if(!fallidos.isEmpty()){
            answ="{\"answ\":\"wrong\", \"mails\": [";
            String s="";
            for(String x: fallidos){
                answ+=s+"\""+x+"\"";
                s=",";
            }

            answ+="]}";
        }
        
    }
    
        

%>
<%=answ%>
