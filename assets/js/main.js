$( ".navbar-toggler" ).click(function() {
	if(!$( ".navbar-collapse" ).hasClass('show')) {
		$('.navbar').addClass('nav-bg')
	}else {
		setTimeout(function(){ $('.navbar').removeClass('nav-bg'); }, 500);	
	}
});


$( window ).scroll(function() {
	if($(window).scrollTop()>0) {
		$('.navbar').addClass('navbar-scroll-fx')
	}else {
		$('.navbar').removeClass('navbar-scroll-fx')
	}
});


// module 2 movement bg
var inModule = false;
var movementStrength = 50;
var height = movementStrength / $(window).height();
var width = movementStrength / $(window).width();
var newvalueYMoved = 0;

$("body").mousemove(function(e){

	if(!inModule) {
		var pageX = e.pageX - ($(window).width() / 2);
		var pageY = e.pageY - ($(window).height() / 2);
		var newvalueX = width * pageX * -1 - 25 - 50;
		var newvalueY = height * pageY * -1 - 50;
		if(newvalueYMoved!=0)
			$('.module2 .image-wrapper img').css("object-position", newvalueX+"px "+newvalueYMoved+"px");
		else
			$('.module2 .image-wrapper img').css("object-position", newvalueX+"px center");
	}
	
});

$(".module2").mousemove(function(e){
	return false;
	inModule = true;
	var pageX = e.pageX - ($(window).width() / 2);
	var pageY = e.pageY - ($(window).height() / 2);
	var newvalueX = width * pageX * -1 - 25 - 50;
	var newvalueY = height * pageY * -1 - 50;
	newvalueYMoved = newvalueY;
	$('.module2 .image-wrapper img').css("object-position", newvalueX+"px     "+newvalueY+"px");
	$('.module2 .blinking-text').css("right", newvalueX+"px");


});

$(".module2").mouseout(function(e){
	inModule = false;
});

// pillar change image onclick
$( "#pills-item1-tab" ).click(function() {
	
});

$( "#pills-item2-tab" ).click(function() {
	
});

$( "#pills-item3-tab" ).click(function() {
	
});



$(document).ready(function(){

	var password_flag = false;

	callPrompt()

	function callPrompt() {

		bootbox.prompt({
			title: "Enter Password",
			inputType: 'password',
			callback: function (result) {
				if(result=='juliet') {
					return true;
				}else {
					callPrompt();
				}
			}
		});

	}
})


// $(document).ready(function(){
// 	$('.responsive-carousel').slick({
//   dots: true,
//   infinite: true,
//   speed: 300,
//   centerPadding: '40px',
//   slidesToShow: 3,
//   slidesToScroll: 3,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 3,
//         infinite: true,
//         dots: true
//       }
//     },
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 2
//       }
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     }
//     // You can unslick at a given breakpoint now by adding:
//     // settings: "unslick"
//     // instead of a settings object
//   ]
// });
// });
