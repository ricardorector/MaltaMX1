var Asc = true;
$col = null;
Total = 0,
    GeneralCompanyLoaded = false;

function EnvironmentBase(DefaultUrl) {

    this.ApiToken = "";

    this.UrlRest = "http://localhost:52856";

    this.Cookie = window.name;

    this.DefaultUrl = (DefaultUrl == null) ? "" : DefaultUrl;

    this.GetApiToken = function () {

        this.ApiToken = GetQueryString("token", this.Cookie);
    }

    this.GetUser = function () {

        this.User = GetQueryString("User", this.Cookie);
    }

    this.GetIdUser = function () {

        this.IdUser = GetQueryString("IdUser", this.Cookie);
    }

    this.GetUserName = function () {

        this.UserName = GetQueryString("UserName", this.Cookie);
    }

    this.Logout = function () {

        this.ApiToken = "";
        this.Cookie = "";

        window.name = "";

        location.href = this.DefaultUrl;
    }

    var documentName = GetCurentFileName();

    if (documentName != this.DefaultUrl) {

        if (this.Cookie != "" && window.name != "") {

            this.GetApiToken();
        }
        else {

            if (documentName !== "RecoverPassword.html" && documentName !== "ChangePasswordMail.html") {

                location.href = this.DefaultUrl;
            }
        }
    }

}
var Environment = new EnvironmentBase("login.html");

$(document).ready(function () {

    SetRules();

    $("#btnLogout").on("click", function (e) {

        e.preventDefault();

        ConfirmJQ2(null,
            "&iquest;Realmente deseas salir del cotizador?",
            function () {
                Environment.Logout();
            });
    });

    $("#userName").html(Environment.UserName);

    $("#new").on("click", function (e) {

        e.preventDefault();

        ViewEdit();
    });

    $("#preLoading").hide();

    $(".hOrder").on("click", function (e) {

        e.preventDefault();

        $col = $(this);

        $(".hOrder").css({ "background": "#275d93" });

        $col.css({ "background": "#79c151" });

        Order(true);
    });
});

function UploadImage(EntityName, EntityId, FunctionSuccess, FunctionError) {

    var image = $("#preview").attr('data-Url');

    var obj = {
        EntityName: EntityName,
        EntityId: EntityId,
        ImageData: image
    };

    CallRest("POST",
        "Imagenes",
        JSON.stringify(obj),
        function (respose) {

            if (FunctionSuccess != null)
                FunctionSuccess(respose);
        },
        function (respose, erer, fdss) {

            if (FunctionError != null)
                FunctionError(respose, erer, fdss);
        });
}

function SetRules() {


    $('.boxtable').on('keydown', '.amountInput', function (e) {

        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) ||
            /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey)
            || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode)
            && e.preventDefault()
    });
}

function ShowEdit(Id, Height, FunctionAccept, Width, IdButtonAccept, IdButtonCancel) {

    var messageError;

    Width = (Width == undefined ? 290 : Width);
    IdButtonAccept = (IdButtonAccept == undefined ? "accept" : IdButtonAccept);

    ShowModal(Id,
        IdButtonAccept,
        Width,
        Height + (Id != null ? 14 : 0),
        function () {

            messageError = ValidateForm(Id);

            if (messageError === "") {

                HideAlertJQ();

                if (FunctionAccept != undefined && typeof FunctionAccept == "function")
                    FunctionAccept();
            }
            else {

                AlertJQ(messageError);
            }
        }, function () {

            CleanForm(Id);
            HideAlertJQ();
        },
        IdButtonCancel);
}

function HideAlertJQ() {

    $(".modalAlert").remove();
}

function ShowModal(IdModal, IdButtonAccept, Width, Height, FunctionAccept, FunctionCancel, IdButtonCancel) {

    var modal = "#" + IdModal,
        buttonAcept = "#" + IdButtonAccept,
        width = Width == undefined ? 'auto' : Width,
        height = Height == undefined ? 'auto' : Height,
        buttonCancel = IdButtonCancel != null ? "#" + IdButtonCancel : "#modalCancel";


    $(modal).dialog({
        width: width,
        title: "MaltaCleyton",
        modal: true,
        height: height,
        resizable: false,
        dialogClass: 'fixed-dialog'
    });

    $(buttonCancel).click(function (e) {

        e.preventDefault();

        if (FunctionCancel != undefined && typeof FunctionCancel == "function")
            FunctionCancel();

        $(modal).dialog("close");
    });

    $(buttonAcept).unbind("click");
    $(buttonAcept).click(FunctionAccept);
}

