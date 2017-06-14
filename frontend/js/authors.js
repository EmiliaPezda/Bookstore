$(function () {

    var $form = $('#authorAdd');
    var $authorList = $('#authorsList');
    var $authorOption = $('#authorEditSelect');

    $('body').on('click', '.btn-author-remove', function () {
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

    $('body').on('click', '.btn-author-books', function () {
        var id = $(this).data('id');
        var that = $(this);

        $
            .ajax({
                url: '../rest/rest.php/author/' + id,
                type: 'GET'
            })
            .done(function (response) {
                var descElement = that.closest('.list-group-item').find('.authorBooksList');

                descElement.text(response.success[0].books);
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
        var option = `<option value=${author.id}> ${author.name} ${author.surname}</option>`;

        $authorList.html($authorList.html() + string);
        $authorOption.html($authorOption.html() + option);
    }

    $form.on('submit', function (event) {
        event.preventDefault();

        var name = $('#name').val(),
            surname = $('#surname').val();

        var newAuthor = {
            name: name,
            surname: surname
        };

        $
            .ajax({
                url: '../rest/rest.php/author',
                type: 'POST',
                dataType: 'json',
                data: newAuthor
            })
            .done(function (response) {
                renderAuthor(response.success[0]);
            })
            .fail(function (error) {
                console.log('Create author error', error);
            });
    });

    $('body').on('click', '#authorEditSelect', function () {
        var id = $(this).data('id');
        var that = $(this);
        $('#authorEdit').show();
    });


    $('body #authorEdit').on('submit',  function (event) {
        event.preventDefault();
        var id = $('#authorEditSelect').val();
        var that = $(this);

        var name = $('body #name').eq(1).val(),
            surname = $('body #surname').eq(1).val();

        var newAuthor = {
            name: name,
            surname: surname
        };

        $
            .ajax({
                url: '../rest/rest.php/author' + id,
                type: 'PUT',
                dataType: 'json',
                data: newAuthor
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
