$(document).ready(function () {
    loadGaugeChart();
    specifictable();
    parametertable();
    guagevalueswingAct();
    $(".swing-doughnut").click(function () {
        console.log($("input[name=ratio-name]:checked").val(), "uiuhkik");
        var abc = $("input[name=ratio-name]:checked").val()
        postFuelDoughnutDataswing1(abc);
    });

    postFuelDoughnutDataswing1();       //post mapping doughnut
    getpiechartswing();        //get mapping pie
});



function getpiechartswing() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8090/EMSPNC/SWING/SteamSHPEquivalent",
    }).done(function (data) {

        var fuelConsumed = data;
        console.log(fuelConsumed);
        loadpiechartswing(fuelConsumed);
    })

}
function loadpiechartswing(fuelConsumed) {
    console.log(fuelConsumed);
    CanvasJS.addColorSet("greenShades", [
        "#ffa600",
        "#005374",
    ]);
    var dataPoints = [];
    var chart = new CanvasJS.Chart("Fuel-swing", {

        colorSet: "greenShades",
        theme: "dark1",
        backgroundColor: "#26293c",

        title: {
            text: fuelConsumed.total.toFixed(2),
            verticalAlign: "center",
            dockInsidePlotArea: true,
            fontWeight: 100,
            // fontColor: "#f2f2f2",
            fontColor : fuelConsumed.colorcode == "none"? "white":fuelConsumed.colorcode,
            fontFamily: "Bahnschrift Light"
        },
        legend: {
            horizontalAlign: "right",
            verticalAlign: "center", // "top" , "bottom"
            fontSize: 15,
        },
        axisY: {
            title: "Units",
            titleFontSize: 24,
            includeZero: true
        },
        legend: {
            verticalAlign: "bottom",
            horizontalAlign: "center"
        },
        data: [{
            type: "doughnut",
            showInLegend: false,
            // toolTipContent: "{name} : {y}%",
            // indexLabel: " {y}%",
            yValueFormatString: "0.00#",
            indexLabelPlacement: "outside",
            startAngle: 120,
            dataPoints: [
                { y: fuelConsumed.hp, name: "HP", indexLabel: ((fuelConsumed.hp / fuelConsumed.total) * 100).toFixed(2) + "%" },
                { y: fuelConsumed.lp, name: "LP", indexLabel: ((fuelConsumed.lp / fuelConsumed.total) * 100).toFixed(2) + "%" },

            ]
        }]
    });

    chart.render();
}


function postFuelDoughnutDataswing1() {
    var myJSON = { uom: $("input[name=ratio-name]:checked").val() }
    const postdata = JSON.stringify(myJSON);
    console.log(postdata);
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
        },
        method: "POST",
        data: postdata,

        url: "http://localhost:8090/EMSPNC/SWING/FCCUDoughnut",
    })
        .done(function (data) {

            var energyConsumed = data[0].energyConsumed;
            console.log(energyConsumed);

            loadDoughnutHoriChartswing1(energyConsumed);

        })

}
function loadDoughnutHoriChartswing1(energyConsumed) {
    // console.log(energyConsumed)
    CanvasJS.addColorSet("greenShades", [
        "#ffa600",
        "#00aa7e",
        "#005374"
    ]);
    var dataPoints = [];
    var chart = new CanvasJS.Chart("titles-swing", {

        colorSet: "greenShades",
        // height: 120,
        // width: 160,
        theme: "dark1",
        backgroundColor: "#26293c",
        title: {
            text: energyConsumed.total.toFixed(2),
            verticalAlign: "center",
            dockInsidePlotArea: true,
            fontWeight: 500,
            // fontColor: "#f2f1e7",
            fontColor : energyConsumed.colorcode == "none"? "white":energyConsumed.colorcode,
            fontFamily: "Bahnschrift Light"
        },

        axisY: {
            title: "Units",
            titleFontSize: 24,
            includeZero: true

        },

        data: [{
            type: "doughnut",
            yValueFormatString: "0.00#",
            indexLabelPlacement: "outside",
            startAngle: 100,
            dataPoints: [
                { y: energyConsumed.fuel, name: "Fuel", indexLabel: ((energyConsumed.fuel / energyConsumed.total) * 100).toFixed(2) + "% " },
                { y: energyConsumed.steam, name: "Steam", indexLabel: ((energyConsumed.steam / energyConsumed.total) * 100).toFixed(2) + "% " },
                { y: energyConsumed.electicity, name: "Electricity", indexLabel: ((energyConsumed.electicity / energyConsumed.total) * 100).toFixed(2) + "% " }
            ]
        }]
    });

    chart.render();
}

