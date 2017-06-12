$(function () {

    var $form = $('#authorAdd');
    var $authorList = $('#authorsList');

    $('body').on('click', '.btn-book-remove', function () {
        var id = $(this).data('id');
        var that = $(this);

        $
            .ajax({
                url: '../rest/rest.php/author/' + id,
                type: 'DELETE'
            })
            .done(function (response) {
                that.closest('.list-group-item').remove();
            })
            .fail(function (error) {
                console.log('Delete author error', error);
            });
    });

    $('body').on('click', '.btn-book-show-description', function () {
        var id = $(this).data('id');
        var that = $(this);

        $
            .ajax({
                url: '../rest/rest.php/author/' + id,
                type: 'GET'
            })
            .done(function (response) {
                var descElement = that.closest('.list-group-item').find('.book-description');

                descElement.text(response.success[0].description);
                descElement.slideDown();
            })
            .fail(function (error) {
                console.log('Create book error', error);
            });
    });

    function getAuthors() {
        $
            .ajax({
                url: '../rest/rest.php/author',
                type: 'GET'
            })
            .done(function (response) {
                for (var i = 0; i < response.success.length; i++) {
                    renderAuthor(response.success[i]);
                }
            })
            .fail(function (error) {
                console.log('Create author error', error);
            });
    }

    function renderAuthor(author) {
        var string = `<li class="list-group-item">
                        <div class="panel panel-default">
                            <div class="panel-heading"><span class="authorTitle">${author.name} ${author.surname}</span>
                                <button data-id="${author.id}" class="btn btn-danger pull-right btn-xs btn-author-remove">
                                <i class="fa fa-trash"></i></button>
                                    <button data-id="${author.id}" class="btn btn-primary pull-right btn-xs btn-author-books"><i
                                                    class="fa fa-book"></i></button>
                                </div>
                            <ul class="authorBooksList"></ul>
                        </div>
                    </li>`;

        $authorList.html($authorList.html() + string);
    }

    $form.on('submit', function (event) {
        event.preventDefault();

        var title = $('#title').val(),
            description = $('#description').val();

        var newBook = {
            title: title,
            description: description
        };

        $
            .ajax({
                url: '../rest/rest.php/author',
                type: 'POST',
                dataType: 'json',
                data: newBook
            })
            .done(function (response) {
                renderAuthor(response.success[0]);
            })
            .fail(function (error) {
                console.log('Create author error', error);
            });
    });

    getAuthors();

});
