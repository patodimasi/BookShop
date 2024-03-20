const multer = require('multer');
const path = require('path');
 
// Configuración de multer para gestionar la subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, '../images');
  
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    // Obtenemos el nombre original del archivo
    const originalName = file.originalname;
    // Reemplazamos los espacios en blanco con guiones bajos
    const fileNameWithUnderscores = originalName.replace(/\s/g, '_');
    // Llamamos al callback con el nuevo nombre de archivo
    cb(null, fileNameWithUnderscores);
  },
});
 
const upload = multer({ storage: storage });
 
// Middleware para manejar la subida de archivos
const multerMiddleware = upload.single('file');
 
module.exports = multerMiddleware;
 