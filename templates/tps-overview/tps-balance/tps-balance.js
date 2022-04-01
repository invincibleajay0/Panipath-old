$(document).ready(function () {
    generatorstable();
    consumerstable();
    exporttable();
    tablecard();

    generatorstable1();
    consumerstable1();
    exporttable1();

    generatorstable2();
    consumerstable2();
    exporttable2();

    generatorstable3();
    consumerstable3();
    exporttable3();

    generatorstable4()
    consumerstable4();
    exporttable4();

});

function tablecard() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: "GET",
        url: "http://localhost:8090/EMSPNC/CppHome/cppuom",
    }).done(function (data) {
        document.getElementById('tem1').innerHTML = data[0]['SHPTEMP'].toFixed(2) + data[0]['SHPTEMPunit'];
        document.getElementById('press1').innerHTML = data[0]['SHPPRESSURE'].toFixed(2) + data[0]['SHPPRESSUREunitmtr'];

        document.getElementById('tem2').innerHTML = data[1]['HPTEMP'].toFixed(2) + data[0]['SHPTEMPunit'];
        document.getElementById('press2').innerHTML = data[1]['HPPRESSURE'].toFixed(2) + data[0]['SHPPRESSUREunitmtr'];

        document.getElementById('tem3').innerHTML = data[2]['MPTEMP'].toFixed(2) + data[0]['SHPTEMPunit'];
        document.getElementById('press3').innerHTML = data[2]['MPPRESSURE'].toFixed(2) + data[0]['SHPPRESSUREunitmtr'];

        document.getElementById('tem4').innerHTML = data[4]['LPTEMP'].toFixed(2) + data[0]['SHPTEMPunit'];
        document.getElementById('press4').innerHTML = data[4]['LPPRESSURE'].toFixed(2) + data[0]['SHPPRESSUREunitmtr'];

        document.getElementById('tem5').innerHTML = data[3]['BFWTEMP'].toFixed(2) + data[0]['SHPTEMPunit'];
        document.getElementById('press5').innerHTML = data[3]['BFWPRESSURE'].toFixed(2) + data[0]['SHPPRESSUREunitmtr'];

    })
}

function generatorstable() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: 'GET',
        url: "http://localhost:8090/EMSPNC/CppHome/SHPsteambalancegenerators",
    }).done(function (data) {
        var max1 = 7000
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.name + '</td>';
            table_data += '<td>' + value.value.toFixed(2) + '</td>';
            table_data += '<td> <progress value =' + value.value + ' max=' + max1 + '></progress></td>';
            table_data += '</tr>';
        });
        $('#generatorstable').append(table_data);
        var sum = data.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        document.getElementById("total1").innerHTML = (sum).toFixed(2);
        losses();
    })
}

function consumerstable() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: 'GET',
        url: "http://localhost:8090/EMSPNC/CppHome/SHPsteambalanceconsumers",
    }).done(function (data) {
        var max1 = 200
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.name + '</td>';

            table_data += '<td>' + value.value.toFixed(2) + '</td>';
            table_data += '<td> <progress value =' + value.value + ' max=' + max1 + '></progress></td>';
            table_data += '</tr>';
        });
        $('#consumerstable').append(table_data);

        var sum = data.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        document.getElementById("total2").innerHTML = (sum).toFixed(2);
        //  var b = document.getElementById("total2").innerHTML;
        losses();
    })
}

function exporttable() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: 'GET',
        url: 'http://localhost:8090/EMSPNC/CppHome/SHPsteambalanceexport',
    }).done(function (data) {
        var max1 = 200
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.name + '</td>';

            table_data += '<td>' + value.value.toFixed(2) + '</td>';
            table_data += '<td> <progress value =' + value.value + ' max=' + max1 + '></progress></td>';
            table_data += '</tr>';
        });
        $('#exporttable').append(table_data);
        var sum = data.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        document.getElementById("toalexp").innerHTML = (sum).toFixed(2);

        losses();
    })

}

function losses() {
    var val1 = document.getElementById("total1").innerHTML;
    var val2 = document.getElementById("total2").innerHTML;
    var val3 = document.getElementById("toalexp").innerHTML;
    vallosses = val1 - val2 - val3;
    document.getElementById("val-total0").innerHTML = (vallosses).toFixed(2)
    $("#progressbar0").progressbar({
        value: vallosses,
        max: 700,
        min: 0
    })
}

