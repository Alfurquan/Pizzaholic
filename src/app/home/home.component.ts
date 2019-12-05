import { Component, OnInit, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger("scrollAnimation", [
      state(
        "show",
        style({
          opacity: 1
        })
      ),
      state(
        "hide",
        style({
          opacity: 0
        })
      ),
      transition("show => hide", animate("1000ms ease-out")),
      transition("hide => show", animate("1000ms ease-in"))
    ])
  ]
})
export class HomeComponent implements OnInit {
  state = "show";
  state1 = "show";
  constructor(public el: ElementRef) { }

  ngOnInit() {
  }
  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

}
