function openUpdateForm(id) {
    /*$.get("/paintings/" + id).done((data) => {
        if (false) {
            document.getElementById("book-name").textContent = response.result.name;
            document.getElementById("book-author").textContent = response.result.author;
            document.getElementById("book-description").textContent = response.result.description;
            document.getElementById("book-release-date").textContent = response.result.releaseDate;
            document.getElementById("book-available").textContent = (response.result.available) ? "Да" : "Нет";

            document.getElementById("update-book-form-name").value = response.result.name;
            document.getElementById("update-book-form-author").value = response.result.author;
            document.getElementById("update-book-form-release-date").value = response.result.releaseDate;
            document.getElementById("update-book-form-desc").textContent = response.result.description;

            if (response.result.holder) {
                document.getElementById("book-holder-p").style.display = "block";
                document.getElementById("book-return-date-p").style.display = "block";
                document.getElementById("button-return-book").style.display = "";
                document.getElementById("button-give-book").style.display = "none";
                document.getElementById("book-holder-name").textContent = response.result.holder.name;
                document.getElementById("book-return-date").textContent = response.result.holder.returnDate;
                document.getElementById("holder-info-name").textContent = response.result.holder.name;
                document.getElementById("holder-info-return-date").textContent = response.result.holder.returnDate;
            } else {
                document.getElementById("book-holder-p").style.display = "none";
                document.getElementById("book-return-date-p").style.display = "none";
                document.getElementById("button-return-book").style.display = "none";
                document.getElementById("button-give-book").style.display = "";
            }
        }
    }*/
}

function closeUpdateForm() {
    document.getElementById('modal-update-painting').style.display = "none";
    document.getElementById('update-painting-form-message').style.display = "none";
}

function changePainting(id) {
    /*$.get("/paintings/" + id).done((data) => {
        console.log(data)
        if (false) {
            document.getElementById("book-name").textContent = response.result.name;
            document.getElementById("book-author").textContent = response.result.author;
            document.getElementById("book-description").textContent = response.result.description;
            document.getElementById("book-release-date").textContent = response.result.releaseDate;
            document.getElementById("book-available").textContent = (response.result.available)? "Да" : "Нет";

            document.getElementById("update-book-form-name").value = response.result.name;
            document.getElementById("update-book-form-author").value = response.result.author;
            document.getElementById("update-book-form-release-date").value = response.result.releaseDate;
            document.getElementById("update-book-form-desc").textContent = response.result.description;

            if (response.result.holder) {
                document.getElementById("book-holder-p").style.display = "block";
                document.getElementById("book-return-date-p").style.display = "block";
                document.getElementById("button-return-book").style.display = "";
                document.getElementById("button-give-book").style.display = "none";
                document.getElementById("book-holder-name").textContent = response.result.holder.name;
                document.getElementById("book-return-date").textContent = response.result.holder.returnDate;
                document.getElementById("holder-info-name").textContent = response.result.holder.name;
                document.getElementById("holder-info-return-date").textContent = response.result.holder.returnDate;
            } else {
                document.getElementById("book-holder-p").style.display = "none";
                document.getElementById("book-return-date-p").style.display = "none";
                document.getElementById("button-return-book").style.display = "none";
                document.getElementById("button-give-book").style.display = "";
            }
        }
    });*/
}

function deletePainting(id) {
    $.get("/storage/paintings/" + 2).done((data) => {
        console.log(data)
    });
}