function ConfirmJQ2(Obj, Message, Function, FunctionCancel) {

    $myconfirm = $('<div id = "Confirm" class="clsConfirmDialog"></div>')
        .dialog({
            width: 385,
            autoOpen: false,
            title: "Control payments",
            modal: true,
            resizable: false,
            buttons: {
                "Aceptar": function () {

                    Function(Obj);

                    $(".clsConfirmDialog").dialog("close");
                },
                "Cancelar": function () {

                    if (FunctionCancel != undefined && typeof FunctionCancel == "function")

                        FunctionCancel(Obj);

                    $(".clsConfirmDialog").dialog("close");
                }
            },
            open: function () {
                //$(this).parent().find('.ui-dialog-buttonpane button:first-child').next().button({
                //    icons: { primary: 'clsCancel' }
                //});
                //$(this).parent().find('.ui-dialog-buttonpane button:first-child').button({
                //    icons: { primary: 'clsAccept' }
                //});
            }
        });

    $myconfirm.html(Message);
    $myconfirm.dialog('open');

    return false;
}

function AlertJQ(message) {

    HideAlertJQ();

    $myalert = $('<div id = "modalAlert" class="modalAlert" ></div>')
        .dialog({
            width: 385,
            autoOpen: false,
            title: "MaltaCleyton",
            modal: true,
            resizable: false,
            buttons: {
                Ok: function () {
                    $(this).dialog("close");
                }
            },
            open: function () {
                //$(this).parent().find('.ui-dialog-buttonpane button:first-child').button({
                //    icons: { primary: 'clswarning' }
                //});
            }
        });

    $myalert.html(message);
    $myalert.dialog('open');
}

function CallRest(Type, Url, Data, FunctionSuccess, FunctionError, Async) {

    Loading(true);

    $.ajax({
        type: Type,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        timeout: 0,
        url: Environment.UrlRest + Url,
        data: Data,
        async: Async,
        beforeSend: function (jqXHR) {

            var apiToken = Environment.ApiToken;

            if (apiToken != undefined && apiToken != "")
                jqXHR.setRequestHeader("ApiToken", apiToken);
        },
        success: function (Result) {

            if (FunctionSuccess != null)
                FunctionSuccess(Result);

            Loading();
        },
        error: function (Request, Status, Error) {

            if (Request.status == 401) {

                location.href = Environment.DefaultUrl;
            }
            else {

                if (FunctionError != null)
                    FunctionError(Request, Status, Error);
                else if (Request.getResponseHeader('Access-Control-Allow-Origin') == null)
                    AlertJQ("The consultation period has expired API by an unknown error.");
            }

            Loading();
        }
    });
}

function GetQueryString(Name, Url) {

    var sPageURL = (Url === undefined ? window.location.search.substring(1) : Url);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] == Name)
            return sParameterName[1];
    }
}

function UpdateQueryString(key, value, query) {

    var res = query.split("&"),
        dict = [],
        obj,
        queryString = "";

    for (i = 0; i <= res.length - 1; i++) {

        obj = res[i];

        dict.push({
            key: obj.split("=")[0],
            value: obj.split("=")[1]
        });
    }

    for (i = 0; i <= dict.length - 1; i++) {

        if (dict[i].key === key) {
            dict[i].value = value;
            break;
        }
    }

    for (i = 0; i <= dict.length - 1; i++) {

        queryString += dict[i].key + "=" + dict[i].value;

        if (i != dict.length - 1)
            queryString += "&";
    }

    return queryString;
}

function Loading(visible, message) {

    if (visible) {

        if (message == undefined)
            message = "Loading...";

        $("body").prepend("<div id='loading' class='loader'><p class='loader-img'><span class='loader-txt'>" + message + "</span></p></div>");
    }
    else
        $("#loading").remove();
};

function GetCurentFileName() {

    var pagePathName = window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}

function FormatDate(Date) {
    var date = Date.replace("T00:00:00", "");

    var dateSplit = date.split("-");

    date = dateSplit[0] + "/" + dateSplit[1] + "/" + dateSplit[2];

    return date;
}

function FMoney(total) {

    var neg = false;
    if (total < 0) {
        neg = true;
        total = Math.abs(total);
    }
    return (neg ? "-$" : '$') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}