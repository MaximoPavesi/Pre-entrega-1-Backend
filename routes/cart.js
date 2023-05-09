const express = require("express")

const { Router } = express

const router = new Router()

const { v4: uuidv4 } = require('uuid');

// Middleware para analizar los cuerpos de las solicitudes con JSON
router.use(express.json());

// Base de datos simulada para almacenar los carritos
const db = {};

// Ruta raíz POST / para crear un nuevo carrito
router.post('/', (req, res) => {
  const cartId = uuidv4(); // Generar un nuevo ID de carrito
  db[cartId] = { id: cartId, products: [] }; // Crear un nuevo carrito vacío en la base de datos
  res.status(201).json(db[cartId]); // Devolver el nuevo carrito creado con el código de estado 201 (creado)
});

// Ruta GET /:cid para listar los productos de un carrito específico
router.get('/:cid', (req, res) => {
  const cart = db[req.params.cid]; // Obtener el carrito de la base de datos
  if (!cart) {
    res.status(404).json({ message: 'Carrito no encontrado' }); // Devolver un error si el carrito no existe
  } else {
    res.json(cart.products); // Devolver los productos del carrito
  }
});

// Ruta POST /:cid/product/:pid para agregar un producto a un carrito específico
router.post('/:cid/product/:pid', (req, res) => {
  const cart = db[req.params.cid]; // Obtener el carrito de la base de datos
  if (!cart) {
    res.status(404).json({ message: 'Carrito no encontrado' }); // Devolver un error si el carrito no existe
  } else {
    const productId = req.params.pid;
    const product = { id: productId, quantity: 1 }; // Crear un nuevo objeto de producto con una cantidad inicial de 1
    const existingProduct = cart.products.find(p => p.id === productId); // Buscar si el producto ya existe en el carrito
    if (existingProduct) {
      existingProduct.quantity++; // Si el producto ya existe, aumentar su cantidad en 1
    } else {
      cart.products.push(product); // Si el producto no existe, agregarlo al carrito
    }
    res.json(cart.products); // Devolver los productos del carrito actualizados
  }
});



module.exports = router