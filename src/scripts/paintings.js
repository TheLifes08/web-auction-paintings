function createTableRow(painting) {
    let row = document.createElement("tr");
    let cellId = document.createElement("td");
    let cellTitle = document.createElement("td");
    let cellAuthor = document.createElement("td");
    let cellStartPrice = document.createElement("td");
    let cellPlaced = document.createElement("td");
    let cellSettings = document.createElement("td");
    let cellSettingsButton = document.createElement("button");
    let cellSettingsButtonIcon = document.createElement("img");

    cellId.append(document.createTextNode(painting.id));
    cellTitle.append(document.createTextNode(painting.title));
    cellAuthor.append(document.createTextNode(painting.author));
    cellStartPrice.append(document.createTextNode(painting.startPrice));
    cellPlaced.append(document.createTextNode((painting.placedOnAuction)? "Да" : "Нет"));
    cellSettings.append(cellSettingsButton);
    cellSettingsButton.append(cellSettingsButtonIcon);

    cellId.classList.add("w3-right-align");
    cellStartPrice.classList.add("w3-center");
    cellPlaced.classList.add("w3-center");
    cellSettingsButton.classList.add("w3-button", "w3-circle", "settings-button", "w3-right");
    cellSettingsButton.onclick = function() {
        window.location.href = "/paintings/" + painting.id;
    };
    cellSettingsButtonIcon.classList.add("settings-button-icon");
    cellSettingsButtonIcon.src = "/public/images/settings.png";

    row.append(cellId, cellTitle, cellAuthor, cellStartPrice, cellPlaced, cellSettings);
    return row;
}

$(document).ready(() => {
    $.get("/storage/paintings").done((paintings) => {
        if (paintings) {
            let tableBody = $("#paintings-table-body");

            for (let painting of paintings) {
                let row = createTableRow(painting);
                tableBody.append(row);
            }
        }
    });
});