//  Funciones Calculadora
function calculaConsumo(consD,diasCons)
{
	return consD * diasCons;
}
function calculaConsumoTotalAnimal(totalConsumo,totalAnimales)
{
	return totalConsumo * totalAnimales;
}
function calculaNumeroSacos(consumoAnimales,pesoSaco)
{
	return consumoAnimales / pesoSaco;
}

// Variables jQuery
var $comboSelect = $('#alimentoAnimal');
var $btnCalcular = $('#btnCalc');
var $openOpt = '<option class="bolsaAlimento">';
var $closeOpt = '</option>';
var $numCerdos = $('.num');


// Variables Datos
var nombreAlim = cerdos.nombre;
var numAlimCerdo = nombreAlim.length;


// Ingresa valores (options) en select
for ( var i = 0; i < numAlimCerdo; i++ )
{
	var $completeOption = $openOpt + nombreAlim[i] + $closeOpt;
	$comboSelect.append($completeOption);
}

$btnCalcular.click(function()
{
	// valor index eleccion de alimento
	var valorCambio = $comboSelect.val();
	var index = nombreAlim.indexOf(valorCambio);
	// valor numero ingresado
	var numeroAnimales = Number($numCerdos.val());

	//  obtener valores
	var consumoDiario = cerdos.consumoDiario[index];
	var diasConsumo = cerdos.diasConsumo[index];
	var pesoSaco = cerdos.pesoSaco[index];
	


	//  validadores
	if (numeroAnimales === 0) {
		alert('Por favor ingresa un número de animales válido');
	} else {
		//  usar funciones calculo
		var calculaCons = calculaConsumo(consumoDiario,diasConsumo);
		calculaCons = Math.round(calculaCons);

		var consumoAnimales = calculaConsumoTotalAnimal(calculaCons,numeroAnimales);
		consumoAnimales = Math.round(consumoAnimales);

		var totalSacos = calculaNumeroSacos(consumoAnimales,pesoSaco)
		totalSacos = Math.round(totalSacos);

		var arrayValores = 
		[
			'Total a consumir / animal: ' +calculaCons,
			'Consumo de todos los animales Kg: ' +  consumoAnimales,
			'No. de Sacos: ' +  totalSacos
		];

		// Mostrar valores
		var $inicioP = '<p>';
		var $finP = '</p>';
		var $divResultados = $('.resultados');
		$divResultados.empty().fadeOut();
		$divResultados.append('<h4>Tu Cálculo</h4>');
		for ( j = 0; j < arrayValores.length; j++) {
			var $resultados = $inicioP + arrayValores[j] + $finP;
			$divResultados.append($resultados);
		}
		$divResultados.fadeIn();
		// console.log(numeroAnimales);
		console.log(arrayValores);

	}

});













