//  Funciones Calculadora
function calculaConsumo(consD, diasCons) {
    return consD * diasCons;
}
function calculaConsumoTotalAnimal(totalConsumo, totalAnimales) {
    return totalConsumo * totalAnimales;
}
function calculaNumeroSacos(consumoAnimales, pesoSaco) {
    return consumoAnimales / pesoSaco;
}

// Variables jQuery
var $comboSelect = $('#alimentoAnimal');
var $btnCalcular = $('#btnCalc');
var $openOpt = '<option class="bolsaAlimento" value="';
var $midOpt = '">';
var $closeOpt = '</option>';
var $numAnimales = $('.num');
var nombreEspecie = $('.breadcrumbs').attr('id');

var especie;

if (nombreEspecie != null && nombreEspecie == 'Cerdos') {
    especie = cerdos;
} else if (nombreEspecie != null && nombreEspecie == 'Pollo Engorda') {
    especie = polloEngorda;
} else if (nombreEspecie != null && nombreEspecie == 'Aves Postura') {
    especie = avePostura;
} else if (nombreEspecie != null && nombreEspecie == 'Pavos') {
    especie = pavos;
} else if (nombreEspecie != null && nombreEspecie == 'Codornices') {
    especie = codorniz;
} else if (nombreEspecie != null && nombreEspecie == 'Conejos') {
    especie = conejo;
}
if (especie != null) {
    // Variables Datos
    var idsAlim = especie.ids;
    var nombreAlim = especie.nombre;
    var numAlimAnimales = nombreAlim.length;

    // Ingresa valores (options) en select
    for (var i = 0; i < numAlimAnimales; i++) {
        var $completeOption = $openOpt + idsAlim[i] + $midOpt + nombreAlim[i] + $closeOpt;
        $comboSelect.append($completeOption);
    }
}
$btnCalcular.click(function () {
    // valor index eleccion de alimento
    var valorCambio = $comboSelect.val();
    console.log(valorCambio);
    var index = idsAlim.indexOf(valorCambio);
    console.log(index);
    // valor numero ingresado
    var numeroAnimales = Number($numAnimales.val());

    //  obtener valores
    var consumoDiario = especie.consumoDiario[index];
    consumoDiario = parseFloat(consumoDiario);
    var diasConsumo = especie.diasConsumo[index];
    var pesoSaco = especie.pesoSaco[index];
    console.log(consumoDiario);
    console.log(diasConsumo);



    //  validadores
    if (numeroAnimales === 0) {
        alert('Por favor ingresa un número de animales válido');
    } else {
        //  usar funciones calculo
        var calculaCons = parseFloat(Math.round(calculaConsumo(consumoDiario, diasConsumo) * 100) / 100).toFixed(2);        

        var consumoAnimales = calculaConsumoTotalAnimal(calculaCons, numeroAnimales);
        if (consumoAnimales <= 1){
            consumoAnimales = consumoAnimales;
        } else{
            consumoAnimales = parseFloat(Math.round(consumoAnimales * 100) / 100).toFixed(2);
        }

        var totalSacos = calculaNumeroSacos(consumoAnimales, pesoSaco)
        totalSacos = Math.ceil(totalSacos);
        if (totalSacos === 0){
            totalSacos = 1
        } else {
            totalSacos = totalSacos;
        }
        // totalSacos = parseFloat(totalSacos);

        var arrayValores =
		[
			'Total a consumir / animal: ' + calculaCons + 'Kg',
			'Consumo de todos los animales: ' + consumoAnimales + 'Kg',
			'No. de Sacos: ' + totalSacos
		];

        // Mostrar valores
        var $inicioP = '<p>';
        var $finP = '</p>';
        var $divResultados = $('.resultados');
        $divResultados.empty().fadeOut();
        $divResultados.append('<h4>Tu Cálculo</h4>');
        for (j = 0; j < arrayValores.length; j++) {
            var $resultados = $inicioP + arrayValores[j] + $finP;
            $divResultados.append($resultados);
        }
        $divResultados.fadeIn();
        // console.log(numeroAnimales);
        // console.log(arrayValores);
        // console.log(consumoDiario);
        console.log(0.02 * 7);
    }

});
