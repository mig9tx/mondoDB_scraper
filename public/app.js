$(document).ready(function () {

    $(document).on("click", "#scrape", function () {
        console.log("it clicked");
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
        





});