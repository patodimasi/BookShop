const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const connection = async() =>{
    try{
       await  mongoose.connect("mongodb+srv://" + process.env.DATABASE_URL);
       console.log("Conectado correctamente a la base de datos");
    }catch(error){
        console.log(error);
        throw new Error('No se ha podido conectar a la base de datos');
    }
}

module.exports = {
    connection
}