document.addEventListener("DOMContentLoaded", function () {
  // Função para buscar dados da API
  fetch("/sensores")
    .then((response) => response.json())
    .then((data) => {
      populateTable(data);
      createChart(data);
    })
    .catch((error) => console.error("Erro ao buscar dados:", error));
});

// Função para preencher a tabela com os dados
function populateTable(data) {
  const tableBody = document.getElementById("sensor-table-body");
  tableBody.innerHTML = ""; // Limpa o conteúdo atual

  data.forEach((sensor) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${sensor.id}</td>
        <td>${sensor.user_id}</td>
        <td>${sensor.ipArduino}</td>
        <td>${sensor.tipoMedida1}</td>
        <td>${sensor.unidadeMedida1}</td>
        <td>${sensor.valor1}</td>
        <td>${sensor.tipoMedida2}</td>
        <td>${sensor.unidadeMedida2}</td>
        <td>${sensor.valor2}</td>
        <td>${sensor.modeloSensor}</td>
        <td>${sensor.createdAt}</td>
      `;

    tableBody.appendChild(row);
  });
}

// Função para criar o gráfico de linhas
function createChart(data) {
  const ctx = document.getElementById("sensorChart").getContext("2d");

  // Extrair os dados de temperatura, umidade e datas
  const labels = data.map((sensor) =>
    new Date(sensor.createdAt).toLocaleTimeString()
  );
  const tempData = data.map((sensor) => sensor.valor1); // Temperatura
  const humidityData = data.map((sensor) => sensor.valor2); // Umidade

  const sensorChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels, // Datas
      datasets: [
        {
          label: "Temperatura (°C)",
          data: tempData,
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Umidade (%)",
          data: humidityData,
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Horário",
          },
        },
        y: {
          title: {
            display: true,
            text: "Valor",
          },
          beginAtZero: true,
        },
      },
    },
  });
}
