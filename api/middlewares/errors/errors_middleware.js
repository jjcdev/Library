/**
 * Middleware global de gestion des erreurs.
 * Centralise toutes les erreurs de l'application et renvoie une réponse JSON uniforme.
 * @param {Object} error
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const errorMiddleware = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(status).json({
        success: false,
        status: status,
        message: message
    })
}
module.exports = errorMiddleware