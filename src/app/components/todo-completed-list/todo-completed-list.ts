import { Component,computed } from '@angular/core';
import { Todo } from '../../services/todo';

@Component({
  selector: 'app-todo-completed-list',
  imports: [],
  standalone: true,
  templateUrl: './todo-completed-list.html',
  styleUrl: './todo-completed-list.css',
})
export class TodoCompletedList {
  constructor(public todoService: Todo) {};
}
