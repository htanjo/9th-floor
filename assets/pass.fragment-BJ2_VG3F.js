import{b4 as t}from"./Screen-CGaI1_kx.js";import"./index-DY4PRcav.js";const e="passPixelShader",r=`varying vUV: vec2f;var textureSamplerSampler: sampler;var textureSampler: texture_2d<f32>;
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {fragmentOutputs.color=textureSample(textureSampler,textureSamplerSampler,input.vUV);}`;t.ShadersStoreWGSL[e]=r;const m={name:e,shader:r};export{m as passPixelShaderWGSL};