function generatorstable1() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: 'GET',
        url: 'http://localhost:8090/EMSPNC/CppHome/HPsteambalancegenerators',
    }).done(function (data) {
        var max1 = 200
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.name + '</td>';

            table_data += '<td>' + value.value.toFixed(2) + '</td>';
            table_data += '<td> <progress value =' + value.value + ' max=' + max1 + '></progress></td>';
            table_data += '</tr>';
        });
        $('#generatorstable1').append(table_data);
        var sum = data.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        document.getElementById("total4").innerHTML = (sum).toFixed(2);

        losses1();
    })
}

function consumerstable1() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: 'GET',
        url: 'http://localhost:8090/EMSPNC/CppHome/HPsteambalanceconsumers',
    }).done(function (data) {
        var max1 = 200
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.name + '</td>';

            table_data += '<td>' + value.value.toFixed(2) + '</td>';
            table_data += '<td> <progress value =' + value.value + ' max=' + max1 + '></progress></td>';
            table_data += '</tr>';
        });
        $('#consumerstable1').append(table_data);
        var sum = data.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        document.getElementById("total5").innerHTML = (sum).toFixed(2);

        losses1();
    })

}

function exporttable1() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: 'GET',
        url: 'http://localhost:8090/EMSPNC/CppHome/HPsteambalanceexport',
    }).done(function (data) {
        var max1 = 200
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.name + '</td>';

            table_data += '<td>' + value.value.toFixed(2) + '</td>';
            table_data += '<td> <progress value =' + value.value + ' max=' + max1 + '></progress></td>';
            table_data += '</tr>';
        });
        $('#exporttable1').append(table_data);
        var sum = data.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        document.getElementById("total6").innerHTML = (sum).toFixed(2);

        losses1();
    })

}

function losses1() {
    var val4 = document.getElementById("total4").innerHTML;
    var val5 = document.getElementById("total5").innerHTML;
    var val6 = document.getElementById("total6").innerHTML;
    vallosses1 = val4 - val5 - val6;
    document.getElementById("val-total1").innerHTML = (vallosses1).toFixed(2);
    $("#progressbar1").progressbar({
        value: vallosses1,
        max: 700,
        min: 0
    })
}

function generatorstable2() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: 'GET',
        url: 'http://localhost:8090/EMSPNC/CppHome/Mpsteambalancegenerators',
    }).done(function (data) {
        var max1 = 200
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.name + '</td>';

            table_data += '<td>' + value.value.toFixed(2) + '</td>';
            table_data += '<td> <progress value =' + value.value + ' max=' + max1 + '></progress></td>';
            table_data += '</tr>';
        });
        $('#generatorstable2').append(table_data);
        var sum = data.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        document.getElementById("total8").innerHTML = (sum).toFixed(2);
        losses2();
    })

}

function consumerstable2() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: 'GET',
        url: 'http://localhost:8090/EMSPNC/CppHome/MPsteambalanceconsumers',
    }).done(function (data) {
        var max1 = 200
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.name + '</td>';

            table_data += '<td>' + value.value.toFixed(2) + '</td>';
            table_data += '<td> <progress value =' + value.value + ' max=' + max1 + '></progress></td>';
            table_data += '</tr>';
        });
        $('#consumerstable2').append(table_data);
        var sum = data.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        document.getElementById("total9").innerHTML = (sum).toFixed(2);
        losses2();
    })
}

function exporttable2() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: 'GET',
        url: 'http://localhost:8090/EMSPNC/CppHome/MPsteambalanceexport',
    }).done(function (data) {
        var max1 = 200
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.name + '</td>';

            table_data += '<td>' + value.value.toFixed(2) + '</td>';
            table_data += '<td> <progress value =' + value.value + ' max=' + max1 + '></progress></td>';
            table_data += '</tr>';
        });
        $('#exporttable2').append(table_data);
        var sum = data.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        document.getElementById("total10").innerHTML = (sum).toFixed(2);
        losses2();
    })

}

function losses2() {
    var val8 = document.getElementById("total8").innerHTML;
    var val9 = document.getElementById("total9").innerHTML;
    var val10 = document.getElementById("total10").innerHTML;
    vallosses2 = val8 - val9 - val10;
    document.getElementById("val-total2").innerHTML = (vallosses2).toFixed(2);
    $("#progressbar2").progressbar({
        value: vallosses2,
        max: 700,
        min: 0
    })
}

