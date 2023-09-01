import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './request.interceptor';
import { RentRollBarChartComponent } from './data-visualization/rent-roll-bar-chart/rent-roll-bar-chart.component';
import { UserComponent } from './user/user.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExcelUploadComponent } from './user/excel-upload/excel-upload.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { RentDataListComponent } from './user/rent-data-list/rent-data-list.component';
import { DataVisualizationComponent } from './data-visualization/data-visualization.component';




@NgModule({
  declarations: [
    AppComponent,
    RentRollBarChartComponent,
    NotfoundComponent,
    UserComponent,
    ExcelUploadComponent,
    RentDataListComponent,
    DataVisualizationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [{
    provide: APP_SERVICE_CONFIG,
    useValue: APP_CONFIG
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
