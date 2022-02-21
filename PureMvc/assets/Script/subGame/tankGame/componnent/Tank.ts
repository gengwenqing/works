import { domainToASCII } from "url";
import { setEnvironmentData } from "worker_threads";

/**
 * map gard
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class Tank extends cc.Component {

    /**
     * 是敌人或者 hero
     */
    private type: number = 0;
    /**
     * tank 技能
     */
    private skill: number = 0;

    private speed = -1;

    private dir: number = -1;

    name: string = "";

    update(dt) {
        if (this.speed != -1) {
            switch (this.dir) {
                case MOVEDIR.UP:
                    this.node.rotation = 0;
                    this.node.y += this.speed * dt;
                    break;
                case MOVEDIR.DOWN:
                    this.node.rotation = 180;
                    this.node.y -= this.speed * dt;
                    break;
                case MOVEDIR.LEFT:
                    this.node.rotation = -90;
                    this.node.x -= this.speed * dt;
                    break;
                case MOVEDIR.RIGHT:
                    this.node.rotation = 90;
                    this.node.x += this.speed * dt;
                    break;
            }
        }
    }

    init(speed: number, name: string) {
        this.speed = speed;
        this.name = name;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    setDir(dir) {
        this.dir = dir;
    }
}

export enum TANKSKILL {
    ADDHP,     // 加血
    CONTROL,   // 范围控制
    BIG_SHOOT, // 爆发
}

export enum MOVEDIR {
    UP,
    DOWN,
    LEFT,
    RIGHT
}