function generatorstable3() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: 'GET',
        url: 'http://localhost:8090/EMSPNC/CppHome/LPsteambalancegenerators',
    }).done(function (data) {
        var max1 = 200
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.name + '</td>';

            table_data += '<td>' + value.value.toFixed(2) + '</td>';
            table_data += '<td> <progress value =' + value.value + ' max=' + max1 + '></progress></td>';
            table_data += '</tr>';
        });
        $('#generatorstable3').append(table_data);
        var sum = data.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        document.getElementById("total12").innerHTML = (sum).toFixed(2);
        losses3();
    })
}

function consumerstable3() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: 'GET',
        url: 'http://localhost:8090/EMSPNC/CppHome/LPsteambalanceconsumers',
    }).done(function (data) {
        var max1 = 200
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.name + '</td>';

            table_data += '<td>' + value.value.toFixed(2) + '</td>';
            table_data += '<td> <progress value =' + value.value + ' max=' + max1 + '></progress></td>';
            table_data += '</tr>';
        });
        $('#consumerstable3').append(table_data);
        var sum = data.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        document.getElementById("total13").innerHTML = (sum).toFixed(2);
        losses3();
    })
}

function exporttable3() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: 'GET',
        url: 'http://localhost:8090/EMSPNC/CppHome/LPsteambalanceexport',
    }).done(function (data) {
        console.log(data, "ooo hello");
        var max1 = 200
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.name + '</td>';

            table_data += '<td>' + value.value.toFixed(2) + '</td>';
            table_data += '<td> <progress value =' + value.value + ' max=' + max1 + '></progress></td>';
            table_data += '</tr>';
        });
        $('#exporttable3').append(table_data);
        var sum = data.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        document.getElementById("total21").innerHTML = (sum).toFixed(2);
        losses3();
    })

}

function losses3() {
    var val12 = document.getElementById("total12").innerHTML;
    var val13 = document.getElementById("total13").innerHTML;
    var val21 = document.getElementById("total21").innerHTML;
    vallosses3 = val12 - val13 - val21;
    document.getElementById("val-total3").innerHTML = (vallosses3).toFixed(2);
    $("#progressbar3").progressbar({
        value: vallosses3,
        max: 700,
        min: 0
    })
}
function generatorstable4() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: 'GET',
        url: 'http://localhost:8090/EMSPNC/CppHome/BFWsteambalancegenerators',
    }).done(function (data) {
        var max1 = 200
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.name + '</td>';

            table_data += '<td>' + value.value.toFixed(2) + '</td>';
            table_data += '<td> <progress value =' + value.value + ' max=' + max1 + '></progress></td>';
            table_data += '</tr>';
        });
        $('#generators4').append(table_data);
        var sum = data.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        document.getElementById("total22").innerHTML = (sum).toFixed(2);
        losses4();
    })
}

function consumerstable4() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: 'GET',
        url: 'http://localhost:8090/EMSPNC/CppHome/BFWsteambalanceconsumers',
    }).done(function (data) {
        var max1 = 200
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.name + '</td>';

            table_data += '<td>' + value.value.toFixed(2) + '</td>';
            table_data += '<td> <progress value =' + value.value + ' max=' + max1 + '></progress></td>';
            table_data += '</tr>';
        });
        $('#consumerstable4').append(table_data);
        var sum = data.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        document.getElementById("total15").innerHTML = (sum).toFixed(2);
        losses4();
    })
}
function exporttable4() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: 'GET',
        url: 'http://localhost:8090/EMSPNC/CppHome/BFWsteambalanceexport',
    }).done(function (data) {
        var max1 = 200
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.name + '</td>';

            table_data += '<td>' + value.value.toFixed(2) + '</td>';
            table_data += '<td> <progress value =' + value.value + ' max=' + max1 + '></progress></td>';
            table_data += '</tr>';
        });
        $('#exporttable4').append(table_data);
        var sum = data.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
        document.getElementById("total23").innerHTML = (sum).toFixed(2);
        losses4();
    })

}
function losses4() {
    var val22 = document.getElementById("total22").innerHTML;
    var val15 = document.getElementById("total15").innerHTML;
    var val23 = document.getElementById("total23").innerHTML;
    var vallosses3 = val22 - val15 - val23;
    document.getElementById("val-total4").innerHTML = (vallosses3).toFixed(2);
    $("#progressbar4").progressbar({
        value: vallosses3,
        max: 700,
        min: 0
    })
}