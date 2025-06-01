using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PrimitiveGenerator : MonoBehaviour
{
    void Start()
    {
        GenerateCubesGrid();    // Genera una fila de cubos
        GenerateSpiralCylinders(); // Genera una espiral de cilindros
        CreateCustomMesh();     // Crea una malla personalizada
    }

    void GenerateCubesGrid()
    {
        int rows = 5; // Número de filas
        int cols = 5; // Número de columnas
        float spacing = 2f; // Espacio entre cubos

        for (int x = 0; x < rows; x++)
        {
            for (int z = 0; z < cols; z++)
            {
                // Crea un cubo
                GameObject cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
                cube.transform.parent = transform; // Lo hace hijo del objeto vacío
                cube.transform.position = new Vector3(x * spacing, 0, z * spacing);
                cube.transform.localScale = new Vector3(1, Random.Range(1f, 3f), 1); // Escala aleatoria en Y
            }
        }
    }

    void GenerateSpiralCylinders()
    {
        int cylinderCount = 20; // Número de cilindros
        float radius = 5f; // Radio de la espiral
        float heightStep = 0.5f; // Altura por cilindro

        for (int i = 0; i < cylinderCount; i++)
        {
            // Ángulo en radianes (avanza en cada iteración)
            float angle = i * Mathf.PI * 0.5f; 
            
            // Posición en espiral (X y Z calculadas con seno/coseno)
            float x = Mathf.Cos(angle) * radius;
            float z = Mathf.Sin(angle) * radius;
            float y = i * heightStep; // Aumenta la altura en cada paso

            // Crea el cilindro
            GameObject cylinder = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
            cylinder.transform.parent = transform;
            cylinder.transform.position = new Vector3(x, y, z);
            cylinder.transform.rotation = Quaternion.Euler(0, angle * Mathf.Rad2Deg, 0); // Rota según la espiral
        }
    }

    void CreateCustomMesh()
    {
        // Crea un objeto vacío y añade componentes
        GameObject customMeshObj = new GameObject("CustomMesh");
        customMeshObj.AddComponent<MeshFilter>();
        customMeshObj.AddComponent<MeshRenderer>();

        // Define los vértices (3 para un triángulo)
        Vector3[] vertices = new Vector3[]
        {
            new Vector3(0, 0, 0),    // Vértice 0
            new Vector3(0, 1, 0),    // Vértice 1
            new Vector3(1, 0, 0)     // Vértice 2
        };

        // Define los triángulos (índices de vértices)
        int[] triangles = new int[] { 0, 1, 2 };

        // Crea la malla
        Mesh mesh = new Mesh();
        mesh.vertices = vertices;
        mesh.triangles = triangles;
        mesh.RecalculateNormals(); // Calcula normales para iluminación

        // Asigna la malla al objeto
        customMeshObj.GetComponent<MeshFilter>().mesh = mesh;

        // Añade un material básico
        customMeshObj.GetComponent<MeshRenderer>().material = 
            new Material(Shader.Find("Standard"));
    }
}