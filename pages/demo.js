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

    const assets = {
      script: new pc.Asset("script", "script", {
          url: "/static/scripts/camera/orbit-camera.js",
      }),
  };

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
        clearColor: new pc.Color(0.4, 0.45, 0.5),

      });

      camera.addComponent("script");
      camera.script.create("orbitCamera", {
        attributes: {
          inertiaFactor: 0.2, // Override default of 0 (no inertia)
        },
      });

      camera.script.create("orbitCameraInputMouse");
      camera.script.create("orbitCameraInputTouch");
      camera.translate(0, 0.4, 2);
      app.root.addChild(camera);


      const light = new pc.Entity();
      light.addComponent("light", {
        type: "omni",
        color: new pc.Color(1, 1, 1),
        range: 100,
      });

      light.translate(5, 5, 10);
      app.root.addChild(light);

      const entity = assets.resource.instantiateRenderEntity();
      entity.setLocalPosition(0, 0, 0);
      entity.setLocalScale(0.2, 0.2, 0.2);
      app.root.addChild(entity);

      const mouse = new pc.Mouse(document.body);

      let x = 0;
      const y = 0;

      mouse.on("mousemove", function (event) {
        if (event.buttons[pc.MOUSEBUTTON_LEFT]) {
          x += event.dx;
          entity.setLocalEulerAngles(0.2 * y, 0.2 * x, 0);
        }
      });



      mouse.on("mousewheel", function (event) {
        if (event.wheelDelta == 1) {
          console.log('1111111111111111');
        }

        if (event.wheelDelta == -1) {
          console.log('222222222222222');
          // camera.translate(0, 0.4, 2);

        }
      })


      // const leftbutton = new pc.Entity();
      // leftbutton.addComponent("button", {
      //   imageEntity: leftbutton,
      // });

      // leftbutton.addComponent("element", {
      //   anchor: [0.3, 0.5, 0.3, 0.5],
      //   height: 40,
      //   pivot: [0.5, 0.5],
      //   type: pc.ELEMENTTYPE_IMAGE,
      //   width: 100,
      //   useInput: true,
      // });
      // screen.addChild(leftbutton);

      // Create a label for the leftbutton
      // const leftlabel = new pc.Entity();
      // leftlabel.addComponent("element", {
      //   anchor: [0.3, 0.5, 0.3, 0.5],

      //   color: new pc.Color(0, 0, 0),
      //   fontSize: 24,
      //   height: 40,
      //   pivot: [0.5, 0.5],
      //   text: "LEFT",
      //   type: pc.ELEMENTTYPE_TEXT,
      //   width: 90,
      //   wrapLines: true,
      // });
      // leftbutton.addChild(leftlabel);

      // const rightbutton = new pc.Entity();
      // rightbutton.addComponent("button", {
      //   imageEntity: rightbutton,
      // });

      // rightbutton.addComponent("element", {
      //   anchor: [0.7, 0.5, 0.7, 0.5],
      //   height: 40,
      //   pivot: [0.5, 0.5],
      //   type: pc.ELEMENTTYPE_IMAGE,
      //   width: 100,
      //   useInput: true,
      // });
      // screen.addChild(rightbutton);

      // const rightlabel = new pc.Entity();
      // rightlabel.addComponent("element", {
      //   anchor: [0.7, 0.5, 0.7, 0.5],
      //   color: new pc.Color(0, 0, 0),
      //   fontSize: 24,
      //   height: 40,
      //   pivot: [0.5, 0.5],
      //   text: " RIGHT ",
      //   type: pc.ELEMENTTYPE_TEXT,
      //   width: 90,
      //   wrapLines: true,
      // });
      // rightbutton.addChild(rightlabel);


      // let time = 0;
      // app.on("update", function (showTime) {
      //   // 相机环绕模型
      //   // time += showTime;
      //   camera.setLocalPosition(1 * Math.sin(time), 1, 1 * Math.cos(time));
      //   camera.lookAt(pc.Vec3.ZERO);

      // });
      // const clickChanges = 5
      // 点击左边的按钮模型向左转
      // leftbutton.button.on("click", function (e) {
      //   entity.rotate(0, 5 * clickChanges, 0);
      // });
      // 点击右边的按钮模型向右转
      // rightbutton.button.on("click", function (e) {
      //   entity.rotate(0, -5 * clickChanges, 0);
      // });
    });
  });

  return (
    <div className={styles.container}>
      <canvas id="application"></canvas>
    </div>
  );
}

