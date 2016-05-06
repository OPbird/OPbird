module.exports = {
    db: {
        //production:"mongodb://Phyrion:123456@ds059634.mongolab.com:59634/ophoras",
        test:"mongodb://localhost:27017"
    },
    TOKEN_SECRET: process.env.TOKEN_SECRET || "clavePrivadaToOp",
    port: "8080"
}