$(document).ready(function () {

    CallRest("POST",
          "/Account/GetUserInfo",
          "{'Token':'" + Environment.ApiToken + "'}",
          function (r) {

              if (r.isCorrect) {

                  var data = r.data;

                  $("#nombre").val(data.Name);
                  $("#telefono").val(data.Phone);
                  $("#celular").val(data.CellPhone);
                  $("#email").val(data.Email);
              }
              else {

                  AlertJQ(r.message);
              }
          },
          function (e1, e2, e3) {

              AlertJQ(e3);
          });

    $('#comentarios').val('').blur();
    $("#nombre").focus();

    $('#send').on("click", function (e) {

        ConfirmJQ2(null,
                 "&iquest;Realmente deseas hacer tu pedido?",
                 function () {

                     var json = "'Data':{'Name':'" + $("#nombre").val() +
                        "','Email':'" + $("#email").val() +
                        "','Phone':'" + $("#telefono").val() +
                        "','CellPhone':'" + $("#celular").val() +
                        "','Observations':'" + $("#comentarios").val() + "'}";

                     CallRest("POST",
                              "/Quotation/SendQ",
                              "{'Token':'" + Environment.ApiToken + "'," + json + "}",
                              function (r) {

                                  if (r.isCorrect) {

                                      AlertJQ(r.message);

                                      setTimeout(function () { location.href = "Quotation.html"; }, 5000);
                                  }
                                  else {

                                      AlertJQ(r.message);
                                  }
                              },
                              function (e1, e2, e3) {

                                  AlertJQ(e3);
                              });
                 });
    });
});