import{S as t}from"./Screen-5YHTTtu8.js";import"./index-CuDbJH7e.js";const e="postprocessVertexShader",o=`attribute vec2 position;uniform vec2 scale;varying vec2 vUV;const vec2 madd=vec2(0.5,0.5);
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
vUV=(position*madd+madd)*scale;gl_Position=vec4(position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;t.ShadersStore[e]=o;const r={name:e,shader:o};export{r as postprocessVertexShader};
