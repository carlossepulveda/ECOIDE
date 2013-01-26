// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/index'
], function($, _, Backbone, mainHomeView,DB){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'login_ok':'loginOk',
      '*actions':'defaultAction'
      //al momento de enrutar, en necesario que guarde en DB la objeto oauth, para que puede ser leido por la sigiente pagina
      //que se cargue
      
    },
    //es necesario alamcenar el oauth object en memoria y no en disco
    defaultAction: function(actions){
      mainHomeView.initialize(true); 
    },
    loginOk: function(){
      if(localStorage.getItem("logged")=='true'){
        location.href="../html/mySpace.html";
      }else{
        localStorage.removeItem('logged');
        alert('No se encuentra autenticado');
        location.href="#/";
      }
    }


  });

  var initialize = function(){
    
    var app_router = new AppRouter;
    Backbone.history.start();

  };
  return { 
    initialize: initialize
  };
});
