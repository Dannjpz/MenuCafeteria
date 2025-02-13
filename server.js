const express = require("express");
const cors = require("cors");
const oracledb = require("oracledb");
const { initialize } = require("./db");

const app = express();
const port = 3000;

// Configuración de CORS más específica
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"], // Agrega los orígenes permitidos
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true
  })
);

app.use(express.json());

// Middleware para logging de requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.post("/api/reservations", async (req, res) => {
  console.log("Recibida nueva solicitud de reserva:", req.body);

  let connection;
  try {
    const {
      name,
      email,
      reservation_date,
      reservation_time,
      people,
      special_requests
    } = req.body;

    // Validación básica
    if (!name || !email || !reservation_date || !reservation_time || !people) {
      throw new Error("Faltan campos requeridos");
    }

    connection = await oracledb.getConnection();

    const result = await connection.execute(
      `INSERT INTO reservations (
                name, email, reservation_date, reservation_time, people, special_requests
            ) VALUES (
                :name, :email, TO_DATE(:reservation_date, 'YYYY-MM-DD'),
                TO_TIMESTAMP(:reservation_time, 'HH24:MI'),
                :people, :special_requests
            ) RETURNING id INTO :id`,
      {
        name,
        email,
        reservation_date,
        reservation_time,
        people,
        special_requests,
        id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: true }
    );

    console.log("Reserva creada exitosamente:", result.outBinds.id[0]);

    res.status(201).json({
      success: true,
      message: "Reserva creada exitosamente",
      id: result.outBinds.id[0]
    });
  } catch (err) {
    console.error("Error al crear la reserva:", err);
    res.status(500).json({
      success: false,
      message: "Error al procesar la reserva: " + err.message
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error al cerrar la conexión:", err);
      }
    }
  }
});

initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("Error al inicializar la base de datos:", err);
    process.exit(1);
  });
