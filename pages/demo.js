import * as pc from "playcanvas";
import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  useEffect(() => {
    const canvas = document.getElementById("application");
    const app = new pc.Application(canvas, {
      mouse: new pc.Mouse(document.body),
      touch: new pc.TouchDevice(document.body),
      elementInput: new pc.ElementInput(canvas),
      gamepads: new pc.GamePads(),
      keyboard: new pc.Keyboard(window),
      graphicsDeviceOptions: {
        alpha: true
      }
    });

    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);

    window.addEventListener("resize", function () {
      app.resizeCanvas(canvas.width, canvas.height);
    });
    const url = "./demo1.glb";
    app.assets.loadFromUrl(url, "container", function (err, assets,) {
      app.start();
      const camera = new pc.Entity();
      camera.addComponent("camera", {
        clearColor: new pc.Color(0.8, 0.8, 0.8),
        farClip: 100,
        fov: 65,
        nearClip: 0.1,
      });
      camera.translate(0, 10, 15);
      camera.setLocalPosition(0, 1, 0);
      const characterController = new pc.Entity();

      app.root.addChild(characterController);
      characterController.addChild(camera);

      const light = new pc.Entity("light");
      light.addComponent("light");
      app.root.addChild(light);
      light.setEulerAngles(0, 0, 45);

      const screen = new pc.Entity();
      screen.addComponent("screen", {
        referenceResolution: new pc.Vec2(window.innerWidth, window.innerHeight),
        scaleBlend: 0.5,
        scaleMode: pc.SCALEMODE_BLEND,
        screenSpace: true,
      });
      app.root.addChild(screen);
      
      const leftbutton = new pc.Entity();
      leftbutton.addComponent("button", {
        imageEntity: leftbutton,
      });

      leftbutton.addComponent("element", {
        anchor: [0.3, 0.5, 0.3, 0.5],
        height: 40,
        pivot: [0.5, 0.5],
        type: pc.ELEMENTTYPE_IMAGE,
        width: 100,
        useInput: true,
      });
      screen.addChild(leftbutton);

      // Create a label for the leftbutton
      const leftlabel = new pc.Entity();
      leftlabel.addComponent("element", {
        anchor: [0.3, 0.5, 0.3, 0.5],

        color: new pc.Color(0, 0, 0),
        fontSize: 24,
        height: 40,
        pivot: [0.5, 0.5],
        text: "LEFT",
        type: pc.ELEMENTTYPE_TEXT,
        width: 90,
        wrapLines: true,
      });
      leftbutton.addChild(leftlabel);

      const rightbutton = new pc.Entity();
      rightbutton.addComponent("button", {
        imageEntity: rightbutton,
      });

      rightbutton.addComponent("element", {
        anchor: [0.7, 0.5, 0.7, 0.5],
        height: 40,
        pivot: [0.5, 0.5],
        type: pc.ELEMENTTYPE_IMAGE,
        width: 100,
        useInput: true,
      });
      screen.addChild(rightbutton);

      const rightlabel = new pc.Entity();
      rightlabel.addComponent("element", {
        anchor: [0.7, 0.5, 0.7, 0.5],
        color: new pc.Color(0, 0, 0),
        fontSize: 24,
        height: 40,
        pivot: [0.5, 0.5],
        text: " RIGHT ",
        type: pc.ELEMENTTYPE_TEXT,
        width: 90,
        wrapLines: true,
      });
      rightbutton.addChild(rightlabel);

      const entity = assets.resource.instantiateRenderEntity();
      entity.setLocalPosition(0, 0, 0);
      entity.setLocalScale(0.2, 0.2, 0.2);
      app.root.addChild(entity);

      let time = 0;
      app.on("update", function (showTime) {
        //相机环绕模型
        time += showTime;
        camera.setLocalPosition(1 * Math.sin(time), 1, 1 * Math.cos(time));
        camera.lookAt(pc.Vec3.ZERO);

      });
      const clickChanges = 5
      // 点击左边的按钮模型向左转
      leftbutton.button.on("click", function (e) {
        entity.rotate(0, 5 * clickChanges, 0);
      });
      // 点击右边的按钮模型向右转
      rightbutton.button.on("click", function (e) {
        entity.rotate(0, -5 * clickChanges, 0);
      });
    });
  });

  return (
    <div className={styles.container}>
      <canvas id="application"></canvas>
    </div>
  );
}

