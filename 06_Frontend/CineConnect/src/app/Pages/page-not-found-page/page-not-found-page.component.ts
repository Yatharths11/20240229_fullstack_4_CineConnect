import { Component } from '@angular/core';
import { PageNotFoundComponentComponent } from '../../Components/page-not-found-component/page-not-found-component.component';

@Component({
  selector: 'app-page-not-found-page',
  standalone: true,
  imports: [PageNotFoundComponentComponent],
  templateUrl: './page-not-found-page.component.html',
  styleUrl: './page-not-found-page.component.css'
})
export class PageNotFoundPageComponent {

}
