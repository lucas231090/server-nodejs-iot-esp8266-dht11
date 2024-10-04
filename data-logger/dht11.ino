#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include "DHT.h"  

// Definindo as credenciais do WiFi
const char* ssid = "FIBRA-A066";
const char* password = "0Z48058288";

// Definindo o endereço do servidor
//ipconfig no cmd -> procurar Endereço IPv4. . . . . . . .  . . . . . . . : 192.168.25.13
const char* serverName = "http://192.168.25.13:3333/sensores";

// Timer para controlar a frequência das requisições (2 segundos)
unsigned long lastTime = 0;
unsigned long timerDelay = 2000;

// Configurações do sensor DHT11
#define DHTTYPE DHT11
#define dht_dpin 14
DHT dht(dht_dpin, DHTTYPE);

WiFiClient wifiClient; // Criando instância de WiFiClient

// Função de inicialização
void setup() {
  Serial.begin(115200);

  // Conectando ao WiFi
  Serial.println("Conectando ao WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // Exibindo o IP ao conectar
  Serial.println();
  Serial.print("Conectado ao WiFi. IP: ");
  Serial.println(WiFi.localIP());
  Serial.println("Aguardando conexão com a API...");

  // Inicializando o sensor DHT
  dht.begin();
  Serial.println("Sensor DHT-11 inicializado.");
}

// Função principal
void loop() {
  // Leitura dos dados do sensor DHT11
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  // Verificação se as leituras são válidas
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Erro ao ler do sensor DHT!");
    return;
  }

  // Exibindo os valores no monitor serial
  Serial.print("Umidade atual: ");
  Serial.print(humidity);
  Serial.print("%, Temperatura atual: ");
  Serial.print(temperature);
  Serial.println("°C");

  // Construindo a requisição JSON
  char jsonData[256]; 
  snprintf(jsonData, sizeof(jsonData), 
    "{\"user_id\":\"5fac2ad55a219835349cc97a\",\"ipArduino\":\"192.168.25.15\","
    "\"tipoMedida1\":\"Umidade\",\"unidadeMedida1\":\"%%\",\"tipoMedida2\":\"Temperatura\","
    "\"unidadeMedida2\":\"ºC\", \"modeloSensor\":\"DHT-11\",\"valor1\":%.2f,\"valor2\":%.2f}",
    humidity, temperature);

  // Enviando a requisição HTTP a cada 2 segundos
  if (millis() - lastTime > timerDelay) {
    // Verificando se o WiFi está conectado
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(wifiClient, serverName); // Passa o WiFiClient junto com o URL
      http.addHeader("Content-Type", "application/json");

      // Enviando o POST com os dados do sensor
      int httpResponseCode = http.POST(jsonData);

      // Exibindo o status da requisição no monitor serial
      Serial.print("Código de resposta HTTP: ");
      Serial.println(httpResponseCode);

      if (httpResponseCode == 200) {
        Serial.println("API conectada...");
        Serial.println("Dados gravados com sucesso.");
      } else {
        Serial.println("API não conectada.");
        Serial.println("Contate o administrador.");
      }

      // Exibir a mensagem a cada 2 segundos, independentemente do sucesso ou falha
      Serial.println("------------------------------------------------------------------------------------");

      // Encerrando a conexão HTTP
      http.end();
    } else {
      Serial.println("WiFi desconectado.");
    }

    // Atualizando o tempo da última requisição
    lastTime = millis();
  }
}
