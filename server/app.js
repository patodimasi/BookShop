
const express = require('express');
const app = express();
const PORT = 3002;
const {connection} = require("./database/connection");
const cors = require("cors");

const route_book = require("./routes/book");

const bodyparser = require("body-parser");

app.listen(PORT, () => {
    console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});

app.use('/images', express.static('images'))
  
connection();
app.use(cors());

app.use(bodyparser.json());


app.use("/", route_book);
