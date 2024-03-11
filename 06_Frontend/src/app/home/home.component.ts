import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  constructor(private elementRef: ElementRef) { }



  ngOnInit(): void {
    const carousel = this.elementRef.nativeElement.querySelector('.carousel');
    let sliders: HTMLElement[] = [];

    let slideIndex = 0; // to track current slide index.

    const movies = [
      {
        image:
          "https://ik.imagekit.io/cineconnect/CineConnect/dum_banner.png?updatedAt=1709492522767",
      },
      {
        image:
          "https://ik.imagekit.io/cineconnect/CineConnect/dum_banner.png?updatedAt=1709492522767",
      },
      {
        image:
          "https://ik.imagekit.io/cineconnect/CineConnect/dum_banner.png?updatedAt=1709492522767",
      },
      {
        image:
          "https://ik.imagekit.io/cineconnect/CineConnect/dum_banner.png?updatedAt=1709492522767",
      },
      {
        image:
          "https://ik.imagekit.io/cineconnect/CineConnect/dum_banner.png?updatedAt=1709492522767",
      },
      {
        image:
          "https://ik.imagekit.io/cineconnect/CineConnect/dum_banner.png?updatedAt=1709492522767",
      },
    ];

    const createSlide = () => {
      if (slideIndex >= movies.length) {
        slideIndex = 0;
      }

      // creating DOM element
      let slide = document.createElement('div');
      let imgElement = document.createElement('img');

      // attaching all elements
      imgElement.appendChild(document.createTextNode(''));
      slide.appendChild(imgElement);
      carousel.appendChild(slide);

      // setting up image
      imgElement.src = movies[slideIndex].image;
      slideIndex++;

      // setting elements classname
      slide.className = 'slider';

      sliders.push(slide);

      if (sliders.length) {
        sliders[0].style.marginLeft = `calc(-${100 * (sliders.length - 2)}% - ${10 * (sliders.length - 2)}px)`;
      }
    }

    for (let i = 0; i < 3; i++) {
      createSlide();
    }

    setInterval(() => {
      createSlide();
    }, 1000);
  }

}
