import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CarpetasComponent } from './components/carpetas/carpetas.component';
import { CarpetascontenedorComponent } from './components/carpetas/carpetascontenedor/carpetascontenedor.component';
import { ListcarpetasComponent } from './components/carpetas/listcarpetas/listcarpetas.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SingInComponent } from './components/sing-in/sing-in.component';
import { DocumentoComponent } from './components/carpetas/documento/documento.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { CrearcarpetaComponent } from './components/crearcarpeta/crearcarpeta.component';
import { NgxEditorModule } from 'ngx-editor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditarArchivoComponent } from './components/carpetas/editar-archivo/editar-archivo.component';
import { EditCarComponent } from './components/carpetas/edit-car/edit-car.component';
import { VistausuariosComponent } from './components/vistausuarios/vistausuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    CarpetasComponent,
    CarpetascontenedorComponent,
    ListcarpetasComponent,
    FooterComponent,
    HeaderComponent,
    SingInComponent,
    DocumentoComponent,
    LogInComponent,
    CrearcarpetaComponent,
    EditarArchivoComponent,
    EditCarComponent,
    VistausuariosComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    NgxEditorModule,
    AngularEditorModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
