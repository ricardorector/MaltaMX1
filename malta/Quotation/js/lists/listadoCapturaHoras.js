$(document).ready(function () {

    $("#report1").on("click", function () {


        DownloadFile("templates/TaskReport.xlsx");

    });
});

function GeneralCompanyLoad() {

    var id = $("#generalCompany").val();

    SelectFill("Trabajador?IdEmpresa=" + id, "employee");
    SelectFill("Clientes?IdEmpresa=" + id, "client", "Razonsocial");
    SelectFill("Tareas?IdCliente=null&EsDefault=false&IdEmpresa=" + id, "task");
    SelectFill("Tareas?IdCliente=null&EsDefault=true&IdEmpresa=null", "default");

    //GetList(id);
}

function GeneralCompanyChange(e) {

    var id = e.val();

    SelectFill("Trabajador?IdEmpresa=" + id, "employee");
    SelectFill("Clientes?IdEmpresa=" + id, "client", "Razonsocial");
    SelectFill("Tareas?IdCliente=null&EsDefault=false&IdEmpresa=" + id, "task");
}

function ViewEdit(Id) {

    ShowEdit(Id, 440)
}