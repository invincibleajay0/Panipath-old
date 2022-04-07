$(document).ready(function () {
  $("#r1").on('change', function () {
    var demoboiler = $(this).find(":selected").attr('name');
    $('#ubivalue').html(demoboiler);
  });
  getSteamFuelConsumedData();

  BoilerTable();
  $("#r1").on('change', function () {
    getSpecificBOILERData();
    let domLebal1 = ($(this).find(":selected").val());
    $("#first_Boiler").html(domLebal1);
  });
  $("input[name=fromBoiler]").on('change', function (event) {
    document.getElementById("toboiler").min= $("#fromboiler").val();
    getSpecificBOILERData();
  });

  $("input[name=toBoiler]").on('change', function (event) {
    document.getElementById("fromboiler").max= $("#toboiler").val();
    getSpecificBOILERData();
  });

  const d = new Date(sessionStorage.getItem("lastUpdateddate"));
  d.setHours(05);
  d.setMinutes(30);
  d.setSeconds(0);

  $('#fromboiler').val(d.toJSON().slice(0, 19));
  const tod = new Date(sessionStorage.getItem("lastUpdateddate"));
  tod.setHours(29);
  tod.setMinutes(29);
  tod.setSeconds(0);
  $('#toboiler').val(tod.toJSON().slice(0, 19));
  document.getElementById("toboiler").min= $("#fromboiler").val();
  document.getElementById("fromboiler").max= $("#toboiler").val();
  getSpecificBOILERData();

});
function getSpecificBOILERData() {
  var myJSON = { 'fromdate': $('#fromboiler').val(), 'todate': $('#toboiler').val(), tagname: $('#r1 option:selected').val() };
  const postdata = JSON.stringify(myJSON);
  console.log(postdata, "datajson");
  $.ajax({
    headers: {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
    },
    method: "POST",
    data: postdata,

    url: "http://localhost:8090/EMSPNC/tpsBoiler/boilerEfficencyBarGraph",
  }).done(function (data) {
    var Difference_In_Days = data[0].showNumberIndex;
    var chartData = { Actual: [], Design: [] };
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      var count = data.length;
      const boilerDate = new Date(element.date);
      chartData.Actual.push({ y: element.actual, x: boilerDate });
      chartData.Design.push({ y: element.design, x: boilerDate });

    }
    console.log(count, 'count');
    console.log("STchartdata", chartData);
    var interval = 1;
    if (!Difference_In_Days) {
      if (count / 8 > 1) {
        interval = Math.round(count / 8);
      } else {
        interval = 1;
      }

    }
    showSpecificBOILERChart(chartData, Difference_In_Days, interval);
  })
}

function showSpecificBOILERChart(data, Difference_In_Days, interval) {
  console.log('kjkj');
  var chart = new CanvasJS.Chart("chartContainerBoiler", {
    height: 230,
    theme: "dark1",
    backgroundColor: "#26293c",
    title: {
      text: ""
    },
    toolTip: {
      shared: true  //disable here. 
    },
    axisX: {
      labelFontColor: "#d9d9d9",
      lineColor: "gray",
      tickThickness: 0,
      intervalType: Difference_In_Days == true ? "hour" : "day",
      valueFormatString: Difference_In_Days == true ? "HH" : "DD MMM YYYY",
      title: Difference_In_Days == true ? "In hours" : " In Days",
      interval: interval,
      //labelAngle: -20

    },
    axisY: {
      title: "",
      gridColor: "gray",
      gridThickness: 1,
      gridDashType: "dot",
      labelFontColor: "#d9d9d9",
      labelFontSize: 15,
      fontFamily: "Bahnschrift Light",
    },
    toolTip: {
      shared: true
    },

    data: [{
      type: "line",
      lineThickness: 2,
      color: "#0895cc",
      name: "Actual",
      markerSize: 0,
      yValueFormatString: "0.00#",
      dataPoints: data.Actual
    },
    {
      type: "line",
      lineThickness: 2,
      color: "#ffc000",
      name: "Design",
      markerSize: 0,
      yValueFormatString: "0.00#",
      dataPoints: data.Design
    }
    ]
  });
  chart.render();
}

