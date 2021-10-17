const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/servicio/',(req,res)=>{
    $query = `
    SELECT id_servicio AS id, servicio FROM app_servicio WHERE activo=1 AND eliminado =0
    `;
    mysqlConnection.query($query,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.get('/servicioAll/',(req,res)=>{
    $query = `
    SELECT ser.id_servicio AS id,
        ts.tipo_servicio,
        ser.servicio,
        ser.activo,
        IF(ser.activo=1,'Activo','Inactivo') estado
    FROM app_servicio ser
    INNER JOIN app_tipo_servicio ts ON ts.id_tipo_servicio = ser.id_tipo_servicio
    WHERE ser.eliminado = '0'
    `;
    mysqlConnection.query($query,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});


router.get('/servicioxtipo/:id',(req,res)=>{
    const {id } = req.params;
    const query=`SELECT id_servicio AS id, 
                        servicio 
                FROM app_servicio 
                WHERE activo=1 AND 
                    eliminado =0 and 
                    id_tipo_servicio=?`;
    mysqlConnection.query(query,[id],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.get('/servicio/:id',(req,res)=>{
    const {id } = req.params;
    mysqlConnection.query('select *From app_servicio where id_servicio=?',[id],(err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    })
})

router.post('/servicio/',(req,res)=>{
    const { flag, id, idtiposervicio, servicio, activo, usuario } = req.body;
    const query = `
        CALL sp_app_servicio_mantenimiento(?, ?,?, ?, ?, ?);
    `;
    mysqlConnection.query(query,[flag, id, idtiposervicio, servicio, activo, usuario], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.put('/servicio/:id',(req,res)=>{
    const {flag, idtiposervicio, servicio, activo, usuario } = req.body;
    const {id} = req.params;
    const query = `
        CALL sp_app_servicio_mantenimiento(?, ?,?, ?, ?, ?);
    `;
    mysqlConnection.query(query,[flag, id, idtiposervicio, servicio, activo, usuario ], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.delete('/servicio/:id',(req,res)=>{
    const {id } = req.params;
    const query = `
        CALL sp_app_servicio_eliminar(?);
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