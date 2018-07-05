var especies = [
    {
        "id":"5",
        "nombre":"Cerdos"
    },
    {
        "id":"6",
        "nombre":"Aves de Postura"
    },
    {
        "id":"7",
        "nombre":"Pollo Engorda"
    },
    {
        "id":"9",
        "nombre":"Pavos"
    },
    {
        "id":"10",
        "nombre":"Codornices"
    },
    {
        "id":"12",
        "nombre":"Conejos"
    }
];

var marcas = {
    "5":[   
        {"id":"4","nombre":"Youpig!®"},
        {"id":"17","nombre":"Growpig!®"},
        {"id":"19","nombre":"Api-Aba Premium®"},
        {"id":"20","nombre":"Api-Aba Balance®"},
        {"id":"18","nombre":"Malta Premium®"},
        {"id":"57","nombre":"Malta Balance®"},
        {"id":"20","nombre":"Api-Aba Balance®"}
    ],
    "6":[
        {"id":"30","nombre":"Súper Premium®"},
        {"id":"7","nombre":"Api-Aba Premium®"},
        {"id":"47","nombre":"Api-Aba Balance®"},
        {"id":"48","nombre":"Malta Balance®"},
        {"id":"58","nombre":"Malta Premium®"}
    ],
    "7":[
         {"id":"45","nombre":"Súper Premium"},
         {"id":"29","nombre":"Malta Premium®"},
         {"id":"33","nombre":"Malta Balance®"},
         {"id":"59","nombre":"Api-Aba Premium®"},
         {"id":"60","nombre":"Api-Aba Balance®"},
         {"id":"33","nombre":"Malta Balance®"}],
    "9":[
        {"id":"8","nombre":"Pavo Max®"},
        {"id":"53","nombre":"Pavo Ganador®"}
    ],
    "10":[{"id":"9","nombre":"Premium"}],
    "12":[
        {"id":"5","nombre":"Starlap®"},
        {"id":"54","nombre":"Conejo Ganador®"},
        {"id":"66","nombre":"Nutriconejos®"}
    ]
};

