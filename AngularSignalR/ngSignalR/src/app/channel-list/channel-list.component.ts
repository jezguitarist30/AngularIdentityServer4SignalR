import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Channel {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit {

  public channels: Observable<Channel[]>;

  private channelServiceUrl = 'api/channels';  // URL to web api

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.channels = this.getChannels();
  }

  getChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>(this.channelServiceUrl);
  }

}
