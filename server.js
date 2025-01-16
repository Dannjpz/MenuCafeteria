const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

// Configuración de la base de datos
const dbConfig = {
  user: 'DannJpz',
  password: 'dev', 
  connectString: 'localhost:1521/xe',
};

// Crear una aplicación Express
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Para parsear JSON en el cuerpo de las solicitudes

// Ruta para procesar la reserva
app.post('/reservar', async (req, res) => {
  let connection;

  try {
    // Conectar a la base de datos
    connection = await oracledb.getConnection(dbConfig);
    console.log('Conectado a la base de datos');

    const { name, email, reservation_date, reservation_time, people } = req.body;

    // Depurar datos recibidos
    console.log('Datos recibidos:', req.body);

    // Insertar datos en la tabla reservations
    const query = `
      INSERT INTO reservations (name, email, reservation_date, reservation_time, people)
      VALUES (:name, :email, TO_DATE(:reservation_date, 'YYYY-MM-DD'), TO_TIMESTAMP(:reservation_time, 'HH24:MI:SS'), :people)
    `;

    const binds = {
      name: name,
      email: email,
      reservation_date: reservation_date,
      reservation_time: reservation_time,
      people: people
    };

    // Ejecutar la consulta
    const result = await connection.execute(query, binds, { autoCommit: true });

    console.log('Reserva insertada:', result);
    res.status(200).send('Reserva procesada exitosamente');
  } catch (error) {
    console.error('Error al procesar la reserva:', error);
    
    if (error.code === 'ORA-00942') {
      res.status(500).send('Error: La tabla o vista no existe');
    } else {
      res.status(500).send('Error al procesar la reserva');
    }
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
