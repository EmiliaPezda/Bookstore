$(function () {

    var $form = $('#bookAdd');
    var $bookList = $('#booksList');
    var $bookOption = $('#bookEditSelect');

    $('body').on('click', '.btn-book-remove', function () {
        var id = $(this).data('id');
        var that = $(this);

        $
            .ajax({
                url: '../rest/rest.php/book/' + id,
                type: 'DELETE'
            })
            .done(function (response) {
                that.closest('.list-group-item').remove();
            })
            .fail(function (error) {
                console.log('Delete book error', error);
            });
    });

    $('body').on('click', '.btn-book-show-description', function () {
        var id = $(this).data('id');
        var that = $(this);

        $
            .ajax({
                url: '../rest/rest.php/book/' + id,
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

    function getBooks() {
        $
            .ajax({
                url: '../rest/rest.php/book',
                type: 'GET'
            })
            .done(function (response) {
                for (var i = 0; i < response.success.length; i++) {
                    renderBook(response.success[i]);
                }
            })
            .fail(function (error) {
                console.log('Create book error', error);
            });
    }

    function renderBook(book) {
        var string = `<li class="list-group-item">
                <div class="panel-heading">
                <span class="bookTitle">${book.title}</span>
            <button data-id="${book.id}"
        class="btn btn-danger pull-right btn-xs btn-book-remove"><i
        class="fa fa-trash"></i>
                </button>
                <button data-id="${book.id}"
        class="btn btn-primary pull-right btn-xs btn-book-show-description"><i
        class="fa fa-info-circle"></i>
                </button>
                </div>
                <div class="panel-body book-description">
                </div>
                </li>`;

        var option = `<option value=${book.id}> ${book.title}</option>`;

        $bookList.html($bookList.html() + string);
        $bookOption.html($bookOption.html() + option);
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
                url: '../rest/rest.php/book',
                type: 'POST',
                dataType: 'json',
                data: newBook
            })
            .done(function (response) {
                renderBook(response.success[0]);
            })
            .fail(function (error) {
                console.log('Create book error', error);
            });
    });

    $('body').on('click', '#bookEditSelect', function () {
        var id = $(this).data('id');
        var that = $(this);
        $('#bookEdit').show();

        $
            .ajax({
                url: '../rest/rest.php/book/' + id,
                type: 'GET'
            })
            .done(function (response) {

            })
            .fail(function (error) {
                console.log('Edit book error', error);
            });
    });

    getBooks();

});
