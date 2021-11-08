function updateTable() {
    $.get("/storage/users").done((users) => {
        if (users) {
            let tableBody = $("#users-table-body");
            tableBody.empty();

            for (let user of users) {
                let row = createUsersTableRow(user);
                tableBody.append(row);
            }
        }
    });
}

$(document).ready(() => {
    updateTable();

    $("#update-user-form-message-close").on("click", () => {
        $("#update-user-form-message").css("display", "none");
    });
});

function openUpdateForm(id) {
    $.get("/storage/users/" + id).done((user) => {
        if (user) {
            $("#update-user-form-balance").val(user.balance);
            $("#update-user-form-participate").prop("checked", user.participate);
            $("#update-user-form-submit").off("click");
            $("#update-user-form-submit").on("click", () => {
                let balance = $("#update-user-form-balance").val();
                let participate = $('#update-user-form-participate').is(':checked');
                updateUser({id: user.id, balance: balance, participate: participate});
            });
            $("#modal-update-user").css("display", "block");
        }
    });
}

function checkUpdateForm() {
    let correct = $("#update-user-form-balance").val() >= 0;

    if (correct) {
        $("#update-user-form-submit").removeClass("w3-disabled");
    } else {
        $("#update-user-form-submit").addClass("w3-disabled");
    }

    $("#update-user-form-submit").prop("disabled", !correct);
}

function closeUpdateForm() {
    $("#modal-update-user").css("display", "none");
    $("#update-user-form-message").css("display", "none");
}

function updateUser(user) {
    $.ajax({
        url: "/storage/users/",
        type: "PUT",
        data: user,
        success: function (data) {
            if (data) {
                showMessage(data.message, data.error)

                if (!data.error) {
                    updateTable();
                }
            }
        }
    });
}

function showMessage(text, error) {
    let form = $("#update-user-form-message");

    $("#update-user-form-message-p").text(text);

    if (error) {
        form.addClass("w3-red");
        form.removeClass("w3-green");
    } else {
        form.addClass("w3-green");
        form.removeClass("w3-red");
    }

    form.css("display", "block");
}