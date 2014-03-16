function addPosts(posts) {
    posts.forEach(function (post) {
        var postId = post.id;
        var textareaId = postId + '_textarea';
        var buttonId = postId + '_button';
        var ownItButton = '<button class="btn btn-block withMargin" data-toggle="modal" data-target="#myModal" id="' + buttonId + '">Own It</button>';
        var wellElement = '<div class="well" id="' + postId + '">' + post.content + '</div>';
        var textarea = '<div  style="display: none" id="' + textareaId + '"><textarea class="form-control" rows="3"></textarea>' + ownItButton + '</div>';
        $(wellElement).
            appendTo('#posts').
            click(function (e) {
                $('#' + postId).toggle();
                $('#' + textareaId).toggle();
                e.preventDefault();
            });

        $('#posts').
            append(textarea);

        $('#' + buttonId).
            click(function (e) {
                $('#compare').html(
                    $(diffview({
                        baseTextLines: $('#' + postId).text(),
                        newTextLines: $('#' + textareaId).find("textarea").val(),
                        inline: true
                    })[0]).
                        find(".data").html()
                );

                $('#' + textareaId).toggle();
                $('#' + postId).toggle();

                e.preventDefault();
            });
    });
}

function addPost(post) {
    var postId = post.id;
    var textareaId = postId + '_textarea';
    var buttonId = postId + '_button';
    var ownItButton = '<button class="btn btn-block withMargin" data-toggle="modal" data-target="#myModal" id="' + buttonId + '">Own It</button>';
    var wellElement = '<div class="well" id="' + postId + '">' + post.content + '</div>';
    var textarea = '<div  style="display: none" id="' + textareaId + '"><textarea class="form-control" rows="3"></textarea>' + ownItButton + '</div>';
    $(wellElement).
        appendTo('#posts').
        click(function (e) {
            $('#' + postId).toggle();
            $('#' + textareaId).toggle();
            e.preventDefault();
        });

    $('#posts').
        append(textarea);

    $('#' + buttonId).
        click(function (e) {
            $('#compare').html(
                $(diffview({
                    baseTextLines: $('#' + postId).text(),
                    newTextLines: $('#' + textareaId).find("textarea").val(),
                    inline: true
                })[0]).
                    find(".data").html()
            );

            $('#' + textareaId).toggle();
            $('#' + postId).toggle();

            e.preventDefault();
        });
}