$(document).ready(function () {

    $(".gridView").on("click", ".deleteIcon", function (e) {

        var control = $(this),
		id = GetId(control),
		title = $("#formularioCapturaHoras").data("title"),
        name = GetValueColumn(control, 2);

        try {

            e.preventDefault();

            ConfirmJQ2(this,
					   "You want to delete the " + title + " [<b>" + name + "</b>]?",
					   function (e) {

					       CallRest("DELETE",
                                   "Empresas?id=" + id,
                                   null,
                                   function (respose) {

                                       control.parent().parent().parent().remove();
                                       control = null;

                                       $("#totalRecords").html($("#totalRecords").html() - 1);
                                       $("#showRecords").html($("#showRecords").html() - 1);
                                   },
                                   function (respose) {

                                       AlertJQ("Error");

                                       Loading();

                                       control = null;
                                   });
					   },
					   function (e) {

					       control = null;
					   });
        }
        finally {
            title = null;
        }
    });

});

function GeneralCompanyLoad() {

    Loading(true);

    var page = $("#hPage").val();
    
    CallRest("GET",
          "Empresas?id=null&IdTrabajador=" + Environment.IdUser + "&page=" + page,
          null,
          function (respose) {

              var res;

              Total = respose.Obj2;

              for (i = 0; i < respose.Obj.length; i++) {

                  res = respose.Obj[i];

                  $("#tData tr:last").after("<tr class='tBody'><td>" + res.Id + "</td><td>" +
                                                         res.Nombre + "</td><td>" +
                                                         res.Razonsocial + "</td><td>" +
                                                         res.TaxId + "</td><td>" +
                                                         res.Direccion + "</td><td>" +
                                                         res.Telefono1 + "</td><td>" +
                                                         res.Telefono2 + "</td><td>" +
                                                         res.Email + "</td><td>" +
                                                         res.Fax + "</td><td>" +
                                                         (res.WebSite === "N/A" ? res.WebSite : "<a href='" + res.WebSite + "' target='_blank' title='" + res.WebSite + "'>" + res.Nombre + "</a>") + "</td><td>" +
                                                         "<a href='#'><span class='icon iconHover tip deleteIcon'>Delete</span></a>" +
                                                         "<a href='#'><span class='icon iconHover tip polizaEdit'>Edit</span></a>" +
                                                         "</td>" +
                                           "</tr>");
              }

              $("#totalRecords").html(Total);
              $("#showRecords").html(($('#tData tr').length - 1));

              Loading();

              if (!Asc) {

                  $('html,body').animate({
                      scrollTop: 40
                  }, 250);
              }

              Order();
          },
          function (respose) {

              AlertJQ("Error");

              Loading();
          });
}

function ViewEdit(Id) {

    $("#idEdit").val(Id);

    if (Id != undefined)
        GetInfo(Id);

    ShowEdit(Id, 445, function () {

        var data =  "Id=" + ($("#idEdit").val() === "" ? null : $("#idEdit").val()) +
                    "&Nombre=" + $("#name").val() +
        			"&Razonsocial=" + $("#legalName").val() +
                    "&TaxId=" + $("#taxtId").val() +
        			"&Calle=" + $("#address").val() +
                    "&Ciudad=" + $("#city").val() +
                    "&Estado=" + $("#state").val() +
                    "&Cp=" + $("#zip").val() +
                    "&Pais=" + $("#country").val() +
        			"&Email=" + $("#email").val() +
        			"&Telefono1=" + $("#phone1").val() +
        			"&Telefono2=" + $("#phone2").val() +
                    "&Fax=" + $("#fax").val() +
                    "&WebSite=" + $("#webSite").val() +
                    "&IdTrabajador=" + Environment.IdUser;

        CallRest("POST",
          "Empresas?" + data,
          null,
          function (respose) {

              if (respose.Obj.IsCorrect == true) {

                  $("#hPage").val(1);

                  $(".tBody").remove();

                  GeneralCompanyLoad();

                  $("#formularioCapturaHoras").dialog("close");

                  CleanForm("formularioCapturaHoras");
              }
              else {
                  AlertJQ("Error");
              }

              Loading();
          },
          function (respose) {

              AlertJQ("Error");

              Loading();
          });
    });
}

function GetInfo(Id) {

    Loading(true);

    CallRest("GET",
           "Empresas?Id=" + $("#idEdit").val() + "&idEmpresa=null&page=null",
          null,
          function (respose) {

              var res;

              for (i = 0; i < respose.Obj.length; i++) {

                  res = respose.Obj[i];

                  $("#name").val(res.Nombre);
                  $("#legalName").val(res.Razonsocial);
                  $("#taxtId").val(res.TaxId);
                  $("#address").val(res.Calle);
                  $("#city").val(res.Ciudad);
                  $("#state").val(res.Estado);
                  $("#zip").val(res.Cp);
                  $("#country").val(res.Pais);
                  $("#phone1").val(res.Telefono1);
                  $("#phone2").val(res.Telefono2.replace("N/A",""));
                  $("#fax").val(res.Fax.replace("N/A", ""));
                  $("#email").val(res.Email);
                  $("#webSite").val(res.WebSite.replace("N/A", ""));
              }

              Loading();
          },
          function (respose) {

              AlertJQ("Error");

              Loading();
          });
}