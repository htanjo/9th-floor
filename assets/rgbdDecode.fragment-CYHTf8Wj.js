import{b4 as o}from"./Screen-B1bMUXM5.js";import"./index-96QwY6w0.js";const e="rgbdDecodePixelShader",r=`varying vec2 vUV;uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=vec4(fromRGBD(texture2D(textureSampler,vUV)),1.0);}`;o.ShadersStore[e]=r;const d={name:e,shader:r};export{d as rgbdDecodePixelShader};
