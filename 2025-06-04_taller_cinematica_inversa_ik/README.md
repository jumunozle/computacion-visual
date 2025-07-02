# 🧪 Cinemática Inversa: Haciendo que el Modelo Persiga Objetivos

## 📅 Fecha
2025-06-04 – Fecha de asignación

2025-06-25 – Fecha de realización

2025-06-24 – Fecha de entrega

---

## 🎯 (Parte 1) 🤖 ¿Qué es la Cinemática Inversa?

La cinemática inversa (IK) es una técnica usada para calcular las rotaciones necesarias en una cadena de segmentos (como un brazo o pierna) para que el extremo (mano o pie) alcance una posición objetivo.

🧱 Ejemplo:
Imagina un brazo robótico con 3 segmentos:

Hombro → Brazo → Antebrazo → Mano

Con IK, tú le dices a la mano adónde quieres que llegue, y el sistema calcula cómo deben rotarse el hombro, el brazo y el antebrazo para que la mano llegue allí.

Es lo contrario de la cinemática directa, donde tú das los ángulos y se calcula la posición.

---

## 🧠 (Parte 2) GIFs animados

> ✅ En el siguiente GIF se ve el movimiento en Unity como el brazo persigue la esfera roja 

![Gif del movimiento](Unity/Taller29Unity.gif)

---

## 🔧 (Parte 3) Código relevante (C#, JSX/GLSL o JS para geometría).

A continuación se muestra el código para el movimiento. 

```C#
using UnityEngine;

public class IKSolverCCD : MonoBehaviour
{
    [Header("Configuración del brazo")]
    public Transform[] joints;     // Lista de articulaciones desde la mano hasta la base
    public Transform target;       // Objetivo que debe alcanzar
    public int maxIterations = 10; // Iteraciones por frame (máximo de giros)
    public float threshold = 0.01f; // Distancia mínima al objetivo para detener

    void Update()
    {
        SolveIK();

        // Visualiza una línea entre la mano y el objetivo
        Debug.DrawLine(joints[0].position, target.position, Color.red);
    }

    void SolveIK()
    {
        if (joints == null || joints.Length == 0 || target == null) return;

        // Iterar varias veces por frame para mejorar precisión
        for (int i = 0; i < maxIterations; i++)
        {
            // Recorre todas las articulaciones desde la mano hacia la base
            for (int j = 0; j < joints.Length - 1; j++)
            {
                Transform joint = joints[j];

                // Vector desde articulación a la mano (extremo)
                Vector3 toEnd = joints[0].position - joint.position;

                // Vector desde articulación al objetivo
                Vector3 toTarget = target.position - joint.position;

                // Calcula ángulo de rotación entre vectores
                float angle = Vector3.SignedAngle(toEnd, toTarget, Vector3.forward);

                // Rota la articulación (en el eje Z si es 2D)
                joint.Rotate(Vector3.forward, angle);

                // Detiene si la distancia al objetivo es suficientemente pequeña
                if ((joints[0].position - target.position).magnitude < threshold)
                    return;
            }
        }
    }
}

```

---
## 💻 ¿qué tan fácil fue implementar y ajustar el movimiento?

✅ Lo fácil:

Jerarquía de objetos en Unity
Crear los objetos (Base → Brazo → Antebrazo → Mano) con Cubes es intuitivo y se hace visualmente.

Agregar scripts y componentes
Unity hace fácil asignar scripts, conectar Transforms desde el Inspector y ver resultados en tiempo real.

Ver resultados inmediatos
Basta mover la esfera o cambiar sliders y ves cómo el brazo se ajusta. Esto motiva bastante.

⚠️ Lo que puede ser difícil o confuso:

Entender la lógica del algoritmo CCD
Aunque el código es corto, entender por qué se calcula el ángulo así y por qué se rota hacia Vector3.forward puede tomar algo de tiempo.

Orden correcto de los joints
Muchos errores de novato ocurren por poner mal el orden de joints[0], joints[1], etc.
Si se pone al revés, el brazo gira raro.

Problemas de convergencia
A veces el brazo no alcanza el objetivo si:

El número de iterations es muy bajo

El objetivo está muy lejos

Hay errores de rotación acumulada (gimbal lock si no se limita bien)

Movimiento brusco o exagerado
El brazo puede girar violentamente si no se limitan los ángulos o no se usa interpolación (Lerp, Clamp, etc.).

## 🧠 Conclusión:

Se puede lograr con paciencia, tutoriales y práctica. El CCD es uno de los algoritmos más accesibles para entender IK, y Unity ayuda mucho visualmente.

---

## 👥 Integrantes

- Sebastián Muñoz → jumunozle@unal.edu.co
- Carlos Camacho → cacamacho@unal.edu.co  
- Juan Daniel Ramírez → juaramriezmo@unal.edu.co
- Sergio David López → slopezpa@unal.edu.co 

---

