import { Component, OnInit, Input } from '@angular/core';
import CanvasDrawing, { IPoint } from './../shared/extension/canvas';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

interface INewPoint {
  groupName: string;
  prevX: number;
  prevY: number;
  currX: number;
  currY: number;
}

@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.css']
})
export class DrawingBoardComponent implements OnInit {

  @Input() token: string;
  @Input() groupName: string;

  canvas: CanvasDrawing;

  connection: HubConnection;

  constructor() { }

  ngOnInit() {

    const builder = new HubConnectionBuilder();

    this.connection = builder
      .withUrl('https://localhost:44348/hubs/draw', { accessTokenFactory: () => this.token })
      .configureLogging(LogLevel.Information)
      .build();

    this.connection.start()
      .then(() => {

        this.joinChannel();

      })
      .catch(e => {
        console.log(e.toString());
      });

    this.canvas = new CanvasDrawing('canvas');

    this.canvas.point$.subscribe((newPoint: IPoint) => {

      const data: INewPoint = {
        groupName: this.groupName,
        prevX: newPoint.prevX, prevY: newPoint.prevY, currX: newPoint.currX, currY: newPoint.currY
      };

      this.connection.invoke('Draw', data)
        .then(() => {

        })
        .catch(e => {
          console.log(e.toString());
        });
    });

    this.someoneJoined();
    this.updateCanvas();


  }

  joinChannel() {
    this.connection.invoke('JoinChannel', this.groupName)
      .catch(e => {
        console.log(e.toString());
      });
  }

  someoneJoined() {
    this.connection.on('SomeoneJoined', (name) => {
      alert(`${name} joined the channel!`);
    });
  }

  updateCanvas() {
    this.connection.on('UpdateCanvas', (newPoint) => {
      this.canvas.updateCanvas(newPoint.prevX, newPoint.prevY, newPoint.currX, newPoint.currY);
    });
  }

  sendData(prevX, prevY, currX, currY) {
    this.connection.invoke('Draw', { groupName: this.groupName, prevX: prevX, prevY: prevY, currX: currX, currY: currY })
      .then(() => {

      })
      .catch(e => {
        console.log(e.toString());
      });
  }
}
