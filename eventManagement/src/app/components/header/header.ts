import { Component, input } from '@angular/core';
import { NavItem } from '../../models/nav-item';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './header.html',
})
export class Header {
  navItems = input<NavItem[]>([]);
}
