import{b4 as a}from"./Screen-BpGyf4Ni.js";import"./index-De31I0N0.js";const e="circleOfConfusionPixelShader",c=`uniform sampler2D depthSampler;varying vec2 vUV;uniform vec2 cameraMinMaxZ;uniform float focusDistance;uniform float cocPrecalculation;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{float depth=texture2D(depthSampler,vUV).r;
#define CUSTOM_COC_DEPTH
float pixelDistance=(cameraMinMaxZ.x+cameraMinMaxZ.y*depth)*1000.0; 
#define CUSTOM_COC_PIXELDISTANCE
float coc=abs(cocPrecalculation*((focusDistance-pixelDistance)/pixelDistance));coc=clamp(coc,0.0,1.0);gl_FragColor=vec4(coc,coc,coc,1.0);}
`;a.ShadersStore[e]=c;const r={name:e,shader:c};export{r as circleOfConfusionPixelShader};
