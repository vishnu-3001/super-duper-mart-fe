import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from "../components/shared/navbar/navbar.component";
@NgModule({
    declarations: [
      NavbarComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      MatToolbarModule,
      MatButtonModule
    ],
    exports: [
      NavbarComponent
    ]
  })
  export class SharedModule {}