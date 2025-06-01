using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PanoramaLoader : MonoBehaviour
{
    void Start()
    {
        // Cargar la textura desde Resources
        Texture2D panoramaTexture = Resources.Load("panorama") as Texture2D;
        
        if (panoramaTexture != null)
        {
            // Obtener el renderer y asignar la textura
            Renderer renderer = GetComponent<Renderer>();
            renderer.material.mainTexture = panoramaTexture;
        }
        else
        {
            Debug.LogError("No se encontró la textura 'panorama' en la carpeta Resources");
        }
    }
}