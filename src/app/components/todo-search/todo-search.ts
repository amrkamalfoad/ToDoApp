import { Component,signal } from '@angular/core';
import { NgClass } from '@angular/common';
import {Todo} from '../../services/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-search',
  imports: [NgClass, FormsModule],
  standalone: true,
  templateUrl: './todo-search.html',
  styleUrl: './todo-search.css',
})
export class TodoSearch {
  task:string='';
  selectedmenu:string='';
  isOpen = false;
  dropDownMenu = signal<string[]>(['Pending', 'Completed']);
  constructor(private todoService: Todo) {};
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  };
  searchTask(selectedmenu:string){
    const value=this.task.trim();
    if(value){
        this.todoService.searchTodo(selectedmenu,value);
    }else{
      alert('Please enter a task to search');
      return;
    }
  }
  selectMenu(menu:string){
     if(menu==='Pending'){
      this.selectedmenu='Pending';
     }else if(menu==='Completed'){
      this.selectedmenu='Completed';
     }
  }
}
