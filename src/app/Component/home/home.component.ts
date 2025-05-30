import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-home',
  imports: [SideBarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = "Welcome to the Home Page!";
  description = "This is a simple home component.";

}
