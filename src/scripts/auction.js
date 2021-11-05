$(document).ready(() => {
    $.get("/storage/auctions").done((auctions) => {
        if (auctions) {
            let tableBody = $("#auctions-table-body");

            for (let auction of auctions) {
                let row = createTableRow(auction);
                tableBody.append(row);
            }
        }
    });
});