import ParentScene from "@holywater-tech/ads-builder/framework/components/Scene";
import Background from "@holywater-tech/ads-builder/framework/components/ui/Background";
import { EVENTS, POSITIONS, SLOT1 } from "./constants/Constants";
import Machine from "./Machine";
import ButtonSpin from "./ButtonSpin";
import Utils from "@holywater-tech/ads-builder/framework/Utils";
import Choices from "./Choices";
import Win from "./Win";
import Spinner from "./Spinner";

export default class Game extends ParentScene {
  create() {
    this.totalCoins = 100000000;
    this.addBackground("bg1");
    // this.addBtnSpin();
    // this.addMachine();
    // this.addSpinner();
    // this.final();
    this.addChoices();
    this.addCta();
    this.addWin();
    this.step = 0;
    this.addDragon();
    Utils.addAudio(this, "music_trivia", 0.3, true);
    this.initListeners();
  }

  initListeners() {
    this.emitter.on("final", () => this.final(), this);
    this.emitter.on(
      "win",
      () => {
        if (this.step === 1) {
          this.win.addBigWin();
        }
      },
      this
    );
    this.emitter.on("bonus", () => this.scaleMachine(), this);
    this.emitter.on(
      "first_choice",
      () => {
        this.addSpinner();
      },
      this
    );
    this.emitter.on(
      "second_choice",
      () => {
        this.addSpinner();
      },
      this
    );
    this.emitter.on("machine", () => {
      this.removespinner();
      this.addMachine();
      this.addBtnSpin();
    });
  }

  scaleMachine() {
    this.tweens.add({
      targets: this.machine,
      scale: "*=1.1",
      // py: "+=50",
      // ly: "+=50",
      duration: 500,
    });
  }

