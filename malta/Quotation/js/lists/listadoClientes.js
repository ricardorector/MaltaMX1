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
                                   "Clientes?id=" + id,
                                   null,
                                   function (respose) {

                                       control.parent().parent().parent().remove();
                                       control = null;
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

    var id = $("#generalCompany").val();

    GetList(id);

    GeneralCompanyLoaded = true;
}

function GeneralCompanyChange(e) {

    if (GeneralCompanyLoaded) {

        var id = e.val();

        GetList(id);
    }
}

function GetList(IdCompany) {

    Loading(true);

    var page = $("#hPage").val();

    CallRest("GET",
          "Clientes?id=null&idEmpresa=" + IdCompany + "&page=" + page,
          null,
          function (respose) {

              var res;

              Total = respose.Obj2;

              $("#tData").find("tr:gt(0)").remove();

              for (i = 0; i < respose.Obj.length; i++) {

                  res = respose.Obj[i];

                  $("#tData tr:last").after("<tr class='tBody'><td>" + res.Id + "</td><td>" +
                                                         res.Razonsocial + "</td><td>" +
                                                         res.Direccion + "</td><td>" +
                                                         res.Email + "</td><td>" +
                                                         res.Telefono1 + "</td><td>" +
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

    ShowEdit(Id, 235, function () {

        var data = "Id=" + ($("#idEdit").val() === "" ? null : $("#idEdit").val()) +
                  "&IdEmpresa=" + $("#generalCompany").val() +
                  "&Razonsocial=" + $("#name").val() +
                  "&Direccion=" + $("#address").val() +
                  "&Email=" + $("#email").val() +
                  "&Telefono=" + $("#phone").val();

        CallRest("POST",
          "Clientes?" + data,
          null,
          function (respose) {

              if (respose.Obj.IsCorrect == true) {

                  $("#hPage").val(1);

                  $(".tBody").remove();

                  $("#formularioCapturaHoras").dialog("close");

                  CleanForm("formularioCapturaHoras");

                  GeneralCompanyLoad();
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
           "Clientes?Id=" + $("#idEdit").val() + "&idEmpresa=null&page=null",
          null,
          function (respose) {

              var res;

              for (i = 0; i < respose.Obj.length; i++) {

                  res = respose.Obj[i];

                  $("#name").val(res.Razonsocial);
                  $("#address").val(res.Direccion);
                  $("#email").val(res.Email);
                  $("#phone").val(res.Telefono1);
              }

              Loading();
          },
          function (respose) {

              AlertJQ("Error");

              Loading();
          });
}