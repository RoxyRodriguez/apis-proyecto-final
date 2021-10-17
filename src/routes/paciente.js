const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/paciente/',(req,res)=>{
    const query = `
    SELECT p.codigo,
        td.abreviatura tipodocumento,
        p.documento_identidad numero_documento,
        p.apellidos,
        p.nombres,
        p.email,
        p.celular
    FROM app_paciente p
    INNER JOIN app_tipo_documento_identidad td ON td.id_tipo_documento_identidad= p.id_tipo_documento_identidad
    ORDER BY codigo;
    `;
    mysqlConnection.query(query,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

// router.post('/cita/',(req,res)=>{
//     const { idtipodocumento, numerodocumento, apellidos, nombres, email, celular ,idservicio, idhora, fecha } = req.body;
//     const query = `
//         CALL sp_app_reservar_cita(?, ?,?, ?, ?, ?,?,?,?);
//     `;
//     mysqlConnection.query(query,[idtipodocumento, numerodocumento, apellidos, nombres, email, celular ,idservicio, idhora, fecha], (err, rows, fields)=>{
//         if(!err){
//             res.json(rows[0]);
//         }else{
//             console.log(err);
//         }
//     });
// });


module.exports = router;