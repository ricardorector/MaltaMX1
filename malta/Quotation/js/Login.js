$(document).ready(function () {

    $('#enter').on("click", function (e) {

        var usuario = $("#usuario").val();
        var contrasenia = $("#contrasenia").val();

        if (usuario === "") {

            AlertJQ("El usuario no puede estar vacio");
            $("#usuario").focus();
            return;
        }

        if (contrasenia === "") {

            AlertJQ("La contraseña no puede estar vacia");
            $("#contrasenia").focus();
            return;
        }

        CallRest("GET",
                "/Account/Login?usuario=" + usuario + "&contrasenia=" + contrasenia,
                null,
                function (r) {

                    var token = r.token;

                    if (r.correcto) {

                        window.name = "token=" + r.token;

                        location.href = r.href;
                    }
                    else {

                        AlertJQ(r.token);

                        $("#usuario").val("");
                        password = $("#contrasenia").val("");

                        $("#usuario").focus();
                    }
                },
                function (e1, e2, e3) {

                    AlertJQ(e3);
                });
    });
});
