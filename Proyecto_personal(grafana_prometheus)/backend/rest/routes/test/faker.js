var router = require('express').Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var User = mongoose.model('User');
let faker = require('faker');

// Establecemos el idioma de faker
faker.locale = "es";

// Añadimos articulos
router.post('/articles/:cantidad', async (req, res, next) => {
    try {
        // Obtenemos los usuarios.
        let users = await User.find({},{_id: 1});

        // Creamos los articulos.
        for (let y = 0; y < req.params.cantidad; y++) {
            let article = await new Article({
                title: faker.hacker.phrase(),
                description: faker.lorem.sentences(),
                image: Math.floor((Math.random() * 2)) ? faker.internet.avatar() : "",
                private: Math.floor((Math.random() * 2)) ? true : false,
                author: users[Math.floor((Math.random() * users.length))]['_id']
            }).save();

            // Si el articulo no se ha creado.
            if (!article)
                throw "Articulo no insertado";
        };

        return res.sendStatus(200);
    } catch (e) {
        next(e);
    }
});

router.get('/', (req, res, next) => {
    return 'guapo';
});

module.exports = router;