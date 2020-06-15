import { RecursoComponent } from './Recurso/Recurso.component';
import { ProgramacaoComponent } from './programacao/programacao.component';
import { ProdutosLiberadosComponent } from './produtos-liberados/produtos-liberados.component';
import { TecnicoComponent } from './tecnico/tecnico.component';
import { AdicionarUsuarioComponent } from './usuario/adicionar-usuario/adicionar-usuario.component';
import { ProdutoComponent } from './produto/produto.component';
import { AdicionarCampanhaComponent } from './campanhas/adicionar-campanha/adicionar-campanha.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { HomeComponent } from './dashboard/home/home.component';
// import { RecursoComponent } from './recurso-component/recurso-component.component';
// Pages
import { AppsLayoutComponent } from './layout/apps-layout/apps-layout.component';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './_models/role';
import { AdminComponent } from './admin/admin.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginBoxedComponent } from './login/login-boxed.component';
import { ForgotPasswordBoxedComponent } from './login/forgot-password/forgot-password-boxed.component';
import { CampanhasComponent } from './campanhas/campanhas.component';
import { AdicionarProdutoComponent } from './produto/adicionar-produto/adicionar-produto.component';
import { ProgramacaoPendenteAnaliseComponent } from './programacao-pendente-analise/programacao-pendente-analise.component';
import { RecursoCadastroComponent } from './Recurso/recurso-cadastro/recurso-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { extraParameter: 'dashboardsMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'pagesMenu3' }
      },

    ]
  },

  {
    path: 'recurso',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: RecursoComponent,
        data: { extraParameter: 'cadastroMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: RecursoCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'cadastroMenu' }
      },
      {
        path: 'editar/:id',
        component: AdicionarCampanhaComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'cadastroMenu' }
      }

    ]
  },

  {
    path: 'campanha',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: CampanhasComponent,
        data: { extraParameter: 'cadastroMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: AdicionarCampanhaComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'cadastroMenu' }
      },
      {
        path: 'editar/:id',
        component: AdicionarCampanhaComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'cadastroMenu' }
      }

    ]
  },

  {
    path: 'produto',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: ProdutoComponent,
        data: { extraParameter: 'cadastroMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: AdicionarProdutoComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'cadastroMenu' }
      },
      {
        path: 'editar/:id',
        component: AdicionarProdutoComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'cadastroMenu' }
      }

    ]
  },

  {
    path: 'produtos-liberados',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: ProdutosLiberadosComponent,
        data: { extraParameter: 'cadastroMenu' },
        canActivate: [AuthGuard]
      }
    ]
  },

  {
    path: 'programacao',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: ProgramacaoComponent,
        data: { extraParameter: 'programacaoMenu' },
        canActivate: [AuthGuard]
      }

    ]
  },

  {
    path: 'programacao-pendente',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: ProgramacaoPendenteAnaliseComponent,
        data: { extraParameter: 'programacaoMenu' },
        canActivate: [AuthGuard]
      }

    ]
  },

  {
    path: 'usuario',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: UsuarioComponent,
        data: { extraParameter: 'cadastroMenu' },
        canActivate: [AuthGuard]
      },
      {
        path: 'adicionar',
        component: AdicionarUsuarioComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'cadastroMenu' }
      },
      {
        path: 'editar/:id',
        component: AdicionarUsuarioComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], extraParameter: 'cadastroMenu' }
      }

    ]
  },

  {
    path: 'tecnico',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: TecnicoComponent,
        data: { extraParameter: 'cadastroMenu' },
        canActivate: [AuthGuard]
      }
    ]
  },

  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      { path: 'login', component: LoginBoxedComponent, data: { extraParameter: '' } },
      { path: 'forgot-password-boxed', component: ForgotPasswordBoxedComponent, data: { extraParameter: '' } },
    ]
  },
  {
    path: '',
    component: AppsLayoutComponent,
    children: [

    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
