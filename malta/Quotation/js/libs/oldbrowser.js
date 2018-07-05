loadDiv();

function loadDiv() {
	var escribe = '<div class="changeBrowser">\n';
	escribe += '	<span class="icon close">Cerrar</span>\n';
	escribe += '	<p>Este sitio funciona con un amplio rango de navegadores. Sin embargo, si quieres experimentar al máximo las características de este sitio, actualiza a la más reciente versión de un moderno navegador.</p>\n';
	escribe += '	<span class="moreInfo">Más información...</span>\n';
	escribe += '	<div class="showFeatures">\n';
	escribe += '		<p>Encuentra la última versión de los navegadores soportados:</p>\n';
	escribe += '		<ul>\n';
	escribe += '			<li><a href="https://www.google.com/chrome?hl=es" target="_blank">Chrome</a></li>\n';
	escribe += '			<li><a href="http://www.mozilla.org/es-MX/firefox/new/" target="_blank">Firefox</a></li>\n';
	escribe += '			<li><a href="http://support.apple.com/kb/DL1531" target="_blank">Safari</a></li>\n';
	escribe += '			<li><a href="http://www.opera.com/download/" target="_blank">Opera</a></li>\n';
	escribe += '			<li><a href="http://windows.microsoft.com/es-XL/internet-explorer/downloads/ie-9/worldwide-languages" target="_blank">Internet Explorer</a></li>\n';
	escribe += '			<li><a href="http://www.google.com/chromeframe" target="_blank">Chrome Frame</a></li>\n';
	escribe += '		</ul>\n';
	escribe += '		<p class="whattodo">Tengo Windows XP y no puedo actualizar a IE9, ¿qué hago?</p>\n';
	escribe += '		<ol>\n';
	escribe += '			<li>Descarga <a href="http://www.google.com/chromeframe" target="_blank">Chrome Frame</a> para hacer tu experiencia desde IE6, IE7 u IE8.</li>\n';
	escribe += '			<li>Descarga otros navegadores que si puedan ser instalados en XP como <a href="https://www.google.com/chrome?hl=esde" target="_blank">Chrome</a>, <a href="http://www.mozilla.org/es-MX/firefox/new/" target="_blank">Firefox</a> o <a href="http://support.apple.com/kb/DL1531" target="_blank">Safari</a>.</li>\n';
	escribe += '		</ol>\n';
	escribe += '	</div>\n';
	escribe += '</div>\n';
	document.write(escribe);
}
