import { Component, input } from '@angular/core';
import { NavItem } from '../../models/nav-item';
import { RouterLink } from '@angular/router';
import { TypographyStyle } from '../../enums/typography.enum';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
})
export class Header {
  navItems = input<NavItem[]>([]);
  readonly TypographyStyle = TypographyStyle;
}
