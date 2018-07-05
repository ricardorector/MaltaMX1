// JS que recalcula la altura de un div contenedor para posicionar un div interno de acuerdo a la altura de dispositivos 

var heightIntro = $('#intro').height();//obtener altura de Div "contenedor"
var heightText = $('.texto-inicio').height();//obtener altura de Div "texto"

var restHeight = heightIntro - heightText; //resta (diferencia de alturas)
var mitadRest = restHeight / 2; // coloca a la mitad de la altura el div

$('.texto-inicio').css({'padding-top' : mitadRest}); //agrega margen "css" con los valores anteriores


//Hace lo msimo de arriba con el evento resize de la ventana
$(window).resize(function(){
	var heightIntro = $('#intro').height();
	var restHeight = heightIntro - heightText;
	var mitadRest = restHeight / 2;
	$('.texto-inicio').css({'padding-top' : mitadRest});
});


console.log (heightIntro);
console.log (heightText);