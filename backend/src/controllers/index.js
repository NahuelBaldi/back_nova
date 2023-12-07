const ProductsModel = require('../models/index')


class Products{
    static async getAll(req,res){
    const{data,error} = await ProductsModel.getAll()
    error ? res.status(400).json({error: 'No  hay productos'})
        : res.status(200).json(data)
    }
    static async createProduct(req, res) {
        try {
        const { category, description, image, price, name } = req.body;
    
        // Validar que los campos obligatorios estén presentes
        if (!category || !description || !image || !price || !name) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }
    
        // Crear el producto
        const { data, error } = await ProductsModel.createProduct({
            category,
            description,
            image,
            price,
            name,
        });
    
        if (error) {
            return res.status(500).json({ error: 'Error al crear el producto.' });
        }
    
        return res.status(201).json({ data, message: 'Producto creado exitosamente.' });

        } catch (error) {
        console.error('Error en createProduct:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
        }
    }

static async deleteProduct(req, res) {
    const productId = req.params.id;
    console.log('ID del producto a eliminar:', productId);

    const { deletedCount, error } = await ProductsModel.deleteProduct(productId);

    if (error) {
        return res.status(500).json({ error: 'Error al eliminar el producto.' });
    }

    if (deletedCount > 0) {
        return res.status(200).json({ message: 'Producto eliminado exitosamente.' });
    }

    return res.status(404).json({ error: 'Producto no encontrado o no se realizó ninguna eliminación.' });
}

static async updateProduct(req, res) {
    const productId = req.params.id;
    const updatedData = req.body;

    console.log('ID del producto a actualizar:', productId);
    console.log('Datos actualizados:', updatedData);

    const { modifiedCount, error } = await ProductsModel.updateProduct(productId, updatedData);

    if (error) {
        return res.status(500).json({ error: 'Error al actualizar el producto.' });
    }

    if (modifiedCount > 0) {
        return res.status(200).json({ message: 'Producto actualizado exitosamente.' });
    }

    return res.status(404).json({ error: 'Producto no encontrado o no se realizó ninguna actualización.' });
}

static async searchProductsByCategory(req, res) {
    try {
        const { partialCategory } = req.query;

        const { data, error } = await ProductsModel.searchProductsByPartialCategory(partialCategory);

        if (error) {
            return res.status(500).json({ error: 'Error al buscar productos por categoría.' });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error en searchProductsByCategory:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
}
static async searchProductsByName(req, res) {
    try {
        const { partialName } = req.query;

        // Lógica para buscar productos por nombre de forma incremental
        const { data, error } = await ProductsModel.searchProductsByPartialName(partialName);

        if (error) {
            return res.status(500).json({ error: 'Error al buscar productos por nombre.' });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error en searchProductsByName:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
}


}

module.exports = Products