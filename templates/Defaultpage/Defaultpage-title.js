$(document).ready(function () {
    getUserEmail();
    $("#emailTypehead").on('click', '.editRow', function () {
        // var emailType = $(this).data("emailtype");
        // console.log(emailType, 'emailType');
        // $("#emailType").val($(this).data("emailtype"));
        // $("#toEmail").val($(this).data("toemail"));
        // $("#ccEmail").val($(this).data("ccemail"));
        // $("#bccEmail").val($(this).data("bccemail"));
        // $("#emailStatus").val($(this).data("status"));

        var emailType = $(this).closest('tr').find('td:eq(0)').text();
        var toEmail = $(this).closest('tr').find('td:eq(1)').text();
        var ccEmail = $(this).closest('tr').find('td:eq(2)').text();
        var bccEmail = $(this).closest('tr').find('td:eq(3)').text();
        var statusEmail = $(this).closest('tr').find('td:eq(4)').text();

        $("#emailStatus option[value='" + statusEmail + "']").attr("selected", "selected");
        document.getElementById("emailType").value = emailType;
        document.getElementById("toEmail").value = toEmail;
        document.getElementById("ccEmail").value = ccEmail;
        document.getElementById("bccEmail").value = bccEmail;
    });
});
function defaultmodel() {
    document.getElementById("updateRow").style.display = "block"
}
function defaultclosemodel() {
    document.getElementById("updateRow").style.display = "none"
    getUserEmail();
}

function getUserEmail() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8090/emaildata",

    }).done(function (data) {
        var student = '';
        student += '<tr>';
        for (const val of tabledata) {
            student += '<td>' + val['email_type'] + '</td>';
            student += '<td>' + val['to_email_addresses'].split(";").join("<br/>") + '</td>';
            student += '<td>' + val['cc_email_addresses'].split(";").join("<br/>") + '</td>';
            student += '<td>' + val['bcc_email_addresses'].split(";").join("<br/>") + '</td>';
            student += '<td>' + val['status'] + '</td>';
            student += '<td style="text-align: center;"><input class="btnRow editRow" onclick="defaultmodel()" type="button" value="Edit" data-emailType="' +
                val['email_type'] + '" data-toemail="' + val['to_email_addresses'] + '" data-ccemail="' + val['cc_email_addresses'] + '" data-bccemail="' + val['bcc_email_addresses'] + '" data-status="' + val['status'] + '" /></td>';
            student += '</tr>';
        }
        document.getElementById("emailTypeBody").innerHTML = student;
    });
}

function updateData() {
    var emailType = $("#emailType").val();
    var toEmail = $("#toEmail").val();
    var ccEmail = $("#ccEmail").val();
    var bccEmail = $("#bccEmail").val();
    // var ccEmail =  document.getElementById('ccEmail').multiple;
    // var bccEmail = document.getElementById('bccEmail').multiple;
    var statusEmail = $("#emailStatus").val();
    if (toEmail.includes('@')) {
        var objectarryemail = { 'email_type': emailType, 'to_email_addresses': toEmail, 'cc_email_addresses': ccEmail, 'bcc_email_addresses': bccEmail, 'status': statusEmail }
    }
    else {
        alert("hii")
    }
    $.ajax({
        type: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(objectarryemail),
        url: "http://localhost:8090/UpdateRecords",
        success: function (status) {
            if (status == 'Record Updated Sucessfully!') {
                getUserEmail();
                $('#updateRow').hide();

                alert('Updated sucessfully');
            } else {
                $('#updateRow').hide();
                alert(status);
                getUserEmail();

            }
        }
    });
}