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
                                   "Prestamos?id=" + id,
                                   null,
                                   function (respose) {

                                       control.parent().parent().parent().remove();

                                       control = null;
                                   },
                                   function (respose) {

                                       AlertJQ("Error");

                                       Loading();
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

    $(".gridView").on("click", ".polizaIcon", function (e) {

        var control = $(this),
            id = GetId(control);

        ShowPayments(id);
    });

    $(".gridView").on("click", ".deletePayment", function (e) {

        var control = $(this),
		id = GetId(control),
		title = $("#listadoPagos").data("title"),
        name = GetValueColumn(control, 2);

        try {

            e.preventDefault();

            ConfirmJQ2(this,
					   "You want to delete the " + title + " [<b>" + name + "</b>]?",
					   function (e) {

					       CallRest("DELETE",
                                   "Pagos?id=" + id,
                                   null,
                                   function (respose) {

                                       var Id = $("#hfIdPrestamo").val();

                                       GetInfoTable(Id);

                                       control.parent().parent().parent().remove();

                                       control = null;
                                   },
                                   function (respose) {

                                       AlertJQ("Error");

                                       Loading();
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

    $("#btnNewPayment").on("click", function (e) {

        e.preventDefault();

        ViewEditPayments();
    });
});

function GeneralCompanyLoad() {

    var id = $("#generalCompany").val();

    SelectFill("Trabajador?IdEmpresa=" + id, "employee");
    SelectFill("Trabajador?IdEmpresa=" + id, "employeeSearch");

    GetList(id);

    GeneralCompanyLoaded = true;
}

function GeneralCompanyChange(e) {

    if (GeneralCompanyLoaded) {

        var id = e.val();

        SelectFill("Trabajador?IdEmpresa=" + id, "employee");
        SelectFill("Trabajador?IdEmpresa=" + id, "employeeSearch");

        GetList(id);
    }
}

function GetList(IdCompany) {

    Loading(true);

    var page = $("#hPage").val();

    CallRest("GET",
          "Prestamos?id=null&idEmpresa=" + IdCompany + "&page=" + page,
          null,
          function (respose) {

              var res;

              Total = respose.Obj2;

              for (i = 0; i < respose.Obj.length; i++) {

                  res = respose.Obj[i];

                  $("#tData tr:last").after("<tr class='tBody'><td>" + res.Id + "</td><td>" +
                                                         res.NombreTrabajador + "</td><td>" +
                                                         res.Monto + "</td><td>" +
                                                         "<span id='pagado_" + res.Id + "'>" + res.Pagado + "</span>" + "</td><td>" +
                                                         "<span id='restante_" + res.Id + "'>" + (res.Monto - res.Pagado) + "</span>" + "</td><td>" +
                                                         FormatDate(res.Fecha) + "</td><td>" +
                                                         "<a href='#'><span class='icon iconHover tip deleteIcon'>Delete</span></a>" +
                                                         "<a href='#'><span class='icon iconHover tip polizaEdit'>Edit</span></a>" +
                                                         "<a href='#'><span class='icon iconHover tip polizaIcon'>Pay</span></a>" +
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

function GetInfoTable(Id) {

    Loading(true);

    CallRest("GET",
          "Prestamos?Id=" + Id + "&idEmpresa=null",
          null,
          function (respose) {

              var res;

              for (i = 0; i < respose.Obj.length; i++) {

                  res = respose.Obj[i];

                  $("#pagado_" + res.Id).text(res.Pagado);
                  $("#restante_" + res.Id).text(res.Monto - res.Pagado);
              }

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

    ShowEdit(Id,
            165,
            function () {

                var data = "Id=" + ($("#idEdit").val() === "" ? null : $("#idEdit").val()) +
                           "&IdEmpresa=" + $("#generalCompany").val() +
                           "&Monto=" + $("#amount").val() +
                           "&Fecha=" + $("#date").val() +
                           "&IdTrabajador=" + $("#employee").val();

                CallRest("POST",
                  "Prestamos?" + data,
                  null,
                  function (respose) {

                      if (respose.Obj.IsCorrect == true) {

                          $("#hPage").val(1);

                          $(".tBody").remove();

                          GeneralCompanyLoad();

                          $("#formularioCapturaHoras").dialog("close");

                          CleanForm("formularioCapturaHoras");

                          Loading();
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
           "Prestamos?Id=" + $("#idEdit").val() + "&idEmpresa=null&page=null",
          null,
          function (respose) {

              var res;

              for (i = 0; i < respose.Obj.length; i++) {

                  res = respose.Obj[i];

                  $("#employee").val(res.Idtrabajador);

                  $("#employee").trigger("change");

                  $("#amount").val(res.Monto);
                  $("#date").val(FormatDate(res.Fecha));
              }

              Loading();
          },
          function (respose) {

              AlertJQ("Error");

              Loading();
          });
}

function ViewEditPayments(Id) {

    ShowEdit(Id, 143, function () {

        var data = "IdPrestamo=" + $("#hfIdPrestamo").val() +
                   "&Monto=" + $("#amountPayment").val() +
                   "&Fecha=" + $("#datePayment").val();

        CallRest("POST",
          "Pagos?" + data,
          null,
          function (respose) {

              if (respose.Obj.IsCorrect == true) {

                  $("#hPage").val(1);

                  $(".tBody").remove();

                  var id = $("#hfIdPrestamo").val();

                  GetListPayments(id);

                  GetInfoTable(id);

                  $("#formularioCapturaPagos").dialog("close");

                  CleanForm("formularioCapturaPagos");



                  Loading();
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
    "formularioCapturaPagos",
    290,
    "acceptP",
    "modalCancelP");

}

function ShowPayments(Id) {

    Loading(true);

    $("#hfIdPrestamo").val(Id);

    GetListPayments(Id);
   
    ShowEdit(Id, 477, function () {

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
    "listadoPagos",
    500,
    null,
    "modalCancelPayments");

}

function GetListPayments(Id) {

    CallRest("GET",
         "Pagos?IdPrestamo=" + Id,
         null,
         function (respose) {

             var res;

             Total = respose.Obj2;

             $("#tDataPayments").find("tr:gt(0)").remove();

             for (i = 0; i < respose.Obj.length; i++) {

                 res = respose.Obj[i];

                 $("#tDataPayments tr:last").after("<tr><td>" + res.Id + "</td><td>" +
                                                        res.Monto + "</td><td>" +
                                                        res.Fecha.replace("T00:00:00", "") + "</td><td>" +
                                                        "<a href='#'><span class='icon iconHover tip deleteIcon deletePayment'>Delete</span></a>" +
                                                        "</td>" +
                                          "</tr>");
             }

             Loading();
         },
         function (respose) {

             AlertJQ("Error");

             Loading();
         });
}