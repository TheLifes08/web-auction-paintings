function checkUpdateForm() {
    let datetime = $("#update-datetime").val();
    let auctionTimeout = $("#update-auction-timeout").val();
    let betTimeout = $("#update-bet-timeout").val();
    let pauseTimeout = $("#update-pause-timeout").val();
    let correct = true;

    if (!Date.parse(datetime)) {
        correct = false;
    }
    if (auctionTimeout <= 0 || betTimeout <= 0 || pauseTimeout <= 0) {
        correct = false;
    }

    if (correct) {
        $("#apply-button").removeClass("w3-disabled");
        $("#save-button").removeClass("w3-disabled");
    } else {
        $("#apply-button").addClass("w3-disabled");
        $("#save-button").addClass("w3-disabled");
    }

    $("#apply-button").prop("disabled", !correct);
    $("#save-button").prop("disabled", !correct);
}

function updateData() {
    $.get("/storage/auction/settings").done((settings) => {
        if (settings) {
            $("#update-datetime").val(settings.datetime);
            $("#update-auction-timeout").val(settings.auctionTimeout);
            $("#update-bet-timeout").val(settings.betTimeout);
            $("#update-pause-timeout").val(settings.pauseTimeout);
        }
    });
}

function updateSettings() {
    let datetime = $("#update-datetime").val();
    let auctionTimeout = $("#update-auction-timeout").val();
    let betTimeout = $("#update-bet-timeout").val();
    let pauseTimeout = $("#update-pause-timeout").val();
    let settings = {datetime, auctionTimeout, betTimeout, pauseTimeout};

    $.ajax({
        url: "/storage/auction/settings",
        type: "PUT",
        data: settings,
        success: function (data) {
            if (data && data.error) {
                console.log(data.message);
            }
        }
    });

    return settings;
}

function saveSettings() {
    let datetime = $("#update-datetime").val();
    let auctionTimeout = $("#update-auction-timeout").val();
    let betTimeout = $("#update-bet-timeout").val();
    let pauseTimeout = $("#update-pause-timeout").val();
    let settings = {datetime, auctionTimeout, betTimeout, pauseTimeout};

    $.post("/storage/auction/settings/filesystem", {"action": "save", settings});
}

function loadSettings() {
    $.post("/storage/auction/settings/filesystem", {"action": "load"}, () => {
        updateData();
    });
}