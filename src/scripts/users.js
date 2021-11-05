function createTableRow(user) {
    let row = document.createElement("tr");
    let cellId = document.createElement("td");
    let cellName = document.createElement("td");
    let cellBalance = document.createElement("td");
    let cellParticipate = document.createElement("td");
    let cellSettings = document.createElement("td");
    let cellSettingsButton = document.createElement("button");
    let cellSettingsButtonIcon = document.createElement("img");

    cellId.append(document.createTextNode(user.id));
    cellName.append(document.createTextNode(user.name));
    cellBalance.append(document.createTextNode(user.balance));
    cellParticipate.append(document.createTextNode((user.participate)? "Да" : "Нет"));
    cellSettings.append(cellSettingsButton);
    cellSettingsButton.append(cellSettingsButtonIcon);

    cellId.classList.add("w3-right-align");
    cellBalance.classList.add("w3-center");
    cellParticipate.classList.add("w3-center");
    cellSettingsButton.classList.add("w3-button", "w3-circle", "settings-button", "w3-right");
    cellSettingsButton.onclick = function() {
        openUpdateForm(user.id);
    };
    cellSettingsButtonIcon.classList.add("settings-button-icon");
    cellSettingsButtonIcon.src = "/public/images/settings.png";

    row.append(cellId, cellName, cellBalance, cellParticipate, cellSettings);
    return row;
}

function updateTable() {
    $.get("/storage/users").done((users) => {
        if (users) {
            let tableBody = $("#users-table-body");
            tableBody.empty();

            for (let user of users) {
                let row = createTableRow(user);
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
                    console.log(data)
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