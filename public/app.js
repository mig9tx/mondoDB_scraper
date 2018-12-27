$(document).ready(function () {

    $(document).on("click", "#scrape", function (event) {
        event.preventDefault();
        $.ajax({
                url: "/scrape",
                type: "GET"
            })
            .then(function () {
                console.log("scraped new articles");
            });
        location.reload();
    });

    //on click event that will change boolean to save article 
    $(".saveArticle").on("click", function (event) {
        let thisId = $(this).attr("article_id");
        console.log(thisId);
        let savedState = {
            saved: true
        };

        $.ajax({
                url: "/save/" + thisId,
                type: "GET",
                data: savedState
            })
            .then(function () {
                console.log("saved article", savedState)
            });
        location.reload();
    });

    $("#saved").on("click", function (event) {
        window.location.replace("/saved");
    });

    $("#articles").on("click", function (event) {
        window.location.replace("/");
    });








});