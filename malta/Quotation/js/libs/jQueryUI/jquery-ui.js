loadFiles("include/js/libs/jQueryUI/");

function loadFiles(path) {
	var escribe = '<link rel="stylesheet" href="' + path + 'jquery-ui-1.8.17.custom.css">\n';
	escribe += '<script src="' + path + 'jquery-ui-1.8.17.custom.min.js"><\/script>\n';
	escribe += '<script src="' + path + 'jquery.ui.core.js"><\/script>\n';
	escribe += '<script src="' + path + 'jquery.ui.widget.js"><\/script>\n';
	escribe += '<script src="' + path + 'jquery.ui.mouse.js"><\/script>\n';
	escribe += '<script src="' + path + 'jquery.ui.draggable.js"><\/script>\n';
	document.write(escribe);
}
