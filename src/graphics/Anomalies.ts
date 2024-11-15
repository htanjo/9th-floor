import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { Animatable } from '@babylonjs/core/Animations/animatable';
import { Animation } from '@babylonjs/core/Animations/animation';
import { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { CubeTexture } from '@babylonjs/core/Materials/Textures/cubeTexture';
import { EasingFunction, SineEase } from '@babylonjs/core/Animations/easing';
import { Engine } from '@babylonjs/core/Engines/engine';
import { PBRMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { toRadians } from '../settings/general';
import { getBaseName } from '../settings/areas';

export default class Anomalies {
  private scene: Scene;

  private cleanupFunction: (() => void) | null = null;

  public constructor(scene: Scene) {
    this.scene = scene;
  }

  public applyAnomaly(name: string | null) {
    this.cleanupAnomaly();
    if (name !== null) {
      this.causeAnomaly(name);
    }
  }

  private cleanupAnomaly() {
    if (this.cleanupFunction) {
      this.cleanupFunction();
    }
  }

  private causeAnomaly(name: string) {
    switch (name) {
      case 'overall_red':
        this.causeAnomalyOverallRed();
        break;
      case 'phonograph_oval':
        this.causeAnomalyPhonographOval();
        break;
      case 'sword_stand':
        this.causeAnomalyAppear(['sword_anomaly'], ['sword_upper']);
        break;
      case 'cat_ghost':
        this.causeAnomalyCatGhost();
        break;
      case 'window_move':
        this.causeAnomalyWindowMove();
        break;
      case 'picture_eyes':
        this.causeAnomalyAppear(['picture_canvas_anomaly']);
        break;
      case 'floor_none':
        this.causeAnomalyAppear(
          ['floor_none_anomaly'],
          ['floor_center_lower', 'floor_medallion_lower', 'decal_floor_lower'],
        );
        break;
      case 'chair_outside':
        this.causeAnomalyAppear([
          'chair_outside_anomaly',
          'chair_outside_shadow_anomaly',
        ]);
        break;
      // no default
    }
  }

  private causeAnomalyAppear(
    anomalyMeshNames: string[],
    flipMeshNames?: string[],
  ) {
    const { scene } = this;
    const anomalyMeshes = scene.meshes.filter((mesh) =>
      anomalyMeshNames.includes(getBaseName(mesh.name)),
    );
    const flipMeshes = flipMeshNames
      ? scene.meshes.filter((mesh) =>
          flipMeshNames.includes(getBaseName(mesh.name)),
        )
      : [];
    /* eslint-disable no-param-reassign */
    anomalyMeshes.forEach((mesh) => {
      mesh.isVisible = true;
    });
    flipMeshes.forEach((mesh) => {
      mesh.isVisible = false;
    });
    this.cleanupFunction = () => {
      anomalyMeshes.forEach((mesh) => {
        mesh.isVisible = false;
      });
      flipMeshes.forEach((mesh) => {
        mesh.isVisible = true;
      });
    };
    /* eslint-enable no-param-reassign */
  }

  private causeAnomalyOverallRed() {
    const { scene } = this;
    const originalAmbientColors: { [key: string]: Color3 } = {};
    const originalAlbedoColors: { [key: string]: Color3 } = {};
    const originalAlbedoTextures: { [key: string]: BaseTexture } = {};
    const originalLightDiffuse: { [key: string]: Color3 } = {};
    /* eslint-disable no-param-reassign */
    scene.materials.forEach((material) => {
      if (
        material instanceof PBRMaterial &&
        !material.name.endsWith('_hallway')
      ) {
        originalAmbientColors[material.id] = material.ambientColor;
        if (
          [
            'signboard',
            'cat',
            'door',
            'pillar',
            'ceiling_edge',
            'window_frame',
          ].includes(material.name)
        ) {
          material.ambientColor = Color3.FromHexString('#ff7777');
        } else {
          material.ambientColor = Color3.FromHexString('#ff3333');
        }
        if (material.name.startsWith('mirror_surface')) {
          originalAlbedoColors[material.id] = material.albedoColor;
          material.albedoColor = Color3.FromHexString('#ff7766');
        }
        if (
          material.name.startsWith('lamp_shade') &&
          material.name !== 'lamp_shade_off' &&
          material.albedoTexture
        ) {
          originalAlbedoColors[material.id] = material.albedoColor;
          originalAlbedoTextures[material.id] = material.albedoTexture;
          material.albedoColor = Color3.FromHexString('cc30000');
          material.albedoTexture = null;
        }
      }
    });
    scene.lights.forEach((light) => {
      if (!light.name.startsWith('hallway_')) {
        originalLightDiffuse[light.id] = light.diffuse;
        light.diffuse = Color3.FromHexString('#ffcccc');
      }
    });
    this.cleanupFunction = () => {
      scene.materials.forEach((material) => {
        if (
          material instanceof PBRMaterial &&
          !material.name.endsWith('_hallway')
        ) {
          material.ambientColor = originalAmbientColors[material.id];
          if (material.name.startsWith('mirror_surface')) {
            material.albedoColor = originalAlbedoColors[material.id];
          }
          if (
            material.name.startsWith('lamp_shade') &&
            material.name !== 'lamp_shade_off' &&
            material.albedoTexture
          ) {
            material.albedoColor = originalAlbedoColors[material.id];
            material.albedoTexture = originalAlbedoTextures[material.id];
          }
        }
      });
      scene.lights.forEach((light) => {
        if (!light.name.startsWith('hallway_')) {
          light.diffuse = originalLightDiffuse[light.id];
        }
      });
    };
    /* eslint-enable no-param-reassign */
  }

  private causeAnomalyPhonographOval() {
    const { scene } = this;
    const phonographDiskMeshes = scene.meshes.filter(
      (mesh) => getBaseName(mesh.name) === 'phonograph_disk_upper',
    );
    /* eslint-disable no-param-reassign */
    phonographDiskMeshes.forEach((mesh) => {
      mesh.scaling = new Vector3(1, 1, 2);
    });
    this.cleanupFunction = () => {
      phonographDiskMeshes.forEach((mesh) => {
        mesh.scaling = new Vector3(1, 1, 1);
      });
    };
    /* eslint-enable no-param-reassign */
  }

  private causeAnomalyCatGhost() {
    const { scene } = this;
    const catMeshes = scene.meshes.filter((mesh) =>
      ['cat_stairs'].includes(getBaseName(mesh.name)),
    );
    const catGhostMeshes = catMeshes.reduce((meshes, mesh) => {
      // Create two transparent clones to increase visibility.
      const clone1 = mesh.clone(
        `${mesh.name}_ghost_1`,
        mesh.parent,
      ) as AbstractMesh;
      const clone2 = mesh.clone(
        `${mesh.name}_ghost_2`,
        mesh.parent,
      ) as AbstractMesh;
      meshes.push(clone1, clone2);
      return meshes;
    }, [] as AbstractMesh[]);
    const animations: { [key: string]: Animatable } = {};
    // Create position and alpha animation.
    const easingFunction = new SineEase();
    easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    const catGhostPositionAnimation = new Animation(
      'cat_ghost_position_animation',
      'position.y',
      60,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE,
    );
    catGhostPositionAnimation.setKeys([
      { frame: 0, value: 0 },
      { frame: 120, value: 0.18 },
      { frame: 160, value: 0.08 },
      { frame: 200, value: 0.22 },
      { frame: 260, value: 0.18 },
      { frame: 280, value: 0.3 },
      { frame: 300, value: 0 },
      { frame: 360, value: 0 },
    ]);
    catGhostPositionAnimation.setEasingFunction(easingFunction);
    const catGhostAlphaAnimation = new Animation(
      'cat_ghost_alpha_animation',
      'material.alpha',
      60,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE,
    );
    catGhostAlphaAnimation.setKeys([
      { frame: 0, value: 0.1 },
      { frame: 120, value: 1.0 },
      { frame: 160, value: 0.1 },
      { frame: 200, value: 1.0 },
      { frame: 260, value: 0.1 },
      { frame: 280, value: 1.0 },
      { frame: 300, value: 0.1 },
      { frame: 360, value: 0.1 },
    ]);
    catGhostAlphaAnimation.setEasingFunction(easingFunction);
    catGhostMeshes.forEach((mesh) => {
      /* eslint-disable no-param-reassign */
      mesh.visibility = 0.9999;
      if (mesh.material instanceof PBRMaterial) {
        mesh.material.alphaMode = Engine.ALPHA_ADD;
        mesh.material.alpha = 1.0;
      }
      /* eslint-enable no-param-reassign */
      animations[mesh.id] = scene.beginDirectAnimation(
        mesh,
        [catGhostPositionAnimation, catGhostAlphaAnimation],
        0,
        360,
        true,
        1,
      );
    });
    this.cleanupFunction = () => {
      catGhostMeshes.forEach((mesh) => {
        animations[mesh.id].stop();
        mesh.dispose();
      });
    };
  }

  private causeAnomalyWindowMove() {
    const { scene } = this;
    const windowGlassMaterials = scene.materials.filter(
      (material) => material.name === 'window_glass',
    );
    const animations: { [key: string]: Animatable } = {};
    const windowMoveAnimation = new Animation(
      'window_move_animation',
      'refractionTexture.rotationY',
      60,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE,
    );
    windowMoveAnimation.setKeys([
      { frame: 0, value: 0 },
      { frame: 1200, value: toRadians(360) },
    ]);
    windowGlassMaterials.forEach((material) => {
      if (material instanceof PBRMaterial) {
        const { refractionTexture } = material;
        if (refractionTexture instanceof CubeTexture) {
          animations[material.id] = scene.beginDirectAnimation(
            material,
            [windowMoveAnimation],
            0,
            1200,
            true,
            1,
          );
        }
      }
    });
    this.cleanupFunction = () => {
      windowGlassMaterials.forEach((material) => {
        animations[material.id].stop();
        if (material instanceof PBRMaterial) {
          const { refractionTexture } = material;
          if (refractionTexture instanceof CubeTexture) {
            refractionTexture.rotationY = 0;
          }
        }
      });
    };
  }
}
