import{b4 as o}from"./Screen-BpGyf4Ni.js";import"./index-De31I0N0.js";const e="rgbdDecodePixelShader",r=`varying vec2 vUV;uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=vec4(fromRGBD(texture2D(textureSampler,vUV)),1.0);}`;o.ShadersStore[e]=r;const d={name:e,shader:r};export{d as rgbdDecodePixelShader};
