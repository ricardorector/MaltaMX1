$(document).ready(function () {

    $('#enter').on("click", function (e) {

        var contrasenia = $("#contrasenia").val(),
            contrasenia2 = $("#contrasenia2").val();

        if (contrasenia === "") {

            AlertJQ("La contraseña no puede estar vacia");
            $("#contrasenia").focus();
            return;
        }

        if (contrasenia2 === "") {

            AlertJQ("La confirmacion de contraseña no puede estar vacia");
            $("#contrasenia2").focus();
            return;
        }

        if (contrasenia !== contrasenia2) {

            AlertJQ("Las contraseñas no son iguales");

            $("#contrasenia").val("");
            $("#contrasenia2").val("");

            $("#contrasenia").focus();

            return;
        }

        if (contrasenia.length < 6)
        {
            AlertJQ("La contraseña debe tener al menos 6 caracteres");

            $("#contrasenia").val("");
            $("#contrasenia2").val("");

            $("#contrasenia").focus();

            return;
        }

        CallRest("POST",
            "/Account/ChangePassword",
            "{'Contrasenia':'" + contrasenia + "','Contrasenia2':'" + contrasenia2 + "','Token':'" + Environment.ApiToken + "'}",
            function (r) {

                if (r.isCorrect) {

                    AlertJQ(r.message);
                }
                else {

                    AlertJQ(r.message);
                }

                window.name = "";

                setTimeout(function () { location.href = "Login.html"; }, 3000);
            },
            function (e1, e2, e3) {

                AlertJQ(e3);
            });
    });
});
