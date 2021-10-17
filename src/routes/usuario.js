const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const jwt = require('jsonwebtoken');




router.post('/login/',(req,res)=>{
    const { usuario, clave , appkey} = req.body;
 
    const query = `CALL sp_app_login(?,?,?);`;
    mysqlConnection.query(query,[usuario,clave, appkey], (err, rows, fields)=>{
        if(!err){   
            let miresult = JSON.parse(JSON.stringify(rows));
            miresult = miresult[0]

            const id_usuario = miresult[0]["id_usuario"];
            const id_persona = miresult[0]["id_persona"];
            const usuario = miresult[0]["usuario"];
            const nombres = miresult[0]["nombre_completo"];
            const result = miresult[0]["result"];

            //jwt.sign({id_usuario:id,id_persona:id_persona},'sercretkey',(err, token)=>{
            jwt.sign({id_usuario,id_persona,usuario,nombres,result},'smartsoftwareperu2021',(err, token)=>{
                res.json({
                    token:token
                })
            });
            // res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});


router.post('/verificacion/',verifyToken,(req,res)=>{
    jwt.verify(req.token,'smartsoftwareperu2021',(error,authdata)=>{


        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                ok: true
            })
        }
    });
});


function verifyToken (req,res,next){
   
    const bearerHeaer = req.headers.authorization;

    if (typeof bearerHeaer !== 'string') {
   
        res.sendStatus(400);
        return;
    }

    if(typeof bearerHeaer !== undefined){
        const bearerToken = bearerHeaer.split(' ');
        if (bearerToken.length < 2) {
            res.sendStatus(400);
            return;
        }

        req.token = bearerToken[1];
        next();
    }else{
        res.sendStatus(403);
    }

    

};


module.exports = router;