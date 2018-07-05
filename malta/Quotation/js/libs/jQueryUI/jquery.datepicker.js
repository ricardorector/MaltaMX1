jQuery(function($){
	// $.datepicker.regional['es'] = {
		// closeText: 'Cerrar',
		// prevText: '&#x3c;Ant',
		// nextText: 'Sig&#x3e;',
		// currentText: 'Hoy',
		// monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
		// 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
		// monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
		// 'Jul','Ago','Sep','Oct','Nov','Dic'],
		// dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
		// dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
		// dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
		// weekHeader: 'Sm',
		// dateFormat: 'dd/mm/yy',
		// firstDay: 1,
		// isRTL: false,
		// showMonthAfterYear: false,
		// yearSuffix: ''};
	// $.datepicker.setDefaults($.datepicker.regional['es']);
	
	$.datepicker.regional['en-US'] = {
		closeText: 'Done',
		prevText: 'Prev',
		nextText: 'Next',
		currentText: 'Today',
		monthNames: ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
		weekHeader: 'Wk',
		dateFormat: 'yy/mm/dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['en-US']);
});