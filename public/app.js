

$(document).on("click", "#scrape", function () {
    //grab the articles as json
    $.getJSON("/articles", function (data) {
        //for each one
        for (let i = 0; i < data.length; i++) {
            $("#results").append("<p data-id= '" + data[i]._id + "'href='" + data[i].link + "'>" + data[i].title + "<br /></p>");
        }
    });
    console.log("it clicked");
});