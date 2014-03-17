function addPosts(posts) {
    posts.forEach(function (post) {
        var postId = post.id;
        var textareaId = postId + '_textarea';
        var buttonId = postId + '_button';
        var ownItButton = '<button class="btn btn-block withMargin" id="' + buttonId + '">Own It</button>';
        var wellElement = '<div class="well" id="' + postId + '">' + post.content + '</div>';
        var textarea = '<div  style="display: none" id="' + textareaId + '"><textarea class="form-control" rows="2"></textarea>' + ownItButton + '</div>';
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
                var textCopy = $('#' + postId).text();
                var textType = $('#' + textareaId).find("textarea").val();
                if (textCopy == textType) {
                    ;
                } else {
                    $('#compare').html(
                        $(diffview({
                            baseTextLines: textCopy,
                            newTextLines: textType,
                            inline: true
                        })[0]).
                            find(".data").html()
                    );
                    $('#diffViewModal').modal();
                }
                $('#' + textareaId).toggle();
                $('#' + postId).toggle();
                $('#' + textareaId).find("textarea").val('');
                e.preventDefault();
            });
    });
}

function addPost(post) {
    var postId = post.id;
    var textareaId = postId + '_textarea';
    var buttonId = postId + '_button';
    var ownItButton = '<button class="btn btn-block withMargin" id="' + buttonId + '">Own It</button>';
    var wellElement = '<div class="well" id="' + postId + '">' + post.content + '</div>';
    var textarea = '<div  style="display: none" id="' + textareaId + '"><textarea class="form-control" rows="2"></textarea>' + ownItButton + '</div>';
    $(wellElement).
        prependTo('#posts').
        click(function (e) {
            $('#' + postId).toggle();
            $('#' + textareaId).toggle();
            e.preventDefault();
        });

    $('#posts').
        prepend(textarea);

    $('#' + buttonId).
        click(function (e) {
            var textCopy = $('#' + postId).text();
            var textType = $('#' + textareaId).find("textarea").val();
            if (textCopy == textType) {
                ;
            } else {
                $('#compare').html(
                    $(diffview({
                        baseTextLines: textCopy,
                        newTextLines: textType,
                        inline: true
                    })[0]).
                        find(".data").html()
                );
                $('#diffViewModal').modal();
            }
            $('#' + textareaId).toggle();
            $('#' + postId).toggle();
            $('#' + textareaId).find("textarea").val('');
            e.preventDefault();
        });
}