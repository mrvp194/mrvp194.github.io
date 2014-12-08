$(document).ready(function(){
	
	$('#clickMe').click(function() {
		$('#aus').fadeOut('slow');
		$('#content').fadeIn('slow');
		$('#info').fadeIn('slow')
	});

	$('.navi').hover(function() {
    	$(this).toggleClass('highlighted');
  }, function() {
        $(this).toggleClass('highlighted');
    });
	
});