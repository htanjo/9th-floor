import{S as r}from"./Screen-_h6w9z9R.js";import"./index-BL1lcfNf.js";const e="hdrFilteringVertexShader",i=`attribute vec2 position;varying vec3 direction;uniform vec3 up;uniform vec3 right;uniform vec3 front;
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
mat3 view=mat3(up,right,front);direction=view*vec3(position,1.0);gl_Position=vec4(position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;r.ShadersStore[e]=i;const n={name:e,shader:i};export{n as hdrFilteringVertexShader};
