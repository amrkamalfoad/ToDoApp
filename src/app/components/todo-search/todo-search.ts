import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-search',
  imports: [NgClass],
  standalone: true,
  templateUrl: './todo-search.html',
  styleUrl: './todo-search.css',
})
export class TodoSearch {
  isOpen = false;
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  };
}
