const express = require("express");
const bodyParser = require("body-parser");

// Inicializando o app
const app = express();
const PORT = 3333;

// Middleware para processar JSON
app.use(bodyParser.json());

// Rota para receber os dados do ESP8266
app.post("/sensores", (req, res) => {
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

  // Exibe os dados recebidos no console
  console.log("Dados recebidos:");
  console.log(`User ID: ${user_id}`);
  console.log(`IP do Arduino: ${ipArduino}`);
  console.log(`Sensor: ${modeloSensor}`);
  console.log(`${tipoMedida1}: ${valor1} ${unidadeMedida1}`);
  console.log(`${tipoMedida2}: ${valor2} ${unidadeMedida2}`);
  console.log("------------------------------------");

  // Resposta para o ESP8266
  res.status(200).send("Dados recebidos com sucesso");
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
