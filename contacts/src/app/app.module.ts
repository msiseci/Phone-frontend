import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonComponent } from './components/person/person.component';
import { PersonAddComponent } from './components/person-add/person-add.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { FilterPipePipe } from './pipes/filterPipe.pipe';
import{ToastrModule} from "ngx-toastr";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    PersonAddComponent,
    VatAddedPipe,
    FilterPipePipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    NgbModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
