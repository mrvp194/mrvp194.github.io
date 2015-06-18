$(document).ready(function(){

	// $('body').css('background', 'url(background2.jpg)fixed')

	$('#res').easyModal()
	$('#port').easyModal()
//Set up nav bar event listeners

	$('#home').on("mouseover", function(event) {
		$('#home').attr('style', 'background-color:black')
		$('#home').parent().attr('style', 'color:#E74C3A')
	})

	$('#home').on("mouseout", function(event) {
		$('#home').attr('style', 'background-color:#101B1B')
		$('#home').parent().attr('style', 'color:white')

	})

	$('#resume').on("mouseover", function(event) {
		$('#resume').attr('style', 'background-color:black')
		$('#resume').parent().attr('style', 'color:#E74C3A')
	})

	$('#resume').on("mouseout", function(event) {
		$('#resume').attr('style', 'background-color:#101B1B')
		$('#resume').parent().attr('style', 'color:white')

	})

	$('#resume').on("click", function(event) {
		event.preventDefault()
		$('#res').trigger('openModal')

	})

	$('#portfolio').on('click', function(event) {
		event.preventDefault()
		$('#port').trigger('openModal')
	})

	$('#portfolio').on("mouseover", function(event) {
		$('#portfolio').attr('style', 'background-color:black')
		$('#portfolio').parent().attr('style', 'color:#E74C3A')
	})

	$('#portfolio').on("mouseout", function(event) {
		$('#portfolio').attr('style', 'background-color:#101B1B')
		$('#portfolio').parent().attr('style', 'color:white')

	})
	
	var tl = new TimelineLite()

	var tagline = $('#tagline')
    var welcome = tagline[0].innerHTML

// Set up method to separate each letter in tagline for transitions

    tagline.chars = function() {
	    var container = []
	    for (var i = 0, len = welcome.length; i < len; i++) {
	    	var div = document.createElement("DIV") 
	    	div.innerHTML = welcome[i]
	    	tagline.append(div)
	    	container.push(div)
	    };
	    return container;
	}


	tagline[0].innerHTML = ""

// Create Playlist

	var playlist = [
		{title: "Bound", artist: "Ponderosa Twins", src: "music/bound.mp3"},
		{title: "Drinking Water", artist: "Antonio Carlos Jobim & Frank Sinatra", src: "music/drinkingwater.mp3"},
		{title: "Marriage is a State of Vibes", artist: "Dave Hamilton", src: "music/marriage.mp3"},
		{title: "Guadaloupe Ile de Mes Amours", artist: "Eric Cosaque", src: "music/guadaloupe.mp3"},
		{title: "California", artist: "Felix Leclerc avec Les Disciples de Ch-ur Massenet", src: "music/california.mp3"},
		{title: "Wave", artist: "Gianni Mazza", src: "music/wave.mp3"},
		{title: "Free Soul", artist: "Jackie Mittoo", src: "music/freesoul.mp3"},
		{title: "Still Hanging On", artist: "Lee Fields & The Expressions", src: "music/hangingon.mp3"},
	]

	function shuffle(o){
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	}

	var index = 0

	playlist = shuffle(playlist)

	var player = new Audio(playlist[index].src)
	player.load()

	$("h6 span").append(playlist[index].artist + " - " + playlist[index].title)

// Set up page load transitions

    tl.from($('#nav'), 0.5, {"margin-left":"0px", opacity:0, "box-shadow":"0px 0px 0px 0px rgba(0,0,0,0.75)"}, "+=0.5")
		.from($('#container'), 0.5, {scale:0, autoAlpha:0, "box-shadow":"0px 0px 0px 0px rgba(0,0,0,0.75)"}, "+=0.5")
		.from($('#music'), 0.5, { "margin-top":"125px", opacity:0, "box-shadow":"0px 0px 0px 0px rgba(0,0,0,0.75)"})
		.from($('h6 span'), 0.5, {opacity:0, y:-60, "color":"#E74C3A"})
		.staggerFrom($("svg"), 0.5, {rotation:90, scale:0, y:-60}, 0.1)
		.from($('#hr'), 0.7, {width:"0px", "color":"#E74C3A"})
		.staggerFrom(tagline.chars(), 0.7, {rotation:90, scale:0, y:-60, "color":"#E74C3A"}, 0.1, "-=1")
		.from($('#links'), 0.5, {opacity:0, "box-shadow":"0px 0px 0px 0px rgba(0,0,0,0.75)"})

// Set up method to scroll text that is too long in music player

	$.fn.scrolltxt = function() {
		var options = $.extend({
			speed : 10
	    }, arguments[0] || {});
		
		return this.each(function() {
			var el = $(this);


			if( el.find('span').width() > el.parent().width() ) {
		    	var scroll_text = setInterval(function() {
					scrollText();
				}, options.speed);
		    };		
		    
			var scrollText = function() {
			    var width = el.width() + 210,                
			        left = el.position().left - 1;
			    left = -left > width ? (width - 210) : left;
			    el.css({left: left});
			};
		});
	};


	$('#current h6').scrolltxt();

	player.play()

	var play = $('#play')
		pause = $('#pause')
		next = $('#next')
		last = $('#last')

// Set up method to play next or last song

	function nextSong() {
		index+=1
		if (!playlist[index]) {
			index = 0
		}
		player.src = playlist[index].src
		player.load()
		$("h6").remove()

		var span = $("<span>")
		$('#current').append($('<h6>'))

		span.append(playlist[index].artist + " - " + playlist[index].title)	 
		
		$("#current h6").append(span)
		
		player.play()
		$('#current h6').scrolltxt();
	}

// Set up event listener to change to next song in playlist

	player.addEventListener('ended', function() {
		nextSong()
	}); 

// Set up music controller event listeners

	play.on("mouseover", function(event) {
		play.children(":first").attr('style', "fill:#101B1B")
		
	})
	play.on("mouseout", function(event) {
		play.children(":first").attr('style', "fill:white")

	})


	pause.on("mouseover", function(event) {
		pause.children(":first").attr('style', "fill:#101B1B")
		pause.children(":last").attr("style", "fill:#101B1B")

		
	})
	pause.on("mouseout", function(event) {
		pause.children(":first").attr('style', "fill:white")
		pause.children(":last").attr("style", "fill:white")

	})
	next.on("mouseover", function(event) {
		next.children(":first").attr("style", "fill:#101B1B")
		next.children(":last").attr("style", "fill:#101B1B")

	})
	next.on("mouseout", function(event) {
		next.children(":first").attr("style", "fill:white")
		next.children(":last").attr("style", "fill:white")

	})
	last.on("mouseover", function(event) {
		last.children(":first").attr("style", "fill:#101B1B")
		last.children(":last").attr("style", "fill:#101B1B")

	})
	last.on("mouseout", function(event) {
		last.children(":first").attr("style", "fill:white")
		last.children(":last").attr("style", "fill:white")

	})

	pause.on("click", function(event) {
		player.pause()
		pause.hide()
		play.show()
	})
	play.on("click", function(event) {
		player.play()
		play.hide()
		pause.show()
	})
	next.on('click', function(event) {
		
		if (player.paused) {
			play.hide()
			pause.show(0)
		}
		nextSong()

	})
	last.on('click', function(event) {
		if (player.paused) {
			play.hide()
			pause.show(0)
		}

		if (index === 0) {
			index = playlist.length - 2
		} else {
			index -= 2	
		}

		nextSong()

	})
});