import{b4 as e}from"./Screen-B1bMUXM5.js";import"./kernelBlurVaryingDeclaration-nUeIw__F.js";import"./index-96QwY6w0.js";const t="kernelBlurVertex",o="sampleCoord{X}=sampleCenter+delta*KERNEL_OFFSET{X};";e.IncludesShadersStore[t]=o;const r="kernelBlurVertexShader",n=`attribute vec2 position;uniform vec2 delta;varying vec2 sampleCenter;
#include<kernelBlurVaryingDeclaration>[0..varyingCount]
const vec2 madd=vec2(0.5,0.5);
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
sampleCenter=(position*madd+madd);
#include<kernelBlurVertex>[0..varyingCount]
gl_Position=vec4(position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;e.ShadersStore[r]=n;const l={name:r,shader:n};export{l as kernelBlurVertexShader};
