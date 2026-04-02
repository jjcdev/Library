require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initialize } = require('../configs/database');
const { sequelize } = require('../models');

const app = express();

app.use(cors());
app.use(express.json());

const auth_middleware = require('../middlewares/auth_middleware');
const add = require('../functions/add');
const signup = require('../functions/signup');
const login = require('../functions/login');
const list = require("../functions/list");
const refresh = require('../functions/refresh');
const infos = require('../functions/infos');
const deleteBook = require('../functions/deleteBook');
const errorMiddleware = require('../middlewares/errors/errors_middleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/add', auth_middleware, add);
router.get('/list', auth_middleware, list);
router.get('/infos', auth_middleware, infos);
router.get('/refresh', auth_middleware, refresh);
router.delete("/delete", auth_middleware, deleteBook);

app.use('/api_lib', router);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8100;

/**
 * Démarre le serveur et synchronise la base de données.
 */
async function App() {
    try {
        await initialize();
        const isDev = process.env.NODE_ENV === 'development';
        await sequelize.sync({ alter: isDev });
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Serveur démaré sur le port ${PORT}`);
        });
    } catch (error) {
        console.error("Une erreur s'est produite")
        process.exit(1);
    }
}

process.on('unhandledRejection', () => {});
process.on('uncaughtException', () => { process.exit(1); });

App();