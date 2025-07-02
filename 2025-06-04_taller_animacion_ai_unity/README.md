# Taller 44 (60) - Animación con AI en Unity para personajes autónomos

📅 Fecha  

2025-06-10 – Fecha de asignación  
2025-06-22– Fecha de realización  
2025-06-24 – Fecha de entrega  

----------

### 🔍 Objetivo del taller

Explorar técnicas básicas para implementar comportamientos autónomos en personajes dentro de Unity, utilizando inteligencia artificial: patrullaje, detección de jugador, decisiones reactivas, navegación con obstáculos y control de animaciones en tiempo real con Animator.

----------

### 🔹 Actividades por entorno

Este taller se desarrolla **exclusivamente en Unity (3D)** utilizando las herramientas:

- NavMeshAgent` para navegación autónoma.
- `Animator` para controlar animaciones de comportamiento.
- Scripts en `C#` para lógica de patrullaje y persecución.
- Personaje riggeado descargado desde Mixamo.

[Mixamo](https://www.mixamo.com/#/?page=1&query=attack&type=Motion%2CMotionPack)

----------

## 💻 Unity (Proyecto 3D)

**Herramientas necesarias:**

- Unity 2022.3+
- Mixamo (para modelo animado)
- Componente `NavMeshAgent`
- Ventana `Navigation` habilitada (Window > AI > Navigation)
- Animator Controller con estados Idle, Walk, Run

----------

**Pasos implementados:**

- Crear escena con terreno y obstáculos.
- Configurar NavMesh marcando suelo como `Walkable` y obstáculos como `Not Walkable`.
- Importar modelo riggeado y animaciones desde Mixamo.
- Agregar `NavMeshAgent` al personaje y configurar patrullaje entre puntos.
- Implementar lógica de persecución al detectar al jugador cercano.
- Usar `Animator` para cambiar entre animaciones de Idle, Walk y Run según velocidad.
- Controlar al jugador con teclado WASD en un sistema de movimiento 3D sin rotación.
- Activar animación de alerta al colisionar con el jugador.
- Desactivar Root Motion para evitar errores visuales de desplazamiento.

----------

## **Resultados:**

- Personaje patrullando entre puntos automáticamente.  

- Detección de jugador y cambio de estado a persecución.  

- Transiciones de animación fluidas entre Idle, Walk y Run.  

- Activación de animación de "alerta" al chocar con el jugador.  


![Imagen GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-06-04_taller_animacion_ai_unity/capturas/GifUnity.gif?raw=true)

----------

## 🌟 Bonus

- Se integró control de jugador en tercera persona simple.
- Se desactivó Root Motion para evitar retrocesos visuales.
- Se aplicó una máquina de estados básica (`enum Estado`) para alternar patrullaje y persecución.
- Se activó animación con `SetTrigger("alerta")` al colisionar con el jugador.
-  Animar otras reacciones: atacar.

----------

## 🔹 Fragmento de código relevante:

```csharp
enum Estado { Patrullar, Perseguir }
Estado estado = Estado.Patrullar;

void Update()
{
    float distancia = Vector3.Distance(transform.position, jugador.position);

    if (distancia < 5f)
    {
        estado = Estado.Perseguir;
        agent.SetDestination(jugador.position);
    }
    else
    {
        estado = Estado.Patrullar;
        // Lógica de patrullaje
    }

    animator.SetFloat("velocidad", agent.velocity.magnitude);
}

void OnCollisionEnter(Collision collision)
{
    if (collision.gameObject.CompareTag("Player"))
    {
        animator.SetTrigger("alerta");
    }
}
```
### 🧩 Prompts Usados

- _Refactoriza este código "...."_
-  "Mejora la redacción de estos parrafos: ".."
-  ¿Cómo integro animaciones al animator controller?
-  ¿Cómo evito el root motion?

## 📚 Entrega


```
2025-06-04_taller_animacion_ai_unity/
├──  escenas/
├──  scripts/
├──  capturas/
└──  README.md 
```

----------

## 💬 Reflexión Final

Este taller nos permitió entender cómo estructurar la inteligencia artificial básica de un NPC en Unity usando navegación, animaciones y detección. Además, se aprendió a identificar problemas típicos como el uso de Root Motion y a usar máquinas de estado simples para definir comportamientos reactivos.

----------


## 👥 Integrantes

- Sebastián Muñoz → jumunozle@unal.edu.co
- Carlos Camacho → cacamacho@unal.edu.co  
- Juan Daniel Ramírez → juaramriezmo@unal.edu.co
- Sergio David López → slopezpa@unal.edu.co 

    

## 👥 Contribuciones Grupales

-   Programación del patrullaje y persecución del NPC.
    
-   Integración de animaciones  obetnidas de MIXAMO y transición de estados.
    
-   Configuración del NavMesh y control del jugador.
    
-   Documentación y creación de README con capturas.
    

----------

## 🛠 Criterios de evaluación

✅ Personaje patrulla con NavMesh  
✅ Detección de jugador con cambio de comportamiento  
✅ Control de animaciones mediante Animator  
✅ Transiciones fluidas y reactivas  
✅ Explicación clara y archivo README documentado  
✅ Uso adecuado del repositorio con commits estructurados

----------
