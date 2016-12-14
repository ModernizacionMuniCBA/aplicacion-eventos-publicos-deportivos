	function searchFunc() {
	  	$(".searchField").css('display', 'inline');
	  	$(".navbar-feria").css('background-color', '#4b53ef');

	  	$("#searchField").focus();
	}
	$(document).mouseup(function (e)
	{
	    var container = $(".searchField");

	    if (!container.is(e.target) // if the target of the click isn't the container...
	        && container.has(e.target).length === 0) // ... nor a descendant of the container
	    {
		    $(".navbar-feria").css('background-color', '#4b53ef');
			$('#searchForm')[0].reset();
	        container.hide();
					e.preventDefault();
	    }
	});
