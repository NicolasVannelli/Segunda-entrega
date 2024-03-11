import express from "express";
import ProductManager from "./ProductManager.js";

const instancia = new ProductManager()

const app = express();
//Esto es un endpoint
app.get("/", (req, res) => {
    res.send("Esto es como el index")
});

//Esto es un endpoint
app.get("/products", async (req, res) => {
    try {
        // Obtener el límite especificado por el cliente (si está presente)
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

        const productId = req.query.id ? parseInt(req.query.id) : undefined;
        // Obtener la lista completa de productos
        let listaProductos = await instancia.getProducts();

        // Aplicar el límite si está presente
        listaProductos = limit ? listaProductos.slice(0, limit) : listaProductos;
        // Filtrar la lista de productos por ID si está presente
        if (productId) {
            listaProductos = listaProductos.filter(producto => producto.id === productId);
        }

        // Enviar la lista de productos al cliente
        res.send(listaProductos);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la obtención de los productos
        console.error("Error al obtener los productos:", error);
        res.status(500).send("Error al obtener los productos");
    }
});
//Esto es un endpoint 
app.get("/usuario", (req, res) => {
    res.send("nombre:Nicolas,apellido:Vannelli,edad:23,correo:nose@gmail.com")
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})