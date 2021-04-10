var express = require('express');
var router = express.Router();

const books = [{
    title: "Låt den rätta komma in",
    author: "John Ajvide-Lindqvist",
    lent: false,
    id: 1
  },
  {
    title: "Människohamn",
    author: "John Ajvide-Lindqvist",
    lent: false,
    id: 2
  },
  {
    title: "Pappersväggar",
    author: "John Ajvide-Lindqvist",
    lent: false,
    id: 3
  },
  {
    title: "Lilla stjärna",
    author: "John Ajvide-Lindqvist",
    lent: true,
    id: 4
  },
  {
    title: "Hantering av odöda",
    author: "John Ajvide-Lindqvist",
    lent: false,
    id: 5
  }
];

/* GET users listing. */
router.get('/', function (req, res, next) {

  let printBooks = `<div><h1>Mina böcker</h1>`;
  let text;

  for (book in books) {
    if (books[book].lent == true) {
      text = "Ja"
    } else {
      text = "Nej"
    }
    printBooks += `<div><ul><p id="${books[book].id}"><a href="books/info/:${books[book].id}"><li>Titel: ${books[book].title}</li></a></p> <p><li>Utlånad: ${text}</li></p><br></ul></div>`
  }
  printBooks += `</div><div><a href="/books/add"> Lägg till en ny bok </a></div>`;
  // console.log(req.params);
  res.send(printBooks);
});

router.get('/add', function (req, res) {

  let addBook = `<div>
  <h2>Lägg till en ny bok</h2>
  <form action="/books/add" method="POST">
  <div><input type="text" name="title" placeholder="Titel"></div>
  <div><input type="text" name="author" placeholder="Författare"></div>
  <div><button type="submit">Spara bok</button></div>
  </form>
  </div>`;

  res.send(addBook);
});


router.post("/add", function (req, res) {
  // console.log(req.body);

  let newBookId = books.length + 1;

  let newBook = {
    title: req.body.title,
    author: req.body.author,
    lent: true,
    id: newBookId
  };
  books.push(newBook);

  res.redirect("/books")

})


router.get('/info/:bookId', function (req, res) {
  let bookInfo = `<div><h2>Information om bok</h2>`;
  // console.log(req.params.bookId);
  let text;
  for (book in books) {
    if (req.params.bookId == ":" + books[book].id) {
      if (books[book].lent == true) {
        text = "Ja";
      } else {
        text = "Nej"
      };

      bookInfo += `<div>Titel: ${books[book].title}</div>
                  <div>Författare: ${books[book].author}</div>
                  <div>Utlånad: ${text}</div>
                  <div><a href="/books/lend/:${books[book].id}">Låna eller lämna tillbaka boken här</a></div>
      </div>`
    }
  }

  // console.log(req);
  res.send(bookInfo);
})

router.get('/lend/:bookId', function (req, res) {
  console.log("från lend", req.params.bookId);
  for (book in books) {
    if (req.params.bookId == ":" + books[book].id) {
      console.log(books[book].title);
      if (books[book].lent == true) {
        books[book].lent = false
      } else {
        books[book].lent = true;
      }
    }
  }
  // console.log(books);
  res.redirect("/books");
})

module.exports = router;