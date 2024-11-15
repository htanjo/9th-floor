import{S as r}from"./Screen-5YHTTtu8.js";import"./index-CuDbJH7e.js";const e="circleOfConfusionPixelShader",a=`varying vUV: vec2f;var depthSamplerSampler: sampler;var depthSampler: texture_2d<f32>;uniform cameraMinMaxZ: vec2f;uniform focusDistance: f32;uniform cocPrecalculation: f32;
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {var depth: f32=textureSample(depthSampler,depthSamplerSampler,input.vUV).r;
#define CUSTOM_COC_DEPTH
var pixelDistance: f32=(uniforms.cameraMinMaxZ.x+uniforms.cameraMinMaxZ.y*depth)*1000.0; 
#define CUSTOM_COC_PIXELDISTANCE
var coc: f32=abs(uniforms.cocPrecalculation*((uniforms.focusDistance-pixelDistance)/pixelDistance));coc=clamp(coc,0.0,1.0);fragmentOutputs.color= vec4f(coc,coc,coc,1.0);}
`;r.ShadersStoreWGSL[e]=a;const t={name:e,shader:a};export{t as circleOfConfusionPixelShaderWGSL};
