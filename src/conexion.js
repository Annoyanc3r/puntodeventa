const {MongoClient}=require('mongodb')
const url='mongodb+srv://brayangonzalez5599_db_user:QsQGM0sByc0wsBZ9@dbedgetech.2sfvfkf.mongodb.net/'
const cliente=new MongoClient(url);
async function conectarBaseDatos()
{try
    {await cliente.conect(); console.log("base de datos conectada");}
    catch (error){{"error al conectar la base", error};}
}

module.exports={conectarBaseDatos, cliente};