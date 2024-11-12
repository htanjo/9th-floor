import{b4 as e}from"./Screen-74ErTxBJ.js";const n="sceneUboDeclaration",a=`struct Scene {viewProjection : mat4x4<f32>,
#ifdef MULTIVIEW
viewProjectionR : mat4x4<f32>,
#endif 
view : mat4x4<f32>,
projection : mat4x4<f32>,
vEyePosition : vec4<f32>,};var<uniform> scene : Scene;
`;e.IncludesShadersStoreWGSL[n]=a;const o="meshUboDeclaration",r=`struct Mesh {world : mat4x4<f32>,
visibility : f32,};var<uniform> mesh : Mesh;
#define WORLD_UBO
`;e.IncludesShadersStoreWGSL[o]=r;const t="mainUVVaryingDeclaration",i=`#ifdef MAINUV{X}
varying vMainUV{X}: vec2f;
#endif
`;e.IncludesShadersStoreWGSL[t]=i;
