# **Informe Comparativo: NeRF, Gaussian Splatting y SLAM**

En el presente informe se realiza una comparación entre tres tecnologías clave en reconstrucción y visualización 3D: **Neural Radiance Fields (NeRF)**, **Gaussian Splatting** y **Simultaneous Localization and Mapping (SLAM)**. Estas técnicas han ganado relevancia en campos como la realidad aumentada, videojuegos, exploración robótica y visualización médica, cada una con ventajas y limitaciones particulares.

La comparación se centra en cuatro aspectos técnicos fundamentales: los **requisitos de hardware**, el **tiempo de ejecución**, la **calidad del resultado generado** y el **tipo de entrada necesaria** para su funcionamiento. A través de esta evaluación se busca entender mejor cuál de estas soluciones es más adecuada en distintos contextos de aplicación.

##  Comparativa Técnica

| **Criterio**            | **NeRF (Neural Radiance Fields)**                         | **Gaussian Splatting**                                   | **SLAM (Simultaneous Localization and Mapping)**         |
|-------------------------|------------------------------------------------------------|-----------------------------------------------------------|----------------------------------------------------------|
| **Requisitos de hardware** | Alto. Requiere GPU potente con buena capacidad de VRAM.     | Medio-Alto. GPU recomendada, pero más ligero que NeRF.    | Bajo-Medio. Puede funcionar en CPU o GPU según variante. |
| **Tiempo de ejecución**   | Lento. Horas de entrenamiento + renderizado.               | Rápido. Reconstrucción y render en minutos o segundos.    | Tiempo real o casi tiempo real.                          |
| **Calidad del resultado** | Muy alta. Detalles fotorrealistas con buena iluminación.   | Alta. Calidad visual excelente con buen rendimiento.      | Media. Precisión geométrica buena, pero visual limitada. |
| **Tipo de entrada**       | Múltiples imágenes desde distintas vistas.                | Múltiples imágenes o video (multi-view).                  | Cámara en movimiento (RGB o RGB-D), datos secuenciales.  |

----------
## Reflexión Comparativa

### ¿Cuál técnica es más útil en escenarios móviles?

**SLAM** es claramente la más adecuada. Su capacidad para operar en tiempo real con hardware modesto lo ha convertido en el estándar para navegación robótica, realidad aumentada y exploración autónoma en dispositivos móviles.

### ¿Cuál sería ideal para videojuegos? ¿Y para visualización médica?

-   **Videojuegos**:  
    **Gaussian Splatting** es la mejor opción. Logra un excelente equilibrio entre calidad visual y rapidez de generación, ideal para juegos con contenido 3D dinámico o generado desde video real.
    
-   **Visualización médica**:  
    **NeRF** es preferible, ya que permite reconstrucciones precisas a partir de escaneos o imágenes médicas con alta fidelidad visual, aunque requiere tiempo y potencia de cómputo.
    

### ¿Qué retos técnicos encontraste?

-   **Compatibilidad de formatos**: Cada técnica necesita un tipo de entrada específica, y adaptarlas requiere procesamiento previo.
    
-   **Requerimientos computacionales**: NeRF y Gaussian Splatting dependen en gran medida de una buena GPU.
    
-   **Curva de aprendizaje**: Implementar y ajustar estas técnicas requiere conocimientos avanzados en visión por computador y gráficos.
    
-   **Visualización**: Obtener resultados navegables y exportables (por ejemplo, `.ply` o `.obj`) exige herramientas adicionales como CloudCompare, Blender o visores específicos.
    

----------

##  Conclusión general

**No existe una técnica universal que sea superior en todos los casos.** Cada una está diseñada para un **nicho de aplicación específico**, y su selección depende de los requisitos del proyecto, las limitaciones de hardware y los objetivos esperados.

Además, implementar cualquiera de estas soluciones no es trivial. **Se necesita experiencia técnica en áreas como reconstrucción 3D, optimización, manejo de cámaras y visualización**, así como familiaridad con librerías complejas (COLMAP, Instant-NGP, ROS, etc.). Incluso la etapa de visualización o exportación puede presentar obstáculos técnicos significativos.

Por lo tanto, más allá de sus capacidades, el éxito de estas técnicas **depende tanto del conocimiento del equipo como del contexto en que se apliquen.**
