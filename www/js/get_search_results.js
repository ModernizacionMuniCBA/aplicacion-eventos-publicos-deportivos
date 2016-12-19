var gobAbiertoAPI = "https://gobiernoabierto.cordoba.gob.ar/api";
var gobAbiertoAPI_actividades = "/actividad-publica/"
var gobAbiertoAPI_audiencia = "&audiencia_id=" + app.audiencia_id;
var formatJson = "&format=json";
var search = getParameterByName('search');
var page_eventos = "&page=";
var pageNumber = getParameterByName('page');
if (pageNumber == null) {
    pageNumber = 1;
}
var page_size_str = "&page_size=";
$("#searched-string").html(search);
$.ajax({
    dataType: "json",
    url: gobAbiertoAPI + gobAbiertoAPI_actividades + "?q=" + search + page_eventos + pageNumber + page_size_str + pageSize + gobAbiertoAPI_audiencia + formatJson,
    success: handleData
});

function handleData(data) {
    if (data.count != 0) {
        $.each(data.results, function(i, item) {
            if (item.inicia != null) {
                var event_date_aux = new Date(item.inicia);
                if (item.image != undefined) {
                    var event_image = item.image.original.replace(/^http:\/\//i, 'https://');
                } else {
                    var event_image = "img/logo-turismo-sq.png";
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
                // $('#event-list').append('<a href="actividad.html#act-' + item.id + '" class="evento"><div class="row evento-card"><div class="col-xs-3 act-card-img"><div class="evento-img-cont no-margin-img" style="background-image: url(' + event_image + ');"></div></div><div class="col-xs-9"><span class="event-title">' + item.titulo + '</span><br/><span class="event-date">' + dateFormat(item.inicia, "dddd dd 'de' mmmm, h:MM TT") + '</span></div></div></a><div class="row"><div class="event-divider"></div></div>');
                // $('#event-list').append('<a href="actividad.html#act-'+item.id+'" class="evento"><div class="col-xs-12 col-sm-6 col-md-4 evento-card"><div class="col-xs-3 act-card-img"><div class="evento-img-cont no-margin-img" style="background-image: url('+event_image+');"></div></div><div class="col-xs-9"><span class="event-title">'+item.titulo+'</span><br/><span class="event-date">'+dateFormat(item.inicia, "dddd dd 'de' mmmm, h:MM TT")+'</span></div><div class="col-xs-12 act-card-img"><div class="event-divider"></div></div></div></a>');
                $('#event-list').append('<a href="actividad.html#act-'+item.id+'"><div class="col-xs-12 event-item"><div class="row"><div class="col-xs-3 image" style="background-image: url('+event_image+');"></div><div class="col-xs-8"><h1 class="title">'+item.titulo+'</h1><p class="description">'+trimmedString+'</p><p class="date">'+dateFormat(item.inicia, "dddd dd 'de' mmmm <br>h:MM TT")+'</p></div></div></div></a>');

            }
        });
    } else {
        $('#event-list').append('<span style="margin-left:30px;">No se encontraron actividades.</span>');
    }
    var htmlPrvNxt = '<div class="row evento"><nav aria-label="..."><ul class="pager">';
    if (data.previous != null) {
        var prevPage = getParameterByName('page', data.previous);
        if (prevPage == null) {
            prevPage = 1;
        }
        htmlPrvNxt += '<li class="previous"><a href="search.html?search=' + search + '&page=' + prevPage + '" class="pull-left pager-li page-prev"><span aria-hidden="true">&larr;</span>Anterior</a></li>';
    }
    if (data.next != null) {
        var nextPage = getParameterByName('page', data.next);
        htmlPrvNxt += '<li class="next"><a href="search.html?search=' + search + '&page=' + nextPage + '" class="pull-right pager-li page-next">Siguiente<span aria-hidden="true">&rarr;</span></a></li>';
    }
    htmlPrvNxt += '</div>'
    $('#event-list').append(htmlPrvNxt);
    var bottom = $('.navbar-turismo').position().top + $('.navbar-turismo').outerHeight(true);
    $('body').css('padding-top', bottom);
    $('#loading').hide();

}

$(window).on('resize', function() {
    var bottom = $('.navbar-turismo').position().top + $('.navbar-turismo').outerHeight(true);
    $('body').css('padding-top', bottom);
});
