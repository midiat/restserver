const express = require('express');
const {
    verificaToken
} = require('../middlewares/autenticacion');
let Producto = require('../models/producto');

let app = express();



//==============
//Obtener todos los productos
//==============
app.get('/producto', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({
            disponible: true
        })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
        
            res.json({
                ok:true,
                productos
            });

        });


});

//==============
//Mostrar un producto por ID
//==============
app.get('/producto/:id', verificaToken, (req, res) => {
    
     let id = req.params.id;

    Producto.findById(id)
            .populate('usuario', 'nombre email')
            .populate('categoria', 'descripcion')
            .exec((err, productoDB) => {
        
        if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });

            }
        
        if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El id es incorrecto'
                    }
                });

            }
        
        res.json({
            ok: true,
            producto: productoDB
        });
        
    });



});

//==============
//Buscar productos
//==============
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {
    
    
    let termino = req.params.termino;
    
    let regex = new RegExp(termino, 'i');
    
    Producto.find({nombre: regex})
        .populate('categoria', 'nombre')
        .exec((err, productos)=>{
        
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });

            }
        
        res.json({
            ok: true,
            productos
        });
        
        
        
    });
    
});




//==============
//Crear un nuevo producto
//==============
app.post('/producto', verificaToken, (req, res) => {

    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });


    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });

        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });

    });

});

//==============
//Actualizar producto
//==============
app.put('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });

        }

        if (!productoDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });

        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.descripcion = body.descripcion;
        productoDB.disponible = body.disponible;
        productoDB.categoria = body.categoria;

        productoDB.save((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });

            }


            res.json({
                ok: true,
                producto: productoDB
            });

        });


    });


});

//==============
//Borrar producto
//==============
app.delete('/producto/:id', verificaToken, (req, res) => {
    
     let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no existe'
                }
            });
        }

        productoDB.disponible = false;

        productoDB.save((err, productoBorrado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoBorrado,
                mensaje: 'Producto deshabilitado'
            });

        })

    })




});









module.exports = app;
