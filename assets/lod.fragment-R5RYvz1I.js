import{S as r}from"./Screen-G5rVbCAQ.js";import"./index--b2h7R6a.js";const o="lodPixelShader",e=`#extension GL_EXT_shader_texture_lod : enable
precision highp float;const float GammaEncodePowerApprox=1.0/2.2;varying vec2 vUV;uniform sampler2D textureSampler;uniform float lod;uniform vec2 texSize;uniform bool gamma;void main(void)
{gl_FragColor=textureLod(textureSampler,vUV,lod);if (!gamma) {gl_FragColor.rgb=pow(gl_FragColor.rgb,vec3(GammaEncodePowerApprox));}}
`;r.ShadersStore[o]=e;const l={name:o,shader:e};export{l as lodPixelShader};
