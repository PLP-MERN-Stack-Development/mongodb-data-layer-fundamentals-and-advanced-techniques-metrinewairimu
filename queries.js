// Use the correct database
use plp_bookstore;

// ==============================
// 📦 BASIC CRUD OPERATIONS
// ==============================

// 🔍 1. Find all books in the "Fiction" genre
db.books.find({ genre: "Fiction" });

// 🔍 2. Find all books published after the year 1950
db.books.find({ published_year: { $gt: 1950 } });

// 🔍 3. Find all books by "George Orwell"
db.books.find({ author: "George Orwell" });

// ✏️ 4. Update the price of "1984" to 12.99
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 12.99 } }
);

// 🗑️ 5. Delete a book titled "Moby Dick"
db.books.deleteOne({ title: "Moby Dick" });


// ==============================
// 🚀 ADVANCED QUERIES
// ==============================

// 🔍 6. Find books that are in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
});

// 🔍 7. Project only the title, author, and price of all books
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
);

// 🔃 8. Sort books by price in ascending order
db.books.find().sort({ price: 1 });

// 🔃 9. Sort books by price in descending order
db.books.find().sort({ price: -1 });

// 📄 10. Pagination - Page 1 (First 5 books)
db.books.find().skip(0).limit(5);

// 📄 11. Pagination - Page 2 (Next 5 books)
db.books.find().skip(5).limit(5);


// ==============================
// 🧪 AGGREGATION PIPELINES
// ==============================

// 📊 12. Calculate average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  }
]);

// 🧑‍💼 13. Find the author with the most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      count: { $sum: 1 }
    }
  },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// 📆 14. Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $substr: ["$published_year", 0, 3] },
          "0s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);


// ==============================
// ⚡ INDEXING
// ==============================

// ⚡ 15. Create an index on the "title" field
db.books.createIndex({ title: 1 });

// ⚡ 16. Create a compound index on "author" and "published_year"
db.books.createIndex({ author: 1, published_year: -1 });

// 📈 17. Use explain() to check performance (example on title search)
db.books.find({ title: "The Hobbit" }).explain("executionStats");
