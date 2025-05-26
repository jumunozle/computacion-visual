

// Librerías para recibir mensajes OSC
import oscP5.*;
import netP5.*;

// Variables globales
OscP5 osc;
String comando = "";
color currentColor = color(200, 200, 200);  // Color inicial de fondo
float angulo = 0;  // Ángulo de rotación para el cubo

void setup() {
  size(600, 400, P3D);  // Ventana 3D
  osc = new OscP5(this, 12000);  // 📡 Iniciar receptor OSC en el puerto 12000 (debe coincidir con Python)
  println("Esperando comandos OSC en puerto 12000...");
}

void draw() {
  background(currentColor);  // Cambiar el color de fondo según el comando

  // Dibujar cubo 3D en el centro rotando
  pushMatrix();
  translate(width / 2, height / 2, 0);
  rotateY(angulo);
  rotateX(angulo * 0.5);
  fill(255);
  stroke(0);
  box(150);
  popMatrix();
}

// Manejar recepción de mensajes OSC
void oscEvent(OscMessage msg) {
  if (msg.checkAddrPattern("/comando")) {
    comando = msg.get(0).stringValue();  // Obtener el texto del comando
    println("Comando recibido:", comando);
    actualizarVisual(comando);  // Aplicar el efecto visual correspondiente
  }
}

// Aplicar efectos visuales según el comando recibido
void actualizarVisual(String cmd) {
  switch(cmd) {
    case "rojo":
      currentColor = color(255, 0, 0);
      break;
    case "azul":
      currentColor = color(0, 0, 255);
      break;
    case "verde":
      currentColor = color(0, 255, 0);
      break;
    case "amarillo":
      currentColor = color(255, 255, 0);
      break;
    case "blanco":
      currentColor = color(255);
      break;
    case "negro":
      currentColor = color(0);
      break;
    case "girar izquierda":
      angulo -= 0.2;
      break;
    case "girar derecha":
      angulo += 0.2;
      break;
  }
}
