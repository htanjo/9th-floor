import{b4 as a}from"./Screen-dDHFEw9_.js";import"./index-pN2cdnc_.js";const e="passPixelShader",r=`varying vec2 vUV;uniform sampler2D textureSampler;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=texture2D(textureSampler,vUV);}`;a.ShadersStore[e]=r;const s={name:e,shader:r};export{s as passPixelShader};