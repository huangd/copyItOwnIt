$(document).ready(function () {
    $.getJSON("/user/posts", function (posts) {
        addPosts(posts);
    });
})

$('#addPostForm').submit(
    function (e) {
        $.ajax({
            type: "POST",
            url: "/user/post",
            data: $('#aPost').serialize(),
            success: function (data) {
                addPost(data);
            }
        });

        $('#aPost').val('');
        e.preventDefault();
    }
)