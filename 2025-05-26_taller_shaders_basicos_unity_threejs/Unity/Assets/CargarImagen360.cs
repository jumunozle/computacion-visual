using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CargarImagen360 : MonoBehaviour
{
    void Start()
    {
        // Obtiene el Renderer de la esfera y carga la textura
        Renderer renderer = GetComponent<Renderer>();
        renderer.material.mainTexture = Resources.Load("panorama") as Texture2D;
    }
}