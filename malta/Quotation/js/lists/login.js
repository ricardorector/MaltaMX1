$(document).ready(function () {

    $("#login").on("click", function (e) {

        e.preventDefault();

        var email = $("#user").val(),
            password = $("#password").val();

        CallRest("GET",
    	         "usuario?Email=" + email + "&Password=" + password,
    	         null,
    	         function (respose) {

    	             window.name = "IdUser=" + respose.Obj.id + "&IdCompany=0&User=" + respose.Obj.email + "&ApiToken=" + respose.Obj.token + "&UserName=" + respose.Obj.nombre;
    	             location.href = respose.Obj.href;
    	         },
    	         function (respose) {

    	             AlertJQ("The username or password is incorrect.");

    	             $("#user").val("");
    	             password = $("#password").val("");

    	             $("#user").focus();
    	         });
    });
});