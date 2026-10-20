const {MongoClient}=require('mongodb')
const url = process.env.REACT_APP_MONGO_URL;
const cliente=new MongoClient(url);
async function conectarBaseDatos()
{try
    {await cliente.conect(); console.log("base de datos conectada");}
    catch (error){{"error al conectar la base", error};}
}

module.exports={conectarBaseDatos, cliente};