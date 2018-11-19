require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

//Configuracion Global de rutas
app.use(require('./routes/index'));




mongoose.connect(process.env.URLDB,{ useNewUrlParser: true,useCreateIndex: true }, (err, res)=>{
    
    if(err) throw err;
    
    console.log('DB online!');
       
       
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en puerto: ', process.env.PORT,)
});
