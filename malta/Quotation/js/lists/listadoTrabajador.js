$(document).ready(function () {

    $("#login").on("change", function () {

        var $password = $("#password"),
            $cellpone = $("#cellphone");

        if ($(this).val() === "true") {

            $password.prop('disabled', false);
            $password.css({ "background-color": "#fff" });
            $password.focus();
        }
        else {

            $password.prop('disabled', true);
            $password.css({ "background-color": "#F2F2F2" });
            $password.val("");
            $cellpone.focus();
        }

    });

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
                                   "Trabajador?id=" + id,
                                   null,
                                   function (respose) {

                                       var sss = "";
                                   },
                                   function (respose) {

                                       AlertJQ("Error");

                                       Loading();
                                   });

					       control.parent().parent().parent().remove();

					       control = null;
					   },
					   function (e) {

					       control = null;
					   });
        }
        finally {
            title = null;
        }
    });

    $(".gridView").on("click", ".permitIcon", function (e) {

        var control = $(this),
            id = GetId(control);

        GetPermit(id);
    });

    $(".gridView").on("click", ".companyIcon", function (e) {

        var control = $(this),
            id = GetId(control);

        GetCompany(id);
    });
});

function GeneralCompanyLoad() {

    if (GeneralCompanyLoaded) {

        var id = $("#generalCompany").val();

        GetList(id);

        GeneralCompanyLoaded = true;
    }
}

function GeneralCompanyChange(e) {

    var id = e.val();

    GetList(id);
}

function GetList(IdCompany) {

    Loading(true);

    CallRest("GET",
          "Trabajador?idEmpresa=" + IdCompany,
          null,
          function (respose) {

              var res;

              Total = respose.Obj2;

              $("#tData").find("tr:gt(0)").remove();

              for (i = 0; i < respose.Obj.length; i++) {

                  res = respose.Obj[i];

                  $("#tData tr:last").after("<tr><td>" + res.Id + "</td><td>" +
                                                         res.Nombre + "</td><td>" +
                                                         res.Itinn + "</td><td>" +
                                                         res.NombreEmpresa + "</td><td>" +
                                                         res.Salario + "</td><td>" +
                                                         res.Email + "</td><td>" +
                                                         (res.Login === true ? "Yes" : "No") + "</td><td>" +
                                                         res.Celular + "</td><td>" +

                                                          res.Direccion + "</td><td>" +

                                                         "<a href='#'><span class='icon iconHover tip deleteIcon'>Delete</span></a>" +
                                                         "<a href='#'><span class='icon iconHover tip polizaEdit'>Edit</span></a>" +
                                                         "<a href='#'><span class='icon iconHover tip permitIcon'>Permits</span></a>" +
                                                         "<a href='#'><span class='icon iconHover tip companyIcon'>Companies</span></a>" +
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

    ShowEdit(Id, 370, function () {

        var data = "Id=null" +
                  "&Idempresa=" + $("#generalCompany").val() +
                  "&Nombre=" + $("#name").val() +
                  "&Itinn=" + $("#itin").val() +
                  "&Email=" + $("#email").val() +
                  "&Celular=" + $("#cellphone").val() +
                  "&Salario=" + $("#salary").val() +
                  "&Estado=" + $("#state").val() +
                  "&Ciudad=" + $("#city").val() +
                  "&Direccion=" + $("#address").val() +
                  "&Login=" + $("#login").val() +
                  "&Contrasenia=" + $("#password").val();

        CallRest("POST",
          "Trabajador?" + data,
          null,
          function (respose) {

              if (respose.Obj == true) {

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

function GetPermit(Id) {

    CallRest("GET",
            "Permiso",
            null,
            function (respose) {

                var res;

                $("#options").empty();

                for (i = 0; i < respose.Obj.length; i++) {

                    res = respose.Obj[i];

                    $("#options").append('<p><input id="cbPermitions' + res.Id + '" type="checkbox"  name="cbPermitions" value="' + res.Id + '">&nbsp;' + res.Nombre + '</p>');

                }

                CallRest("GET",
                         "PermisoUsuario?id=" + Id,
                         null,
                         function (respose) {

                             for (i = 0; i < respose.Obj.length; i++) {

                                 res = respose.Obj[i];

                                 $("#cbPermitions" + res.Id).prop("checked", true);
                             }

                             Loading();
                         },
                         function (respose) {

                             AlertJQ("Error");

                             Loading();
                         });

                Loading();
            },
            function (respose) {

                AlertJQ("Error");

                Loading();
            });


    ShowEdit(Id, 377, function () {

        var data = "Id=" + Id +
                   "&Permisos=" + $("input[name=cbPermitions]:checked").map(function () { return this.value; }).get().join(",")

        CallRest("POST",
          "PermisoUsuario?" + data,
          null,
          function (respose) {

              if (respose.Obj == true) {

                  GeneralCompanyLoad();

                  $("#formularioPermisos").dialog("close");
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

    },
    "formularioPermisos",
    240,
    "acceptP",
    "modalCancelP");

}

function GetCompany(Id) {

    CallRest("GET",
            "Empresas",
            null,
            function (respose) {

                var res;

                $("#options2").empty();

                for (i = 0; i < respose.Obj.length; i++) {

                    res = respose.Obj[i];

                    $("#options2").append('<p><input id="cbCompany' + res.Id + '" type="checkbox"  name="cbCompany" value="' + res.Id + '">&nbsp;' + res.Nombre + '</p>');

                }

                CallRest("GET",
                         "EmpresaUsuario?id=" + Id,
                         null,
                         function (respose) {

                             for (i = 0; i < respose.Obj.length; i++) {

                                 res = respose.Obj[i];

                                 $("#cbCompany" + res.Id).prop("checked", true);
                             }

                             Loading();
                         },
                         function (respose) {

                             AlertJQ("Error");

                             Loading();
                         });



                Loading();
            },
            function (respose) {

                AlertJQ("Error");

                Loading();
            });


    ShowEdit(Id, 370, function () {

        var data = "Id=" + Id +
                   "&Empresas=" + $("input[name=cbCompany]:checked").map(function () { return this.value; }).get().join(",")

        CallRest("POST",
          "EmpresaUsuario?" + data,
          null,
          function (respose) {

              if (respose.Obj == true) {

                  GeneralCompanyLoad();

                  FillCompany();

                  $("#formularioCompanias").dialog("close");
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

    },
    "formularioCompanias",
    240,
    "acceptC",
    "modalCancelC");

}