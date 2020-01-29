var books = [];

  //var searchVal = null;

  var booksRender = function (books) {
      $('.books').empty();
      console.log(books)
      for (var i=0; i<books.length; i++) {
          console.log(books[i])
        var source = $('#book-template').html();
        var template = Handlebars.compile(source);
        var newHTML = template(books[i]);
        $('.books').append(newHTML);
      }
  }
 // booksRender();
$('.btn').click(function() {
    console.log('click')
    searchVal = $('#search-query').val();
    console.log('value of textarea ', searchVal)
    apiRequest(searchVal)
    
})

var apiRequest = function (searchVal) {
    console.log('inside render value of searVal ', searchVal)
    books = [];
    $('.books').append('<div class="spinner-grow text-danger" role="status"><span class="sr-only">Loading...</span></div>')
    setTimeout(function(){ $.ajax({
        method: "GET",
        url: "https://www.googleapis.com/books/v1/volumes?q="+ searchVal,
        dataType: "json",
        success: function(data) {
          
          for (var i=0; i<data.items.length; i++) {
              addBook(data.items[i].volumeInfo)
              console.log(data.items[i].volumeInfo)
          }
          booksRender(books)
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus);
        }
      });}, 3000);
    
           
    };
    var addBook = function(book) {
        var bookObj = {};
        bookObj["title"] = book.title;
        bookObj["author"] = book.authors[0];
        bookObj["isbn"] = book.industryIdentifiers[0].identifier;  
        bookObj["imageURL"] = "./notFound.PNG"
        if (book.imageLinks != undefined) {
            bookObj["imageURL"] = book.imageLinks.thumbnail
          } else {
            
          }
        
        bookObj["pageCount"] = book.pageCount;
        books.push(bookObj);
      }
