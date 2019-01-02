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

        window.location.reload();
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

    //on click to delete an article from saved
    $(".delete").on("click", function (evnet) {
        event.preventDefault();
        let thisId = $(this).attr("article_id");
        console.log(thisId);
        let savedState = {
            saved: false
        };

        $.ajax({
            url: "/delete/" + thisId,
            type: "GET",
            data: savedState
        });

        location.reload();

    });

    //Click event to open note modal and show notes
    $(".addNote").on("click", function (event) {
        $(".modal-footer").empty();
        $("#noteArea").empty();
        let thisId = $(this).attr("article_id");
        console.log(thisId + "line 68 app.js")
        $.ajax({
                method: "GET",
                url: "/articles/" + thisId
            })
            .then(function (data) {
                console.log(data);
                $(".modal-title").text(data.title);
                console.log(data._id);
                // $("#deleteNote").attr("article_id", data._id);
                if (data.note) {
                    console.log("note_id " + data.note._id);
                    $(".modal-footer").append("<button type='button' class='btn btn-success' data-dismiss='modal' id='saveNote'>Save Note</button>");
                    $("#saveNote").attr("article_id", data._id);
                    $(".modal-footer").append("<button type='button' class='btn btn-danger' data-dismiss='modal' id='deleteNote'>Delete Note</button>");
                    $("#deleteNote").attr("article_id", data._id);
                    $("#noteArea").append("<h4>Title: " + data.note.title + "</h4>");
                    $("#noteArea").append("<p>Note: " + data.note.body + "</p>");
                }else {
                $(".modal-footer").append("<button type='button' class='btn btn-success' data-dismiss='modal' id='saveNote'>Save Note</button>");
                $("#saveNote").attr("article_id", data._id);
                };
            });
    });

    //Click event to save a note for an article
    $("#saveNote").on("click", function (event) {
        //grab article_id from button attribute
        let thisId = $(this).attr("article_id");
        console.log(thisId);

        //Run a POST request to change the note, using what's entered in the input boxes
        $.ajax({
                method: "POST",
                url: "/articles/" + thisId,
                data: {
                    title: $("#noteTitle").val(),
                    body: $("#noteBody").val()
                }
            })
            .then(function (data) {
                // Log the response
                console.log(data);
            });
        $("#noteTitle").val("");
        $("#noteBody").val("");
    });

    //Click event to delete a note for an article
    $("#deleteNote").on("click", function (event) {
        let thisId = $(this).attr("article_id");
        console.log(thisId);

        $.ajax({
                method: "GET",
                url: "/articles/" + thisId,
            })
            .then(function (data) {
                console.log(data.note)
                console.log(data);
            })
    })





});