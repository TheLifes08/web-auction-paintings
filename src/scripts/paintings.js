$(document).ready(() => {
    $.get("/storage/paintings").done((paintings) => {
        if (paintings) {
            let tableBody = $("#paintings-table-body");

            for (let painting of paintings) {
                let row = createPaintingsTableRow(painting);
                tableBody.append(row);
            }
        }
    });
});