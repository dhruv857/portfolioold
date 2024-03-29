/*global $:false, google:false*/

var $portfolio = $('#portfolio'),
	$goTop = $('#go-top'),
	$preloader = $('#preloader'),
	InfoBox;

var $window = $(window),
	windowWidth = $window.width(),
	windowTop = $window.scrollTop(),
	mapObject, marker, yPos, coords, TimelineLite;

var App = {

	start: function() {

		// on window resize
		App.onResize();
		// on window load
		App.onLoad();
		// on page scroll
		App.onScroll();
		// on document ready
		App.onMousewheel();
		// initaite slider
		App.sliderInit();
		// bind all events
		App.bind();
		// call google map
		App.map();
		// form validation, captcha, etc.
		App.getInTouch();
		// navigation scroll to any section by .anchor class and #
		App.anchorScroll();
		// scroll to top button
		App.goTop(windowTop);
		// init the parallax effects
		App.homeParallax();
		// init owl carosuel
		App.owlCarousel();
		// sticky header menu
		App.sticky();
		// init the portfolio
		// App.portfolio.start();

	},

	// onScreen: function() {
	//
	// 	if($('.charts').is_on_screen()) {
	// 		App.pies();
	// 	}
	//
	// 	if($('.screens').is_on_screen()) {
	// 		App.screens();
	// 	}
	//
	// 	if($('.facts').is_on_screen()) {
	// 		App.facts();
	// 	}
	//
	// },

	coreValues: function() {

		$('.core-values li').each(function(index) {
			var $this = $(this);
			setTimeout(function() {
				$('.core', $this).delay(index * 100).addClass('rotate');
			}, index * 100);
		});

	},

	customers: function() {

		$('.customers li').each(function(index) {
			$(this).delay(index * 100).animate({'opacity': 1}, 1300);
		});

	},

	facts: function() {

		var $eleNumber;

		$('.facts li:not(.break)').each(function() {
			$eleNumber = $(this).find('strong');
			$eleNumber.animateNumbers($eleNumber.attr('data-number'));
		});

	},

	screens: function() {

		$('.screens .center').delay(500).animate({'opacity': 1}, 800);
		$('.screens .left').delay(1100).animate({'opacity': 1, 'left': -100}, 800, 'easeOutQuint');
		$('.screens .right').delay(1100).animate({'opacity': 1, 'right': -100}, 800, 'easeOutQuint');

	},

	preloaderFinish: function() {

		$preloader.remove();

		// App.onScreen();

	},

	sticky: function() {

		if($(window).scrollTop() > 100) {
			$('#header').addClass('sticky');
		}else{
			$('#header').removeClass('sticky');
		}

	},

	owlCarousel: function() {

		if($('.owl').length) {
			$(".owl").owlCarousel({
				autoPlay : 3000,
				navigation:false,
				paginationSpeed : 1000,
				singleItem : true,
			});
		}

		if($('.owl-inner').length) {
			$(".owl-inner").owlCarousel({
				autoPlay : 3000,
				navigation:true,
				paginationSpeed : 1000,
				singleItem : true
			});
		}
	},



	sliderInit: function() {

		$('#carousel').height($(window).height());

		if($('#carousel').length) {
			$.mbBgndGallery.buildGallery({
				containment:"#carousel",
				timer:2000,
				effTimer:4000,
				controls:"#controls",
				grayScale:false,
				shuffle:true,
				preserveWidth:false,
				effect:"zoom",

				images:[
					"img/carousel/slide-2.jpg",
					"img/carousel/slide.jpg",
					"img/carousel/slide-3.jpg"
				]

			});
		}
	},

	slideText: function(index) {

		$('.slide-text').stop(true,true).animate({'top': (index-1)*-21}, 300, 'easeOutExpo');

	},

	homeParallax: function() {

		$('#portfolio-box').scroll(function() {

			var yPos = -($('#portfolio-box').scrollTop() / -2.5);
			var coords = '50% '+ yPos + 'px';
			$('#project .main-background').css({ backgroundPosition: coords });

		});

		$(window).scroll(function() {

			if(windowWidth > 768) {
				// console.log("try");
				if($('.references').is_on_screen()) {

					yPos = ($(window).scrollTop() - ($('.references').offset().top + $('.references').outerHeight())) * 0.5;
					coords = '50% '+ yPos + 'px';

					$('.references').css({ backgroundPosition: coords });
				}

				if($('.testimonial').is_on_screen()) {

					yPos = ($(window).scrollTop() - ($('.testimonial').offset().top + $('.testimonial').outerHeight())) * 0.5;
					coords = '50% '+ yPos + 'px';

					$('.testimonial').css({ backgroundPosition: coords });
				}
			}

		});
	},

	parallax: function() {

		if(windowWidth > 768) {
			$('.references').parallax("50%", -0.6);
			$('.testimonial').parallax("50%", -0.6);
		}

	},

	onResize: function() {

		$window.resize(function() {

			if($('#portfolio-box.visible').length > 0) {
				$('#portfolio-box.visible').height($(window).height()).width($(window).width());
			}

		});

	},

	onScroll: function() {

		$window.on('scroll', function() {

			App.sticky();

			// App.onScreen();

			App.goTop($(window).scrollTop());

		});

	},

	onLoad: function() {

		$(window).load(function() {

			// App.preloader();

		});

	},

	onMousewheel: function() {
		$('html, body').bind('DOMMouseScroll mousewheel', function() {
			$('html, body').stop(true,false);
		});
	},

	bind: function() {

		$(document).on('click', 'a[href="#"]', function(e) {
			e.preventDefault();
		});

		$('.left ul a', $('#carousel')).bind('click', function(e) {
			e.preventDefault();
			App.carouselSwitch($(this).parent().attr('class'));
		});



		// go top bind
		$goTop.bind('click', function() {
			$('html, body').animate({scrollTop: 0}, 1200, 'easeOutExpo');
		});

		$('#navigation a').bind('click', function() {
			$('html, body').stop(true,false);
		});

		/* mobile menu */
		$("#nav-mobile").on("click", function() {
			$('#navigation').toggleClass('visible');
		});
		$('#navigation a').bind('click', function() {
			$('#navigation').toggleClass('visible');
		});


	},





	goTop: function(windowTop) {

		if(windowTop > 1000) {
			$goTop.css('opacity', 1);
		}else{
			$goTop.css('opacity', 0);
		}

		var footerPosition = ($(document).height() - $window.height()) - $('#footer').height();

		if(windowTop >= footerPosition) {
			$goTop.addClass('bottom');
		}else{
			$goTop.removeClass('bottom');
		}

	},

	map: function() {

		var btn_zoom_in = document.getElementById('zoomin');
		if (btn_zoom_in !== null) {
			google.maps.event.addDomListener(btn_zoom_in, 'click', function() {
				mapObject.setZoom(mapObject.getZoom() + 1 );
			});
		}

		var btn_zoom_out = document.getElementById('zoomout');
		if (btn_zoom_out !== null) {
			google.maps.event.addDomListener(btn_zoom_out, 'click', function() {
				mapObject.setZoom(mapObject.getZoom() - 1 );
			});
		}

		var mapContainer = document.getElementById('map');

		if (mapContainer !== null) {
			App.create_map(mapContainer);
			App.create_marker();
			App.create_info();
		}
	},

	create_map: function(mapContainer) {

		var mapOptions = {
			center: new google.maps.LatLng(40.723027, -73.930715),
			zoom: 13,
			navigationControl: false,
			mapTypeControl: false,
			scrollwheel: false,
			disableDefaultUI: true,
			disableDoubleClickZoom: true
		};

		mapObject = new google.maps.Map(mapContainer, mapOptions);

		var mapStyle = [
			{
				"stylers": [
					{ "saturation": -100 },
					{ "gamma": 1.40 },
					{ "lightness": 25 }
				]
			},{featureType: "poi",elementType: "labels",stylers: [{visibility:"off"}]}
		];

		mapObject.setOptions({styles: mapStyle});
	},

	create_marker: function() {

		var pinImage = new google.maps.MarkerImage('img/marker.png'),
		myPin = new google.maps.LatLng(40.7094727,-74.004302);

		marker = new google.maps.Marker({
			position: myPin,
			map: mapObject,
			title: 'Hello World!',
			icon: pinImage
		});

	},

	create_info: function() {

		var boxText = document.createElement("div");
		boxText.style.cssText = "color:#fff;";

		boxText.innerHTML = "\
			<div class='marker-label'>\
				New York. Address:<br>\
				163 William Street<br>\
				New York, NY 10038<br>\
				USA Tel: +1-917-912-7231.<br>\
				</div>\
			";

		var infoOptions = {
			content: boxText,
			disableAutoPan: true,
			maxWidth: 0,
			pixelOffset: new google.maps.Size(-20, -165),
			zIndex: null,
			boxStyle: {
				background: "url('img/marker-label.png') no-repeat",
				width: "400px",
				height: "215px"
			},
			infoBoxClearance: new google.maps.Size(1, 1),
			isHidden: false,
			pane: "mapPane",
			enableEventPropagation: true
		};

		var ib = new InfoBox(infoOptions);
		ib.open(mapObject, marker);

	},

	getInTouch: function() {

		var $getInTouch = $('.get-in-touch form');

		$('button', $getInTouch).bind('click', function(e) {

			e.preventDefault();

			$.ajax({
				url: $getInTouch.attr('action'),
				type: $getInTouch.attr('method'),
				dataType: 'json',
				data: $getInTouch.serialize(),
				success: function(data) {

					if(data.success) {

						var $captchaImage = $('.captcha-img', $getInTouch);

						$('input, textarea', $getInTouch).removeClass('error').val('');
						$captchaImage.attr('src', $captchaImage.attr('src') + '?' + Math.ceil(Math.random() * 1000));

					}else{

						$('input, textarea', $getInTouch).removeClass('error');

						for (i = 0; i<data.length; i++) {

							$('input[name="' + data[i] + '"], textarea[name="' + data[i] + '"]', $getInTouch).addClass('error');

						}
					}
				}
			});
		});

	},

	anchorScroll: function() {

		$(".anchor").click(function(event) {

			var full_url = this.href,
			parts = full_url.split("#"),
			trgt = parts[1],
			targetElement = $("#"+trgt),
			target_offset = targetElement.offset(),
			target_top = target_offset.top - 60;

			if(targetElement.length) {

				event.preventDefault();

				$('html, body').animate({scrollTop:target_top}, 1000, 'easeOutExpo');

			}
		});
	},

	mobileMenu: function() {

		if($('#navigation').hasClass('visible')) {
			$('#navigation').removeClass('visible');
		}

	},
};



$.fn.is_on_screen = function(){

    var win = $(window);

    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    // var bounds = $(this).offset();
		// console.log(bounds);
    // bounds.right = bounds.left + this.outerWidth();
    // bounds.bottom = bounds.top + this.outerHeight();
		return false;
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};

/* navigation highlight */
var sections = {},
_height = $(window).height(),
i = 0;

$(document).ready(function() {

    $('section').each(function(){
        sections[this.id] = $(this).offset().top;
    });

	navHighlight();

    $(document).scroll(function() {
        navHighlight();
    });
});

function navHighlight() {

	var pos = $(document).scrollTop() - ($window.height() / 2);

	for(var i in sections) {

		if(sections[i] > pos && sections[i] < pos + _height) {
			$('#navigation a').removeClass('active');
			$('#navigation a[href$="#' + i + '"]').addClass('active');
		}
	}
}