//three bar
function getSteamFuelConsumedData() {
  $.ajax({
    headers: {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
    },
    method: "GET",
    url: "http://localhost:8090/EMSPNC/tpsBoiler/fuelConsumedBarGraph",

  }).done(function (data) {
    var chartData = { RLNG: [], BFO: [], OFF_Gas: [], HSD: [] };
    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      chartData.RLNG.push({ y: element.RLNG, label: element.BoilerID });
      chartData.BFO.push({ y: element.BFO, label: element.BoilerID });
      chartData.OFF_Gas.push({ y: element.OFF_Gas, label: element.BoilerID });
      chartData.HSD.push({ y: element.HSD, label: element.BoilerID });
    }
    Fuelconsumed(chartData);
  })
}
function Fuelconsumed(data) {
  var chart = new CanvasJS.Chart("chartBoiler2",
    {
      height: 240,
      theme: "dark1",
      backgroundColor: "#26293c",
      title: {
        text: ""
      },
      dataPointMaxWidth: 40,
      dataPointWidth: 50,
      legend: {
        verticalAlign: "top",  // "top" , "bottom"
        horizontalAlign: "left"
      },
      toolTip: {
        shared: true  //disable here. 
      },
      axisX: {
        gridThickness: 0,
        lineColor: "white",
        labelFontColor: "#d9d9d9",
        labelFontSize: 15,
        tickThickness: 0,

      },
      axisY: {
        gridThickness: 0,
        lineColor: "white",
        labelFontColor: "#d9d9d9",
        labelFontSize: 15,
        maximum:16
      },
      data: [
        {
          type: "column",
          name: "RLNG",
          color: "#ffc000  ",
          indexLabel: " {y}",
          indexLabelFontColor: "#d9d9d9",
          indexLabelFontSize: 15,
          dataPoints: data.RLNG
        },
        {
          type: "column",
          name: "BFO",
          color: "#0795cc",
          indexLabel: " {y}",
          indexLabelFontColor: "#d9d9d9",
          indexLabelFontSize: 15,
          dataPoints: data.BFO
        }, {
          type: "column",
          name: "HSD",
          color: "#a5a5a5 ",
          indexLabel: " {y}",
          indexLabelFontColor: "#d9d9d9",
          indexLabelFontSize: 15,
          dataPoints: data.HSD
        },
        {
          type: "column",
          name: "OFFGas",
          color: "#d944b4 ",
          indexLabel: " {y}",
          indexLabelFontColor: "#d9d9d9",
          indexLabelFontSize: 15,
          dataPoints: data.OFF_Gas
        }


      ]
    });

  chart.render();
}

//table

function BoilerTable() {
  $.ajax({
    url: "http://localhost:8090/EMSPNC/tpsBoiler/boilerTable",
    method: "GET"
  }).done(function (data) {
    var table_data = '';
    $.each(data, function (key, value) {

      table_data += '<tr>';
      table_data += '<td>' + value.BoilerID + '</td>';
      table_data += '<td>' + value.Status + '</td>';
      table_data += '<td>' + value.Loading.toFixed(2) + '</td>';
      table_data += '<td>' + value.steamgenerationcost.toFixed(2) + '</td>';
      table_data += '<td>' + value.FualConsumed.toFixed(2) + '</td>';
      table_data += '<td>' + value.DutyFired.toFixed(2) + '</td>';
      table_data += '<td>' + value.SteamGenerated.toFixed(2) + '</td>';
      table_data += '<td>' + value.SteamtoFualRatioDesign.toFixed(2) + '</td>';
      table_data += '<td>' + value.SteamtoFualRatioActual.toFixed(2) + '</td>';
      table_data += '<td>' + value.StackO2.toFixed(2) + '</td>';
      table_data += '<td>' + value.StackExitTempDesign.toFixed(2) + '</td>';
      table_data += '<td>' + value.StackExitTempActual.toFixed(2) + '</td>';
      table_data += '</tr>';

    });
    $('#bodyboiler_table').append(table_data);
  })
}