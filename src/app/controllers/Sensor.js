const SensorRepository = require("../repositories/SensorRepository");

class SensoresController {
  async index(req, res) {
    try {
      const sensores = await SensorRepository.find();
      res.status(200).json(sensores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar dados dos sensores" });
    }
  }

  async store(req, res) {
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
    } = req.body;

    if (
      !user_id ||
      !ipArduino ||
      !tipoMedida1 ||
      !unidadeMedida1 ||
      valor1 === undefined ||
      !modeloSensor
    ) {
      return res
        .status(400)
        .json({ error: "Dados obrigatórios não fornecidos." });
    }

    try {
      console.log("Dados recebidos:");
      console.log(`User ID: ${user_id}`);
      console.log(`IP do Arduino: ${ipArduino}`);
      console.log(`Sensor: ${modeloSensor}`);
      console.log(`${tipoMedida1}: ${valor1} ${unidadeMedida1}`);
      console.log(`${tipoMedida2}: ${valor2} ${unidadeMedida2}`);
      console.log("------------------------------------");

      const novoSensor = await SensorRepository.create({
        user_id,
        ipArduino,
        tipoMedida1,
        unidadeMedida1,
        valor1,
        tipoMedida2,
        unidadeMedida2,
        valor2,
        modeloSensor,
      });

      res.status(201).json({
        message: "Dados recebidos com sucesso",
        data: novoSensor,
        id: novoSensor.id,
      });
    } catch (error) {
      console.error("Erro ao processar os dados do sensor:", error);
      res.status(500).json({ error: "Erro ao processar os dados do sensor" });
    }
  }
}

module.exports = new SensoresController();
