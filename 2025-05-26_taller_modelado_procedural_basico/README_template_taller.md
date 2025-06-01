# 🧪 Modelado Procedural Básico: Geometría desde Código

## 📅 Fecha
`2025-05-26` – Fecha de entrega 

---

## 🎯 (Parte 1) Explicación breve del concepto de modelado procedural.

El modelado procedural en Unity se refiere a la generación automática de contenido (como modelos 3D, texturas, niveles o terrenos) mediante algoritmos y reglas predefinidas, en lugar de crearlo manualmente.

En el taller, se usa una matriz para colocar bloques y simular una ciudad. Investigando sobre el tema, en Unity normalmente se emplea Random.Range o ruido Perlin (Mathf.PerlinNoise) para variaciones naturales.

---

## 🧠 (Parte 2) GIFs animados

> ✅ En el siguiente GIF se observa un objeto vacío al que se le ha asignado un script. Este script genera automáticamente un conjunto de bloques de diferentes tamaños, así como torres cilíndricas distribuidas alrededor del mismo.

![Creando bloques por codigo](Gif/UnityTaller14.gif)

---

## 🔧 (Parte 3) Código relevante (C#, JSX/GLSL o JS para geometría).

A continuación se muestra el código para la malla de los cubos. 

```C#
void GenerateCubesGrid()
{
    // Configuración inicial de la grilla
    int rows = 5;          // Número de filas en la grilla
    int cols = 5;          // Número de columnas en la grilla
    float spacing = 2f;    // Distancia entre cada cubo en la grilla

    // Recorremos todas las posiciones de la grilla
    for (int x = 0; x < rows; x++)         // Iteración por filas
    {
        for (int z = 0; z < cols; z++)     // Iteración por columnas
        {
            // Creamos un nuevo cubo primitivo
            GameObject cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
            
            // Establecemos el objeto actual como padre del cubo (para organización en la jerarquía)
            cube.transform.parent = transform;
            
            // Posicionamos el cubo en la posición calculada (X y Z varían, Y permanece en 0)
            cube.transform.position = new Vector3(x * spacing, 0, z * spacing);
            
            // Aplicamos una escala aleatoria en el eje Y (altura variable entre 1 y 3 unidades)
            // Nota: Los ejes X y Z mantienen escala 1 (cubo cuadrado en base)
            cube.transform.localScale = new Vector3(1, Random.Range(1f, 3f), 1);
        }
    }
}

```

Y el siguiente código es para las torres de cilindros.

```C#
void GenerateSpiralCylinders()
{
    // Configuración de parámetros de la espiral
    int cylinderCount = 20;    // Cantidad total de cilindros a generar
    float radius = 5f;         // Radio de la espiral (distancia desde el centro)
    float heightStep = 0.5f;   // Incremento de altura entre cada cilindro

    // Generamos cada cilindro en la espiral
    for (int i = 0; i < cylinderCount; i++)
    {
        // Calculamos el ángulo en radianes para la posición actual
        // Multiplicamos por 0.5f para controlar la separación angular (90° por cilindro)
        float angle = i * Mathf.PI * 0.5f;
        
        // Calculamos la posición en coordenadas 3D:
        float x = Mathf.Cos(angle) * radius;  // Componente X usando coseno
        float z = Mathf.Sin(angle) * radius;  // Componente Z usando seno
        float y = i * heightStep;            // Altura aumenta progresivamente

        // Creamos el cilindro primitivo
        GameObject cylinder = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
        
        // Organización en la jerarquía:
        cylinder.transform.parent = transform;  // Asignamos como hijo del objeto contenedor
        
        // Posicionamiento:
        cylinder.transform.position = new Vector3(x, y, z);
        
        // Rotación (opcional):
        // Convertimos el ángulo a grados y rotamos el cilindro para alinearlo con la espiral
        cylinder.transform.rotation = Quaternion.Euler(0, angle * Mathf.Rad2Deg, 0);
    }
}
```

---

## 📁 (Parte 4) Descripción general de los prompts usados

Utilicé un total de 4 prompts principales que sirvieron como guía para este taller:

- El primero se centró en comprender cómo funciona la generación de objetos mediante código en Unity.

- El segundo buscaba conocer cómo realizar este proceso sin usar código (existe un método por nodos, pero no logré hacerlo funcionar).

- El tercero se enfocó en solicitar el código paso a paso.

- El cuarto prompt abordó la implementación de este código en un objeto vacío.

---

## 🧪 (Parte 5) Comentario final: ¿cómo se diferencia modelar con código vs modelar a mano?

Comprendo que al utilizar código se pueden generar mundos más extensos con menor esfuerzo, pero considero que este enfoque puede sacrificar cierto nivel de detalle durante la expansión del mundo. Creo que la solución ideal sería combinar ambos métodos, ya que si contáramos con una variedad suficiente de objetos base bien diseñados, su implementación procedural evitaría que el resultado final pareciera demasiado mecánico o repetitivo, mejorando significativamente la calidad visual.

