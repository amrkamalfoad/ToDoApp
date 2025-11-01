import { Component } from '@angular/core';
import {Todo} from '../../services/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-add',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './todo-add.html',
  styleUrl: './todo-add.css',
})
export class TodoAdd {
  task:string='';
  constructor(private todoService: Todo) {};
  addTask(){
    const value=this.task.trim();
    if(value){
      this.todoService.addTodo(value);
      console.log(this.todoService.todos());
      this.task='';
    }else{
      alert('Please enter a task to add');
      return;
    }
  }
}
