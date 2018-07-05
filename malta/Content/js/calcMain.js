$( document ).ready(function() {
        console.log( "ready!" );
        // Variables jQuery
        var $comboEspecie = $('#comboEspecie');
        
        var $openOpt = '<option class="bolsaAlimento" value="';
        var $midOpt = '">';
        var $closeOpt = '</option>';
        var $numAnimales = $('#aNum');

        $comboEspecie.append('<option class="bolsaAlimento" value="0">Selecciona</option>');
        // Ingresa valores (options) en select
        for (var i = 0; i < especies.length; i++) {
            var $completeOption = $openOpt + especies[i].id + $midOpt + especies[i].nombre + $closeOpt;
            $comboEspecie.append($completeOption);
        }
    });
    $('#btnCalc').click(function () {
        // valor index eleccion de alimento
        console.log ("click");
        var idProducto = $('#comboProducto').val();
        var numeroAnimales = Number($numAnimales.val());
        //  validadores
        if (numeroAnimales === 0) {
            alert('Por favor ingresa un número de animales válido');
        } 
        else if (idProducto == 0) {
           alert('Por favor elige un producto');
        } 
        else {
            var consumoDiario = valores[idProducto].consumoDiario;
            consumoDiario = parseFloat(consumoDiario);
            var diasConsumo = valores[idProducto].diasConsumo;
            var pesoSaco = valores[idProducto].pesoSaco;
            console.log(consumoDiario);
            console.log(diasConsumo);
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
    
    function selectEspecie() {
        var idEspecie = $('#comboEspecie').val();
        var $comboMarca = $('#comboMarca');
        $comboMarca.empty();
        if (idEspecie == 0)
            return;
        
        $comboMarca.append('<option class="bolsaAlimento" value="0">Selecciona</option>');
        var marcasEspecie = marcas[idEspecie];
        for (var i = 0; i < marcasEspecie.length; i++) {
            var $completeOption = $openOpt + marcasEspecie[i].id + $midOpt + marcasEspecie[i].nombre + $closeOpt;
            $comboMarca.append($completeOption);
        }
    }
    function selectMarca() {
        var idMarca = $('#comboMarca').val();
        var $comboLinea = $('#comboLinea');
		$comboLinea.empty();
		if (idMarca == 0)
			return;
		
		$comboLinea.append('<option class="bolsaAlimento" value="0">Selecciona</option>');
		var lineasMarca = lineas[idMarca];
		for (var i = 0; i < lineasMarca.length; i++) {
            var $completeOption = $openOpt + lineasMarca[i].id + $midOpt + lineasMarca[i].nombre + $closeOpt;
            $comboLinea.append($completeOption);
        }
    }
    function selectLinea() {
        var idLinea = $('#comboLinea').val();
        var $comboProducto = $('#comboProducto');
		$comboProducto.empty();
		if (idLinea == 0)
			return;
        console.log(idLinea);
        $comboProducto.append('<option class="bolsaAlimento" value="0">Selecciona</option>');
		var productosLinea = productos[idLinea];
		for (var i = 0; i < productosLinea.length; i++) {
            var $completeOption = $openOpt + productosLinea[i].id + $midOpt + productosLinea[i].nombre + $closeOpt;
            $comboProducto.append($completeOption);
        }
    }