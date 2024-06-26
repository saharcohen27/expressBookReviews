const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password){
      return res.status(422).json({error:"missing body params, make sure to provide password & username"});
  }
  if (users.filter(user => user.username === username).length > 0){
    return res.status(409).json({error:"username already exsist"});
  }
  if (!isValid(username)){
        return res.status(401).json({error:"username is not valid"});
  }
  users.push({username:username, password:password})
  return res.status(200).json({message:"Successful"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  let getBooks = new Promise((resolve) => {
    if (book.length != 0){
        resolve()
    }
  });
  return getBooks.then(res.status(200).json(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  let findBook = new Promise((resolve, reject) => {
      try {
        const isbn = req.params.isbn;
        if (isbn !== null) {
            resolve(books[isbn])
        } else {
            reject("null isbn")
        }
    } catch {
        reject("Something Happend")
    }
  });
  return findBook.then((book) => res.status(200).json(book))
                    .catch((err) => res.status(404).json("Error" + err));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  getBooksbyAuthor = new Promise((resolve, reject) => {
    try{
        const author = req.params.author;
        let booksArray = Object.keys(books).map(function(_) { return books[_]; })
        resolve({"booksbyauthor":booksArray.filter((book) => book.author === author)})
    } catch {
        reject("something happend")
    }
  });
  
  return getBooksbyAuthor.then(data => res.status(200).json(data))
                        .catch(err => res.status(404).json("ERROR " + err))
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  getBooksbyTitle = new Promise((resolve, reject) => {
    try{
        const title = req.params.title;
        let booksArray = Object.keys(books).map(function(_) { return books[_]; })
        resolve({"booksbytitle":booksArray.filter((book) => book.title === title)})
    } catch {
        reject("something happend")
    }
  });
  return getBooksbyTitle.then(data => res.status(200).json(data))
                        .catch(err => res.status(404).json("ERROR " + err))
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
