import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Channel } from './../channel-list/channel-list.component';
import { DrawingService } from './../shared/drawing.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-drawing-channel',
  templateUrl: './drawing-channel.component.html',
  styleUrls: ['./drawing-channel.component.css']
})
export class DrawingChannelComponent implements OnInit {

  private _channelId: number;

  public token: string;
  public channel: Channel;
  public userInfo: any;

  private channelServiceUrl = 'api/channels';  // URL to web api

  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private _route: ActivatedRoute,
    private _loginService: DrawingService
  ) { }

  ngOnInit() {

    this._route.params.subscribe(params => {

      this.formInit();

      this._channelId = params['id'];

      this.getChannel().subscribe(data => {
        this.channel = data;
      });

    });

  }

  formInit() {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  getChannel(): Observable<Channel> {
    return this.http.get<Channel>(`${this.channelServiceUrl}/${this._channelId}`);
  }

  login() {
    this._loginService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
      .subscribe(token => {
        this.token = token;
        const userInfo = jwt_decode(token);

        this.userInfo = userInfo;

      });
  }

}
