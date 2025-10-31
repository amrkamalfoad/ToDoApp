import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoSearch } from "./components/todo-search/todo-search";
import { TodoAdd } from "./components/todo-add/todo-add";
import { TodoPendingList } from "./components/todo-pending-list/todo-pending-list";
import { TodoCompletedList } from "./components/todo-completed-list/todo-completed-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoSearch, TodoAdd, TodoPendingList, TodoCompletedList],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.Emulated  // default
})
export class App {
  protected readonly title = signal('todo-app-angular');
}
