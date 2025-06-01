using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(MeshFilter))]
public class InvertSphereFaces : MonoBehaviour 
{
    void Start() 
    {
        InvertMeshFaces();
        ApplyPanoramaTexture();
    }

    void InvertMeshFaces()
    {
        Mesh mesh = GetComponent<MeshFilter>().mesh;
        
        // Invertir normales
        Vector3[] normals = mesh.normals;
        for (int i = 0; i < normals.Length; i++)
            normals[i] = -normals[i];
        mesh.normals = normals;

        // Invertir el orden de los triángulos
        for (int i = 0; i < mesh.subMeshCount; i++) 
        {
            int[] tris = mesh.GetTriangles(i);
            for (int j = 0; j < tris.Length; j += 3) 
            {
                // Intercambiar el orden de los vértices
                int temp = tris[j];
                tris[j] = tris[j + 1];
                tris[j + 1] = temp;
            }
            mesh.SetTriangles(tris, i);
        }
    }

    void ApplyPanoramaTexture()
    {
        Texture2D panorama = Resources.Load<Texture2D>("panorama");
        if (panorama != null)
        {
            GetComponent<Renderer>().material.mainTexture = panorama;
        }
        else
        {
            Debug.LogError("No se encontró la textura 'panorama' en Resources");
        }
    }
}
