import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { AppComponent } from './app.component';
import { DrawingChannelComponent } from './drawing-channel/drawing-channel.component';

const routes: Routes = [
  { path: 'channels', component: ChannelListComponent },
  { path: 'channel/drawing/:id', component: DrawingChannelComponent },
  { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
