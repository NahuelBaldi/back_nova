const express = require('express')
const router = express.Router()
const Products = require('../controllers/index')



//Sirve para definir las rutas del index.js

//                         funcion controladora que va estar en controllesrs       


router.get('/products', Products.getAll)
router.post('/products/create',Products.createProduct)
router.delete('/products/:id', Products.deleteProduct)
router.put('/products/:id', Products.updateProduct)
router.get('/products/search-category', Products.searchProductsByCategory);
router.get('/products/search-name', Products.searchProductsByName);

module.exports = router