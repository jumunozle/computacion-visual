using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI; 

public class TransformController : MonoBehaviour
{
    public Transform parentObject; // Asignar el objeto Padre en el Inspector
    public Slider positionSlider;
    public Slider rotationSlider;
    public Slider scaleSlider;
    public Text positionText;
    public Text rotationText;
    public Text scaleText;
    
    public float positionRange = 5f;
    public float rotationRange = 360f;
    public float scaleRangeMin = 0.5f;
    public float scaleRangeMax = 2f;
    
    private bool isAnimating = false;
    private float animationTime = 0f;
    
    private void Start()
    {
        // Configurar sliders
        positionSlider.minValue = -positionRange;
        positionSlider.maxValue = positionRange;
        rotationSlider.minValue = -rotationRange;
        rotationSlider.maxValue = rotationRange;
        scaleSlider.minValue = scaleRangeMin;
        scaleSlider.maxValue = scaleRangeMax;
        
        // Establecer valores iniciales
        positionSlider.value = parentObject.localPosition.x;
        rotationSlider.value = parentObject.localEulerAngles.y;
        scaleSlider.value = parentObject.localScale.z;
    }
    
    private void Update()
    {
        if (isAnimating)
        {
            animationTime += Time.deltaTime;
            positionSlider.value = Mathf.Sin(animationTime) * positionRange;
            rotationSlider.value = animationTime * 30f % rotationRange;
            scaleSlider.value = (Mathf.Sin(animationTime * 0.5f) * 0.5f) + 1.5f;
        }
        
        // Aplicar transformaciones
        parentObject.localPosition = new Vector3(positionSlider.value, parentObject.localPosition.y, parentObject.localPosition.z);
        parentObject.localEulerAngles = new Vector3(parentObject.localEulerAngles.x, rotationSlider.value, parentObject.localEulerAngles.z);
        parentObject.localScale = new Vector3(parentObject.localScale.x, parentObject.localScale.y, scaleSlider.value);
        
        // Actualizar textos
        positionText.text = $"Pos X: {parentObject.localPosition.x:F2}";
        rotationText.text = $"Rot Y: {parentObject.localEulerAngles.y:F2}";
        scaleText.text = $"Esc Z: {parentObject.localScale.z:F2}";
        
        // Mostrar valores de los hijos en consola (opcional)
        Debug.Log($"Padre: {parentObject.localPosition}, Hijo: {parentObject.GetChild(0).localPosition}, Nieto: {parentObject.GetChild(0).GetChild(0).localPosition}");
    }
    
    public void ToggleAnimation()
    {
        isAnimating = !isAnimating;
    }
    
    public void ResetAnimation()
    {
        animationTime = 0f;
        positionSlider.value = 0;
        rotationSlider.value = 0;
        scaleSlider.value = 1;
    }
}
