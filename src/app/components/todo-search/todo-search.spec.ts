import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoSearch } from './todo-search';

describe('TodoSearch', () => {
  let component: TodoSearch;
  let fixture: ComponentFixture<TodoSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
