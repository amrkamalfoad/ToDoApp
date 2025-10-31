import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPendingList } from './todo-pending-list';

describe('TodoPendingList', () => {
  let component: TodoPendingList;
  let fixture: ComponentFixture<TodoPendingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoPendingList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoPendingList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
