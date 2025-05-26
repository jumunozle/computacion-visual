using UnityEngine;
using UnityEngine.UI;

public class ShaderSliderControl : MonoBehaviour
{
    public Material mat;
    public Slider slider;

    void Update()
    {
        // Obtenemos el color actual del material
        Color color = mat.GetColor("_Color");

        // Modificamos el canal rojo con el valor del slider
        color.r = slider.value;

        // Aplicamos el nuevo color al material
        mat.SetColor("_Color", color);
    }
}


