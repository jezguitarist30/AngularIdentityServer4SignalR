import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { DrawingChannelComponent } from './drawing-channel/drawing-channel.component';
import { InMemoryChannelService } from './shared/channel.service';
import { DrawingService } from './shared/drawing.service';
import { HttpModule } from '@angular/http';
import { DrawingBoardComponent } from './drawing-board/drawing-board.component';


@NgModule({
  declarations: [
    AppComponent,
    ChannelListComponent,
    DrawingChannelComponent,
    DrawingBoardComponent
  ],
  imports: [

BrowserModule, HttpClientModule, HttpModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryChannelService, { dataEncapsulation: false }
    ),
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [DrawingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
