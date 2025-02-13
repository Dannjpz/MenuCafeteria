// db.js
const oracledb = require("oracledb");

const dbConfig = {
  user: "DannJpz",
  password: "dev", // Reemplaza con tu contraseña real
  connectString: "localhost:1521/xe"
};

async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
    console.log("Pool de conexión creado exitosamente");
  } catch (err) {
    console.error("Error creando el pool de conexión:", err);
    throw err;
  }
}

async function closePool() {
  try {
    await oracledb.getPool().close();
    console.log("Pool de conexión cerrado");
  } catch (err) {
    console.error("Error cerrando el pool de conexión:", err);
    throw err;
  }
}

module.exports = {
  initialize,
  closePool
};
