loader.load(
    'https://models.babylonjs.com/CornellBox/glTF/CornellBox.glb',
    function (gltf) {
      scene.add(gltf.scene);
      gltf.scene.scale.set(1, 1, 1);
      gltf.scene.position.set(0, -1, 0);
    },
    undefined,
    function (error) {
      console.error('An error occurred while loading the model:', error);
    }
  );
  