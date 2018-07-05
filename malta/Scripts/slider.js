var sliderIndex = 1,
    sliderTotal = 0;

$(document).ready(function () {

    slider(sliderIndex);

    $("#NewPrev").on("click", function () {

        sliderIndex--;

        if (sliderIndex < 1)
            sliderIndex = sliderTotal;

        slider(sliderIndex);

    });

    $("#NewsNext").on("click", function () {

        sliderIndex++;

        if (sliderIndex > sliderTotal)
            sliderIndex = 1;

        slider(sliderIndex);
    });
});

function slider(index) {

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "http://localhost:52856/Blog/Slider?Index=" + index,
        success: function (Result) {

            if (Result.isCorrect === true) {

                var data = Result.result;
                sliderTotal = data.Pages;

                $("#sliderImg").attr("src", data.Imagen);
                $("#sliderLink").attr("href", "/Blog/ficha?id=" + data.Id + "&tipo=noticias");
                $("#sliderTitulo").text(data.Titulo);

            }
            else {

                console.log(Result.message);
            }

        },
        error: function (Request, Status, Error) {

        }
    });


}