const db = require('./db');

const Usuarios = db.sequelize.define('usuarios', {
    // attributes
    nome: {
      type: db.Sequelize.STRING
    },
    email: {
      type: db.Sequelize.STRING
    },
    sexo: {
        type: db.Sequelize.STRING
    },
    telefone: {
        type: db.Sequelize.STRING
    }
});

module.exports = Usuarios;
