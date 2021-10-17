const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/tipodocumento/',(req,res)=>{
    const query = `
    SELECT id_tipo_documento_identidad id, 
        tipo_documento_identidad tipodocumento,
        abreviatura,
        longitud_minima,
        longitud_maxima
    FROM app_tipo_documento_identidad 
    WHERE activo=1
    `;
    mysqlConnection.query(query,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.get('/tipodocumento/:id',(req,res)=>{
    const {id } = req.params;

    const query = `
    SELECT id_tipo_documento_identidad idtipodocumento, 
        tipo_documento_identidad tipodocumento,
        abreviatura,
        longitud_minima,
        longitud_maxima
    FROM app_tipo_documento_identidad 
    WHERE id_tipo_documento_identidad = ?
    `;

    mysqlConnection.query(query,[id],(err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    })
});

router.post('/tipodocumento/',(req,res)=>{
    const { flag, id, tipo_documento, abreviatura, longitud_minima, longitud_maxima, activo, usuario } = req.body;
    const query = `
        CALL sp_app_tipo_documento_mantenimiento(?, ?, ?, ?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(query,[flag, id, tipo_documento, abreviatura, longitud_minima, longitud_maxima, activo, usuario], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.put('/tipodocumento/:id',(req,res)=>{
    const { flag, tipo_documento, abreviatura, longitud_minima, longitud_maxima, activo, usuario } = req.body;
    const {id } = req.params;
    const query = `
        CALL sp_app_tipo_documento_mantenimiento(?, ?, ?, ?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(query,[flag, id, tipo_documento, abreviatura, longitud_minima, longitud_maxima, activo, usuario], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});



module.exports = router;