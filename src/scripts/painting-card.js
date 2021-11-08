function openUpdateForm(id) {
    $.get("/storage/paintings/" + id).done((painting) => {
        if (painting) {
            $("#update-painting-form-title").val(painting.title);
            $("#update-painting-form-author").val(painting.author);
            $("#update-painting-form-start-price").val(painting.startPrice);
            $("#update-painting-form-min-step").val(painting.minimalPriceStep);
            $("#update-painting-form-max-step").val(painting.maximumPriceStep);
            $("#update-painting-form-desc").val(painting.description);
            $("#update-painting-form-placed").prop("checked", painting.placedOnAuction);
            $("#modal-update-painting").css("display", "block");
        }
    });
}

function checkUpdateForm() {
    let title = $("#update-painting-form-title").val();
    let author = $("#update-painting-form-author").val();
    let startPrice = $("#update-painting-form-start-price").val();
    let minimalPriceStep = $("#update-painting-form-min-step").val();
    let maximumPriceStep = $("#update-painting-form-max-step").val();
    let description = $("#update-painting-form-desc").val();
    let file = $("#update-painting-form-file")[0].files[0];
    let correct = true;

    if (file) {
        if (!["image/png", "image/jpeg"].includes(file.type)) {
            correct = false;
        }
    }
    if (title === "" || author === "" || description === "") {
        correct = false;
    }
    if (startPrice <= 0 || minimalPriceStep <= 0 || maximumPriceStep <= 0 || maximumPriceStep < minimalPriceStep) {
        correct = false;
    }

    if (correct) {
        $("#update-painting-form-submit").removeClass("w3-disabled");
    } else {
        $("#update-painting-form-submit").addClass("w3-disabled");
    }

    $("#update-painting-form-submit").prop("disabled", !correct);
}

function closeUpdateForm() {
    $("#modal-update-painting").css("display", "none");
    $("#update-painting-form-message").css("display", "none");
}

function updateData(id) {
    $.get("/storage/paintings/" + id).done((painting) => {
        if (painting) {
            $("#painting-title").text(painting.title);
            $("#painting-author").text(painting.author);
            $("#painting-start-price").text(painting.startPrice);
            $("#painting-min-step").text(painting.minimalPriceStep);
            $("#painting-max-step").text(painting.maximumPriceStep);
            $("#painting-desc").text(painting.description);
            $("#painting-placed").text((painting.placedOnAuction)? "Да" : "Нет");
        }
    });
}

function updatePainting(id) {
    let title = $("#update-painting-form-title").val();
    let author = $("#update-painting-form-author").val();
    let startPrice = $("#update-painting-form-start-price").val();
    let minimalPriceStep = $("#update-painting-form-min-step").val();
    let maximumPriceStep = $("#update-painting-form-max-step").val();
    let description = $("#update-painting-form-desc").val();
    let placedOnAuction = $("#update-painting-form-placed").is(':checked');
    let painting = {id, title, author, startPrice, minimalPriceStep, maximumPriceStep, description, placedOnAuction};

    $.ajax({
        url: "/storage/paintings/",
        type: "PUT",
        data: painting,
        success: function (data) {
            if (data) {
                showMessage(data.message, data.error)

                if (!data.error) {
                    updateData(id);
                }
            }
        }
    });

    let file = $("#update-painting-form-file")[0].files[0];
    if (file) {
        let formData = new FormData();
        formData.append("id", id);
        formData.append("file", file);

        $.ajax({
            url: "/storage/images/",
            type: "PUT",
            data: formData,
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data',
            success: function (data) {
                if (data && !data.error) {
                    $("#painting-image").prop("src", "/public/images/paintings/" + data.filename + "?" + Math.random());
                }
            }
        });
    }
}

function showMessage(text, error) {
    let form = $("#update-painting-form-message");

    $("#update-painting-form-message-p").text(text);

    if (error) {
        form.addClass("w3-red");
        form.removeClass("w3-green");
    } else {
        form.addClass("w3-green");
        form.removeClass("w3-red");
    }

    form.css("display", "block");
}