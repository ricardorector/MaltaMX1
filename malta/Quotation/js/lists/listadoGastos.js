$( document ).ready(function() {
   
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
                                   "Gastos?id=" + id,
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
          "Gastos?Page=" + page + "&IdEmpresa=" + IdCompany,
          null,
          function (respose) {

              var res;

              Total = respose.Obj2;

              for (i = 0; i < respose.Obj.length; i++) {

                  res = respose.Obj[i];

                  $("#tData tr:last").after("<tr class='tBody'><td>" + res.Id + "</td><td>" +
                                                         res.Nombre + "</td><td>" +
                                                         res.Descripcion + "</td><td>" +
                                                         res.Monto + "</td><td>" +
                                                         "<img id='imgPrev" + res.Id + "' class='imgPrev'  /></td><td>" +
                                                         "<a href='#'><span class='icon iconHover tip deleteIcon'>Delete</span></a>" +
                                                         "<a href='#'><span class='icon iconHover tip polizaEdit'>Edit</span></a>" +
                                                         "</td>" +
                                            "</tr>");

                  $("#imgPrev" + res.Id).attr('src', 'data:image/png;base64,' + res.Image);
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

function ViewEdit(Id){

    ShowEdit(Id, 455, function () {

        var data = "Id=null" +
                   "&IdEmpresa=" + $("#generalCompany").val() +
                   "&Nombre=" + $("#name").val() +
                   "&Descripcion=" + $("#description").val() +
                   "&NumeroCheque=" + $("#check").val() +
                   "&Monto=" + $("#amount").val() +
                   "&Fecha=" + $("#date").val() +
                   "&Tipo=" + $("#type").val();

        CallRest("POST",
          "Gastos?" + data,
          null,
          function (respose) {

              if (respose.Obj.IsCorrect == true) {

                  $("#hPage").val(1);

                  $(".tBody").remove();

                  UploadImage(
                      "Gasto",
                      respose.Obj.Id,
                      function (respose) {

                          $("#hPage").val(1);

                          $(".tBody").remove();

                          GeneralCompanyLoad();

                          $("#formularioCapturaHoras").dialog("close");

                          CleanForm("formularioCapturaHoras");

                          Loading();
                      },
                      function (respose, erer, fdss) {

                          AlertJQ("Error");

                          Loading();
                      });
              }

              Loading();
          },
          function (respose) {

              AlertJQ("Error");

              Loading();
          });
    });
}