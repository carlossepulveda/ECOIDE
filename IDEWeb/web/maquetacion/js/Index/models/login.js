define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var login = Backbone.Model.extend({
    urlRoot:'http://fathomless-brushlands-1572.herokuapp.com/user/login/domain/',
    defaults:{
    	message: null
    },
    errorMessage: 'ErrorUserPass',
    initialize: function(){

    },
    log: function(user, pass, successHandler,errorHandler){
    	this.url=this.urlRoot+user+'/'+pass;
    	var that=this;
    	this.fetch({

    		success: function(model,res,options){
    			console.log(that.get('message'));
    			if(successHandler){
    				var answ=false;
    				if(that.get('message')!=that.errorMessage){
    					answ=true;
    				}
    				successHandler(answ);
    			}
    		},
    		error: function(model, res, options){
    			if(errorHandler){
    				errorHandler();
    			}
    		}


    	});



    }
  
  

    
  });

  return login;

});