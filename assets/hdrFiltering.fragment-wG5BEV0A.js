import{b4 as i}from"./Screen-WD6sCfJC.js";import"./hdrFilteringFunctions-FIDLSN7v.js";import"./index-BI95D3_M.js";const r="hdrFilteringPixelShader",e=`#include<helperFunctions>
#include<importanceSampling>
#include<pbrBRDFFunctions>
#include<hdrFilteringFunctions>
uniform float alphaG;uniform samplerCube inputTexture;uniform vec2 vFilteringInfo;uniform float hdrScale;varying vec3 direction;void main() {vec3 color=radiance(alphaG,inputTexture,direction,vFilteringInfo);gl_FragColor=vec4(color*hdrScale,1.0);}`;i.ShadersStore[r]=e;const l={name:r,shader:e};export{l as hdrFilteringPixelShader};
