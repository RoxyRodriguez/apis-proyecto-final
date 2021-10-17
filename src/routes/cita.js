const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/cita/',(req,res)=>{
    const query = `
    SELECT ct.id_cita id,
        sv.servicio AS 'title',
        STR_TO_DATE(CONCAT(ct.fecha,' ',h.hora_inicio),'%Y-%m-%d%H:%i:%s') AS 'date'
    FROM app_cita ct
    INNER JOIN app_servicio sv ON sv.id_servicio = ct.id_servicio
    INNER JOIN app_horario h ON h.id_horario=ct.id_horario
    WHERE estado='1';
        `;
    mysqlConnection.query(query,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.get('/citastotales/',(req,res)=>{
    const query = `
        CALL sp_totales_citas()
        `;
    mysqlConnection.query(query,(err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    })
});

router.get('/citapendiente/',(req,res)=>{
    const query = `
    SELECT ct.id_cita,
        CONCAT(pc.apellidos,' ',pc.nombres) paciente,
        sr.servicio,
        DATE_FORMAT(ct.fecha,'%d-%m-%Y') fecha,
        CONCAT(DATE_FORMAT(h.hora_inicio, '%h:%i'),' ',DATE_FORMAT(h.hora_fin, '%h:%i')) hora
    FROM app_cita ct
    INNER JOIN app_paciente pc ON pc.id_paciente = ct.id_paciente
    INNER JOIN app_servicio sr ON sr.id_servicio = ct.id_servicio
    INNER JOIN app_horario h ON h.id_horario = ct.id_horario
    WHERE ct.estado='1' 
    ORDER BY fecha DESC,hora DESC;
        `;
    mysqlConnection.query(query,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});


router.post('/cita/',(req,res)=>{
    const { idtipodocumento, numerodocumento, apellidos, nombres, email, celular ,idservicio, idhora, fecha } = req.body;
    const query = `
        CALL sp_app_reservar_cita(?, ?,?, ?, ?, ?,?,?,?);
    `;
    mysqlConnection.query(query,[idtipodocumento, numerodocumento, apellidos, nombres, email, celular ,idservicio, idhora, fecha], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});


module.exports = router;