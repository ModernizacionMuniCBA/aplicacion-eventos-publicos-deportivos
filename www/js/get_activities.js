var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
		var gobAbiertoAPI_actividades = "/actividad-publica/";
		// var gobAbiertoAPI_evento = "?evento_id=1";
		var gobAbiertoAPI_audiencia = "?audiencia_id=" + app.audiencia_id;
		var page_eventos = "&page=";
		var pageNumber = getParameterByName('page');
		if (pageNumber == null){
			pageNumber = 1;
		}
		var page_size_str = "&page_size=";
		var formatJson = "&format=json";
		// var bottom = $('.img-holder').position().top + $('.img-holder').outerHeight(true)+5;
		// $('body').css('padding-top', bottom);
		$.ajax({
			dataType: "json",
			url: gobAbiertoAPI+gobAbiertoAPI_actividades+gobAbiertoAPI_audiencia+page_eventos+pageNumber+page_size_str+pageSize+formatJson,
			success: handleData
		});
		var start_date = new Date();
		function handleData(data) {
			$.each(data.results, function(i, item) {
				if(item.inicia != null){

					var event_date_aux = new Date(item.inicia);
		 			if (item.image != undefined ){
				 		var event_image = item.image.original.replace(/^http:\/\//i, 'https://');
			 		}else{
				 		var event_image = "img/logo-turismo-sq.jpg";
			 		}
					var yourString = item.descripcion; //replace with your string.
					var maxLength = 120; // maximum number of characters to extract

					//trim the string to the maximum length
					if(yourString.length > 120 ){
						var trimmedString = yourString.substr(0, maxLength);
						trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + " ...";
					}else{
						var trimmedString = yourString;
					}

					$('#event-list').append('<a href="actividad.html#act-'+item.id+'"><div class="col-xs-12 event-item"><div class="row"><div class="col-xs-3 image" style="background-image: url('+event_image+');"></div><div class="col-xs-8"><h1 class="title">'+item.titulo+'</h1><p class="description">'+trimmedString+'</p><p class="date">'+dateFormat(item.inicia, "dddd dd 'de' mmmm <br>h:MM TT")+'</p></div></div></div></a>');

	 			}
			});
			var htmlPrvNxt = '<div class="row evento"><nav aria-label="..."><ul class="pager">';
			if (data.previous != null){
				var prevPage = getParameterByName('page', data.previous);
				if (prevPage == null){
					prevPage = 1;
				}
				htmlPrvNxt += '<li class="previous"><a href="index.html?page='+prevPage+'" class="pull-left pager-li page-prev"><span aria-hidden="true">&larr;</span>Anterior</a></li>';
			}
			if (data.next != null){
				var nextPage = getParameterByName('page', data.next);
				htmlPrvNxt += '<li class="next"><a href="index.html?page='+nextPage+'" class="pull-right pager-li page-next">Siguiente<span aria-hidden="true">&rarr;</span></a></li>';
			}
			htmlPrvNxt += '</div>'
			$('#event-next').append(htmlPrvNxt);
			// var height = $('.foreground').outerHeight(true) - $('.event-date-time').outerHeight(true);
			// var bottom = $('.fixed-img').position().top + $('.fixed-img').outerHeight(true) + 20;
			// $('.fixed-img').css('height', height  + $('.event-date-time').outerHeight(true)/2);
			// $('.img-holder').css('height', $('.foreground').outerHeight(true));
			bottom = $('.navbar.navbar-turismo.navbar-fixed-top').position().top + $('.navbar.navbar-turismo.navbar-fixed-top').outerHeight(true);
			$('body').css('padding-top', bottom);
			$('#loading').hide();

		}

			$(window).on('resize', function(){
				bottom = $('.navbar.navbar-turismo.navbar-fixed-top').position().top + $('.navbar.navbar-turismo.navbar-fixed-top').outerHeight(true);
				$('body').css('padding-top', bottom);
				$('#loading').hide();
			});