var lineas = {
    "4":[
         {"id":"4","nombre":"Youpig!®"}
         ],
    "17":[
          {"id":"18","nombre":"Growpig!®"}
        ],
    "19":[
          {"id":"20","nombre":"Super Apilac®"},
          {"id":"50","nombre":"Carnerina®"}
          ],
    "20":[
          {"id":"21","nombre":"Pork®"},
          {"id":"107","nombre":"Cerdo Ganador® 5Kg"}
          ],
    "18":[
          {"id":"51","nombre":"Cerdipower®"},
          {"id":"75","nombre":"Super Apilac®"}
          ],
    "57":[
          {"id":"76","nombre":"Súper Pork®"},
          {"id":"108","nombre":"Cerdo Ganador® 5Kg"}
        ],
    "30":[
        {"id":"45","nombre":"Genesa®"},
        {"id":"63","nombre":"Golden Egg®"}
    ],
    "7":[
        {"id":"7","nombre":"Super Baby®"},
        {"id":"83","nombre":"Pollorina®"}
    ],
    "47":[
        {"id":"64","nombre":"Pone Oro®"},
        {"id":"109","nombre":"Gallina Ganador"}
    ],
    "48":[
        {"id":"66","nombre":"Pone Oro®"},
        {"id":"97","nombre":"Multi Aves®"},
        {"id":"110","nombre":"Gallina Ganador®"}
    ],
    "58":[
        {"id":"77","nombre":"Super Baby®"},
        {"id":"78","nombre":"Pollorina®"}
    ],
    "45":[{"id":"62","nombre":"Genesa®"}],
    "29":[{"id":"47","nombre":"Caporina®"}],
    "33":[{"id":"49","nombre":"Pollo Especial®"}],
    "59":[{"id":"79","nombre":"Caporina®"}],
    "60":[{"id":"80","nombre":"Pollo Oro®"},
          {"id":"105","nombre":"Pollo Ganador® 5Kg"}],
    "33":[{"id":"106","nombre":"Pollo Ganador® 5Kg"}],
    "8":[{"id":"8","nombre":"Pavo Max®"}],
    "53":[{"id":"60","nombre":"Pavo Ganador® 40Kg"},
         {"id":"103","nombre":"Pavo Ganador® 5Kg"}],
    "9":[{"id":"9","nombre":"Codorniz"}],
    "5":[{"id":"5","nombre":"STARLAP®"}],
    "54":[{"id":"69","nombre":"Conejo Ganador 40Kg®"},
         {"id":"104","nombre":"Conejo Ganador 5Kg®"}],
    "66":[{"id":"91","nombre":"Nutriconejos®"}]
};
var productos = {
    "4":[{"id":"68","nombre":"Youpig! Baby","pesoSaco":"25","consumoDiario":"0.024","periodoConsumo":"0-21","diasConsumo":"21"},
         {"id":"69","nombre":"Youpig! 1","pesoSaco":"25","consumoDiario":"0.282","periodoConsumo":"22-32","diasConsumo":"11"},
         {"id":"70","nombre":"Youpig! 2","pesoSaco":"40","consumoDiario":"0.4","periodoConsumo":"33-42","diasConsumo":"10"},
         {"id":"71","nombre":"Youpig! 3","pesoSaco":"40","consumoDiario":"0.686","periodoConsumo":"43-49","diasConsumo":"7"},
         {"id":"72","nombre":"Youpig! Inicio","pesoSaco":"40","consumoDiario":"0.857","periodoConsumo":"50-70","diasConsumo":"21"}],
    "18":[{"id":"73","nombre":"Growpig! Crecimiento","pesoSaco":"40","consumoDiario":"1.76","periodoConsumo":"71-95","diasConsumo":"25"},
          {"id":"74","nombre":"Growpig! Desarrollo","pesoSaco":"40","consumoDiario":"2.5","periodoConsumo":"96-121","diasConsumo":"26"},
          {"id":"75","nombre":"Growpig! Poder","pesoSaco":"40","consumoDiario":"3.333","periodoConsumo":"122-145","diasConsumo":"24"}],
    "20":[{"id":"78","nombre":"Súper Apilac Ultra 1","pesoSaco":"25","consumoDiario":"0.135","periodoConsumo":"3 - 35 dias","diasConsumo":"33"},
          {"id":"79","nombre":"Súper Apilac 2","pesoSaco":"25","consumoDiario":"0.6","periodoConsumo":"36-49 dias","diasConsumo":"13"},
          {"id":"80","nombre":"Súper Apilac 3","pesoSaco":"25","consumoDiario":"0.96","periodoConsumo":"50-70 días","diasConsumo":"20"}],
    "50":[{"id":"81","nombre":"Carnerina No. 1","pesoSaco":"40","consumoDiario":"1.4","periodoConsumo":"71-77","diasConsumo":"6"},
          {"id":"82","nombre":"Carnerina No. 2","pesoSaco":"40","consumoDiario":"2","periodoConsumo":"78-119","diasConsumo":"41"},
          {"id":"83","nombre":"Carnerina No. 3","pesoSaco":"40","consumoDiario":"3.5","periodoConsumo":"120-154","diasConsumo":"34"},
          {"id":"85","nombre":"Carnerina No.4 Lactancia","pesoSaco":"40","consumoDiario":"3.5","periodoConsumo":"114","diasConsumo":"114"},
          {"id":"86","nombre":"Carnerina No.5 Gestación","pesoSaco":"40","consumoDiario":"7.5","periodoConsumo":"0-28","diasConsumo":"28"}],
    "21":[{"id":"89","nombre":"Iniciapork Mejorado","pesoSaco":"40","consumoDiario":"1.4","periodoConsumo":"71-98","diasConsumo":"27"},
          {"id":"90","nombre":"Crecipork Mejorado","pesoSaco":"40","consumoDiario":"2","periodoConsumo":"91-133","diasConsumo":"42"},
          {"id":"91","nombre":"Engordapork Mejorado","pesoSaco":"40","consumoDiario":"3.5","periodoConsumo":"133-175","diasConsumo":"42"}],
    "51":[{"id":"94","nombre":"Cerdipower Crecimiento","pesoSaco":"40","consumoDiario":"2.2","periodoConsumo":"78-119","diasConsumo":"41"},
          {"id":"95","nombre":"Cerdipower Finalizador","pesoSaco":"40","consumoDiario":"3.51","periodoConsumo":"20-154","diasConsumo":"34"},
          {"id":"96","nombre":"Cerdipower Lactancia","pesoSaco":"40","consumoDiario":"7.5","periodoConsumo":"0-28","diasConsumo":"28"},
          {"id":"97","nombre":"Cerdipower Gestación","pesoSaco":"40","consumoDiario":"3.5","periodoConsumo":"114","diasConsumo":"114"}],
    "75":[{"id":"225","nombre":"Súper Apilac Ultra 1","pesoSaco":"25","consumoDiario":"0.135","periodoConsumo":"3 - 35 dias","diasConsumo":"33"},
          {"id":"226","nombre":"Súper Apilac Ultra 2","pesoSaco":"25","consumoDiario":"0.6","periodoConsumo":"36-49 dias","diasConsumo":"13"},
          {"id":"227","nombre":"Súper Apilac 3","pesoSaco":"25","consumoDiario":"0.96","periodoConsumo":"50-70 días","diasConsumo":"20"}
          ],
    "76":[{"id":"228","nombre":"Iniciapork Mejorado","pesoSaco":"40","consumoDiario":"1.4","periodoConsumo":"71-98","diasConsumo":"27"},
          {"id":"229","nombre":"Crecipork Mejorado","pesoSaco":"40","consumoDiario":"1.4","periodoConsumo":"71-98","diasConsumo":"27"},
          {"id":"230","nombre":"Engordapork Mejorado","pesoSaco":"40","consumoDiario":"2","periodoConsumo":"91-133","diasConsumo":"42"},
          {"id":"231","nombre":"Reprodupork Mejorado","pesoSaco":"40","consumoDiario":"3.5","periodoConsumo":"133-175","diasConsumo":"42"},
          {"id":"232","nombre":"Concentrapork Mejorado","pesoSaco":"40","consumoDiario":"3.5","periodoConsumo":"114","diasConsumo":"114"}
          ],
    "51":[{"id":"270","nombre":"Cerdipower Iniciación","pesoSaco":"40","consumoDiario":"1.4","periodoConsumo":"71-77","diasConsumo":"6"}],
    "45":[{'id':'100','nombre':'Genesa','pesoSaco':'40','consumoDiario':'0.01','periodoConsumo':'1er semana','diasConsumo':'7'}],
    "63":[{'id':'101','nombre':'Golden egg Fase 1','pesoSaco':'40','consumoDiario':'0.1','periodoConsumo':'17-36 semanas','diasConsumo':'133'},
{'id':'102','nombre':'Golden egg Fase 2','pesoSaco':'40','consumoDiario':'0.1','periodoConsumo':'37-60 semanas','diasConsumo':'161'},
{'id':'103','nombre':'Golden egg Fase 3','pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'61-103 semanas','diasConsumo':'294'},
{'id':'104','nombre':'Golden egg Pelecha','pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'Segundo ciclo','diasConsumo':'280'}],
    "7":[
{'id':'105','nombre':'Super-Baby Plus Te','pesoSaco':'40','consumoDiario':'0.044','periodoConsumo':'2-10 semanas','diasConsumo':'56'}],
    "83":[
{'id':'106','nombre':'Pollorina No. 1 Plus Te','pesoSaco':'40','consumoDiario':'0.055','periodoConsumo':'7-10 semanas','diasConsumo':'21'},
{'id':'107','nombre':'Pollorina No. 2 Plus Te','pesoSaco':'40','consumoDiario':'0.085','periodoConsumo':'11-13 semanas','diasConsumo':'14'},
{'id':'108','nombre':'Pollorina Prepostura','pesoSaco':'40','consumoDiario':'0.075','periodoConsumo':'14-16 semanas','diasConsumo':'14'},
{'id':'110','nombre':'Pollorina Fase II','pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'37-60 semanas','diasConsumo':'161'},
{'id':'111','nombre':'Pollorina Fase III','pesoSaco':'40','consumoDiario':'0.115','periodoConsumo':'61-103 semanas','diasConsumo':'294'},
{'id':'112','nombre':'Pollorina Pelecha Completo','pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'Segundo ciclo','diasConsumo':'280'}],
    "64":[
{'id':'113','nombre':'Pone Oro Iniciacion','pesoSaco':'40','consumoDiario':'0.5','periodoConsumo':'0-10 semanas','diasConsumo':'70'},
{'id':'114','nombre':'Pone Oro Desarrollo','pesoSaco':'40','consumoDiario':'0.7','periodoConsumo':'11-18 semanas','diasConsumo':'49'},
{'id':'115','nombre':'Pone Oro 16% Plus Te','pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'Toda etapa de postura','diasConsumo':'420'}],
    "66":[
{'id':'170','nombre':'Pone Oro Iniciacion','pesoSaco':'40','consumoDiario':'0.5','periodoConsumo':'0-10 semanas','diasConsumo':'70'},
{'id':'171','nombre':'Pone Oro Desarrollo','pesoSaco':'40','consumoDiario':'0.7','periodoConsumo':'11-18 semanas','diasConsumo':'49'},
{'id':'172','nombre':'Pone Oro 16% Plus Te','pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'Toda etapa de postura','diasConsumo':'420'}],
    "77":[
{'id':'234','nombre':'Super-Baby Plus Te','pesoSaco':'40','consumoDiario':'0.044','periodoConsumo':'2-10 semanas','diasConsumo':'56'}],
    "78":[
{'id':'235','nombre':'Pollorina No. 1 Plus Te','pesoSaco':'40','consumoDiario':'0.055','periodoConsumo':'7-10 semanas','diasConsumo':'21'},
{'id':'236','nombre':'Pollorina No. 2 Plus Te','pesoSaco':'40','consumoDiario':'0.085','periodoConsumo':'11-13 semanas','diasConsumo':'14'},
{'id':'237','nombre':'Pollorina Prepostura','pesoSaco':'40','consumoDiario':'0.075','periodoConsumo':'14-16 semanas','diasConsumo':'14'},
{'id':'239','nombre':'Pollorina Fase II','pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'37-60 semanas','diasConsumo':'161'},
{'id':'240','nombre':'Pollorina Fase III','pesoSaco':'40','consumoDiario':'0.115','periodoConsumo':'61-103 semanas','diasConsumo':'294'},
{'id':'241','nombre':'Pollorina Pelecha Completo','pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'Segundo ciclo','diasConsumo':'280'}],
    "97":[
{'id':'286','nombre':'Multi Aves','pesoSaco':'40','consumoDiario':'0.5','periodoConsumo':'0-10 semanas','diasConsumo':'70'}],
    "109":[
{'id':'313','nombre':'Pone Oro 16%','pesoSaco':'40','consumoDiario':'0.7','periodoConsumo':'11-18 semanas','diasConsumo':'49'}],
    "110":[
{'id':'314','nombre':'Pone Oro 16%','pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'Toda etapa de postura','diasConsumo':'420'}],
    "62":[
{'id':'117','nombre':'Genesa','pesoSaco':'40','consumoDiario':'0.02','periodoConsumo':'0-7','diasConsumo':'7'}],
    "47":[
{'id':'118','nombre':'Caporina Iniciador','pesoSaco':'40','consumoDiario':'0.043','periodoConsumo':'0-14','diasConsumo':'14'},
{'id':'119','nombre':'Caporina Crecimiento','pesoSaco':'40','consumoDiario':'0.118','periodoConsumo':'15-28','diasConsumo':'13'},
{'id':'120','nombre':'Caporina Finalizador','pesoSaco':'40','consumoDiario':'0.198','periodoConsumo':'29-42','diasConsumo':'13'}],
    "49":[
{'id':'121','nombre':'Pollito Especial','pesoSaco':'40','consumoDiario':'0.06','periodoConsumo':'0-21','diasConsumo':'21'},
{'id':'123','nombre':'Pollo Especial','pesoSaco':'40','consumoDiario':'0.249','periodoConsumo':'22-42','diasConsumo':'10'},
{'id':'125','nombre':'Pollo Oro Depósito','pesoSaco':'40','consumoDiario':'0.25','periodoConsumo':'2','diasConsumo':'2'}
        ],
    "79":[
{'id':'242','nombre':'Caporina Iniciador','pesoSaco':'40','consumoDiario':'0.043','periodoConsumo':'0-14','diasConsumo':'14'},
{'id':'243','nombre':'Caporina Crecimiento','pesoSaco':'40','consumoDiario':'0.118','periodoConsumo':'15-28','diasConsumo':'13'},
{'id':'244','nombre':'Caporina Finalizador','pesoSaco':'40','consumoDiario':'0.198','periodoConsumo':'29-42','diasConsumo':'13'}],
    "80":[
{'id':'246','nombre':'Pollito Oro','pesoSaco':'40','consumoDiario':'0.06','periodoConsumo':'0-21','diasConsumo':'21'},
{'id':'248','nombre':'Pollo Oro','pesoSaco':'40','consumoDiario':'0.249','periodoConsumo':'22-42','diasConsumo':'10'},
{'id':'249','nombre':'Pollo Oro Deposito','pesoSaco':'40','consumoDiario':'0.25','periodoConsumo':'2','diasConsumo':'2'}],
    "8":[
{'id':'138','nombre':'Pavo Max Premium 1','pesoSaco':'40','consumoDiario':'0.051','periodoConsumo':'0-4 semanas','diasConsumo':'28'},
{'id':'139','nombre':'Pavo Max Premium 2','pesoSaco':'40','consumoDiario':'0.184','periodoConsumo':'5-8 semanas','diasConsumo':'28'},
{'id':'140','nombre':'Pavo Max Premium 3','pesoSaco':'40','consumoDiario':'0.393','periodoConsumo':'9-12 semanas','diasConsumo':'28'}],
    "60":[
{'id':'141','nombre':'Pavo Iniciación','pesoSaco':'40','consumoDiario':'0.08','periodoConsumo':'0-5 semanas','diasConsumo':'35'},
{'id':'142','nombre':'Pavo Desarrollo','pesoSaco':'40','consumoDiario':'0.33','periodoConsumo':'6-10 semanas','diasConsumo':'28'},
{'id':'143','nombre':'Pavo Engorda','pesoSaco':'40','consumoDiario':'0.469','periodoConsumo':'11 semanas a salida al mercado','diasConsumo':'98'}],
    "9":[
{'id':'144','nombre':'Codorniz Inicio','pesoSaco':'40','consumoDiario':'0.00761','periodoConsumo':'0-21 días','diasConsumo':'21'},
{'id':'145','nombre':'Codorniz Engorda','pesoSaco':'40','consumoDiario':'0.026','periodoConsumo':'22- 45 sacrificio o postura?','diasConsumo':'23'},
{'id':'146','nombre':'Codorniz Postura','pesoSaco':'40','consumoDiario':'0.03','periodoConsumo':'45-405 dias','diasConsumo':'360'}],
    "5":[
{'id':'164','nombre':'Starlap Conejos Destete','pesoSaco':'40','consumoDiario':'0.1','periodoConsumo':'28-42','diasConsumo':'17'},
{'id':'165','nombre':'Starlap Conejos Engorda','pesoSaco':'40','consumoDiario':'0.15','periodoConsumo':'42-70','diasConsumo':'28'},
{'id':'166','nombre':'Starlap Conejos Reproductor CE','pesoSaco':'40','consumoDiario':'0.15','periodoConsumo':'70-120 hembras y 70-180 machos','diasConsumo':'50'}],
    "69":[
{'id':'167','nombre':'Conejo Ganador','pesoSaco':'40','consumoDiario':'0.15','periodoConsumo':'28-70 días','diasConsumo':'42'}]
};

var valores={
    '68':{'pesoSaco':'25','consumoDiario':'0.024','periodoConsumo':'0-21','diasConsumo':'21'},
'69':{'pesoSaco':'25','consumoDiario':'0.282','periodoConsumo':'22-32','diasConsumo':'11'},
'70':{'pesoSaco':'40','consumoDiario':'0.4','periodoConsumo':'33-42','diasConsumo':'10'},
'71':{'pesoSaco':'40','consumoDiario':'0.686','periodoConsumo':'43-49','diasConsumo':'7'},
'72':{'pesoSaco':'40','consumoDiario':'0.857','periodoConsumo':'50-70','diasConsumo':'21'},
'73':{'pesoSaco':'40','consumoDiario':'1.76','periodoConsumo':'71-95','diasConsumo':'25'},
'74':{'pesoSaco':'40','consumoDiario':'2.5','periodoConsumo':'96-121','diasConsumo':'26'},
'75':{'pesoSaco':'40','consumoDiario':'3.333','periodoConsumo':'122-145','diasConsumo':'24'},
'78':{'pesoSaco':'25','consumoDiario':'0.135','periodoConsumo':'3 - 35 dias','diasConsumo':'33'},
'79':{'pesoSaco':'25','consumoDiario':'0.6','periodoConsumo':'36-49 dias','diasConsumo':'13'},
'80':{'pesoSaco':'25','consumoDiario':'0.96','periodoConsumo':'50-70 días','diasConsumo':'20'},
'81':{'pesoSaco':'40','consumoDiario':'1.4','periodoConsumo':'71-77','diasConsumo':'6'},
'82':{'pesoSaco':'40','consumoDiario':'2','periodoConsumo':'78-119','diasConsumo':'41'},
'83':{'pesoSaco':'40','consumoDiario':'3.5','periodoConsumo':'120-154','diasConsumo':'34'},
'85':{'pesoSaco':'40','consumoDiario':'3.5','periodoConsumo':'114','diasConsumo':'114'},
'86':{'pesoSaco':'40','consumoDiario':'7.5','periodoConsumo':'0-28','diasConsumo':'28'},
'89':{'pesoSaco':'40','consumoDiario':'1.4','periodoConsumo':'71-98','diasConsumo':'27'},
'90':{'pesoSaco':'40','consumoDiario':'2','periodoConsumo':'91-133','diasConsumo':'42'},
'91':{'pesoSaco':'40','consumoDiario':'3.5','periodoConsumo':'133-175','diasConsumo':'42'},
'92':{'pesoSaco':'40','consumoDiario':'3.5','periodoConsumo':'114','diasConsumo':'114'},
'94':{'pesoSaco':'40','consumoDiario':'2.2','periodoConsumo':'78-119','diasConsumo':'41'},
'95':{'pesoSaco':'40','consumoDiario':'3.5','periodoConsumo':'120-154','diasConsumo':'34'},
'96':{'pesoSaco':'40','consumoDiario':'7.5','periodoConsumo':'0-28','diasConsumo':'28'},
'97':{'pesoSaco':'40','consumoDiario':'3.5','periodoConsumo':'114','diasConsumo':'114'},
'225':{'pesoSaco':'25','consumoDiario':'0.135','periodoConsumo':'3 - 35 dias','diasConsumo':'33'},
'226':{'pesoSaco':'25','consumoDiario':'0.6','periodoConsumo':'36-49 dias','diasConsumo':'13'},
'227':{'pesoSaco':'25','consumoDiario':'0.96','periodoConsumo':'50-70 días','diasConsumo':'20'},
'228':{'pesoSaco':'40','consumoDiario':'1.4','periodoConsumo':'71-98','diasConsumo':'27'},
'229':{'pesoSaco':'40','consumoDiario':'1.4','periodoConsumo':'71-98','diasConsumo':'27'},
'230':{'pesoSaco':'40','consumoDiario':'2','periodoConsumo':'91-133','diasConsumo':'42'},
'231':{'pesoSaco':'40','consumoDiario':'3.5','periodoConsumo':'133-175','diasConsumo':'42'},
'232':{'pesoSaco':'40','consumoDiario':'3.5','periodoConsumo':'114','diasConsumo':'114'},
'270':{'pesoSaco':'40','consumoDiario':'1.4','periodoConsumo':'71-77','diasConsumo':'6'},
'100':{'pesoSaco':'40','consumoDiario':'0.01','periodoConsumo':'1er semana','diasConsumo':'7'},
'101':{'pesoSaco':'40','consumoDiario':'0.1','periodoConsumo':'17-36 semanas','diasConsumo':'133'},
'102':{'pesoSaco':'40','consumoDiario':'0.1','periodoConsumo':'37-60 semanas','diasConsumo':'161'},
'103':{'pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'61-103 semanas','diasConsumo':'294'},
'104':{'pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'Segundo ciclo','diasConsumo':'280'},
'105':{'pesoSaco':'40','consumoDiario':'0.044','periodoConsumo':'2-10 semanas','diasConsumo':'56'},
'106':{'pesoSaco':'40','consumoDiario':'0.055','periodoConsumo':'7-10 semanas','diasConsumo':'21'},
'107':{'pesoSaco':'40','consumoDiario':'0.085','periodoConsumo':'11-13 semanas','diasConsumo':'14'},
'108':{'pesoSaco':'40','consumoDiario':'0.075','periodoConsumo':'14-16 semanas','diasConsumo':'14'},
'110':{'pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'37-60 semanas','diasConsumo':'161'},
'111':{'pesoSaco':'40','consumoDiario':'0.115','periodoConsumo':'61-103 semanas','diasConsumo':'294'},
'112':{'pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'Segundo ciclo','diasConsumo':'280'},
'113':{'pesoSaco':'40','consumoDiario':'0.5','periodoConsumo':'0-10 semanas','diasConsumo':'70'},
'114':{'pesoSaco':'40','consumoDiario':'0.7','periodoConsumo':'11-18 semanas','diasConsumo':'49'},
'115':{'pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'Toda etapa de postura','diasConsumo':'420'},
'170':{'pesoSaco':'40','consumoDiario':'0.5','periodoConsumo':'0-10 semanas','diasConsumo':'70'},
'171':{'pesoSaco':'40','consumoDiario':'0.7','periodoConsumo':'11-18 semanas','diasConsumo':'49'},
'172':{'pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'Toda etapa de postura','diasConsumo':'420'},
'234':{'pesoSaco':'40','consumoDiario':'0.044','periodoConsumo':'2-10 semanas','diasConsumo':'56'},
'235':{'pesoSaco':'40','consumoDiario':'0.055','periodoConsumo':'7-10 semanas','diasConsumo':'21'},
'236':{'pesoSaco':'40','consumoDiario':'0.085','periodoConsumo':'11-13 semanas','diasConsumo':'14'},
'237':{'pesoSaco':'40','consumoDiario':'0.075','periodoConsumo':'14-16 semanas','diasConsumo':'14'},
'239':{'pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'37-60 semanas','diasConsumo':'161'},
'240':{'pesoSaco':'40','consumoDiario':'0.115','periodoConsumo':'61-103 semanas','diasConsumo':'294'},
'241':{'pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'Segundo ciclo','diasConsumo':'280'},
'286':{'pesoSaco':'40','consumoDiario':'0.5','periodoConsumo':'0-10 semanas','diasConsumo':'70'},
'313':{'pesoSaco':'40','consumoDiario':'0.7','periodoConsumo':'11-18 semanas','diasConsumo':'49'},
'314':{'pesoSaco':'40','consumoDiario':'0.11','periodoConsumo':'Toda etapa de postura','diasConsumo':'420'},
'117':{'pesoSaco':'40','consumoDiario':'0.02','periodoConsumo':'0-7','diasConsumo':'7'},
'118':{'pesoSaco':'40','consumoDiario':'0.043','periodoConsumo':'0-14','diasConsumo':'14'},
'119':{'pesoSaco':'40','consumoDiario':'0.118','periodoConsumo':'15-28','diasConsumo':'13'},
'120':{'pesoSaco':'40','consumoDiario':'0.198','periodoConsumo':'29-42','diasConsumo':'13'},
'121':{'pesoSaco':'40','consumoDiario':'0.06','periodoConsumo':'0-21','diasConsumo':'21'},
'123':{'pesoSaco':'40','consumoDiario':'0.249','periodoConsumo':'22-42','diasConsumo':'10'},
'125':{'pesoSaco':'40','consumoDiario':'0.25','periodoConsumo':'2','diasConsumo':'2'},
'242':{'pesoSaco':'40','consumoDiario':'0.043','periodoConsumo':'0-14','diasConsumo':'14'},
'243':{'pesoSaco':'40','consumoDiario':'0.118','periodoConsumo':'15-28','diasConsumo':'13'},
'244':{'pesoSaco':'40','consumoDiario':'0.198','periodoConsumo':'29-42','diasConsumo':'13'},
'246':{'pesoSaco':'40','consumoDiario':'0.06','periodoConsumo':'0-21','diasConsumo':'21'},
'248':{'pesoSaco':'40','consumoDiario':'0.249','periodoConsumo':'22-42','diasConsumo':'10'},
'249':{'pesoSaco':'40','consumoDiario':'0.25','periodoConsumo':'2','diasConsumo':'2'},
'138':{'pesoSaco':'40','consumoDiario':'0.051','periodoConsumo':'0-4 semanas','diasConsumo':'28'},
'139':{'pesoSaco':'40','consumoDiario':'0.184','periodoConsumo':'5-8 semanas','diasConsumo':'28'},
'140':{'pesoSaco':'40','consumoDiario':'0.393','periodoConsumo':'9-12 semanas','diasConsumo':'28'},
'141':{'pesoSaco':'40','consumoDiario':'0.08','periodoConsumo':'0-5 semanas','diasConsumo':'35'},
'142':{'pesoSaco':'40','consumoDiario':'0.33','periodoConsumo':'6-10 semanas','diasConsumo':'28'},
'143':{'pesoSaco':'40','consumoDiario':'0.469','periodoConsumo':'11 semanas a salida al mercado','diasConsumo':'98'},
'144':{'pesoSaco':'40','consumoDiario':'0.00761','periodoConsumo':'0-21 días','diasConsumo':'21'},
'145':{'pesoSaco':'40','consumoDiario':'0.026','periodoConsumo':'22- 45 sacrificio o postura?','diasConsumo':'23'},
'146':{'pesoSaco':'40','consumoDiario':'0.03','periodoConsumo':'45-405 dias','diasConsumo':'360'},
'164':{'pesoSaco':'40','consumoDiario':'0.1','periodoConsumo':'28-42','diasConsumo':'17'},
'165':{'pesoSaco':'40','consumoDiario':'0.15','periodoConsumo':'42-70','diasConsumo':'28'},
'166':{'pesoSaco':'40','consumoDiario':'0.15','periodoConsumo':'70-120 hembras y 70-180 machos','diasConsumo':'50'},
'167':{'pesoSaco':'40','consumoDiario':'0.15','periodoConsumo':'28-70 días','diasConsumo':'42'},
}

/*"45"
    "63"
    "7"
    "83"
    
}*/
var avePostura =
{
    ids:
    [     
        '100',	
        '101',	
        '102',
        '103',	
        '104',	
        '105',	
        '106',	
        '107',	
        '108',	
        '110',	
        '111',	
        '112',	
        '113',	
        '114', 	
        '115',	
        '234',	
        '235',	
        '236',	
        '237',	
        '239',	
        '240',	
        '241',	
        '170',	
        '171',	
        '172'	
    ],
    nombre:
	[
	    'Genesa',
        'Golden Egg Fase 1',
        'Golden Egg Fase 2',
        'Golden Egg Fase 3',
        'Golden Egg Pelecha',
        'Super-Baby Plus Te',
        'Pollorina No.1 Plus Te',
        'Pollorina No.2 Plus Te',
        'Pollorina Prepostura',
        'Pollorina Fase II',
        'Pollorina Fase III',
        'Pollorina Pelecha Completo',
        'Pone Oro Iniciacion',
        'Pone Oro Desarrollo',
        'Pone Oro 16%',
        'Super-Baby Plus Te',
        'Pollorina No.1 Plus Te',
        'Pollorina No.2 Plus Te',
        'Pollorina Prepostura',
        'Pollorina Fase II',
        'Pollorina Fase III',
        'Pollorina Pelecha Completo',
        'Pone Oro Iniciación',
        'Pone Oro Desarrollo',
        'Pone Oro 16%'
	],
    pesoSaco:
	[
		40,
		40,
		40,
		40,
		40,
		40,
		40,
		40,
		40,
		40,
		40,
		40,
		40,
		40,
		40,
		40,
        40,
        40,
        40,
        40,
        40,
        40,
        40,
        40,
        40
	],
    consumoDiario:
	[
		0.01,
        0.1,
        0.1,
        0.11,
        0.11,
        0.044,
        0.055,
        0.085,
        0.075,
        0.11,
        0.115,
        0.11,
        0.5,
        0.7,
        0.11,
        0.044,
        0.055,
        0.085,
        0.075,
        0.11,
        0.115,
        0.11,
        0.5,
        0.7,
        0.11
	],
    periodoConsumo:
	[
		'1er semana',
		'17-36 semanas',
		'37-60 semanas',
		'61-103 semanas',
		'Segundo ciclo',
        '2-10 semanas',
        '7-10 semanas',
		'11-13 semanas',
        '14-16 semanas',
		'37-60 semanas',
		'61-103 semanas',
		'Segundo ciclo',
		'0-10 semanas',
		'11-18 semanas',
		'Toda etapa de postura',
		'2-10 semanas',
        '7-10 semanas',
		'11-13 semanas',
        '14-16 semanas',
		'37-60 semanas',
		'61-103 semanas',
		'Segundo ciclo',
		'0-10 semanas',
		'11-18 semanas',
		'Toda etapa de postura'
	],
    diasConsumo:
	[
		7,
		133,
		161,
		294,
		280,
        56,
		21,
        14,
        14,
		161,
		294,
		280,
		70,
		49,
		420,
        56,
		21,
        14,
        14,
		161,
		294,
		280,
		70,
		49,
		420
	]
};

var polloEngorda =
{
    ids:
    [
        '117',
        '242',
        '243',
        '244',
        '246',
        '248',
        '249',
        '118',
        '119',
        '120',
        '121',
        '123',
        '125'
    ],
    nombre:
	[
        'Genesa',
		'Caporina Iniciador',
		'Caporina Crecimiento',
		'Caporina Finalizador',
		'Pollito Oro',
        'Pollo Oro',
        'Pollo Oro Depósito',
        'Caporina Iniciador',
        'Caporina Crecimiento',
        'Caporina Finalizador',
        'Pollito Especial',
        'Pollo Especial',
        'Pollo Oro Depósito'
	],
    pesoSaco:
	[
		40,
		40,
		40,
		40,
		40,
		40,
		40,
		40,
		40,
        40,
        40,
        40,
        40
	],
    consumoDiario:
	[
		0.02,
		0.043,
		0.118,
		0.198,
		0.06,
		0.249,
		0.25,
        0.043,
        0.118,
        0.198,
        0.06,
        0.249,
        0.25
	],
    periodoConsumo:
	[
		'0-7',
		'0-14',
		'15-28',
		'29-42',
		'0-21',
		'22-42',
        '2',
		'0-14',
        '15-28',
        '29-42',
        '0-21',
        '22-42',
        '2'
	],
    diasConsumo:
	[
		7,
		14,
		13,
		13,
		21,
		10,
        2,
		14,
		13,
        13,
        21,
        10,
		2
	]
};

var cerdos =
{
    ids:
    [
        '68',
        '69',
        '70',
        '71',
        '72',
        '73',
        '74',
        '75',
        '78',
        '225',
        '79',
        '226',
        '80',
        '227',
        '270',
        '94',
        '95',
        '97',
        '96',
        '228',
        '229',
        '230',
        '231',
        '81',
        '82',
        '83',
        '85',
        '86',
        '89',
        '228',
        '90',
        '91',
        '92'
    ],
nombre:
[
    'Youpig! Baby',
    'Youpig! 1',
    'Youpig! 2',
    'Youpig! 3',
    'Youpig! Inicio',
    'Growpig! Crecimiento',
    'Growpig! Desarrollo',
    'Growpig! Poder',
    'Súper Apilac Ultra 1',
    'Súper Apilac Ultra 1',
    'Súper Apilac 2',
    'Súper Apilac Ultra 2',
    'Súper Apilac 3',
    'Súper Apilac 3',
    'Cerdipower Iniciación',
    'Cerdipower Crecimiento',
    'Cerdipower Finalizador',
    'Cerdipower Gestación',
    'Cerdipower Lactancia',
    'Iniciapork Mejorado',
    'Crecipork Mejorado',
    'Engordapork Mejorado',
    'Reprodupork Mejorado',
    'Carnerina No. 1',
    'Carnerina No. 2',
    'Carnerina No. 3',
    'Carnerina No.4 Lactancia',
    'Carnerina No.5 Gestación',
    'Iniciapork Mejorado',
    'Iniciapork Mejorado',
    'Crecipork Mejorado',
    'Engordapork Mejorado',
    'Reprodupork Mejorado'
  ],
pesoSaco:
[
    25,
    25,
    40,
    40,
    40,
    40,
    40,
    40,
    25,
    25,
    25,
    25,
    25,
    25,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40,
    40
],
consumoDiario:
[
    0.024,
    0.282,
    0.4,
    0.686,
    0.857,
    1.76,
    2.5,
    3.333,
    0.135,
    0.135,
    0.6,
    0.6,
    0.96,
    0.96,
    1.4,
    2.2,
    3.5,
    3.5,
    7.5,
    1.4,
    2,
    3.5,
    3.5,
    1.4,
    2,
    3.5,
    3.5,
    7.5,
    1.4,
    1.4,
    2,
    3.5,
    3.5
],
periodoConsumo:
[
    '50-70',
    '71-95',
    '96-121',
    '122-145',
    '3 - 35 dias',
    '3 - 35 dias',
    '36-49 dias',
    '36-49 dias',
    '50-70 días',
    '50-70 días',
    '71-77',
    '78-119',
    '120-154',
    '114',
    '0-28',
    '71-98',
    '91-133',
    '133-175',
    '114',
    '71-77',
    '78-119',
    '120-154',
    '114',
    '0-28',
    '71-98',
    '71-98',
    '91-133',
    '133-175',
    '114'
],
    diasConsumo:
	[
21,
11,
10,
7,
21,
25,
26,
24,
33,
33,
13,
13,
20,
20,
6,
41,
34,
114,
28,
27,
42,
42,
114,
6,
41,
34,
114,
28,
27,
27,
42,
42,
114
   ]
};   

var pavos =
{
    ids:
    [
        '138',
        '139',
        '140',
        '141',
        '142',
        '143',
	'303',
	'304',
    ],
    nombre:
	[
	'Pavo Max Premium 1',
        'Pavo Max Premium 2',
        'Pavo Max Premium 3',
        'Pavo Iniciacion',
        'Pavo Desarrollo',
        'Pavo Engorda',
	'Pavo Iniciacion',
        'Pavo Desarrollo'
	],
    pesoSaco:
	[
		40,
		40,
		40,
		40,
		40,
		40,
		40,
		40
	],
    consumoDiario:
	[
		0.051,
		0.184,
		0.393,
		0.08,
		0.33,
		0.469,
		0.08,
		0.33
	],
    periodoConsumo:
	[
		'0-4 semanas',
		'5-8 semanas',
		'9-12 semanas',
		'0-5 semanas',
		'6-10 semanas',
		'De 11 semanas a salida al mercado',
		'0-5 semanas',
		'6-10 semanas',
	],
    diasConsumo:
	[
		28,
		28,
		28,
		35,
		28,
		98,
		28,
		35
	]
};

var codorniz =
{
    ids:
    [
        '144',
        '145',
        '146'
    ],
    nombre:
	[
		'Codorniz Inicio',
        'Codorniz Engorda',
        'Codorniz Postura'
	],
    pesoSaco:
	[
		40,
		40,
		40
	],
    consumoDiario:
	[
		0.00761,
		0.026,
		0.03
	],
    periodoConsumo:
	[
		'0-21 días',
		'22- 45 sacrificio',
		'45-405 dias'
	],
    diasConsumo:
	[
		21,
		23,
		360
	]
};

var conejo =
{
    ids:
    [
        '164',
        '165',
        '166',
        '167'
    ],
    nombre:
	[
		'Starlap Destete',
        'Starlap Engorda',
        'Starlap Conejos Reproductos Ce',
		'Conejo Ganador'
	],
    pesoSaco:
	[
		40,
		40,
		40,
        40
	],
    consumoDiario:
	[
		0.1,
		0.15,
		0.15,
        0.15
	],
    periodoConsumo:
	[
		'28-42',
		'42-70',
		'70-120 hembras y   70-180 machos',
        '28-70 días'
	],
    diasConsumo:
	[
		17,
		28,
		50,
        42
	]
};
