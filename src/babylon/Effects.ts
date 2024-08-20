import {
  Camera,
  Color4,
  ColorGradingTexture,
  DefaultRenderingPipeline,
  // GlowLayer,
  // LensRenderingPipeline,
  Scene,
} from '@babylonjs/core';
import colorGradingTextureUrl from '../assets/lut_64.3dl?url';

export default class Effects {
  public constructor(scene: Scene, cameras: Camera[]) {
    const canvas = scene.getEngine().getRenderingCanvas();
    const canvasWidth = canvas?.width || 1024;
    const canvasHeight = canvas?.height || 1024;
    const cameraFov = scene.activeCamera?.fov || 55;

    // Blur factor
    const verticalSize = canvasHeight / cameraFov;

    // Vignette factor
    const aspectRatio = canvasWidth / canvasHeight;
    let vignetteCameraFov: number;
    const minVignetteCameraFov = 0.55;
    const maxVignetteCameraFov = 0.75;
    const minAspectRatio = 9 / 16;
    const maxAspectRatio = 16 / 9;
    if (aspectRatio < minAspectRatio) {
      vignetteCameraFov = maxVignetteCameraFov;
    } else if (aspectRatio > maxAspectRatio) {
      vignetteCameraFov = minVignetteCameraFov;
    } else {
      const fovExtensionRatio =
        (maxAspectRatio - aspectRatio) / (maxAspectRatio - minAspectRatio);
      vignetteCameraFov =
        minVignetteCameraFov +
        (maxVignetteCameraFov - minVignetteCameraFov) * fovExtensionRatio;
    }

    // Add glow effects.
    // const glowLayer = new GlowLayer('glowLayer', scene, {
    //   mainTextureRatio: 0.4, // Large value reduces flickering, but hits performance. Default: 0.5
    //   // mainTextureFixedSize: 512, // Large value reduces flickering, but hits performance.
    //   blurKernelSize: verticalSize * 0.03, // Effect size. Large value may flickering.
    //   // alphaBlendingMode: Engine.ALPHA_MAXIMIZED,
    //   mainTextureSamples: 2,
    //   ldrMerge: true,
    // });
    // glowLayer.intensity = 0.6;

    // Add post processing effects.
    const pipeline = new DefaultRenderingPipeline(
      'renderPipeline',
      true,
      scene,
      cameras,
    );
    pipeline.samples = 4; // Enable MSAA.
    // pipeline.fxaaEnabled = true; // Enable FXAA.
    // pipeline.sharpenEnabled = true;
    pipeline.bloomEnabled = true;
    pipeline.bloomThreshold = 0.48;
    pipeline.bloomWeight = 0.35;
    pipeline.bloomKernel = verticalSize * 0.25; // Effect size. Large value may cause flickering.
    pipeline.bloomScale = 0.5; // Large value reduces flickering, but hits performance.

    pipeline.chromaticAberrationEnabled = true;
    pipeline.chromaticAberration.aberrationAmount = 20;
    pipeline.chromaticAberration.radialIntensity = 1;

    // pipeline.imageProcessing.contrast = 1.2;
    // pipeline.imageProcessing.exposure = 1.3;
    pipeline.imageProcessing.vignetteEnabled = true;
    pipeline.imageProcessing.vignetteWeight = 2.0;
    pipeline.imageProcessing.vignetteCameraFov = vignetteCameraFov;
    pipeline.imageProcessing.vignetteStretch = 0;
    pipeline.imageProcessing.vignetteColor = Color4.FromHexString('#003a70ff');
    pipeline.imageProcessing.colorGradingEnabled = true;
    const colorGradingTexture = new ColorGradingTexture(
      colorGradingTextureUrl,
      scene,
    );
    pipeline.imageProcessing.colorGradingTexture = colorGradingTexture;
    pipeline.imageProcessing.colorGradingTexture.level = 1.0;

    // scene.onNewCameraAddedObservable.add((camera) => {
    //   pipeline.addCamera(camera);
    // });

    // const lensEffect = new LensRenderingPipeline(
    //   'lensEffect',
    //   {
    //     edge_blur: 0.7,
    //     chromatic_aberration: 1.0,
    //     distortion: 0.5,
    //     // grain_amount: 1.0,
    //   },
    //   scene,
    //   1.0,
    //   cameras,
    // );

    // TODO: update effects when canvas resized.
  }
}
