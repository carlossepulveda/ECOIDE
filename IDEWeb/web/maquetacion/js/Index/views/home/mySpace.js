define([
  'jquery',
  'underscore',
  'backbone',
  'views/menu/menu',
  'models/schelude',
  'models/scheludeList',
  'models/priceCountry',
  'models/priceHour',
  'models/politic',
  'models/politicList'

  ]
  , function($, _, Backbone,menuView,schedule,schedulesList,priceCountry,priceHour,politic,politicList){

  var mySpaceView = Backbone.View.extend({
    el: $("body"),
    events:{
      'click .search_button': 'clickSearchButtom'
    },
  	initialize:function(load){
    
      if(load){
        this.menu=new menuView({elElement: '.leftMenu',parent: this});

      }
      

     // $.get('http://fathomless-brushlands-1572.herokuapp.com/schedule/get/1',function(data){console.log(data);});
     // $.get('http://fathomless-brushlands-1572.herokuapp.com/policy/list/0/10/test/test',function(data){console.log(data)});
  	},
    render: function(){     


    },
    viewAgendasLista: function(){
      this.$el.find('.label_Levels').html('Mi Espacio > Agendas > Lista');
      var scs=new schedulesList({});
      var that=this;
      var successHandler=function(){
        var html='<div style="margin-bottom:15px;margin-left:10px"><h4>Info '+scs.get("info")+'</h4></div>';
            html+='<div>';//abre contenedor principal de datos-->
            for(var i in scs.get("data")){
              var datai=scs.get("data")[i];
              var heightC='auto';
              if(datai.LstScheduleHour.data!=null){
                heightC='700px';
              }
                html+='<br><div style="border:solid 1px;height:'+heightC+'">';//abre contedor de fila
                html+='<b>Id</b>: '+datai.Id+' <br> ';
                html+='<b>Name</b>: '+datai.Name+' <br>';
                html+='<b>Description</b>: '+datai.Description+' <br> ';
                html+='<b>CountStation</b>: '+datai.CountStation+'<br> ';                
                html+='<b>LastUpdate</b>: '+datai.LastUpdate+' <br><br>';
             
                html+='<b>LstScheduleHour</b><br><br>';

                if(datai.LstScheduleHour.data!=null){
                    html+='<div style="width:100%">';//abre contenedor horas
                      for(var i in datai.LstScheduleHour.data){
                        html+='<div style="float:left;height:auto;margin:5px;background-color:rgba(0,0,0,0.2);padding-right:10px">';
                          html+='<ul>';
                              html+='<li>Id: '+datai.LstScheduleHour.data[i].Id+' Day:'+datai.LstScheduleHour.data[i].Day+'</li>';
                              var j=0;
                              html+='<li><ul>';
                              while(j<24){
                                html+='<li>Hour'+j+': '+datai.LstScheduleHour.data[i]['Hour'+j]+'</li>';
                                j++;
                              }
                              html+='</li></ul>';
                          html+='</ul>';
                        html+='</div>';

                      }
                    html+='</div>';//cierra contenedor horas

               }

              html+='</div>';//cierra contenedor de fila
            }
        html+='</div>';//cierra contenedor principal de datos
        that.setViewPort(html);
      }
      var errorHandler=function(){
        alert('error al intentar consultar');
      }
      scs.load(0,10,successHandler,errorHandler);
    },
    viewAgendasID: function(id){
      this.$el.find('.label_Levels').html('Mi Espacio > Agendas > ID ');
      this.setSearchMenuId('viewAgendasID_');
    },
    viewAgendasID_: function(id){
      this.$el.find('.label_Levels').html('Mi Espacio > Agendas > ID > '+id);
      var sc=new schedule({id:id});
      var that=this;
      var successHandler=function(){
        var html='<div style="margin-bottom:15px;margin-left:10px"><h4>Info '+sc.get("info")+'</h4></div><div>';
        for(var i in sc.get("data")){
          html+='<div style="float:left;margin:5px;background-color:rgba(0,0,0,0.2)"><ul>';
          html+='<li>Id: '+sc.get("data")[i].Id+' Day:'+sc.get("data")[i].Day+'</li>';
          var j=0;
          html+='<li><ul>';
          while(j<24){
            html+='<li>Hour'+j+': '+sc.get("data")[i]['Hour'+j]+'</li>';
            j++;
          }
          
          html+='</div></div>';

        }
        html+='</div>';
        that.setViewPort(html);
      }
      var errorHandler=function(){
        alert('error al intentar consultar');
      }
      sc.load(successHandler,errorHandler);

     
    },
    viewPreciosPaises: function(){
      this.$el.find('.label_Levels').html('Mi Espacio > Precios > Paises');
      var pc=new priceCountry({});
      var that=this;
      var successHandler=function(){
         var html='<div style="margin-bottom:15px;margin-left:10px"><h4>Info: '+pc.get("info")+'</h4></div>';
            html+='<div>';//abre contenedor principal de datos-->
            for(var i in pc.get("data")){
              var datai=pc.get("data")[i];
              console.log(pc.get("data")[i]);
              var heightC='auto';
              if(datai.ListPriceHKw.data!=null){
                heightC='800px';
              }
                html+='<br><div style="border:solid 1px;height:'+heightC+'">';//abre contedor de fila
                html+='<b>Id</b>: '+datai.Id+' <br> ';
                html+='<b>Name</b>: '+datai.Name+' <br>';
                html+='<img height="100px" width="100px" src="../images/'+datai.Image+'"/><br> ';
                html+='<b>CountStation</b>: '+datai.CountStation+'<br> ';                
                html+='<b>LastUpdate</b>: '+datai.LastUpdate+' <br><br>';
             
                html+='<b>LstScheduleHour</b><br><br>';

                if(datai.ListPriceHKw.data!=null){
                    html+='<div style="width:100%">';//abre contenedor horas
                      for(var i in datai.ListPriceHKw.data){
                        html+='<div style="float:left;height:auto;margin:5px;background-color:rgba(0,0,0,0.2);padding-right:10px">';
                          html+='<ul>';
                              html+='<li>Id: '+datai.ListPriceHKw.data[i].Id+' Day:'+datai.ListPriceHKw.data[i].Day+'</li>';
                              var j=0;
                              html+='<li><ul>';
                              while(j<24){
                                html+='<li>Hour'+j+': '+datai.ListPriceHKw.data[i]['Hour'+j]+'</li>';
                                j++;
                              }
                              html+='</li></ul>';
                          html+='</ul>';
                        html+='</div>';

                      }
                    html+='</div>';//cierra contenedor horas

               }

              html+='</div>';//cierra contenedor de fila
            }
        html+='</div>';//cierra contenedor principal de datos
        that.setViewPort(html);
      };
      var errorHandler=function(){

      };
      pc.load(successHandler,errorHandler);
    },
    viewPreciosHora: function(id){
      this.$el.find('.label_Levels').html('Mi Espacio > Precios > Hora ');
      this.setSearchMenuId('viewPreciosHora_');
    },
    viewPreciosHora_: function(id){
       this.$el.find('.label_Levels').html('Mi Espacio > Precios > Hora > '+id);
      var ph=new priceHour({id: id});
      var that=this;
      var successHandler=function(){
        var html='<div style="margin-bottom:15px;margin-left:10px"><h4>Info: '+ph.get("info")+'</h4></div><div>';
        for(var i in ph.get("data")){
          html+='<div style="float:left;margin:5px;background-color:rgba(0,0,0,0.2)"><ul>';
          html+='<li>Id: '+ph.get("data")[i].Id+' Day:'+ph.get("data")[i].Day+'</li>';
          var j=0;
          html+='<li><ul>';
          while(j<24){
            html+='<li>Hour'+j+': '+ph.get("data")[i]['Hour'+j]+'</li>';
            j++;
          }
          
          html+='</div></div>';

        }
        html+='</div>';
        that.setViewPort(html);
      };
      var errorHandler=function(){
        alert('Error al intentar consultar');
      }
      ph.load(successHandler,errorHandler);
     
    },
    viewPoliticasID: function(id){
      this.$el.find('.label_Levels').html('Mi Espacio > Politicas > ID');
      this.setSearchMenuId('viewPoliticasID_');
    },
    viewPoliticasID_: function(id){
      this.$el.find('.label_Levels').html('Mi Espacio > Politicas > ID > '+id);
      var pol=new politic({id:id});
      var that=this;
      var successHandler=function(){
        var html='<div>';
        html+='<b>Id</b>: '+pol.get('Id')+'<br>';
        html+='<b>Nombre</b>: '+pol.get('Name')+'<br>';
        html+='<b>Descripcion</b>: '+pol.get('Description')+'<br><br>';
        html+='<b>Lista de acciones</b>:<br><br> ';
        html+='<div>';
        for(var i in pol.get('ListActions').data){
          var datai=pol.get('ListActions').data[i];
          html+='<div style="border:solid 1px"><ul><li><b>Id</b>: '+datai.Id+'</li>';
          html+='<li><b>Nombre</b>: '+datai.Name+'</li>';
          html+='<li><b>Tipo</b>: '+datai.Type+'</li>';
          html+='<li><b>Valor: </b>:'+datai.Value+'</li></ul></div>';
        }
        html+='</div>';
        that.setViewPort(html);
      };
      var errorHandler=function(){
        alert('Error al intentar consultar');
      };
      pol.load(successHandler,errorHandler);
      
    },
    viewPoliticasLista: function(){
      this.$el.find('.label_Levels').html('Mi Espacio > Politica > Lista');
      var polist=new politicList({});
      var that=this;
      var successHandler=function(){
        var html='<div style="margin-bottom:15px;margin-left:10px"><h4>Info : '+polist.get("info")+'</h4></div>';
            html+='<div>';//abre contenedor principal de datos-->
            for(var i in polist.get("data")){
              var datai=polist.get("data")[i];
              var heightC='auto';
              if(datai.LstScheduleHour.data!=null){
                heightC='700px';
              }
                html+='<br><div style="border:solid 1px;height:'+heightC+'">';//abre contedor de fila
                html+='<b>Id</b>: '+datai.Id+' <br> ';
                html+='<b>Name</b>: '+datai.Name+' <br>';
                html+='<b>Description</b>: '+datai.Description+' <br> ';
                html+='<b>CountStation</b>: '+datai.CountStation+'<br> ';                
                html+='<b>LastUpdate</b>: '+datai.LastUpdate+' <br><br>';
             
                html+='<b>LstScheduleHour</b><br><br>';

                if(datai.LstScheduleHour.data!=null){
                    html+='<div style="width:100%">';//abre contenedor horas
                      for(var i in datai.LstScheduleHour.data){
                        html+='<div style="float:left;height:auto;margin:5px;background-color:rgba(0,0,0,0.2);padding-right:10px">';
                          html+='<ul>';
                              html+='<li>Id: '+datai.LstScheduleHour.data[i].Id+' Day:'+datai.LstScheduleHour.data[i].Day+'</li>';
                              var j=0;
                              html+='<li><ul>';
                              while(j<24){
                                html+='<li>Hour'+j+': '+datai.LstScheduleHour.data[i]['Hour'+j]+'</li>';
                                j++;
                              }
                              html+='</li></ul>';
                          html+='</ul>';
                        html+='</div>';

                      }
                    html+='</div>';//cierra contenedor horas

               }

              html+='</div>';//cierra contenedor de fila
            }
        html+='</div>';//cierra contenedor principal de datos
        that.setViewPort(html);
      };
      var errorHandler=function(){
        alert('Error al intentar consultar');
      };
      polist.load(0,10,successHandler,errorHandler);
    },
    setViewPort: function(view){
      this.$el.find('.viewPort').html(view);
    },
    setSearchMenuId: function(option){
      var html='<div style="width:300px;margin:0 auto;"><div class="row-fluid" style="margin:5px">';
      html+='<div style="float:left">Digite id: </div><input style="float:left;margin-left:15px;" type="text" placeholder="id" class="search_textfield"/></div><div><button class="span1 btn btn-info search_button" option="'+option+'" >Consultar</button>';
      html+='</div></div>';
      this.setViewPort(html);
    },
    clickSearchButtom: function(event){
      var element=$(event.currentTarget);
      var text=this.$el.find('.search_textfield').val();

      if(text==''){
        alert('Campo vacio');
        return;
      }

      switch(element.attr('option')){
        case 'viewAgendasID_':{
          this.viewAgendasID_(text);
          break;
        }
        case 'viewPreciosHora_':{
          this.viewPreciosHora_(text);
          break;
        }
        case 'viewPoliticasID_':{
          this.viewPoliticasID_(text);
          break;
        }
      };
    }
    
  });
  return new mySpaceView;
});