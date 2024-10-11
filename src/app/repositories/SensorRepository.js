const db = require("../models/ConnectDatabase");

class SensorRepository {
  static async find() {
    try {
      const query = `SELECT * FROM sensores ORDER BY createdAt DESC;`;
      const rows = await db.query(query);
      return rows;
    } catch (error) {
      console.error("Erro ao buscar sensores:", error);
      throw error;
    }
  }

  static async create(sensorData) {
    const {
      user_id,
      ipArduino,
      tipoMedida1,
      unidadeMedida1,
      valor1,
      tipoMedida2,
      unidadeMedida2,
      valor2,
      modeloSensor,
    } = sensorData;

    const query = `
        INSERT INTO sensores (user_id, ipArduino, tipoMedida1, unidadeMedida1, valor1, tipoMedida2, unidadeMedida2, valor2, modeloSensor)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
    const values = [
      user_id,
      ipArduino,
      tipoMedida1,
      unidadeMedida1,
      valor1,
      tipoMedida2,
      unidadeMedida2,
      valor2,
      modeloSensor,
    ];

    try {
      const result = await db.query(query, values);
      return { id: result.insertId, ...sensorData };
    } catch (error) {
      console.error("Erro ao criar sensor:", error);
      throw error;
    }
  }
}

module.exports = SensorRepository;
