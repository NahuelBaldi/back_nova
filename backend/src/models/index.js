const { connectToMongoDB, disconnectToMongoDB } = require('../config/index')
const { ObjectId } = require('mongodb');

class ProductsModel {
    static async getAll() {
        try {
            const clientMongo = await connectToMongoDB()
            if (!clientMongo) {
                throw Error('Error al conectar con Mongo')
            }
            const result = await clientMongo.db('nova').collection('productos').find().toArray()
            await disconnectToMongoDB()
            console.log(result);
            if (!result) return { data: null, error: true }
            return { data: result, error: false }
        } catch (error) {
            return error
        }
    }

    static async getById(productId) {
        try {
            const clientMongo = await connectToMongoDB();

            if (!clientMongo) {
                throw new Error('Error al conectar con MongoDB.');
            }

            const result = await clientMongo.db('nova').collection('productos').findOne({
                _id: new ObjectId(productId),
            });

            await disconnectToMongoDB();

            return result; // Retorna el producto encontrado o null si no existe

        } catch (error) {
            console.error('Error en getById:', error);
            await disconnectToMongoDB();
            return null; // Retorna null en caso de error
        }
    }

    static async createProduct({ category, description, image, price, name }) {
        let clientMongo; // Declaramos la variable clientMongo aquí para que esté disponible en todo el ámbito de la función
    
        try {
            clientMongo = await connectToMongoDB();
    
            if (!clientMongo) {
                throw new Error('Error al conectar con MongoDB.');
            }
    
            // Crear el producto en la base de datos
            const result = await clientMongo.db('nova').collection('productos').insertOne({
                category,
                description,
                image,
                price,
                name,
            });
    
            if (result && result.insertedId) {
                const insertedProduct = await clientMongo.db('nova').collection('productos').findOne({
                    _id: result.insertedId,
                });
    
                return { data: insertedProduct, error: false };
            } else {
                console.log('Error al obtener el documento insertado:', result);
                return { data: null, error: true };
            }
    
        } catch (error) {
            console.error('Error en createProduct:', error);
            return { data: null, error: true };
        } finally {
            if (clientMongo) {
                await disconnectToMongoDB();
            }     
        }   
    }

static async deleteProduct(productId) {
    try {
        const clientMongo = await connectToMongoDB();

        if (!clientMongo) {
            throw new Error('Error al conectar con MongoDB.');
        }

        const result = await clientMongo.db('nova').collection('productos').deleteOne({
            _id: new ObjectId(productId),
        });

        await disconnectToMongoDB();

        console.log('deletedCount:', result.deletedCount);

        return { deletedCount: result.deletedCount };

    } catch (error) {
        console.error('Error en deleteProduct:', error);
        await disconnectToMongoDB();
        return { deletedCount: 0, error: true };
    }
}

static async updateProduct(productId, updatedData) {
    try {
        const clientMongo = await connectToMongoDB();

        if (!clientMongo) {
            throw new Error('Error al conectar con MongoDB.');
        }

        const result = await clientMongo.db('nova').collection('productos').updateOne(
            { _id: new ObjectId(productId) },
            { $set: updatedData }
        );

        await disconnectToMongoDB();

        console.log('modifiedCount:', result.modifiedCount);

        return { modifiedCount: result.modifiedCount };

    } catch (error) {
        console.error('Error en updateProduct:', error);
        await disconnectToMongoDB();
        return { modifiedCount: 0, error: true };
    }
}

static async searchProductsByPartialCategory(partialCategory) {
    try {
        const clientMongo = await connectToMongoDB();

        if (!clientMongo) {
            throw new Error('Error al conectar con MongoDB.');
        }

        const result = await clientMongo.db('nova').collection('productos')
            .find({ category: { $regex: new RegExp(`^${partialCategory}`, 'i') } })
            .toArray();

        await disconnectToMongoDB();

        if (!result) {
            return { data: null, error: true };
        }

        return { data: result, error: false };
    } catch (error) {
        console.error('Error en searchProductsByPartialCategory:', error);
        return { data: null, error: true };
    }
}
static async searchProductsByPartialName(partialName) {
    try {
        const clientMongo = await connectToMongoDB();

        if (!clientMongo) {
            throw new Error('Error al conectar con MongoDB.');
        }

        // Lógica para buscar productos por nombre de forma incremental
        const result = await clientMongo.db('nova').collection('productos')
            .find({ name: { $regex: new RegExp(`^${partialName}`, 'i') } })
            .toArray();

        await disconnectToMongoDB();

        if (!result) {
            return { data: null, error: true };
        }

        return { data: result, error: false };
    } catch (error) {
        console.error('Error en searchProductsByPartialName:', error);
        return { data: null, error: true };
    }
}

}

module.exports = ProductsModel