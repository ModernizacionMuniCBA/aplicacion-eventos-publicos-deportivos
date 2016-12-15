Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
		var gobAbiertoAPI_actividades = "/actividad-publica/"
		var formatJson = "?format=json";
		var actividad = '';
		var url = document.location.toString();
		var page_title = "";
		if (url.match('#')) {
			var string = url.split('#')[1];
			actividad = string.split('-')[1];
		}
		if (window.cordova) {
			var share_url = "https://modernizacionmunicba.github.io/eventos-turismo/www/actividad.html#act-"+actividad;
		}else{
			var share_url = "https://modernizacionmunicba.github.io/eventos-turismo/www/actividad.html%23act-"+actividad;
		}

		$.ajax({
			dataType: "json",
			url: gobAbiertoAPI+gobAbiertoAPI_actividades+actividad+formatJson,
			success: handleData,
            error: handleError,
		});
		var start_date = new Date();
		function handleError(){
			$('.event-date').hide();
			$('#event-esp').hide();
			$('#event-info').html('Este evento ya no se encuentra disponible');
      var bottom = $('.navbar-turismo').position().top + $('.navbar-turismo').outerHeight(true)-10;
      $('body').css('padding-top', bottom);
      $('#loading').hide();
		}
		function handleData(data) {
// 			console.log(data);
			start_date = new Date(dateFormat(data.inicia, "mmmm dd, yyyy h:MM TT"));
      $('#event-date-start').html("Inicia: "+dateFormat(data.inicia, "d 'de' mmm, h:MM TT"));
      if(data.termina != null){
			     end_date = new Date(dateFormat(data.termina, "mmmm dd, yyyy h:MM TT"));
           $('#event-date-end').html("Finaliza: "+dateFormat(data.termina, "d 'de' mmm, h:MM TT"));
      }
			$('#event-name').html(data.titulo);
			page_title = data.titulo;
			$("meta[property='og\\:title']").attr("content", page_title);
			$(document).prop('title', data.titulo);


      $.each(data.tipos, function(i, tag) {
        $('.event-tags').append('<div class="tag-holder"><a href="filtro.html#tipo-'+ tag.id +'""><span class="tag">'+tag.nombre+'</span></a></div>');
      });
      $('#event-location').append('<a class="event-location" href="filtro.html#lugar-'+ data.lugar.id +'">'+ data.lugar.nombre +'</a>');
			$('#event-info').html(data.descripcion);

			$("#share").attr("href", url);
			$('#share-icons').append('<a href="http://twitter.com/share?url='+share_url+'&text='+page_title+'" target="_blank" class="share-btn twitter">Twitter</a>');
			$('#share-icons').append('<a href="http://www.facebook.com/sharer/sharer.php?u='+share_url+'" target="_blank" class="share-btn facebook">Facebook</a>');
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				$('#share-icons').append('<a href="whatsapp://send?text='+page_title+' '+share_url+'" target="_blank" class="share-btn whatsapp">Whatsapp</a>');
			}
			var totalTipos = data.tipos.length;
			$.each(data.tipos, function(i, tipo) {
				$('#tags').append('<a href="agrupador.html#tipo-'+tipo.id+'">'+tipo.nombre+'</a>');
				if(i!=totalTipos-1){
					$('#tags').append(' | ');
				}
			});

      var bottom = $('.navbar-turismo').position().top + $('.navbar-turismo').outerHeight(true)-20;
      $("img").one("load", function() {
        // do stuff
        $('body').css('padding-top', bottom);
      }).each(function() {
        if(this.complete) $(this).load();
      });

			$('#loading').hide();
		}
		$(window).on('resize', function(){
      var bottom = $('.navbar-turismo').position().top + $('.navbar-turismo').outerHeight(true)-20;
			$('body').css('padding-top', bottom);
		});
