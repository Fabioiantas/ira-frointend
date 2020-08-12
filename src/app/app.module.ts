import { RecursoComponent } from './Recurso/Recurso.component';
import { AgmCoreModule } from '@agm/core';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbModule, NgbDatepickerI18n, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// BOOTSTRAP COMPONENTS
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { LaddaModule } from 'angular2-ladda';
import { TextMaskModule } from 'angular2-text-mask';
import { CountUpModule } from 'countup.js-angular2';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NouisliderModule } from 'ng2-nouislider';
import { ClipboardModule } from 'ngx-clipboard';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxLoadingModule } from 'ngx-loading';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { ToastrModule } from 'ngx-toastr';
import { TrendModule } from 'ngx-trend';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// DEMO PAGES
// Dashboards
import { HomeComponent } from './dashboard/home/home.component';
// Pages
import { AppsLayoutComponent } from './layout/apps-layout/apps-layout.component';
// LAYOUT
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { FooterMenuComponent } from './layout/Components/footer/elements/footer-menu/footer-menu.component';
// FOOTER
import { FooterComponent } from './layout/Components/footer/footer.component';
import { SearchBoxComponent } from './layout/Components/header/elements/search-box/search-box.component';
import { UserBoxComponent } from './layout/Components/header/elements/user-box/user-box.component';
// HEADER
import { HeaderComponent } from './layout/Components/header/header.component';
import { PageTitleComponent } from './layout/Components/page-title/page-title.component';
import { LogoComponent } from './layout/Components/sidebar/elements/logo/logo.component';
// SIDEBAR
import { SidebarComponent } from './layout/Components/sidebar/sidebar.component';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';
import { ThemeOptions } from './theme-options';
import { ArchitectUIState, rootReducer } from './themeOptions/store';
import { ConfigActions } from './themeOptions/store/config.actions';
import { DotsComponent } from './layout/Components/header/elements/dots/dots.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AdminComponent } from './admin/admin.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts';
import { UsuarioComponent } from './usuario/usuario.component';
import { TecnicoComponent } from './tecnico/tecnico.component';
import { NgxDatatableFilterComponent } from './_components/ngx-datatable-filter/ngx-datatable-filter.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxResizeWatcherDirective } from './_helpers/ngx-resize-watcher.directive';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ForgotPasswordBoxedComponent } from './login/forgot-password/forgot-password-boxed.component';
import { LoginBoxedComponent } from './login/login-boxed.component';
import { CampanhasComponent } from './campanhas/campanhas.component';
import { AdicionarCampanhaComponent } from './campanhas/adicionar-campanha/adicionar-campanha.component';
import { I18n, CustomDatepickerI18n } from './_helpers/CustomDatepickerI18n';
import { NgbDatePTParserFormatter } from './_helpers/NgbDatePTParserFormatter';
import { NgbStringAdapter } from './_helpers/NgbStringAdapter';
import { ProgramacaoComponent } from './programacao/programacao.component';
import { ProdutoComponent } from './produto/produto.component';
import { AdicionarProdutoComponent } from './produto/adicionar-produto/adicionar-produto.component';
import { AdicionarUsuarioComponent } from './usuario/adicionar-usuario/adicionar-usuario.component';
import { ProdutosLiberadosComponent } from './produtos-liberados/produtos-liberados.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProgramacaoPendenteAnaliseComponent } from './programacao-pendente-analise/programacao-pendente-analise.component';
import { OptionsDrawerComponent } from './themeOptions/options-drawer/options-drawer.component';
import { RecursoCadastroComponent } from './Recurso/recurso-cadastro/recurso-cadastro.component';
import { ParametroComponent } from './parametro/parametro.component';
import { ParametroCadastroComponent } from './parametro/parametro-cadastro/parametro-cadastro.component';
import { FonteEmissaoComponent } from './fonte-emissao/fonte-emissao.component';
import { LicencaAmbientalComponent } from './licenca-ambiental/licenca-ambiental.component';
import { TipoAtividadeComponent } from './tipo-atividade/tipo-atividade.component';
import { TipoLicencaComponent } from './tipo-licenca/tipo-licenca.component';
import { OrgaoResponsavelComponent } from './orgao-responsavel/orgao-responsavel.component';
import { ArquivosComponent } from './arquivos/arquivos.component';
import { EntidadeComponent } from './entidade/entidade.component';
import { TipoAtividadeCadastroComponent } from './tipo-atividade/tipo-atividade-cadastro/tipo-atividade-cadastro.component';
import { TipoLicencaCadastroComponent } from './tipo-licenca/tipo-licenca-cadastro/tipo-licenca-cadastro.component';
import { OrgaoResponsavelCadastroComponent } from './orgao-responsavel/orgao-responsavel-cadastro/orgao-responsavel-cadastro.component';
import { EntidadeCadastroComponent } from './entidade/entidade-cadastro/entidade-cadastro.component';
import { LicencaAmbientalCadastroComponent } from './licenca-ambiental/licenca-ambiental-cadastro/licenca-ambiental-cadastro.component';
import { LicencaEntidadeComponent } from './licenca-ambiental/licenca-entidade/licenca-entidade.component';
import { LicenciamentoComponent } from './licenca-ambiental/licenca-ambiental-licenciamento/licenca-ambiental-licenciamento.component';
import { ProtocolacaoComponent } from './licenca-ambiental/licenca-ambiental-protocolacao/licenca-ambiental-protocolacao.component';
import { LicencaAmbientalRenovaComponent } from './licenca-ambiental/licenca-ambiental-renova/licenca-ambiental-renova.component';
import { LicencaDetalheComponent } from './licenca-ambiental/licenca-detalhe/licenca-detalhe.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { TipoCombustivelComponent } from './efeito-estufa/tipo-combustivel/tipo-combustivel.component';
import { FonteEmissoraComponent } from './efeito-estufa/fonte-emissora/fonte-emissora.component';
import { FonteEmissoraCadastroComponent } from './efeito-estufa/fonte-emissora/fonte-emissora-cadastro/fonte-emissora-cadastro.component';
import { EscopoComponent } from './efeito-estufa/escopo/escopo.component';
import { EscopoCadastroComponent } from './efeito-estufa/escopo/escopo-cadastro/escopo-cadastro.component';
import { MonitoramentoGhgComponent } from './efeito-estufa/monitoramento-ghg/monitoramento-ghg.component';
import { GhgCadastroComponent } from './efeito-estufa/monitoramento-ghg/monitoramento-ghg-cadastro/monitoramento-ghg-cadastro.component';
// tslint:disable-next-line:max-line-length
import { CombustivelCadComponent } from './efeito-estufa/tipo-combustivel/tipo-combustivel-cadastro/tipo-combustivel-cadastro.component';
import { GeeComponent } from './gee/gee/gee.component';
import { GeeCadastroComponent } from './gee/gee/gee-cadastro/gee-cadastro/gee-cadastro.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [

    // LAYOUT
    AppComponent,
    BaseLayoutComponent,
    AppsLayoutComponent,
    PagesLayoutComponent,
    PageTitleComponent,

    // HEADER
    HeaderComponent,
    SearchBoxComponent,
    UserBoxComponent,
    DotsComponent,

    // SIDEBAR
    SidebarComponent,
    LogoComponent,

    // FOOTER
    FooterComponent,
    FooterMenuComponent,

    // Dashboards
    HomeComponent,

    // User Pages
    ForgotPasswordBoxedComponent,
    LoginBoxedComponent,
    AdminComponent,
    DialogBoxComponent,
    UsuarioComponent,
    TecnicoComponent,

    // Components
    RecursoComponent,
    NgxDatatableFilterComponent,
    NgxResizeWatcherDirective,
    CampanhasComponent,
    AdicionarCampanhaComponent,
    ProdutoComponent,
    TecnicoComponent,
    ProgramacaoComponent,
    UsuarioComponent,
    AdicionarProdutoComponent,
    AdicionarUsuarioComponent,
    ProdutosLiberadosComponent,
    ProgramacaoPendenteAnaliseComponent,
    OptionsDrawerComponent,
    RecursoCadastroComponent,
    ParametroComponent,
    ParametroCadastroComponent,
    FonteEmissaoComponent,
    LicencaAmbientalComponent,
    TipoAtividadeComponent,
    TipoLicencaComponent,
    OrgaoResponsavelComponent,
    ArquivosComponent,
    EntidadeComponent,
    TipoAtividadeCadastroComponent,
    TipoLicencaCadastroComponent,
    OrgaoResponsavelCadastroComponent,
    EntidadeCadastroComponent,
    LicencaAmbientalCadastroComponent,
    LicencaEntidadeComponent,
    LicenciamentoComponent,
    ProtocolacaoComponent,
    LicencaAmbientalRenovaComponent,
    LicencaDetalheComponent,
    ResetPasswordComponent,
    TipoCombustivelComponent,
    CombustivelCadComponent,
    FonteEmissoraComponent,
    FonteEmissoraCadastroComponent,
    EscopoComponent,
    EscopoCadastroComponent,
    MonitoramentoGhgComponent,
    GhgCadastroComponent,
    GeeComponent,
    GeeCadastroComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    CommonModule,
    LoadingBarRouterModule,
    ChartsModule,
    TrendModule,
    NgxDatatableModule,
    // Angular Bootstrap Components
    PerfectScrollbarModule,
    NgbModule,
    AngularFontAwesomeModule,
    LaddaModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    RoundProgressModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    ToastrModule.forRoot(),
    SlickCarouselModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CountUpModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: ''
    }),
    ImageCropperModule,
    AngularStickyThingsModule,
    NouisliderModule,
    NgSelectModule,
    SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    AngularEditorModule,
    HttpClientModule,
    TextMaskModule,
    ClipboardModule,
    TextareaAutosizeModule,
    ColorPickerModule,
    DropzoneModule,
    NgxSpinnerModule,
    AccordionModule.forRoot(),
  ],
  providers: [
    BsModalRef,
    {
      provide:
        PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
        DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
    [{ provide: NgbDateParserFormatter, useClass: NgbDatePTParserFormatter }],
    {provide: NgbDateAdapter, useClass: NgbStringAdapter},
    ConfigActions,
    ThemeOptions
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [DialogBoxComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
              private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
