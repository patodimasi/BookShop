const bookModel = require("../models/book")


const conseguirLibros = async (req,res) => {
  const books = JSON.parse(decodeURIComponent(req.params.libro));

  console.log("Este es el param" , books);
  const query = {};

  for (const key in books) {
    console.log("es la key", key)
    if (books[key] !== '') {
        if (key === 'stock') {
            if (books[key] === 'IN STOCK') {
                query[key] = { $gte: 50 };
            } else if (books[key] === 'LOW STOCK') {
                query[key] = { $gte: 1, $lt: 50 };
            } else if (books[key] === 'OUT OF STOCK') {
                query[key] = 0;
            } else {
                query[key] = { $regex: `.*${books[key]}.*`, $options: 'i' };
            }
        } else {
            query[key] = { $regex: `.*${books[key]}.*`, $options: 'i' };
        }
    }
  }

    let resultmongo = await  bookModel.find(query);
    console.log("SERVER: Resultado de mongo " + resultmongo);

    res.send(resultmongo);
 
    console.log("SERVER: Esta es la query: ", query);
    return res.end();
  
    
}

const agregarLibro = async (req,res) => {
    const book = req.body;
    console.log("Este es el book  agregar", book);
  
      bookModel.find({isbn:req.body.isbn})
     .then((docs)=>{
         // console.log("Result :",docs);
              if(docs != ''){
                  res.status(201).json({
                      ok: true,
                      status: 201,
                      message: "SERVER: Repetido",
                      objetoResult: docs,
                  });
              }
              else{
                  bookModel.create(book)
                  .then((documentoGuardado) => {
                      res.status(201).json({
                          ok: true,
                          status: 201,
                          message: "SERVER: Added Book",
                          
                      });
                  })
                  .catch((error) => {
                  console.error('Error al guardar el libro:', error);
                  });
  
              }
      })
      .catch((err)=>{
         console.log(err);
      });
}

const editarLibro = async (req,res) => {
    const modybook = req.body;
    
    console.log("dato a modificar", modybook);

    bookModel.find({isbn:req.body.isbn})
    .then((docs) => {
        // pongo mayor que uno sino toma el mismo codigo
        if(docs.length > 1)
            {
              console.log("ESTA REPETIDO1")
                res.status(201).json({
                    ok: true,
                    status: 201,
                    message: "SERVER: Repetido",
                    objetoResult: docs,
                });
            }
            else{
              console.log("ESTA REPETIDO2")
                bookModel.updateOne({_id:req.body._id} ,{$set:modybook})
                .then((documentoModificado) => {
                    res.status(201).json({
                        ok: true,
                        status: 201,
                        message: "SERVER: Added Book",
                        
                    });
                })
                .catch((error) => {
                    console.error('Error al modificar el libro:', error);
                });
            }
       
    })
    .catch((err)=>{
        console.log(err);
    });
}

const borrarLibros = async (req, res) => {
    const books = req.body;
    console.log("SERVER: datos a borrar del cliente: ", books);
    
    let idBooksToDelete = {
      _id: {
        $in: []
      }
    };
    books.map((ele) => {
      idBooksToDelete._id.$in.push(ele._id);
    })
  
    console.log("id de libros a borrar: ", idBooksToDelete.id);
  
    let result = bookModel.deleteMany(idBooksToDelete)
    .then((documentoGuardado) => {
      console.log('Libro guardado con éxito:', documentoGuardado);
      res.status(200).json({
        ok: true,
        status: 204,
        message: "Libros borrados: " + result.deletedCount
      });
    })
    .catch((error) => {
      console.error('Error al borrar el libro:', error);
    });
}

const subirImagen = (req, res) => {
    // req.file contiene la información sobre el archivo subido por Multer
   if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo.' });
    }
   
     res.json({ message: 'Archivo: ' + req.file.filename + ' subido exitosamente.' });
};  

module.exports = {
    conseguirLibros,
    agregarLibro,
    editarLibro,
    borrarLibros,
    subirImagen,
};
