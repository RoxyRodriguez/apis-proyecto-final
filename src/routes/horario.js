const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/horario/',(req,res)=>{
    const query = `
    SELECT id_horario as id,
            DATE_FORMAT(hora_inicio,'%H:%i') hora_inicio,
            DATE_FORMAT(hora_fin,'%H:%i') hora_fin
    FROM app_horario
    WHERE activo=1 AND 
        eliminado=0
    ORDER BY hora_inicio;
    `;
    mysqlConnection.query(query,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.get('/horario/:id',(req,res)=>{
    const {id } = req.params;

    const query = `
    SELECT id_horario,
        hora_inicio,
        hora_fin
    FROM app_horario
    WHERE id_horario = ?
    `;

    mysqlConnection.query(query,[id],(err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    })
});

router.get('/horariodisponible/:fecha',(req,res)=>{
    const { fecha } = req.params;
    const query=`call sp_app_horario_disponible(?)`;
    mysqlConnection.query(query,[fecha], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

module.exports = router;