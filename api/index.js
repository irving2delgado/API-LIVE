import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
const readData = () => {
    try{
        const data = fs.readFileSync(process.cwd()+"/api/db.json");
        return JSON.parse(data);
    } catch(error){
        console.log(error)
    }
}
const writeData = (data) => {
    try {
        fs.writeFileSync(process.cwd()+"/api/db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

app.get("/api", (req,res)=>{
    res.send("This is the api")
}
);

app.get("/api/books", (req, res)=>{
    const data = readData();
    res.json(data);
});

app.get("/api/books/:id",(req, res) => {
    const data = readData();
    const id =  parseInt(req.params.id)
    const book = data.books.find((book)=> book.id ===id)
    res.json(book)
}
);

app.put("/api/books/:id", (req, res) => {
  const data = readData();
  const body = req.body;
  const id = parseInt(req.params.id);
  const bookIndex = data.books.findIndex((book) => book.id === id);
  data.books[bookIndex] = {
    ...data.books[bookIndex],
    ...body,
  };
  writeData(data);
  res.json({ message: "Book updated successfully" });
});

app.delete("/api/books/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const bookIndex = data.books.findIndex((book) => book.id === id);
  data.books.splice(bookIndex, 1);
  writeData(data);
  res.json({ message: "Book deleted successfully" });
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
app.listen(3000, ()=>{
    console.log('The server is runing on port 3000')
});