function loadGaugeChart() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8090/EMSPNC/SWING/specificenergyConsumption",
    }).done(function (gaugevalue) {
        loadGaugeChartvalue(gaugevalue);
        console.log(gaugevalue)
    });
}
function guagevalueswingAct() {
    $.ajax({
        method: "GET",
        url: 'http://localhost:8090/EMSPNC/SWING/specificenergyConsumption',
    }).done(function (data) {
        document.getElementById("devswing").innerHTML = data.deviation.toFixed(2) + "%";
        document.getElementById("actswing").innerHTML = data.actual.toFixed(2);
        document.getElementById("optswing").innerHTML = data.reference.toFixed(2);
    });

}
function loadGaugeChartvalue(gaugevalue) {
    ZC.LICENSE = ["b55b025e438fa8a98e32482b5f768ff5"];
    var myConfig12 = {
        "type": "gauge",
        "height": "19%",
        "width": "60%",
        "x": "20%",
        "backgroundColor": "#26293c",
        "scale": {
            "size-factor": "250%", //Modify your gauge chart size.
            offsetY: '10px'
        },
        plotarea: {
            padding: '10 0 0 0'
        },
        "scale-r": {
            "aperture": 180,
            "values": "0:100:0",
            item: {
                'font-color': "#bfbfbf",
                'offset-r': -10,
                'font-size': 10,
            },
            "center": {
                "size": 4,
                "background-color": "transparent",
                "border-color": "none"
            },
            "ring": {
                "size": 24,
                "rules": [{
                    "rule": "%v >= 0 && %v <= 10",
                    "background-color": "#02b04f"
                },

                {
                    "rule": "%v >= 11 && %v <= 30",
                    "background-color": "#ffc000"
                },

                {
                    "rule": "%v >= 31 && %v <=100",
                    "background-color": "#ff0000"
                }
                ]
            },
            "guide": {
                "alpha": 0.8
            }
        },
        "plot": {
            "csize": "3%",
            "size": "100%",
            "background-color": "black"
        },
        "series": [{
            "background-color": "black",
            "values": gaugevalue.specificenergy,
        }]
    };

    setTimeout(() => {
        zingchart.render({
            id: 'zingChart',
            data: myConfig12
        });
    }, 100);
}

function specifictable() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8090/EMSPNC/SWING/ParameterTable"
    }).done(function (data) {
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.type + '</td>';
            table_data += '<td>' + value.sec + '</td>';
            table_data += '<td>' + value.reference + '</td>';
            if (value.deviation > 0) {
                table_data += '<td class="r1">' + "+" + value.deviation + '</td>';
            }
            else {
                table_data += '<td class="r1">' + value.deviation + '</td>';
            }

            table_data += '</tr>';
        });
        $('#swingtable').append(table_data);
        $(".r1").each(function () {
            var text = $(this).text();
            if (/[+-]?\d+(\.\d+)?/.test(text)) {
                var num = parseFloat(text);
                if (num < 0) {
                    $(this).addClass("negative");
                } else if (num > 0) {
                    $(this).addClass("positive");
                }

            }
        });
    })
}
function parametertable() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8090/EMSPNC/SWING/SECSteamTabledata"
    }).done(function (data) {
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.parameter + '</td>';
            table_data += '<td>' + value.actual + '</td>';
            table_data += '<td>' + value.reference + '</td>';
            if (value.deviation > 0) {
                table_data += '<td class="r1">' + "+" + value.deviation + '</td>';
            }
            else {
                table_data += '<td class="r1">' + value.deviation + '</td>';
            }
            table_data += '</tr>';
        });
        $('#swing_card_body').append(table_data);
        $(".r1").each(function () {
            var text = $(this).text();
            if (/[+-]?\d+(\.\d+)?/.test(text)) {
                var num = parseFloat(text);
                if (num < 0) {
                    $(this).addClass("negative");
                } else if (num > 0) {
                    $(this).addClass("positive");
                }

            }
        });
    })
}