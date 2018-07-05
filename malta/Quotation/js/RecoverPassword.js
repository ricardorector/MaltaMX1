$(document).ready(function () {

    $('#enter').on("click", function (e) {

        var usuario = $("#usuario").val();

        if (usuario === "") {

            AlertJQ("El usuario no puede estar vacio");
            $("#usuario").focus();
            return;
        }

        CallRest("GET",
                "/Account/SendRecoverPassword?usuario=" + usuario,
                null,
                function (r) {

                    if (r.isCorrect) {

                        AlertJQ(r.message);

                        setTimeout(function () { location.href = "Login.html"; }, 5000);
                    }
                    else {

                        AlertJQ(r.message);

                        $("#usuario").val("");
                        $("#usuario").focus();
                    }
                },
                function (e1, e2, e3) {

                    AlertJQ(e3);
                });
    });
});
