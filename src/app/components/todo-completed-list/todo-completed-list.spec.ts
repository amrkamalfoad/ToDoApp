import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCompletedList } from './todo-completed-list';

describe('TodoCompletedList', () => {
  let component: TodoCompletedList;
  let fixture: ComponentFixture<TodoCompletedList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCompletedList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoCompletedList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
