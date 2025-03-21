package main.java.gt.edu.usac.ingenieria.MediTrack;

import org.eclipse.paho.client.mqttv3.*;

public class MqttClientManager {
    private static final String BROKER_URL = "tcp://localhost:1883"; // Cambia esto si usas un broker remoto
    private static final String CLIENT_ID = "MediTrackClient";
    private static MqttClient client;

    public static void connect() {
        try {
            client = new MqttClient(BROKER_URL, CLIENT_ID);
            MqttConnectOptions options = new MqttConnectOptions();
            options.setCleanSession(true);
            client.connect(options);
            System.out.println("✅ Conectado al broker MQTT: " + BROKER_URL);
        } catch (MqttException e) {
            System.out.println("❌ Error al conectar al broker MQTT: " + e.getMessage());
        }
    }

    public static void publish(String topic, String message) {
        try {
            if (client != null && client.isConnected()) {
                client.publish(topic, new MqttMessage(message.getBytes()));
                System.out.println("📤 Mensaje publicado en el tema '" + topic + "': " + message);
            } else {
                System.out.println("⚠ Cliente MQTT no conectado.");
            }
        } catch (MqttException e) {
            System.out.println("❌ Error al publicar mensaje: " + e.getMessage());
        }
    }

    public static void subscribe(String topic) {
        try {
            if (client != null && client.isConnected()) {
                client.subscribe(topic, (t, msg) -> {
                    System.out.println("📥 Mensaje recibido en el tema '" + t + "': " + new String(msg.getPayload()));
                });
                System.out.println("✅ Suscrito al tema: " + topic);
            } else {
                System.out.println("⚠ Cliente MQTT no conectado.");
            }
        } catch (MqttException e) {
            System.out.println("❌ Error al suscribirse al tema: " + e.getMessage());
        }
    }
}
