//==============
//Puerto
//==============


process.env.PORT = process.env.PORT || 8080;

//==============
//Entorno
//==============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==============
//Token expire
//==============
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30; 

//==============
//SEED de auth
//==============
//process.env.SEED = process.env.SEED || 'secret';
process.env.SEED = 'secret';

//==============
//DATABASE
//==============
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = '';
}
process.env.URLDB = urlDB;
