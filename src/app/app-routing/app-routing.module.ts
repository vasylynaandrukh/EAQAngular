import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainOptionComponent} from '../main-option/main-option.component';
import {MenuWorkspaceComponent} from '../menu-workspace/menu-workspace.component';
import { StatisticWorkspaceComponent} from '../statistic-workspace/statistic-workspace.component';
import {AppComponent} from '../app.component';
import { CafeLoginComponent} from '../cafe-login/cafe-login.component';


const routes = [
  {path: 'cafe/login', component: CafeLoginComponent},
  {path: 'main/option', component: MainOptionComponent},
  {path: 'menu/table/:table', component: MenuWorkspaceComponent},
  {path: 'statistic', component: StatisticWorkspaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
