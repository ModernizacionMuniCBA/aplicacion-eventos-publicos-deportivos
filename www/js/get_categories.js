		var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
		var gobAbiertoAPI_categories = "/tipo-actividad/"
		var gobAbiertoAPI_audiencia = "?audiencia_id=4"
		var formatJson = "&format=json";
		$.ajax({
		    dataType: "json",
		    url: gobAbiertoAPI + gobAbiertoAPI_categories + gobAbiertoAPI_audiencia + formatJson,
		    success: handleData
		});

		function handleData(data) {
		    $.each(data.results, function(i, category) {
		        // $('#categories-menu').append('<div class="row row-li-tipo"><li><a href="filtro.html#tipo-' + category.id + '"><div class="col-xs-3"><div class="circle-image-li" style="background-image: url(img/default-event-sq.png);"></div></div><div class="col-xs-9 nombre-tipo">' + category.nombre + '</div></a></li></div>');
						$('#categories-list').append('<a href="filtro.html#tipo-' + category.id + '"><div class="col-xs-12 event-type"><div class="row"><div class="col-xs-2"></div><div class="col-xs-8"><h1 class="title">' + category.nombre + '</h1><p class="description"></p></div><div class="col-xs-1"><p class="enter">❯</p></div></div></div></a>');
			  });
		}
