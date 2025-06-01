using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObjectGenerator : MonoBehaviour
{
    // Listas/Arrays para almacenar parámetros
    public List<Vector3> positions = new List<Vector3>();
    public List<PrimitiveType> primitiveTypes = new List<PrimitiveType>();
    public List<Color> colors = new List<Color>();
    public List<float> scales = new List<float>();

     void Start()
    {
        // Llenar las listas con datos fijos
        positions.Add(new Vector3(0, 0, 0));    // Posición 1
        positions.Add(new Vector3(2, 1, 0));    // Posición 2
        positions.Add(new Vector3(-1, 0, 3));   // Posición 3

        primitiveTypes.Add(PrimitiveType.Sphere);    // Tipo 1
        primitiveTypes.Add(PrimitiveType.Cube);      // Tipo 2
        primitiveTypes.Add(PrimitiveType.Cylinder);  // Tipo 3

        colors.Add(Color.red);      // Color 1
        colors.Add(Color.green);   // Color 2
        colors.Add(Color.blue);     // Color 3

        scales.Add(1.0f);   // Escala 1
        scales.Add(0.5f);   // Escala 2
        scales.Add(2.0f);   // Escala 3

        GenerateObjects(); // Llama a la función que crea los objetos
    }

    void GenerateObjects()
    {
    // Asegurarse de que todas las listas tengan la misma longitud
    int objectCount = Mathf.Min(positions.Count, primitiveTypes.Count, colors.Count, scales.Count);

    for (int i = 0; i < objectCount; i++)
    {
        // Crear el objeto primitivo
        GameObject newObj = GameObject.CreatePrimitive(primitiveTypes[i]);
        
        // Asignar posición
        newObj.transform.position = positions[i];
        
        // Asignar escala (uniforme para simplificar)
        newObj.transform.localScale = Vector3.one * scales[i];
        
        // Asignar color (requiere material)
        Renderer renderer = newObj.GetComponent<Renderer>();
        if (renderer != null)
        {
            renderer.material = new Material(Shader.Find("Standard"));
            renderer.material.color = colors[i];
        }

        // Opcional: Nombre descriptivo en la jerarquía
        newObj.name = "Generated_" + primitiveTypes[i] + "_" + i;
    }
    }
}
