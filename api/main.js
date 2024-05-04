import express from "express"
import fs from "fs"
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
  try {
    const data = fs.readFileSync(process.cwd() + "/api/db.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(process.cwd() + "/api/db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

app.get("/api", (req, res) => {
  res.send("This is the root path from book-api");
});

app.get("/api/books", (req, res) => {
  const data = readData();
  res.json(data);
});

app.get("/api/books/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const book = data.books.find((book) => book.id === id);
  res.json(book);
});

app.post("/api/books", (req, res) => {
  const data = readData();
  const body = req.body;
  const newBook = {
    id: data.books.length + 1,
    ...body,
  };
  data.books.push(newBook);
  writeData(data);
  res.json(newBook);
});

app.listen(3000, () => {
  console.log("The server is running on port 3000");
});

// const app = express();
// app.use(bodyParser.json());

// const readData = () => {
//     try{
//         const data = fs.readFileSync(process.cwd() + "/api/db.json");
//         return JSON.parse(data);
//     }
//     catch (error) {
//         console.log(error);
//     }
// };

// const writeData = (data) => {
//     try {
//       fs.writeFileSync(process.cwd() + "/api/db.json", JSON.stringify(data));
//     } catch (error) {
//       console.log(error);
//     }
//   };

// app.listen(3000, () => {
//     console.log('Ther server is running on port 3000');
// });

// app.get("/api", (req, res) => {
//     res.send("This is the root path from book-api")
// });

// app.get("/api/books", (req, res) => {
//     const data = readData();
//     res.json(data);
// });

// app.get("/api/books/:id", (req, res) => {
//     const data = readData();
//     const body = req.body;
//     const id = parseInt(req.params.id);
//     const book = data.books.find((book) => book.id === id);
//     res.json(book);
// });

// app.post("/api/books", (req, res) => {
//     const data = readData();
//     const body = req.body;
//     const newBook = {
//       id: data.books.length + 1,
//       ...body,
//     };
//     data.books.push(newBook);
//     writeData(data);
//     res.json(newBook);
//   });