function createUsersTableRow(user) {
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

function createPaintingsTableRow(painting) {
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

function createUsersTableSmallRow(user) {
    let row = document.createElement("tr");
    let cellId = document.createElement("td");
    let cellName = document.createElement("td");
    let cellBalance = document.createElement("td");

    cellId.append(document.createTextNode(user.id));
    cellName.append(document.createTextNode(user.name));
    cellBalance.append(document.createTextNode(user.balance));

    cellId.classList.add("w3-right-align");
    cellBalance.classList.add("w3-center");

    row.append(cellId, cellName, cellBalance);
    return row;
}

function createPaintingsTableSmallRow(painting) {
    let row = document.createElement("tr");
    let cellId = document.createElement("td");
    let cellTitle = document.createElement("td");
    let cellAuthor = document.createElement("td");
    let cellStartPrice = document.createElement("td");
    let cellSettings = document.createElement("td");
    let cellSettingsButton = document.createElement("button");
    let cellSettingsButtonIcon = document.createElement("img");

    cellId.append(document.createTextNode(painting.id));
    cellTitle.append(document.createTextNode(painting.title));
    cellAuthor.append(document.createTextNode(painting.author));
    cellStartPrice.append(document.createTextNode(painting.startPrice));
    cellSettings.append(cellSettingsButton);
    cellSettingsButton.append(cellSettingsButtonIcon);

    cellId.classList.add("w3-right-align");
    cellStartPrice.classList.add("w3-center");
    cellSettingsButton.classList.add("w3-button", "w3-circle", "settings-button", "w3-right");
    cellSettingsButton.onclick = function() {
        window.location.href = "/paintings/" + painting.id;
    };
    cellSettingsButtonIcon.classList.add("settings-button-icon");
    cellSettingsButtonIcon.src = "/public/images/info.png";

    row.append(cellId, cellTitle, cellAuthor, cellStartPrice, cellSettings);
    return row;
}