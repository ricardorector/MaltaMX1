$(document).ready(function () {

    SelectFill("Tareas?IdCliente=null&EsDefault=true&IdEmpresa=null", "default");

    $("#its").on("change", function () {

        var type = $(this).val();

        if (type === "true") {

            $("#divNotDefault").hide();
            $("#formularioCapturaHoras").css("height", 183);
        }
        else {
            $("#divNotDefault").show();
            $("#formularioCapturaHoras").css("height", 257);
        }

    });

    $("#name").keyup(function () {

        if ($("#name").val().length > 0) {

            $("#divDefault").hide();
            $("#formularioCapturaHoras").css("height", 237);
        }
        else {

            $("#divDefault").show();
            $("#formularioCapturaHoras").css("height", 257);
        }
    });

    $("#default").on("change", function () {

        if ($("#default").val() != "0") {

            $("#divNotDefault2").hide();
            $("#name").val("");
            $("#name").focus();
            $("#formularioCapturaHoras").css("height", 237);
        }
        else {

            $("#divNotDefault2").show();
            $("#formularioCapturaHoras").css("height", 257);
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
                                   "Tareas?id=" + id,
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

    SelectFill("Clientes?IdEmpresa=" + id, "client", "Razonsocial");

    GetList(id);
}

function GeneralCompanyChange(e) {

    var id = e.val();

    SelectFill("Clientes?IdEmpresa=" + id, "client", "Razonsocial");
    GetList(id);
}

function GetList(IdCompany) {

    Loading(true);

    CallRest("GET",
          "Tareas?IdCliente=null&EsDefault=null&IdEmpresa=" + IdCompany,
          null,
          function (respose) {

              var res;

              $("#tData").find("tr:gt(0)").remove();

              for (i = 0; i < respose.Obj.length; i++) {

                  res = respose.Obj[i];

                  $("#tData tr:last").after("<tr><td>" + res.Id + "</td><td>" +
                                                         res.Nombre + "</td><td>" +
                                                         res.NombreCliente + "</td><td>" +
                                                         res.NombreMedida + "</td><td>" +
                                                         res.Descripcion + "</td><td>" +
                                                         res.FechaString + "</td><td>" +
                                                         res.EsDefaultString + "</td><td>" +
                                                         "<a href='#'><span class='icon iconHover tip deleteIcon'>Delete</span></a>" +
                                                         "<a href='#'><span class='icon iconHover tip polizaEdit'>Edit</span></a>" +
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

function ViewEdit(Id) {

    ShowEdit(Id, 303, function () {

        var errorMessagge = "";

        if ($("#its").val() === "true") {

            if ($("#measure")[0].selectedIndex === 0) {

                errorMessagge += "Select the value for the field <b>Measure</b>.<br \>";
            }

            if ($("#name").val() === "") {

                errorMessagge += "Provide the value of the field <b>Name</b>.<br \>";
            }

            if ($("#description").val() === "") {

                errorMessagge += "Provide the value of the field <b>Description</b>.<br \>";
            }
        }
        else {

            if ($("#measure")[0].selectedIndex === 0) {

                errorMessagge += "Select the value for the field <b>Measure</b>.<br \>";
            }

            if ($("#default")[0].selectedIndex === 0 && $("#name").val() === "") {

                errorMessagge += "Provide the value of the field <b>Name</b> or Select the value for the field <b>Default</b>.<br \>";
            }

            if ($("#client")[0].selectedIndex === 0) {

                errorMessagge += "Select the value for the field <b>Client</b>.<br \>";
            }
        }

        if (errorMessagge != "") {

            AlertJQ(errorMessagge);
            return;
        }

        var data = "Id=null" +
                   "&Nombre=" + $("#name").val() +
                   "&IdCliente=" + ($("#client").val() === "0" ? "null" : $("#client").val()) +
                   "&IdMedida=" + $("#measure").val() +
                   "&Descripcion=" + $("#description").val() +
                   "&IdTarea=" + ($("#default").val() === "0" ? "null" : $("#default").val()) +
                   "&Fecha=" + $("#date").val() +
                   "&EsDefault=" + $("#its").val();

        CallRest("POST",
          "Tareas?" + data,
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