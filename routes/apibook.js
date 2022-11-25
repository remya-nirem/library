const express = require('express');
const router = express.Router();

const bookInfo = require('../models/book');

// list books
router.get('/booklist', async (req,res) => {
    try {
        let books = await bookInfo.find().sort({title:1});
        res.send(books);
    }
    catch(error){
        console.log(error);
    }
})

// add new book
router.post('/book', async (req,res) => {
    try {
        let book = {
            bookid : req.body.bookid,
            title : req.body.title,
            description : req.body.description,
            author : req.body.author,
            publisher : req.body.publisher,
            pages : req.body.pages,
            genre : req.body.genre,
            status : req.body.status
        }
        const bookEntry = new bookInfo(book);
        const saveBook = await bookEntry.save();
        res.send(saveBook);
    }
    catch(error){
        console.log(error);
    }
})

// edit book details
router.put('/book', async (req,res)=>{
    try{
        let id = req.body._id;

        let book = {
            bookid : req.body.bookid,
            title : req.body.title,
            description : req.body.description,
            author : req.body.author,
            publisher : req.body.publisher,
            pages : req.body.pages,
            genre : req.body.genre,
            status : req.body.status
        }

        let updateInfo = { $set : book};
        let saveBook = await bookInfo.findByIdAndUpdate({'_id':id}, updateInfo);
        res.send(saveBook);
    }
    catch(error){
        console.log(error);
    }
})

// delete book
router.delete('/book/:id', async (req,res)=>{
    try{
        let id = req.params.id;
        let deleteBook = await bookInfo.deleteOne({'_id': id});
        res.send(deleteBook);
    }
    catch(error){
        console.log(error);
    }
})

// get single book
router.get('/book/:id', async (req,res)=>{
    try{
        let id = req.params.id;
        let getBook = await bookInfo.findById({'_id': id});
        res.send(getBook);
    }
    catch(error){
        console.log(error);
    }
})

module.exports = router;


