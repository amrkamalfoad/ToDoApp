import { Component, computed } from '@angular/core';
import { Todo } from '../../services/todo';
@Component({
  selector: 'app-todo-pending-list',
  imports: [],
  standalone: true,
  templateUrl: './todo-pending-list.html',
  styleUrl: './todo-pending-list.css',
})
export class TodoPendingList {
  constructor(public todoService: Todo) {};
  pendingTodos = computed(() =>
    this.todoService.todos().filter(t => !t.completed)
  );

  pendingCount = computed(() =>
    this.pendingTodos().length
  );}

