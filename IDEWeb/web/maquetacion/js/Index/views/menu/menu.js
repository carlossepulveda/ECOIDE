define([
  'jquery',
  'underscore',
  'backbone'
  ]
  , function($, _, Backbone){

  var menuView = Backbone.View.extend({
    events:{
    	'click .menu_item_agendas_lista':'clickAgendasLista',
    	'click .menu_item_agendas_id':'clickAgendasID',
    	'click .menu_item_precios_paises':'clickPreciosPaises',
    	'click .menu_item_precios_hora':'clickPreciosHora',
    	'click .menu_item_politicas_lista':'clickPoliticasLista',
    	'click .menu_item_politicas_id':'clickPoliticasID'
    },
  	initialize:function(load){
  		if(load){
  			this.setElement(load.elElement);
  			this.parent=load.parent;
  		}
     
  	},
    render: function(){                                 
   
    },
    clickAgendasLista: function(event){
    	this.parent.viewAgendasLista();
    },
    clickAgendasID: function(event){
    	this.parent.viewAgendasID();
    },
    clickPreciosPaises: function(event){
    	this.parent.viewPreciosPaises();
    },
    clickPreciosHora: function(event){
    	this.parent.viewPreciosHora();
    },
    clickPoliticasLista: function(event){
    	this.parent.viewPoliticasLista();
    },
    clickPoliticasID: function(event){
    	this.parent.viewPoliticasID();
    }
    
  });
  return menuView;
});