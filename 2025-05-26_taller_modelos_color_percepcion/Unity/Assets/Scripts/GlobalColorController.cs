using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GlobalColorController : MonoBehaviour
{
    public ColorChanger[] colorChangers;
    
    public void ToggleAllColorChanges()
    {
        foreach (ColorChanger changer in colorChangers)
        {
            changer.ToggleColorChange();
        }
    }
    
    public void ApplyGlobalFilter(Color filterColor)
    {
        foreach (ColorChanger changer in colorChangers)
        {
            changer.ApplyColorFilter(filterColor);
        }
    }
    
    public void ResetAllColors()
    {
        foreach (ColorChanger changer in colorChangers)
        {
            changer.ResetColor();
        }
    }
}