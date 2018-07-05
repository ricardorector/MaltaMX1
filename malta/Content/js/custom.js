// Panel
$(".panel-trigger").click(function(){
	$.panels.show({
		position: 'left',
		forceClose: false
	});
});
$(".panel-close").click(function(){
	$.panels.hide({
		position: 'left'
	});
});


// Backstretch 
// $("#video").backstretch("img/bg-hero.jpg");
$("#lang").backstretch("img/bg-imparables.jpg");
$("#imparables").backstretch("img/bg-imparables.jpg");
$(".separador").backstretch("img/bg-bc2017-01.jpg");


// $(".panel-left").backstretch("img/bg-hero.jpg");


// iOS same window link
var a=document.getElementsByTagName("a");
for(var i=0;i<a.length;i++)
{
	a[i].onclick=function()
	{
		window.location=this.getAttribute("href");
		return false;
	};
}

// Scroll on section
// var hashTagActive = "";
// $(".scroll").click(function (event) {
//   if(hashTagActive !== this.hash) { 
// 	event.preventDefault();
// 		var dest = 0;
// 		if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
// 			dest = $(document).height() - $(window).height();
// 		} else {
// 			dest = $(this.hash).offset().top;
// 		}
// 		//go to destination
// 		$('html,body').animate({
// 			scrollTop: dest
// 		}, 1000, 'swing');
// 		hashTagActive = this.hash;
// 	}
// });

// $("#galeria").unitegallery({
// 	tiles_col_width: 300,
//  	tiles_align:"center",
// 	tiles_space_between_cols: 10,
// });

// $("#galeria2").unitegallery({
// 	tiles_col_width: 300,
//  	tiles_align:"center",
// 	tiles_space_between_cols: 10,
// });

// $('#ios-instrucciones').foundation('open');
// $('#android-instrucciones').foundation('open');
