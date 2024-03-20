*Librerías Utilizadas:
--------------------

*Backend:
Express
Mongoose
Multer
Router

*FrontEnd:
Prime React: Para el diseño de los componentes: Button,Input,Card,Toolbar, Tag, DataTable,Dialog,Calendar.
Prime Icon: Para los iconos que se utilizaron.
Prime Flex: Para darle estilos a los componentes.
Boostrap
uuid

*Base de datos: MongoDB (Hosteada en la nube).


*Explicación del Sistema:
-----------------------
Producto Elegido: Libros
Campos que componen el libro:

title : Título del libro.
isbn  : Isbn del libro , campo que identifica el libro.
pageCount: Cantidad de páginas del libro.
publishedDate: Fecha de publicación.
stock: Cantidad de libros disponibles , puede tener tres estados (IN STOCK, LOW STOCK, OUT OFF STOCK).
shortDescription: Pequeña descripción del libro.
rating: Puntuación del libro (cantidad de estrella) puede tener como máximo 5 estrella.
price: Precio del libro.
imagen: URL y nombre de la imagen del libro. 

La pantalla principal del sistema está formado por el logo de "Book shop", un pie de página con mi nombre y el cuerpo principal está formado por dos botones:

Botón Book:
------------
Esta sección se encuentra dividida en dos partes.

La primera parte está formada por 4 filtros de búsqueda: Title, Isbn, Author, Stock y un botón de Search. 
Si se presiona el botón search sin completar ningún filtro, trae todos los libros que se encuentran en la base de datos y los muestra en la sección "Table Books" (descripta en el punto siguiente).
Al completar uno o más filtros y apretar el botón search, el sistema buscará en la base de datos aquellos libros que coincidan con el/los filtros seleccionados (los filtros se tildan al completar un campo y se destildan al borrar la información).

La segunda parte está formada por un "Table Books", donde se muestra en un DataTable la información de los libros tríados de la base de datos que cumplan con los filtros de búsqueda.
La tabla contiene las siguientes columnas: Title, ISBN, Authors, Stock, Reviews. Además, por cada fila, muestra un detalle expandible formado por los siguientes campos: Short Description, Page Count, Categories, Published y Price.
La tabla esta paginada.
La tabla posee un encabezado con los siguientes tres botones:

+New: El cual permite agregar un nuevo libro, con los siguientes campos: 
*- Title
*- ISBN
*- Author
*- Stock
*- Pages
*- Published
*- Category: es un select con las opciones Cook, Education Health, Terror, Miscellaneous y vacío
*- Imagen para cargar desde nuestra pc (en formato png, jpg, jpeg o gif).

Al agregar un nuevo libro se valida que el ISBN no este repetido ni vacio, y tambien que el campo titulo no este vacio.

Delete: Borra uno o más libros (según libros seleccionados).

Update: Permite modificar todos los campos del libro seleccionado previamente en la tabla (se permite editar un libro a la vez).

Botón Sales:
------------

Esta sección muestra un listado de todos los libros, pero agregando la imagen (agregue esta sección más que nada para mostrar la imagen de cada libro) ya que me resultó que en la primera tabla estaría toda la información muy junta y no se iba a apreciar la imagen del libro.
Por lo tanto se muestra la siguiente información: Imagen del libro, category, stock, rating.
Aclaracion: como imagen del libro, el sistema puede mostrar la imagen asociada a la categoria, imagen vacia o la imagen que nosotros hayamos subido.
Se adopta el siguiente criterio respecto de la imagen al crear un nuevo libro con el botón (+Add "Bóton Book"):
*- Si se agregó una categoría y también se cargó una imagen, en la sección sales va a priorizar la imagen cargada en el servidor en la carpeta images mediante el middleware multer.
*- Si se agregó una categoría y no una imagen, en la sección sales va a mostrar como imagen alguna de las imagenes asociadas a las categorías seleccionables (dichas imagenes se encuentran en la carpeta images del Front End).
*- Si no se colocó ni una categoria ni una imagen, va a mostrar como imagen "noimage.png". 

*Estructura del proyecto:
-----------------------

El proyecto está formado por dos carpetas: server y client.

server:
-------
En el carpeta server se encuentra el Backend node y tiene la siguiente estructura de carpetas:
database: Se encuentra el archivo de la conexión de la base de datos.
images: Se encuentran las imágenes que el usuario va a cargar al agregar un nuevo libro.
middleware: Se encuentra el archivo "multerMiddleware.js"  el cual se encarga de la subida de las imágenes al servidor.
models: Se encuentra el esquema para el modelado de los datos, en este caso el de libros.
routes: Se encuentra el archivo book.js el cual se encarga de manejar las solicitudes HTTP entrantes (GET, POST, PUT, DELETE)
del cliente y dirigirlas hacia las funcionalidades que van a manejar esas solicitudes en el archivo book.js pero de la carpeta controllers.
controllers: Se encuentran las funcionalidades las cuales van a manejar las solicitudes enviadas por el router.
app.js: Archivo principal de entrada , donde se crea el servidor express, y se llama a la conexión de la base de datos, el router. 

client:
-------
En la carpeta client se encuentra el FrontEnd React y tiene la siguiente estructura de carpetas:
public: Carpeta donde se encuentran todos los archivos visibles, el cual ya viene con la instalación de React.
src: Dentro de la carpeta src se agrego las siguientes carpetas:
components: Se crearon los siguientes componentes: Book, ButtonNB, CheckboxInput, DialogMsj, FileTable, Footer, Header, Imagen, Sales, Search
hooks: Se crearon dos hook para realizar las peticiones al servidor, en el archivo "useAjax" se realizan las peticiones 
POST, PUT, DELETE, en el archivo "useAjaxGet" se realiza únicamente la petición GET.
images: Carpeta en el cual se encuentran las imágenes de las categorías (Cook, Education Health, Terror, Miscellaneous, vacío).
routers: Se encuentra el archivo (componente) en el cual se enrutan los componentes <Search/> <Book/> <Sales/> 
El componente <RouterPrincipal/> se carga desde el componente principal <App/>.

*Levantar el proyecto de manera local:
-------------------------------------

Se descarga el proyecto del repositorio Git: https://github.com/patodimasi/BookShop.git
*- Servidor:
Se abre una terminal, se entra a la carpeta server y se deben ejecutar los siguientes comandos:
1) npm install (instala las dependencias necesarias para el servidor).
2) npm start (para ejecutar el servidor).
*- Cliente
Se abre una terminal, se entra a la carpeta client y se deben ejecutar los siguientes comandos:
1) npm install (instala las dependencias necesarias para el servidor).
2) npm start (para ejecutar el servidor).