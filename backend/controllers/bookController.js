const Book = require("../models/Book");
const { encrypt } = require("../utils/encryption");


const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find({
            user: req.userId,
        });
        res.json(
            encrypt({
                success: true,
                books,
            })
        );
    } catch (error) {
        next(error);
    }
};

const createBook = async (req, res, next) => {
    try {
        const {
            title,
            author,
            tags,
            status,
        } = req.body;
        if (!title || !author) {
            res.status(400);

            throw new Error(
                "Title and author are required"
            );
        }
        const book = await Book.create({
            title,
            author,
            tags,
            status,
            user: req.userId,
        });
        res.status(201).json(
            encrypt({
                success: true,
                message: "Book has been added",
                book,
            })
        );

    } catch (error) {
        next(error);
    }
};



const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findOne({
            _id: req.params.id,
            user: req.userId,
        });
        if (!book) {
            res.status(404);

            throw new Error(
                "Book not found"
            );
        }
        Object.assign(
            book,
            req.body
        );
        await book.save();
        res.json(
            encrypt({
                success:true,
                message:"Book has been updated",
                book,
            })
        );
    } catch(error) {
        next(error);
    }
};



const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findOne({
            _id:req.params.id,
            user:req.userId,
        });
        if (!book) {
            res.status(404);

            throw new Error(
                "Book not found"
            );
        }
        await book.deleteOne();
        res.json(
            encrypt({
                success:true,
                message:"Book deleted",
            })
        );
    } catch(error) {
        next(error);
    }
};

module.exports = {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
};