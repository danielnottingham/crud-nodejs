const express = require('express');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Usuario = require('./models/Usuarios');
const moment = require('moment');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY');
        }
    }
}));
app.set('view engine', 'handlebars');

/*
app.get('/', function(req, res){
    res.sendFile(__dirname + '/src/index.html');
});
*/
app.get('/cadastrar-usuarios', function(req, res){
    res.render('cadastrar-usuarios');
});
app.get('/listar-usuarios', function(req, res){
    Usuario.findAll().then(usuarios => {
        res.render('listar-usuarios', {usuarios: usuarios});
    });
});

app.post('/cad-usuarios', function(req,res){
    Usuario.create({
        nome: req.body.nome,
        email: req.body.email,
        sexo: req.body.sexo,
        telefone: req.body.telefone
    }).then(()=>{
        res.redirect('/listar-usuarios');
    })
    .catch(err => {
        res.send('Erro ao tentar cadastrar' + err);
    });
});

app.listen(port);
