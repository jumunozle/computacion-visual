using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(MeshFilter))]
public class ModelInfoDisplay : MonoBehaviour
{
    public bool showWireframe = true;
    public Color wireframeColor = Color.cyan;

    private MeshFilter meshFilter;
    private Mesh mesh;

    void Start()
    {
        meshFilter = GetComponent<MeshFilter>();
        if (meshFilter != null)
        {
            mesh = meshFilter.mesh;
            PrintMeshInfo();
        }
        else
        {
            Debug.LogError("No MeshFilter component found on this object");
        }
    }

    void PrintMeshInfo()
    {
        if (mesh == null) return;

        Debug.Log("Mesh Information:");
        Debug.Log($"Number of vertices: {mesh.vertexCount}");
        Debug.Log($"Number of triangles: {mesh.triangles.Length / 3}");
        Debug.Log($"Number of submeshes: {mesh.subMeshCount}");
    }

    void OnDrawGizmos()
    {
        if (!showWireframe || mesh == null) return;

        Gizmos.color = wireframeColor;
        Gizmos.matrix = transform.localToWorldMatrix;

        // Draw wireframe
        for (int i = 0; i < mesh.triangles.Length; i += 3)
        {
            Vector3 v1 = mesh.vertices[mesh.triangles[i]];
            Vector3 v2 = mesh.vertices[mesh.triangles[i + 1]];
            Vector3 v3 = mesh.vertices[mesh.triangles[i + 2]];

            Gizmos.DrawLine(v1, v2);
            Gizmos.DrawLine(v2, v3);
            Gizmos.DrawLine(v3, v1);
        }
    }
}
