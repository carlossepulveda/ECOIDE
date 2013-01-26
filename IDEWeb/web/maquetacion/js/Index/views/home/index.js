define([
  'jquery',
  'underscore',
  'backbone',
  'models/login'

  ]
  , function($, _, Backbone,loginModel){

  var indexView = Backbone.View.extend({
    el: $("body"),
    events:{
      'click .login_buttom_view': 'clickLoginButtom'
    },
  	initialize:function(load){
      var left=(parseInt(this.$el.width())/2)-(parseInt($('.login_box').css('width'))/2);
    
      $('.login_box').css({top: '200px',left:left+'px'});
      
  	},
    render: function(){                                 
   
    },
    clickLoginButtom: function(event){
      var user= this.$el.find('.login_user_input_view').val();
      var pass= this.$el.find('.login_pass_input_view').val();

      if(user=='' || pass==''){
        alert('Ninguno de los campos puede estar vacio');
      }else{

        var loginObject=new loginModel({});
        var successHandler=function(answ){
          if(answ==true){
              localStorage.setItem("logged", "true");
              location.href="#/login_ok"
          }else{
            alert('Usuario o contraseña incorrectos');
          }
         
        };
        var errorHandler=function(){
          alert('Ocurrio un error al autenticarse, intente de  nuevo');
        };
        loginObject.log(user,pass,successHandler,errorHandler);

      }
    }
    
  });
  return new indexView;
});