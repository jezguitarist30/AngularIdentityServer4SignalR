import { BehaviorSubject, Observable } from 'rxjs';

export interface IPoint {
    prevX: number;
    prevY: number;
    currX: number;
    currY: number;
}

class CanvasDrawing {

    canvas;
    ctx;
    flag = false;
    prevX = 0;
    currX = 0;
    prevY = 0;
    currY = 0;
    dot_flag = false;

    strokeStyle = 'black';
    lineWidth = 2;

    w = 500;
    h = 500;

    private _point = new BehaviorSubject<IPoint>({ prevX: this.prevX, prevY: this.prevY, currX: this.currX, currY: this.currY });
    public point$ = this._point.asObservable();

    public get point(): IPoint {
        return this._point.getValue();
    }

    public set point(value: IPoint) {
        this._point.next(value);
    }

    constructor(private canvasId: string) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.w = this.canvas.width;
        this.h = this.canvas.height;

        this.canvas.addEventListener('mousemove', (e) => {
            this.findxy('move', e);
        }, false);
        this.canvas.addEventListener('mousedown', (e) => {
            this.findxy('down', e);
        }, false);
        this.canvas.addEventListener('mouseup', (e) => {
            this.findxy('up', e);
        }, false);
        this.canvas.addEventListener('mouseout', (e) => {
            this.findxy('out', e);
        }, false);
    }

    draw() {

        this.ctx.beginPath();
        this.ctx.moveTo(this.prevX, this.prevY);
        this.ctx.lineTo(this.currX, this.currY);
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.stroke();
        this.ctx.closePath();

        const newPoint: IPoint = {
            prevX: this.prevX,
            prevY: this.prevY,
            currX: this.currX,
            currY: this.currY
        };

        this.point = newPoint;
    }

    updateCanvas(prevX, prevY, currX, currY) {
        this.ctx.beginPath();
        this.ctx.moveTo(prevX, prevY);
        this.ctx.lineTo(currX, currY);
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    erase() {
        this.ctx.clearRect(0, 0, this.w, this.h);
    }

    save() {
        const dataURL = this.canvas.toDataURL();
        console.log(dataURL);
    }

    findxy(res, e) {
        if (res === 'down') {

            this.prevX = this.currX;
            this.prevY = this.currY;
            this.currX = e.clientX - this.canvas.getBoundingClientRect().left; // canvas.offsetLeft;
            this.currY = e.clientY - this.canvas.getBoundingClientRect().top; // canvas.offsetTop;

            this.flag = true;
            this.dot_flag = true;

            this.ctx.beginPath();
            this.ctx.fillStyle = this.strokeStyle;
            this.ctx.fillRect(this.currX, this.currY, 2, 2);
            this.ctx.closePath();

            this.dot_flag = false;
        }
        if (res === 'up' || res === 'out') {
            this.flag = false;
        }
        if (res === 'move') {

            if (this.flag) {

                this.prevX = this.currX;
                this.prevY = this.currY;
                this.currX = e.clientX - this.canvas.getBoundingClientRect().left; // canvas.offsetLeft;
                this.currY = e.clientY - this.canvas.getBoundingClientRect().top; // canvas.offsetTop;

                this.draw();
            }
        }
    }

}

export default CanvasDrawing;
