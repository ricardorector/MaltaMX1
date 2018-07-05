$(document).ready(function () {

    CallRest("POST",
              "/Facade/GetDataForQuotation",
              "{'Token':'" + Environment.ApiToken + "'}",
              function (r) {

                  if (r.isCorrect) {

                      $("#discount").text(r.discount);
                      $("#userName").text(r.userName);
                      $("#plantName").text(r.plantName);

                      var products = r.products;

                      for (var i = 0; i < products.length; i++) {

                          var product = products[i];

                          $("#tData tr:last").after("<tr><td><img src='../../" + product.Image + "' alt='" + product.Name + "' title='" + product.Name + " " + product.Measure + " " + product.Kg + "Kg a $" + product.Price + "' /></td><td>" +
                                                     product.IdProduct + "</td><td>" +
                                                     product.Name + "</td><td>" +
                                                     product.Kg + "</td><td>" +
                                                     product.Min + "</td><td>" +
                                                     FMoney(product.Price) + "</td><td>" +
                                                     "<input data-id='" + product.IdProduct + "' data-measure='" + product.IdMeasure + "' data-kg='" + product.Kg + "' data-price='" + product.Price + "' data-min='" + product.Min + "' data-name='" + product.Name + "' maxlength='5' class='inputT amountInput' type='text' value='0' placeholder='Cantidad' required /></td>" +
                                                     "<td class='Kg'><span class='kgTotal' id='Kg_" + product.IdProduct + "_" + product.IdMeasure + "'>0</span>" + "</td>" +
                                                     "<td class='price'><span id='Price_" + product.IdProduct + "_" + product.IdMeasure + "'>$0.00</span>" + "</td></td>" +
                                         "</tr>");

                      }

                      var trucks = r.trucks,
                          $truck = $("#truck"),
					      $index = 0,
	                      $class = "";

                      $.each(trucks, function () {

                          if ($index % 2 === 0)
                              $class = "opt1";
                          else
                              $class = "opt2";

                          $truck.append($("<option class='" + $class + "' />").val(this.Id + "|" + this.Max).text(this.Name + " [" + this.Max + "Tons]"));

                          $index++;
                      });

                  }
                  else {

                      AlertJQ(r.message);
                  }
              },
              function (e1, e2, e3) {

                  AlertJQ(e3);
              });

    $(".boxtable").on("blur", ".amountInput", function (e) {

        var id = $(this).data("id"),
            kg = $(this).data("kg"),
            price = $(this).data("price"),
            measure = $(this).data("measure"),
            name = $(this).data("name"),
            min = $(this).data("min"),
            amount = $(this).val();

        if (amount !== "0" && amount.trim() !== "") {

            if (amount < min) {

                AlertJQ("El mínimo de compra del producto [" + name + "] es de " + min + ".");

                $(this).val("0");
                return;
            }
        }

        var totalKg = kg * amount,
            priceTotal = price * amount;

        $("#Kg_" + id + "_" + measure).text(totalKg);
        $("#Price_" + id + "_" + measure).text(FMoney(priceTotal));

        var price = 0;

        $(".price").each(function () {

            var value = $(this).text().replace("$", "").replace(",", "");

            if (!isNaN(value) && value.length != 0) {
                price += parseFloat(value);
            }
        });

        var kgTotal = 0;

        $(".kgTotal").each(function () {

            var value = $(this).text().replace(",", "");

            if (!isNaN(value) && value.length !== "0") {
                kgTotal += parseFloat(value);
            }
        });

        var bultoTotal = 0;

        $(".amountInput").each(function () {

            var amount = $(this)[0].value.replace("$", "").replace(",", "");

            if (!isNaN(amount) && amount != "0") {

                bultoTotal += parseInt(amount);
            }
        });

        $("#bultoTotal").text(bultoTotal);
        $("#kgTotal").text(kgTotal);

        $("#totalPrice").val(price);
        $("#priceTotal").text(FMoney(price));

        var desc = price - (price * ($("#discount").text() / 100));

        $("#priceTotalPP").text(FMoney(desc));

        var max = $("#truck").val().split('|')[1] * 1000,
            current = $("#kgTotal").text(),
            percentage = (current * 100) / max,
            percentageBg = 69 - ((percentage.toFixed(0) * 69) / 100);

        if (percentageBg < 0)
            percentageBg = 0;

        $(".realBgTruck").height(percentageBg);

        if (percentage < 85) {

            $(".bgTruck").css("background-color", "green");

        } else if (percentage >= 85 && percentage <= 100) {

            $(".bgTruck").css("background-color", "yellow");
        }
        else {

            $(".bgTruck").css("background-color", "red");
        }

        if (percentage.toFixed(1) <= 200)
            $("#porcen").text(percentage.toFixed(1) + "%");
        else
            $("#porcen").text("+200%");

    });

    $('#next').on("click", function (e) {

        if ($("#totalPrice").val() > 0) {

            var max = $("#truck").val().split('|')[1] * 1000,
                current = $("#kgTotal").text();

            if (current <= max) {

                ConfirmJQ2(null,
               "&iquest;Realmente deseas hacer tu pedido?",
               function () {

                   var json = "'Products':[",
                       amount,
                       idMeasure,
                       id;

                   $(".amountInput").each(function () {

                       amount = $(this).val().replace("$", "").replace(",", "");

                       if (!isNaN(amount) && amount != 0) {

                           id = $(this).data("id");
                           idMeasure = $(this).data("measure");

                           json += "{'Id':" + id + ",'Amount':" + amount + ", 'idMeasure':" + idMeasure + "},";
                       }
                   });

                   json = json.slice(0, json.lastIndexOf(","));

                   json += "]";

                   var idTruck = $("#truck").val().split('|')[0];

                   CallRest("POST",
                     "/Quotation/SaveQ",
                     "{'Token':'" + Environment.ApiToken + "','IdTruck':'" + idTruck + "','IdDayOfWeek':'1'," + json + "}",
                     function (r) {

                         if (r.isCorrect) {

                             location.href = "send.html";
                         }
                         else {

                             AlertJQ(r.message);
                         }
                     },
                     function (e1, e2, e3) {

                         AlertJQ(e3);
                     });
               });
            }
            else {
                AlertJQ("El peso de los productos seleccionados excede el peso que puede cargar de la unidad indicada");
            }
        }
        else {
            AlertJQ("No se han seleccionado productos para realizar la cotización");
        }
    });
});