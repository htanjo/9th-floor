import{b4 as t}from"./Screen-dDHFEw9_.js";import"./index-pN2cdnc_.js";const e="passPixelShader",r=`varying vUV: vec2f;var textureSamplerSampler: sampler;var textureSampler: texture_2d<f32>;
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {fragmentOutputs.color=textureSample(textureSampler,textureSamplerSampler,input.vUV);}`;t.ShadersStoreWGSL[e]=r;const m={name:e,shader:r};export{m as passPixelShaderWGSL};
