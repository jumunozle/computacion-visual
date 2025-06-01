Shader "Custom/PositionTimeShader"
{
    Properties
    {
        _BaseColor ("Base Color", Color) = (1,1,1,1)
        _Speed ("Color Change Speed", Float) = 1.0
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 100

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            
            #include "UnityCG.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
            };

            struct v2f
            {
                float4 vertex : SV_POSITION;
                float3 worldPos : TEXCOORD0;
            };

            fixed4 _BaseColor;
            float _Speed;

            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.worldPos = mul(unity_ObjectToWorld, v.vertex).xyz;
                return o;
            }
            
            fixed4 frag (v2f i) : SV_Target
            {
                // Gradiente vertical basado en la posición Y
                float verticalGradient = saturate(i.worldPos.y * 0.5 + 0.5);
                
                // Componente que cambia con el tiempo
                float timeComponent = sin(_Time.y * _Speed) * 0.5 + 0.5;
                
                // Combinar ambos efectos
                fixed4 col = _BaseColor;
                col.rgb *= verticalGradient;
                col.r += timeComponent * 0.3;
                
                return col;
            }
            ENDCG
        }
    }
}
