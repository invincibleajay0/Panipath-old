$(document).ready(function() {
    // totalThroughput();
    // lastupdatedTime();
    $("#bs-example-navbar-collapse-1").load("/../templates/nav/nav.html", function() {
        document.getElementById("user").innerHTML = sessionStorage.getItem("user");
        // alert('navigation loaded');
    });
    $("#left-sidebar").load("/../templates/left-sidebar/left-sidebar.html");
    $("#email-user-notification").load("/../templates/Email-notification/email-user-notification.html");
    

    $("#npru-overall-sec-overview").load("/../templates/npru-unit-overview/npru-overall-sec-overview/npru-overall-sec-overview.html", function() {});
    $('#npru-overview-tab a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var target = $(e.target).attr("href") // activated tab
        var fileName = target.substring(1);
        $(target).load("/../templates/npru-unit-overview/" + fileName + "/" + fileName + ".html", function() {});

    });
});
function Truncated(){  
    $.ajax({
        method: "GET",
        url: "http://localhost:8090/home/Truncate",
    }).done(function(data) {
        console.log(data)  
    })
}