  addDragon() {
    this.dragon = this.add
      .image(0, 0, "phoenix")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, 400, 0, 400)
      .setCustomScale(1, 1, 1, 1)
      .setCustomAlign("Top")
      .setDepth(5);
    this.mainContainer.add([this.dragon]);
    this.sort();
  }
  final() {
    this.bg1.setInteractive().on("pointerdown", () => this.openStore());
    this.bg_hide = this.add
      .image(0, 0, "bg_hide")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, 0, 0, 0)
      .setCustomScale(1, 1, 1, 1)
      .setAlpha(0.4)
      .setCustomAlign("Center")
      .setDepth(99);
    this.winBox = this.add
      .image(0, 0, "won_box")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, 0, 0, 0)
      .setCustomScale(0.8, 0.8, 0.8, 0.8)
      .setCustomAlign("Center")
      .setDepth(100);
    this.collect = this.add
      .image(0, 0, "atlas", "collect")
      .addProperties(["pos", "scale"])
      .setCustomPosition(0, 200, 0, 200)
      .setCustomScale(1, 1, 1, 1)
      .setCustomAlign("Center")
      .setDepth(101);
    this.tweens.add({
      targets: this.collect,
      scale: "*=1.1",
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.addCoins();
    setTimeout(() => {
      this.addCoinsAnim();
    }, 2000);
    this.mainContainer.add([this.winBox, this.bg_hide, this.collect]);
    this.sort();
  }

  addCoins() {
    ["0", "0", "0", "0", "0", "0", "0"].forEach((item, index) => {
      const x = [-150, -90, -45, 0, 60, 105, 150][index];
      console.log("x", x);
      this[`num${index}`] = this.add
        .image(0, 0, "atlas", item)
        .addProperties(["pos", "scale"])
        .setCustomPosition(x, 70, x, 70)
        .setCustomScale(1, 1, 0.8, 0.8)
        .setCustomAlign("Center")
        .setDepth(105);
      this.mainContainer.add([this[`num${index}`]]);
      this.sort();
    });
    this.dote1 = this.add
      .image(0, 0, "atlas", "dote")
      .addProperties(["pos", "scale"])
      .setCustomPosition(-120, 95, -120, 95)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setCustomAlign("Center")
      .setDepth(105);
    this.dote2 = this.add
      .image(0, 0, "atlas", "dote")
      .addProperties(["pos", "scale"])
      .setCustomPosition(32, 95, 32, 95)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setCustomAlign("Center")
      .setDepth(105);
    this.mainContainer.add([this.dote1, this.dote2]);
    this.sort();
    Utils.addAudio(this, "win", 0.5, false);
    this.tweens.addCounter({
      from: 0,
      to: 999999,
      duration: 2000,
      onUpdate: (tween) => {
        // const currentValue = Math.floor(tween.getValue());
        const one1 = Math.floor(Math.random() * 9);
        const one2 = Math.floor(Math.random() * 9);
        const one3 = Math.floor(Math.random() * 9);
        const one4 = Math.floor(Math.random() * 9);
        const one5 = Math.floor(Math.random() * 9);
        const one6 = Math.floor(Math.random() * 9);
        this.num1.setTexture("atlas", `${one1}`);
        this.num2.setTexture("atlas", `${one2}`);
        this.num3.setTexture("atlas", `${one3}`);
        this.num4.setTexture("atlas", `${one4}`);
        this.num5.setTexture("atlas", `${one5}`);
        this.num6.setTexture("atlas", `${one6}`);
      },
      onComplete: () => {
        // this.num0.setTexture("atlas", "1");
        this.num1.setTexture("atlas", "0");
        this.num2.setTexture("atlas", "0");
        this.num3.setTexture("atlas", "0");
        this.num4.setTexture("atlas", "0");
        this.num5.setTexture("atlas", "0");
        this.num6.setTexture("atlas", "0");
      },
    });
    this.tweens.addCounter({
      from: 0,
      to: 10,
      duration: 2000,
      onComplete: () => {
        // this.num0.setTexture("atlas", `0`);
        this[`num9`] = this.add
          .image(0, 0, "atlas", "1")
          .addProperties(["pos", "scale"])
          .setCustomPosition(-190, 70, -190, 70)
          .setCustomScale(1, 1, 0.8, 0.8)
          .setCustomAlign("Center")
          .setDepth(105);
        this.mainContainer.add([this[`num9`]]);
        this.sort();
      },

      onUpdate: (tween) => {
        let currentValue = Math.floor(tween.getValue());
        currentValue = currentValue > 9 ? currentValue - 10 : currentValue;
        this.num0.setTexture("atlas", `${currentValue}`);
      },
    });
  }
  addCta() {
    this.cta = this.add
      .image(0, 0, "atlas", "download")
      .addProperties(["pos", "scale"])
      .setCustomPosition(150, 70, 150, 70)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setCustomAlign("Top Left")
      .setDepth(100)
      .setAlpha(1);
    this.logo = this.add
      .image(0, 0, "atlas", `icon-default`)
      .addProperties(["pos", "scale"])
      .setCustomPosition(-70, 70, -70, 70)
      .setCustomScale(0.7, 0.7, 0.7, 0.7)
      .setCustomAlign("Top Right")
      .setDepth(100)
      .setAlpha(1);
    this.cta.setInteractive().once("pointerdown", () => this.openStore());
    this.logo.setInteractive().once("pointerdown", () => this.openStore());
    this.mainContainer.add([this.cta, this.logo]);
    this.sort();
    this.tweens.add({
      targets: this.cta,
      scale: "*=1.1",
      yoyo: true,
      repeat: -1,
      duration: 300,
    });
  }
  addBackground(bg, options = {}) {
    this[bg] = new Background(this, bg, true, [1.5, 1.5, 1.1, 1.1])
      .setDepth(options.depth || 4)
      .setAlpha(1);

    this.mainContainer.add([this[bg]]);
    this.sort();
  }
  addBtnSpin() {
    this.btnSpin = new ButtonSpin(this).setAlpha(0);
    this.mainContainer.add([this.btnSpin]);
    this.sort();

    this.tweens.add({
      targets: this.btnSpin,
      alpha: 1,
      duration: 500,
      delay: 1000,
    });
  }
  addMachine() {
    this.machine = new Machine(this);
    this.mainContainer.add([this.machine]);
    this.tweens.add({
      targets: this.machine,
      py: POSITIONS.board[3],
      ly: POSITIONS.board[1],
      duration: 500,
      delay: 1000,
    });
    this.sort();
  }
  addChoices() {
    this.choices = new Choices(this);
    this.mainContainer.add([this.choices]);
    this.sort();
  }
  addWin() {
    this.win = new Win(this);
    this.mainContainer.add([this.win]);
    this.sort();
  }
  addSpinner() {
    this.spinner = new Spinner(this);
    this.mainContainer.add([this.spinner]);
    this.tweens.add({
      targets: this.spinner,
      py: 0,
      ly: 0,
      duration: 500,
      delay: 1000,
    });
    this.sort();
  }

  removespinner() {
    this.tweens.add({
      targets: this.spinner,
      px: 2000,
      lx: 2000,
      duration: 500,
      delay: 1000,
    });
  }
  addCoinsAnim() {
    this.partc = this.add
      .particles("atlas", "coins1")
      .addProperties(["pos"])
      .setCustomPosition(0, 0, 0, 0)
      .setDepth(99);

    const emitter = this.partc.createEmitter({
      frame: ["coins1", "coins2", "coins3", "coins4"],
      x: 0,
      y: 0,
      angle: { start: 0, end: 360 },
      speedY: { min: -400, max: 500 },
      speedX: { min: -400, max: 500 },
      lifespan: 2400,
      scale: { start: 0.4, end: 0.5 },
      frequency: 100,
      quantity: 2,
      // blendMode: "ADD",
      // on: false,
    });
    this.mainContainer.add([this.partc]);
    this.sort();
    // this.addBigWin();

    const stopEmitter = () => {
      emitter.stop();
      this.time.delayedCall(1400, () => this.partc.destroy());
    };
    // this.time.delayedCall(2000, stopEmitter, [], this);
  }
  addBigWin() {
    this.big_win = this.add
      .image(0, 0, "atlas", "big_win")
      .addProperties(["pos"])
      .setCustomPosition(0, 0, 0, 0)
      .setCustomAlign("Center")
      .setDepth(300)
      .setAlpha(0);

    this.tweens.add({
      targets: this.big_win,
      alpha: 1,
      duration: 200,
      hold: 2300,
      yoyo: true,
    });
    setTimeout(() => this.emitter.emit(EVENTS.NEXT_SCENE), 4000);
  }
  openStore() {
    this.game.network.openStore();
  }
}
