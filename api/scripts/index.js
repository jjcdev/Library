require('dotenv').config();
const express = require('express');
const cors = require('cors');

// On importe l'initialisation de la BDD et le dossier models (qui contient l'instance Sequelize)
const { initialize } = require('../configs/database');
const { sequelize } = require('../models');

const app = express();

// --- MIDDLEWARES GLOBAUX ---
app.use(cors());
app.use(express.json());

// --- IMPORT DES LOGIQUES (ROUTES) ---
const auth_middleware = require('../middlewares/auth_middleware');
const signup = require('../functions/signup');
const login = require('../functions/login');
const list = require("../functions/list");
const refresh = require('../functions/refresh');
const infos = require('../functions/infos');
const bodyParser = require("body-parser")
const deleteBook = require('../functions/deleteBook');

const router = express.Router();

// --- DÉFINITION DES ROUTES ---
router.post('/signup', signup);
router.post('/login', login);
router.get('/list', auth_middleware, list);
router.get('/infos', auth_middleware, infos);
router.get('/refresh', auth_middleware, refresh);
router.delete("/delete", auth_middleware, deleteBook);

app.use('/api_lib', router)
    .use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// --- FONCTION DE LANCEMENT ---
async function startApp() {
    try {
        await initialize();

        await sequelize.sync({ alter: true });
        console.log('✅ Base de données Library et tables synchronisées.');

        app.listen(PORT, () => {
            console.log(`🚀 Serveur bibliothèque : http://localhost:${PORT}/api_lib`);
        });

    } catch (error) {
        console.error('❌ Erreur critique au démarrage :', error);
        process.exit(1);
    }
}

startApp();