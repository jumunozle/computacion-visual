using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Video;
using UnityEditor;

[RequireComponent(typeof(VideoPlayer))]
public class Video360Player : MonoBehaviour
{
    [Header("Video Settings")]
    public string videoFileName = "mi_video";
    public bool playOnAwake = true;
    public bool loop = true;

    [Header("Sphere Settings")]
    public GameObject sphere;
    public string materialTextureProperty = "_MainTex";

    private VideoPlayer videoPlayer;
    private Renderer sphereRenderer;

    void Awake()
    {
        // Configurar VideoPlayer
        videoPlayer = GetComponent<VideoPlayer>();
        if (videoPlayer == null)
        {
            videoPlayer = gameObject.AddComponent<VideoPlayer>();
        }

        // Buscar la esfera si no está asignada
        if (sphere == null)
        {
            sphere = GameObject.Find("Esfera360");
            if (sphere == null)
            {
                Debug.LogError("No se encontró la esfera 360°");
                return;
            }
        }

        sphereRenderer = sphere.GetComponent<Renderer>();
        if (sphereRenderer == null)
        {
            Debug.LogError("El objeto esfera no tiene componente Renderer");
            return;
        }

        // Crear material con doble cara
        Material newMat = new Material(Shader.Find("Unlit/Texture"));
        newMat.doubleSidedGI = true;
        sphereRenderer.material = newMat;

        // Invertir normales (opcional)
        InvertSphereNormals();
    }

    void InvertSphereNormals()
    {
        MeshFilter meshFilter = sphere.GetComponent<MeshFilter>();
        if (meshFilter == null) return;

        Mesh mesh = meshFilter.mesh;
        Vector3[] normals = mesh.normals;
        for (int i = 0; i < normals.Length; i++)
        {
            normals[i] = -normals[i];
        }
        mesh.normals = normals;

        int[] triangles = mesh.triangles;
        for (int i = 0; i < triangles.Length; i += 3)
        {
            int temp = triangles[i];
            triangles[i] = triangles[i + 2];
            triangles[i + 2] = temp;
        }
        mesh.triangles = triangles;
    }

    void Start()
    {
        ConfigureVideoPlayer();
        if (playOnAwake) PlayVideo();
    }

    void ConfigureVideoPlayer()
    {
        videoPlayer.playOnAwake = false;
        videoPlayer.isLooping = loop;
        videoPlayer.renderMode = VideoRenderMode.MaterialOverride;
        videoPlayer.targetMaterialRenderer = sphereRenderer;
        videoPlayer.targetMaterialProperty = materialTextureProperty;

        string videoPath = $"Assets/Videos/{videoFileName}.mp4";
        VideoClip videoClip = AssetDatabase.LoadAssetAtPath<VideoClip>(videoPath);

        if (videoClip != null)
        {
            videoPlayer.source = VideoSource.VideoClip;
            videoPlayer.clip = videoClip;
        }
        else
        {
            Debug.LogError($"No se encontró el video en: {videoPath}");
        }
    }

    public void PlayVideo() => videoPlayer?.Play();
    public void PauseVideo() => videoPlayer?.Pause();
    public void StopVideo() => videoPlayer?.Stop();
}