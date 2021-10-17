require('dotenv').config();
const express = require('express');
const cors  =  require('cors');
const app = express();
app.use(cors());

//settings
app.set('port',process.env.PORT || 3000);

//middlewares
app.use(express.json());

//Routes
app.get('/',function(req,res){
    res.send('El servidor esta activo')
});

app.use(require('./routes/servicios'));
app.use(require('./routes/tipodocumento'));
app.use(require('./routes/tiposervicio'));
app.use(require('./routes/horario'));
app.use(require('./routes/cita'));
app.use(require('./routes/paciente'));
app.use(require('./routes/usuario'));

app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'));

});