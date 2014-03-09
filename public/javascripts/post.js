function addPosts(posts) {
    posts.forEach(function (post) {
        var wellElement = '<div class="well">' + post + '</div>';
        var textarea = '<textarea class="form-control" rows="3"></textarea>';
        $('<div class="flipbox">' + wellElement + '</div>').
            appendTo('#posts').
            click(function (e) {
                $(this).flippy({
                    duration: "500",
                    direction: "BOTTOM",
                    verso: wellElement
                });
                e.preventDefault();
            });
    });
}

function addPost(post) {
    var wellElement = '<div class="well">' + post + '</div>';
    $('<div class="flipbox">' + wellElement + '</div>').
        prependTo('#posts').
        click(function (e) {
            $(this).flippy({
                duration: "500",
                direction: "BOTTOM",
                verso: wellElement
            });
            e.preventDefault();
        });
}