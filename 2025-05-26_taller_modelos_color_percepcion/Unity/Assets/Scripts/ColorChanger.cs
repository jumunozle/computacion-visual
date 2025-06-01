using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ColorChanger : MonoBehaviour
{
    public Material objectMaterial;
    public float colorChangeSpeed = 0.5f;
    
    private Color originalColor;
    private bool isChanging = false;
    private float hueValue = 0f;

    void Start()
    {
        // Guardar el color original
        originalColor = objectMaterial.color;
    }

    void Update()
    {
        if (isChanging)
        {
            // Cambiar el color gradualmente usando HSV
            hueValue += colorChangeSpeed * Time.deltaTime;
            if (hueValue > 1f) hueValue = 0f;
            
            objectMaterial.color = Color.HSVToRGB(hueValue, 1f, 1f);
        }
    }

    // Método para alternar el cambio de color
    public void ToggleColorChange()
    {
        isChanging = !isChanging;
        
        if (!isChanging)
        {
            // Restaurar color original al detenerse
            objectMaterial.color = originalColor;
        }
    }

    // Método para aplicar un filtro de color
    public void ApplyColorFilter(Color filterColor, float intensity = 0.5f)
    {
        // Mezclar el color actual con el filtro
        objectMaterial.color = Color.Lerp(objectMaterial.color, filterColor, intensity);
    }

    // Método para resetear al color original
    public void ResetColor()
    {
        objectMaterial.color = originalColor;
        isChanging = false;
    }
}