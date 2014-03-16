function addPosts(posts) {
    posts.forEach(function (post) {
        var postId = post.id;
        var textareaId = postId + '_textarea';
        var buttonId = postId + '_button';
        var compareDivId = postId + '_compare';
        var compareDiv = '<div class="panel alert-dismissable" style="display: none" id="' + compareDivId + '"></div>';
        var ownItButton = '<button class="btn btn-block withMargin" type="submit" id="' + buttonId + '">Own It</button>';
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

        $('#posts').
            append(compareDiv);

        $('#' + buttonId).
            click(function (e) {
//                $('#' + textareaId).toggle();
//                $('#' + postId).toggle();

                $('#' + compareDivId).mergely({
                    width: 'auto',
                    height: 100,
                    cmsettings: {
                        height: 100,
                        readOnly: true,
                        lineNumbers: true,
                        lineWrapping: true
                    },
                    lhs: function (setValue) {
                        setValue('the quick red fox jumped over the hairy dog the quicry dog');
                    },
                    rhs: function (setValue) {
                        setValue('the quick brown fox jumped over the lazy dog the quick og');
                    }
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