/**
 * Autores: Rubén Gabás Celimendiz, Alejandro Solanas Bonilla, Daniel Uroz Hinarejos
 * NIAs: 590738, 647647, 545338
 * Proyecto: OPbird
 * Fichero:
 * Fecha: 19/5/2016
 * Funcion:
 */


module.exports = {
    db: {
        production:"mongodb://admin:admin@ds011472.mlab.com:11472/stw",
        test:"mongodb://localhost:27017/stw"
    },
    TOKEN_SECRET: process.env.TOKEN_SECRET || "clavePrivadaToOp",
    port: "8080",
}