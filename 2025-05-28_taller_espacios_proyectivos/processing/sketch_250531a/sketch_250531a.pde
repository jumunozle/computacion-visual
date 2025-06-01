import peasy.*;

PeasyCam cam;
boolean usarPerspectiva = true;

void setup() {
  size(800, 600, P3D);
  cam = new PeasyCam(this, 500);
}

void draw() {
  background(240);
  lights();
  
  if (usarPerspectiva) {
    perspective();
  } else {
    ortho(-width/2, width/2, -height/2, height/2, -1000, 1000);
  }

  // Dibujar ejes
  drawAxes(200);

  // Cubo cercano
  pushMatrix();
  translate(-100, 0, -200); // más cerca
  fill(255, 0, 0);
  box(50);
  popMatrix();

  // Cubo intermedio
  pushMatrix();
  translate(0, 0, 0);
  fill(0, 255, 0);
  box(50);
  popMatrix();

  // Cubo lejano
  pushMatrix();
  translate(100, 0, 200); // más lejos
  fill(0, 0, 255);
  box(50);
  popMatrix();

  // Texto en HUD (pantalla fija)
  cam.beginHUD();
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text(usarPerspectiva ? "Proyección: PERSPECTIVA" : "Proyección: ORTOGRÁFICA", 10, 10);
  cam.endHUD();
}

void keyPressed() {
  if (key == 'p' || key == 'P') {
    usarPerspectiva = !usarPerspectiva;
  }
}

// Función para dibujar ejes X, Y, Z
void drawAxes(float len) {
  strokeWeight(2);

  // Eje X - rojo
  stroke(255, 0, 0);
  line(0, 0, 0, len, 0, 0);

  // Eje Y - verde
  stroke(0, 255, 0);
  line(0, 0, 0, 0, len, 0);

  // Eje Z - azul
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, len);

  strokeWeight(1);
}
