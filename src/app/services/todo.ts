import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable,from } from 'rxjs';

export interface todo {
  id: string;        // Firestore ID (string)
  task: string;
  completed: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class Todo {

  private firestore = inject(Firestore);

  private todosCollection = collection(this.firestore, 'todos');

  // Signals
  todos = signal<todo[]>([]);
  originalTodos = signal<todo[]>([]);

  constructor() {
    collectionData(this.todosCollection, { idField: 'id' })
      .subscribe({
        next: (items) => {
          this.originalTodos.set(items as todo[]);
          this.todos.set(items as todo[]);
        },
        error: (error) => {
          console.error('Firebase connection error:', error);
          console.error('Please configure Firebase in src/enviroments/enviroment.ts');
        }
      });
  }

  addTodo(task: string) {
    try {
      return from(addDoc(this.todosCollection, { task, completed: false }));
    } catch (error) {
      console.error('Error adding todo:', error);
      throw new Error('Failed to save todo. Please check Firebase configuration.');
    }
  }

  completeTodo(id: string) {
    const ref = doc(this.firestore, `todos/${id}`);
    return from(updateDoc(ref, { completed: true }));
  }
  markCompleted(id :string){
    this.completeTodo(id).subscribe(
      {
        next() {
          console.log('completed')
        },
        error(err){
          console.error('failed to complete the task',err);
        }
      }
    )
  }

  deleteTodo(id: string) {
    const ref = doc(this.firestore, `todos/${id}`);
    return from(deleteDoc(ref));
  }
  markDeleted(id: string){
    this.deleteTodo(id).subscribe(
      {
        next(){console.log('deleted')},
        error(err){console.error('failed to delete',err)}
      }
    )
  }
  searchTodo(selectedmenu: string, task: string) {
    const source = this.originalTodos();

    if (selectedmenu === 'Pending') {
      this.todos.set(source.filter(t => !t.completed && t.task.includes(task)));
    } else if (selectedmenu === 'Completed') {
      this.todos.set(source.filter(t => t.completed && t.task.includes(task)));
    } else {
      this.todos.set(source);
    }
  }

  pendingTodos = computed(() => this.todos().filter(todo => !todo.completed));
  pendingCount = computed(() => this.pendingTodos().length);

  completedTodos = computed(() => this.todos().filter(todo => todo.completed));
  completedCount = computed(() => this.completedTodos().length);
}
