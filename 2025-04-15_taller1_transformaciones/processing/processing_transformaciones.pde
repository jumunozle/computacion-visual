void setup() {
  size(600, 600, P3D); // Ventana 3D
}

void draw() {
  background(30);
  lights(); 

  // Variables que cambian en el tiempo
  float angle = frameCount * 0.02;
  float scaleFactor = 1 + 0.5 * sin(frameCount * 0.05);
  float offsetX = 100 * sin(frameCount * 0.03);
  float offsetY = 100 * sin(frameCount * 0.04);

  // Centrar el origen
  translate(width / 2, height / 2, 0);

  // Aislar las transformaciones del cubo
  pushMatrix();

  // Movimiento ondulado
  translate(offsetX, offsetY, 0);

  // Rotación en los tres ejes
  rotateX(angle);
  rotateY(angle * 0.8);
  rotateZ(angle * 0.6);

  // Escalado cíclico
  scale(scaleFactor);

  // Dibujar el cubo
  fill(100, 150, 255);
  stroke(255);
  box(100);

  popMatrix();
}
