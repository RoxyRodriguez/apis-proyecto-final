const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/tiposervicio/',(req,res)=>{
    mysqlConnection.query(`SELECT id_tipo_servicio as id, tipo_servicio, activo FROM app_tipo_servicio WHERE eliminado = 0`,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.get('/tiposervicio/:id',(req,res)=>{
    const {id } = req.params;
    mysqlConnection.query(`SELECT id_tipo_servicio, tipo_servicio, activo FROM app_tipo_servicio WHERE id_tipo_servicio = ?`,[id],(err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    })
});

router.post('/tiposervicio/',(req,res)=>{
    const { flag, id, tipo_servicio, activo, usuario } = req.body;
    const query = `
        CALL sp_app_tipo_servicio_mantenimiento(?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(query,[flag, id, tipo_servicio, activo, usuario], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.put('/tiposervicio/:id',(req,res)=>{
    const { flag, tipo_servicio, activo, usuario } = req.body;
    const {id } = req.params;
    const query = `
    CALL sp_app_tipo_servicio_mantenimiento(?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(query,[flag, id,tipo_servicio, activo, usuario], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.delete('/tiposervicio/:id',(req,res)=>{
    const {id } = req.params;
    const query = `
        CALL sp_app_tipo_servicio_eliminar(?);
    `;
    mysqlConnection.query(query,[id], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});



module.exports = router;