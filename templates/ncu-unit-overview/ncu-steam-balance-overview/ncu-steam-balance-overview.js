$(document).ready(function () {
    ncusteamta();
    $("#ncudrop").on('change', function () {
        var demoncu = $(this).find(":selected").val();
        $('#ncucharts').html(demoncu);
        ncusteamoverview();
    });
    $("input[name=fromHomencu]").on('change', function () {
        document.getElementById("toHomencu").min = $('#fromHomencu').val();
        ncusteamoverview();
    });
    $("input[name=toHomencu]").on('change', function (event) {
        document.getElementById("fromHomencu").max = $('#toHomencu').val();
        ncusteamoverview();
    });
    const d = new Date(sessionStorage.getItem("lastUpdateddate"));
    d.setHours(-05);
    d.setMinutes(00);
    d.setSeconds(0);
    $('#fromHomencu').val(d.toJSON().slice(0, 19));
    const tod = new Date(sessionStorage.getItem("lastUpdateddate"));
    tod.setHours(18);
    tod.setSeconds(59);
    tod.setSeconds(0);
    $('#toHomencu').val(tod.toJSON().slice(0, 19));
    document.getElementById("toHomencu").min = $('#fromHomencu').val();
    document.getElementById("fromHomencu").max = $('#toHomencu').val();

    ncusteamoverview();
});

function ncusteamoverview() {
    var myJSON = { 'fromdate': $('#fromHomencu').val(), 'todate': $('#toHomencu').val(), 'tagname': $("#ncudrop option:selected").val() };
    const postdata = JSON.stringify(myJSON);
    console.log(postdata);
    $.ajax({
        method: "POST",
        data: postdata,
        headers: { 'Content-Type': 'application/json' },
        url: "http://localhost:8090/EMSPNC/ncusteam/steamgenerationgraph",
    }).done(function (data) {
        var Difference_In_Days = data[0].showNumberIndex;
        ncugetsteamoverview(data, Difference_In_Days);
    })
}


function ncugetsteamoverview(data, Difference_In_Days) {
    var chartData = { actual: [] };
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        var count = data.length;
        const NCUSBDate = new Date(element.date);
        chartData.actual.push({ y: element.actual, x: NCUSBDate });
    }
    console.log("FccuData", chartData);
    var interval = 1;
    if (!Difference_In_Days) {
        if (count / 8 > 1) {
            interval = Math.round(count / 8);
        } else {
            interval = 1;
        }

    }
    showsteambalancencu(chartData, Difference_In_Days, interval);
}

function showsteambalancencu(data, Difference_In_Days, interval) {
    var chart = new CanvasJS.Chart("chartSteamBalancencu", {
        height: 250,
        theme: "dark1",
        backgroundColor: "#26293c",
        toolTip: {
            shared: true  //disable here. 
        },
        axisX: {
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
            intervalType: Difference_In_Days == true ? "hour" : "day",
            valueFormatString: Difference_In_Days == true ? "HH" : "DD MMM YYYY",
            //valueFormatString: "DD MMM" ,
            title: Difference_In_Days == true ? "In hours" : " In Days",
            interval: interval,
            tickThickness: 0,
            labelFontColor: "#d9d9d9",
            labelFontSize: 15
        },
        axisY: {
            title: "",
            gridColor: "gray",
            gridThickness: 1,
            tickThickness: 0,
            gridDashType: "dot",
            labelFontColor: "#d9d9d9",
            labelFontSize: 15
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center",
        },
        data: [{
            type: "line",
            lineThickness: 4,
            color: "#02a6e3",
            name: "Actual",
            markerSize: 0,
            //toolTipContent: "{name}: {y}",
            yValueFormatString: "0.00#",
            dataPoints: data.actual
        }]
    });
    chart.render();
}

function ncusteamta() {
    $.ajax({
        url: "http://localhost:8090/EMSPNC/ncusteam/Steambalance",
        method: "GET"
    }).done(function (data) {
        getDropNcu(data);
        var table_data = '';
        $.each(data, function (key, value) {
            table_data += '<tr>';
            table_data += '<td>' + value.name + '</td>';
            table_data += '<td class="steam-gen2">' + value.value + '</td>';
            table_data += '</tr>';
        });
        $('#ncu_table').append(table_data);   
    })

}
function getDropNcu(data) {
    $.each(data, function (key, value) {
        $('#ncudrop').append(`<option value="${value.name}">
                                           ${value.name}
                                      </option>`);
    });
    var demogen1 = $("#ncudrop option:selected").val();
    $('#ncucharts').html(demogen1);
    ncusteamoverview();
}
