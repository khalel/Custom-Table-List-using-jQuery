var validator;
var selectedRow = null;

$(function() {
    console.log('Start initialization.');
    $("#btnUpdate").hide();
    $("#btnCancel").hide();
    $.validator.setDefaults({
        debug: true,
        success: "valid"
    });
    validator = $('#myform').validate({
        rules: {
            'lname': { required: true },
            'fname': { required: true },
            'email': { required: true, email: true },
            'phone_mobile': { required: true }
        },
        messages: {
            'lname': 'Please specify the last name.',
            'fname': 'Please specify the first name.',
            'email': { required: 'Please specify the email address.' },
            'phone_mobile': 'Please specify the phone or mobile.'
        },
        success: 'valid',
        submitHandler: CreateUpdate
    });
    console.log('Initialization ended.');
});

function ClearForm() {
    validator.resetForm();
    validator.reset();
    validator.submitted = {};
    validator.prepareForm();
    validator.hideErrors();
    $('#myform')[0].reset(); // Clears the fields values
    console.log('Form has been cleared.');
}

function CreateUpdate() {
    var isNewList = $('#btnNew').is(':visible');
    if (isNewList) {
        console.log('Started creating new row.');
        $('#List').find('tbody')
            .append($('<tr>')
                .append($('<td>').html($.trim($('#lname').val())))
                .append($('<td>').html($.trim($('#fname').val())))
                .append($('<td>').html($.trim($('#email').val())))
                .append($('<td>').html($.trim($('#phone_mobile').val())))
                .append($('<td>').html('<button class="btn btn-info" onclick="UpdateRow(this)" title="Update"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button><button class="btn btn-warning" onclick="Delete(this)" title="Remove"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>'))
        );
        ClearForm();
        console.log('Ended creating new row.');
    } else {
        console.log('Started updating row.');
        $(selectedRow).closest("tr").find("td:nth-child(1)").html($.trim($("#lname").val()));
        $(selectedRow).closest("tr").find("td:nth-child(2)").html($.trim($("#fname").val()));
        $(selectedRow).closest("tr").find("td:nth-child(3)").html($.trim($("#email").val()));
        $(selectedRow).closest("tr").find("td:nth-child(4)").html($.trim($("#phone_mobile").val()));
        ClearForm();
        ResetButtons();
        console.log('Ended updating row.');
    }
}

function UpdateRow(object) {
    selectedRow = object;

    $("#btnNew").hide();
    $("#btnClear").hide();
    $("#btnUpdate").show();
    $("#btnCancel").show();

    $('#lname').val($(selectedRow).closest('tr').find('td:nth-child(1)').html());
    $('#fname').val($(selectedRow).closest('tr').find('td:nth-child(2)').html());
    $('#email').val($(selectedRow).closest('tr').find('td:nth-child(3)').html());
    $('#phone_mobile').val($(selectedRow).closest('tr').find('td:nth-child(4)').html());
    console.log('Updating selected row.');
}

function Cancel() {
    ClearForm();
    ResetButtons();
    console.log('Cancelled updating selected row.');
}

function ResetButtons() {
    $("#btnNew").show();
    $("#btnClear").show();
    $("#btnUpdate").hide();
    $("#btnCancel").hide();
}

function Delete(object) {
    if (confirm("Are you sure you want to delete this row?")) {
        $(object).closest("tr").remove();
        console.log('Row has been deleted.');
    }
}