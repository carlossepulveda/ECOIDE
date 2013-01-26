
define([
  'jquery', 
  'underscore', 
  'backbone',
  'routerIndex' 
], function($, _, Backbone, Router){
  var initialize = function(){  	
   
    Router.initialize();
  }  

  return { 
    initialize: initialize
  };
});