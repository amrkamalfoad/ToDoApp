import { Injectable } from '@angular/core';
import { signal,computed } from '@angular/core';
export interface todo {
  id:number;
  task:string;
  completed:boolean;
 };

@Injectable({
  providedIn: 'root',
})
export class Todo {
private originalTodos = signal<todo[]>([]); //  Store the full list
 todos = signal<todo[]>([]); 
  addTodo(task: string) {
    this.todos.set(this.originalTodos());
    const newTodo = { id: Date.now(), task, completed: false };
    this.todos.update(current => [...current, newTodo]);
    this.originalTodos.update(current => [...current, newTodo]);
  }
  completeTodo(id: number) {
    this.originalTodos.update(current =>
      current.map(todo =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );  
    this.todos.set(this.originalTodos());
  }
  deleteTodo(id:number){
    this.originalTodos.update(current=>
      current.filter(todo=>todo.id!==id)
    );
    this.todos.set(this.originalTodos());
  }
  searchTodo(selectedmenu:string,task:string){
    const source = this.originalTodos();
    if(selectedmenu==='Pending'){
      this.todos.set(source.filter(t => !t.completed && t.task.includes(task)));
    }else if(selectedmenu==='Completed'){
      this.todos.set(source.filter(t => t.completed && t.task.includes(task)));
    }else{
      this.todos.set(source);
    }
  }
  pendingTodos = computed(() =>
  {
    return this.todos().filter(todo=>!todo.completed)
  });

  pendingCount = computed(() =>
    this.pendingTodos().length
  );
  completedTodos = computed(() =>
  {
     return this.todos().filter(todo=>todo.completed)
  });
  

  completedCount = computed(() =>
    this.completedTodos().length
  );

}
