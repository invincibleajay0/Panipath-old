$(document).ready(function () {

    var token = sessionStorage.getItem('accessToken');
    var decoded = jwt_decode(token);
    console.log(decoded, 'decode');


    if (sessionStorage.getItem('user') != decoded.sub) {
        sessionStorage.clear();
        $(location).prop('href', 'login.html')
    } else {
        setInterval(lastupdatedTime,10000);
        lastupdatedTime();
        $("#bs-example-navbar-collapse-1").load("./templates/nav/nav.html", function () {
            document.getElementById("user").innerHTML = sessionStorage.getItem("user");
        });
        $("#fuel").load("./../../templates/energy-overview/fuel/fuel.html", function () { });
        $("#left-sidebar").load("./../../templates/left-sidebar/left-sidebar.html");
        $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
            var target = $(e.target).attr("href") // activated tab
            var fileName = target.substring(1);
            $(target).load("./../../templates/energy-overview/" + fileName + "/" + fileName + ".html", function() {});
        //getSubmenuAccessEnergyOverview();
        });
        const b = new Date(sessionStorage.getItem("lastUpdateddate"));
        console.log(b, 'b');
        const dmonth = b.getMonth() + 1;
        const setdate = String(b.getDate()).padStart(2, '0') + "-" + String(dmonth).padStart(2, '0') + "-" + b.getFullYear() + " " + String(b.getHours()).padStart(2, '0') + ":" + String(b.getMinutes()).padStart(2, '0') + ":" + String(b.getSeconds()).padStart(2, '0');
        document.getElementById("energyTime").innerHTML = setdate;
    }
});


// function lastupdatedTime() {
//     $.ajax({
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": sessionStorage.getItem("tokenType") + " " + sessionStorage.getItem("accessToken"),
//         },
//         url: 'http://localhost:8090/EMSPNC/Air/lastUpdateTimestamp',
//         method: "GET"
//     }).done(function (data) {
//         console.log(data, "gjhdik");
//         const d = new Date(data.lastupdatetimestamp);
//         sessionStorage.setItem("lastUpdateddate", d);
//         const dmonth = d.getMonth() + 1;
//         document.getElementById("energyTime").innerHTML = d.getDate() + "-" + dmonth + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();


//     });

//     function Truncated() {
//         $.ajax({
//             method: "GET",
//             url: "http://localhost:8090/EMSPNC/home/Truncate",
//         }).done(function (data) {
//             console.log(data)
//         })
//     }
//     function csvdownload() {
//         $.ajax({
//             method: "GET",
//             url: "http://localhost:8090/EMSPNC/home/Report",
//         }).done(function (data) {
//             console.log(data)

//             const csvRows = [];

//             const headers = Object.keys(data[0]);
//             csvRows.push(headers.join(','));
//             console.log(data, "name");

//             //console.log(csvRows, "values");

//             for (const row of data) {
//                 csvRows.join('\n');
//                 var abc = '\n' + row.kpi_name + ',' + row.value + ',' + row.uom;
//                 csvRows.push(abc);
//             }

//             console.log(csvRows, "name");
//             const blob = new Blob(csvRows, { type: 'text/csv' });
//             const url = window.URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.setAttribute('hidden', '');
//             a.setAttribute('href', url);
//             a.setAttribute('download', 'download.csv');
//             document.body.appendChild(a);
//             a.click();
//             document.body.removeChild(a);
//         });
//     }
// }