import Utils from "@holywater-tech/ads-builder/framework/Utils";
import CoinBox from "./CoinBox2";
import Spin from "./Spin";
import {
  POSITIONS,
  POSITIONS_SPIN1,
  POSITIONS_SPIN2,
  POSITIONS_SPIN3,
  SCALES,
  SPIN_ITEMS,
} from "./constants/Constants";
import GeometryMask from "@holywater-tech/ads-builder/framework/components/GeometryMask";

export default class Machine extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);
    this.tweens = scene.tweens;
    this.addProperties(["pos", "scale"])
      .setCustomPosition(POSITIONS.board[0], 1700, POSITIONS.board[2], 1700)
      .setCustomScale(...SCALES.board)
      .setCustomAlign("Bottom")
      .setDepth(25)
      .setAlpha(1);
    this.isPortrait = this.scene.game.size.isPortrait;
    this.stopSpins = false;
    this.addMachine();
    this.addSpinner();
    this.addHide();

    this.initListeners();
    this.addSpin({
      name: "left",
      x: -125,
      y: 60,
      maskX: 0,
      maskY: 600,
    });
    this.addSpin({ name: "center", x: 0, y: 60 });
    this.addSpin({ name: "right", x: 125, y: 60 });
    // this.scene.scale.on("resize", this.onResize, this);
  }
  initListeners() {
    this.scene.emitter.on("spin", () => this.spin(), this);
    this.scene.emitter.on("bonus", () => this.moveSpinner(), this);
  }

  // onResize() {
  //   this.isPortrait = this.scene.game.size.isPortrait;
  //   const localPoint = this.getLocalPoint(250, this.isPortrait ? 0 : 0);
  //   console.log("localPoint", localPoint);
  //   this.maskShapeleft.clear();
  //   this.maskShapecenter.clear();
  //   this.maskShaperight.clear();
  //   this.maskShapeleft.fillRect(
  //     -localPoint.x, // X позиція прямокутника
  //     -localPoint.y / 2, // Y позиція прямокутника
  //     600, // Ширина маски
  //     this.isPortrait ? 2500 : 1500 // Нова висота маски
  //   );
  //   this.maskShapecenter.fillRect(
  //     -localPoint.x, // X позиція прямокутника
  //     -localPoint.y, // Y позиція прямокутника
  //     600, // Ширина маски
  //     this.isPortrait ? 250 : 150 // Нова висота маски
  //   );
  //   this.maskShaperight.fillRect(
  //     -localPoint.x, // X позиція прямокутника
  //     -localPoint.y, // Y позиція прямокутника
  //     600, // Ширина маски
  //     this.isPortrait ? 250 : 150 // Нова висота маски
  //   );
  //   const mask1 = this.maskShapeleft.createGeometryMask();
  //   const mask2 = this.maskShapecenter.createGeometryMask();
  //   const mask3 = this.maskShaperight.createGeometryMask();

  //   this.left.setMask(mask1);
  //   this.center.setMask(mask2);
  //   this.right.setMask(mask3);

  //   this.maskShapeleft.setVisible(false);
  //   this.maskShapecenter.setVisible(false);
  //   this.maskShaperight.setVisible(false);
  // }

  spin() {
    this.removeHide();
    this.start();
  }
  addInteractive() {
    this.handle.setInteractive().once("pointerdown", this.onHandleClick, this);
  }

  addSpin(options) {
    this[options.name] = new Spin(this.scene)
      .setPosition(options.x, options.y)
      .setScale(0.7)
      .setDepth(5);

    this.add([this[options.name]]);
    this._sort();
  }

  addMachine() {
    this.machine = this.scene.add
      .image(0, 0, "slot_box")
      .setScale(0.74)
      .setDepth(10);
    this.bg2 = this.scene.add.image(0, 305, "img1").setScale(2, 2).setDepth(10);
    this.bg3 = this.scene.add.image(0, -158, "img1").setScale(0.6).setDepth(6);
    this.table = this.scene.add
      .image(0, 23, "slot2")
      .setScale(0.65)
      .setDepth(6);
    this.btn = this.scene.add
      .image(0, 23, "slot3")
      .setScale(0.64)
      .setAlpha(1)
      .setDepth(4)
      .setSize(300, 300);
    this.btn_press = this.scene.add
      .image(0, 23, "slot4")
      .setScale(0.64)
      .setAlpha(0.6)
      .setDepth(5);
    this.try = this.scene.add
      .image(0, -180, "atlas", "try")
      .setScale(0.74)
      .setAlpha(1)
      .setDepth(55);
    this.add([
      this.machine,
      this.table,
      this.btn,
      this.btn_press,
      this.try,
      this.bg2,
      this.bg3,
    ]);
    this._sort();
  }

  addSpinner() {
    this.spinner = this.scene.add
      .image(0, -400, "spin_reel")
      .setScale(1)
      .setDepth(8);
    this.spinner2 = this.scene.add
      .image(0, -400, "spin_reel2")
      .setScale(1)
      .setAngle(16)
      // .setAngle(45)
      .setDepth(9);
    this.spinner3 = this.scene.add
      .image(0, -400, "spin_reel3")
      .setScale(1)
      .setAlpha(0.5)
      .setDepth(9);
    this.spinner4 = this.scene.add
      .image(0, -580, "atlas", "spin_arrow")
      .setScale(1)
      .setAlpha(1)
      .setDepth(9);
    this.spinner5 = this.scene.add
      .image(0, -400, "atlas", "spin_reel4")
      .setScale(1)
      .setAlpha(1)
      .setDepth(9);
    this.add([
      this.spinner,
      this.spinner2,
      this.spinner3,
      this.spinner4,
      this.spinner5,
    ]);
    this._sort();
  }

  addHide() {
    this.hideBg = this.scene.add
      .image(0, 0, "bg_hide")
      .setScale(1)
      .setAlpha(0.6)
      .setDepth(50);
    this.add([this.hideBg]);
    this._sort();
  }
  removeHide() {
    this.hideBg?.destroy();
  }
  addHand() {
    if (this.left.status === "start") return;
    this.hands = this.scene.add
      .image(40, 20, "atlas", "tutorial_hand")
      .setAngle(-20)
      .setDepth(30)
      .setScale(0.9);
    this.add([this.hands]);
    this._sort();
    this.handleAnim = this.scene.tweens.add({
      targets: this.hands,
      angle: "+=5",
      y: "+=30",
      scale: "/=1.1",
      duration: 400,
      yoyo: true,
      repeat: -1,
    });
  }

  addArows() {
    this.arrows2 = this.scene.add
      .image(-150, 400, "arrows")
      .setScale(1)
      .setDepth(30);
    this.arrows3 = this.scene.add
      .image(0, 400, "arrows")
      .setScale(1)
      .setDepth(30);
    this.arrows4 = this.scene.add
      .image(150, 400, "arrows")
      .setScale(1)
      .setDepth(30);
    this.scene.tweens.add({
      targets: [this.arrows2, this.arrows3, this.arrows4],
      y: "-=3000",
      duration: 1500,
      onComplete: () => {
        this.arrows2.destroy();
        this.arrows3.destroy();
        this.arrows4.destroy();
      },
    });
    this.add([this.arrows2, this.arrows3, this.arrows4]);
    this._sort();
  }

  moveSpinner() {
    this.addArows();

    this.spinner3.destroy();
    const timeline = this.scene.tweens.createTimeline();

    timeline.add({
      targets: this.spinner2,
      angle: 360,
      duration: 800,
      ease: "Ease.inOut",
    });
    timeline.add({
      targets: this.spinner2,
      angle: 360,
      duration: 900,
      ease: "Ease.inOut",
    });
    timeline.add({
      targets: this.spinner2,
      angle: 360,
      duration: 1000,
      ease: "Ease.inOut",
    });

    timeline.add({
      targets: this.spinner2,
      angle: 360,
      duration: 1100,
      ease: "Ease.in",
    });

    timeline.add({
      targets: this.spinner2,
      angle: 55,
      duration: 700,
    });
    timeline.add({
      targets: this.spinner2,
      angle: 45,
      duration: 1000,
      onComplete: () => this.animationCoinBox(),
    });

    setTimeout(() => {
      timeline.play();
    }, 1500);
  }
  start() {
    this.reel = Utils.addAudio(this.scene, "reel", 0.5, false);
    if (this.scene.step === 1) {
      this.scene.step = 2;
    }
    if (this.scene.step === 0) {
      this.scene.step = 1;
    }
    this.left.status = "start";
    this.center.status = "start";
    this.right.status = "start";
    this.left.spinDuration = 50;
    this.left.move();
    setTimeout(() => {
      this.center.spinDuration = 50;
      this.center.move();
    }, 50);
    setTimeout(() => {
      this.right.spinDuration = 50;
      this.right.move();
    }, 100);
    setTimeout(() => {
      this.stop();
    }, 2000);
    // this.removeAnimationFire();
  }

  stop() {
    // this.btn.disableInteractive();
    this.left.stop();
    setTimeout(() => {
      this.center.stop();
    }, 500);
    setTimeout(() => {
      this.right.stop();
    }, 800);
    setTimeout(() => {
      this.reel.stop();
      // this.addAnimationFire();
    }, 2000);
    setTimeout(() => {
      if (this.scene.step === 1) {
        this.scene.emitter.emit("win");
      }
      Utils.addAudio(this.scene, "win2", 0.5, false);
      this.left.win();
      this.center.win();
      this.right.win();
    }, 3000);
    setTimeout(() => {
      if (this.scene.step === 2) {
        this.scene.emitter.emit("bonus");
      }
      if (this.scene.step === 1) {
        this.scene.emitter.emit("second_spin");
      }
    }, 6000);
  }

  animationCoinBox() {
    const tear = this.scene.add
      .sprite(0, -560, "atlas", "fire1")
      .setDepth(2)
      .setScale(2.2);
    this.scene.anims.create({
      key: "cry",
      frames: this.scene.anims.generateFrameNames("atlas", {
        prefix: "fire",
        start: 1,
        end: 10,
      }),
      frameRates: 10,
      repeat: 4,
    });
    setTimeout(() => {
      this.scene.emitter.emit("final");

      tear.destroy();
    }, 2000);
    this.add([tear]);
    this._sort();
    this.animationCry = tear.play("cry");
  }
}
