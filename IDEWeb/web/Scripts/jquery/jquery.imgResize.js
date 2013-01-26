/**
 * jQuery ResizeImages Plugin
 * by Santiago Dimatt�a - http://teleportz.com.ar
 *
 * Released under the MIT Licence
 * http://www.opensource.org/licenses/mit-license.php
 */

	window.resizeImages = function(options)
	{
		var defaults = {
				maxWidth: 600,
                                maxHeight: 600,
				msgResized: 'Esta imagen ha sido redimensionada. Has click aqu&iacute; para mostrarla en su tama&ntilde;o real.',
				msgNotResized: 'Este es el tama&ntilde;o original de la imagen. Has click aqu&iacute; para ajustarla a la p&aacute;gina.'
		};
            
		var settings = $.extend(defaults, options);

		// Ejecutamos el script en cada elemento
		$('.imgR').each(function(){
                   
                     
                       if($(this).attr('imgResizable')!= "true")
			{
				return;
			}
                        
                        settings.maxWidth=$(this).attr("mw")+'px';
                        settings.maxHeight=$(this).attr("mh")+'px';
	
                      var mw=parseInt($(this).attr("mw"));
                      var mh=parseInt($(this).attr("mh"));
			// Esperemos hasta que la imagen cargue, as� podemos obtener el tama�o de esta
			$(this).load(function()
			{
				// Si el tama�o de la imagen es menor al tama�o m�ximo, no hacemos nada
				console.log('comparacion en load '+settings.maxWidth);
				if($(this).width() <= mw)
				{
					return;
				}
                                
                                // Si el tama�o de la imagen es menor al tama�o m�ximo, no hacemos nada
                                if($(this).height() <= mh)
				{
					return;
				}

				// Creamos un DIV alrededor de la im�gen y la redimensionamos al tama�o m�ximo permitido
				$(this).wrap('<div class="resizedImageContainer" style="width: ' + mw + 'px; height:'+settings.maxHeight+'px;margin-top: 0px" />');
				$(this).width(mw);
                                $(this).height(mh);

				// Seleccionamos el DIV que creamos y arriba de todo agregamos otro DIV que ser� la alerta
				var $parent = $(this).parent();
				//$parent.prepend('<div>' + settings.msgResized + '</div>');

				// Observamos el evento CLICK en la alerta
				$parent.children('div').click(function(){
					var $container = $(this).parent();

					// Si el elemento contiene la clase notResized, es porque la im�gen est� maximizada.
					if($container.hasClass('notResized'))
					{
						// Achicamos el container y la im�gen al tama�o m�ximo de imagen
						$container.width(mw);
						$container.children('img').width(mw);
                                                
                                                // Achicamos el container y la im�gen al tama�o m�ximo de imagen
						$container.height(mh);
						$container.children('img').height(mh);

						// Cambiamos el mensaje de la alerta
						//$container.children('div').html(settings.msgResized);

						// Eliminamos la clase
						$container.removeClass('notResized');
					}
					else
					{
						// Redimensionamos la im�gen al tama�o autom�tico y obtenemos el valor
						var width = $container.children('img').width('auto').width();
                                                var height = $container.children('img').height('auto').height();

						// Redimensionamos el contenedor
						$container.css('width', width);
                                                $container.css('height', height);

						// Cambiamos el mensaje de la alerta
						//$container.children('div').html(settings.msgNotResized);

						// Agregamos la clase
						$container.addClass('notResized');
					}
				})
			});
                        
                 
                  $(this).show();
		});
	}
