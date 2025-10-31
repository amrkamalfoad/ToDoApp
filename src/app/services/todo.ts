import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
export interface todo {
  id:number;
  task:string;
  completed:boolean;
 };

@Injectable({
  providedIn: 'root',
})
export class Todo {

 todos = signal<todo[]>([]);
  addTodo(task: string) {
    this.todos.update(current => [...current, 
      {
        id:Date.now(),
         task:task,
          completed:false
        }]);
  }
  completeTodo(id: number) {
    this.todos.update(current =>
      current.map(todo =>
        todo.id === id
          ? { ...todo, completed: true }
          : todo
      )
    );
  }
  deleteTodo(id:number){
    this.todos.update(current=>
      current.filter(todo=>todo.id!==id)
    );
  }

}
