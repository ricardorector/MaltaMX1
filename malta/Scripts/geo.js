$(document).ready(function () {

    $.get("http://ipinfo.io", function (response) {

        var ip = response.ip;

        var json = '{"Ip":"' + ip + '"}'
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "http://localhost:52856/Log/SaveVisit",
            data: json,
            success: function (Result) {

                var jsons = Result;

            },
            error: function (Request, Status, Error) {

            }
        });

    }, "jsonp");
});