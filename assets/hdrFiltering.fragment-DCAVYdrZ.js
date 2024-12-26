import{S as i}from"./Screen-_h6w9z9R.js";import"./hdrFilteringFunctions-DRPlftpC.js";import"./index-BL1lcfNf.js";const r="hdrFilteringPixelShader",e=`#include<helperFunctions>
#include<importanceSampling>
#include<pbrBRDFFunctions>
#include<hdrFilteringFunctions>
uniform float alphaG;uniform samplerCube inputTexture;uniform vec2 vFilteringInfo;uniform float hdrScale;varying vec3 direction;void main() {vec3 color=radiance(alphaG,inputTexture,direction,vFilteringInfo);gl_FragColor=vec4(color*hdrScale,1.0);}`;i.ShadersStore[r]=e;const l={name:r,shader:e};export{l as hdrFilteringPixelShader};
