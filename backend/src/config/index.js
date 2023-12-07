const dotenv = require('dotenv')
dotenv.config()

const {MongoClient}= require('mongodb')

const client = new MongoClient(process.env.MONGO_URL)

async function connectToMongoDB(){
    try{
        await client.connect()
        console.log('Conectado a Mongo DB');
        return client
    }catch (error){
        console.log('Error al conectar con Mongo DB');
        return null
    }
    
}

async function disconnectToMongoDB(){
    try {
        await client.close()
        console.log('Desconectado de Mongo DB');
    } catch (error){
        console.log('Error al desconectar de Mongo DB', error);
    }
}

module.exports = {connectToMongoDB,disconnectToMongoDB}