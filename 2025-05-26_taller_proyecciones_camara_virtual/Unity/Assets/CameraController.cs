using UnityEngine;
using UnityEngine.UI;

public class CameraController : MonoBehaviour
{
    public Camera mainCamera;
    public Slider orthoSizeSlider;
    public Button toggleButton;

    private bool isOrthographic = false;

    void Start()
    {
        // Configura el listener del botón y el slider
        toggleButton.onClick.AddListener(ToggleProjection);
        orthoSizeSlider.onValueChanged.AddListener(ChangeOrthoSize);

        // Inicializa la cámara
        UpdateCamera();
    }

    void ToggleProjection()
    {
        isOrthographic = !isOrthographic;
        UpdateCamera();
    }

    void ChangeOrthoSize(float size)
    {
        if (isOrthographic)
        {
            mainCamera.orthographicSize = size;
        }
    }

    void UpdateCamera()
    {
        mainCamera.orthographic = isOrthographic;
        orthoSizeSlider.gameObject.SetActive(isOrthographic);

        if (isOrthographic)
        {
            toggleButton.GetComponentInChildren<Text>().text = "Cambiar a Perspectiva";
            mainCamera.orthographicSize = orthoSizeSlider.value;
        }
        else
        {
            toggleButton.GetComponentInChildren<Text>().text = "Cambiar a Ortográfica";
        }
    }
}