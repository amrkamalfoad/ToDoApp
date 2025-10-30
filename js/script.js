import { db } from "./firebase.js";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, onSnapshot } 
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
let todos = [];  // <-- Firestore will fill this list


const addBtn = document.querySelector('#add');
const taskinput = document.querySelector('#addingField');
const pendingContainer = document.querySelector('.pending-todos');
const completedContainer = document.querySelector('.completed-todos');

const input = document.querySelector(".dropdown-input");
const menu = document.querySelector(".dropdown-menu");
const dropdowncontainer = document.querySelector(".dropdown");
const taskinputsearch = document.querySelector('#searchField');
const searchButton = document.querySelector('#search');

 

let filteredTodos = null;

function listenToTodos() {
  const todosRef = collection(db, "todos");

  onSnapshot(todosRef, (snapshot) => {   // ✅ real-time listener
    todos = [];
    snapshot.forEach(docItem => {
      todos.push({ id: docItem.id, ...docItem.data() });
    });
    renderTodos(); // UI updates automatically on any change
  });
}



function renderTodos(){
    const listToRender = filteredTodos ?? todos; // If filtered, use it, else original
    completedContainer.innerHTML=''
    pendingContainer.innerHTML='';

    console.log(todos);
    let [p,c]=countPendingACompleted(listToRender);
    if (p==0){
      const el = createEmptyPendingElement();
      pendingContainer.appendChild(el);
    }
    if (c==0){
      const el=createEmptyCompletedElement();
      completedContainer.appendChild(el);
    }
    listToRender.forEach((element) => {
      const todoItem = document.createElement('div');    
      todoItem.classList.add('todo-item');
      const taskspan = document.createElement('span');
      taskspan.textContent = element.name;
      if(element.status==='pending'){
                const completeBtn = document.createElement('button');
                completeBtn.classList.add('complete-btn');
                completeBtn.textContent = 'Mark ✔';
                completeBtn.addEventListener('click', async () => {
                  await updateDoc(doc(db, "todos", element.id), { status: "completed" });
                  filteredTodos = null;
                  renderTodos();
                });
                todoItem.appendChild(taskspan);
                todoItem.appendChild(completeBtn);
                pendingContainer.appendChild(todoItem);
      }
      if (element.status === 'completed') {
                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-btn');
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', async () => {
                  await deleteDoc(doc(db, "todos", element.id));
                  filteredTodos = null;
                  renderTodos();
                });
                todoItem.appendChild(taskspan);
                todoItem.appendChild(deleteBtn);
                completedContainer.appendChild(todoItem);
      }
    });
}

searchButton.addEventListener("click", () => {
  const listType = input.value;
  const searchText = taskinputsearch.value.toLowerCase();
  if (searchText==''){
    alert('Enter a Task name to search');
    filteredTodos=null;
    renderTodos();
    return;
  }
  if (listType === '') {
      alert('Please Select a List');
      return;
  }
  filteredTodos = todos.filter(t =>
      t.status.toLowerCase() === listType.toLowerCase() &&
      t.name.toLowerCase().includes(searchText)
    );
    renderTodos();
});

// ✅ Add Todo → Firestore instead of localStorage
addBtn.addEventListener('click', async () => {
  const taskName = taskinput.value.trim();
  if (taskName === '') return alert('Please enter a Task name');

  await addDoc(collection(db, "todos"), {
    name: taskName,
    status: "pending"
  });

  taskinput.value = '';
});


function countPendingACompleted(arr){
  let pending=0;
  let completed=0;
  for (const item of arr) {   // ✅ correct loop
    if (item.status === 'pending') pending++;
    if (item.status === 'completed') completed++;
  }
  return [pending,completed];
}

function createEmptyPendingElement() {
    const wrapper = document.createElement('div');
    wrapper.className = 'todo-empty';
    const icon = document.createElement('div');
    icon.className = 'empty-icon';
    icon.textContent = '✔';
    const title = document.createElement('h3');
    title.textContent = 'No Pending Tasks';
    const msg = document.createElement('p');
    msg.textContent = 'You are all caught up, great job! 🎉';
    wrapper.appendChild(icon);
    wrapper.appendChild(title);
    wrapper.appendChild(msg);
    return wrapper;
}
function createEmptyCompletedElement() {
    const wrapper = document.createElement('div');
    wrapper.className = 'todo-empty';
    const icon = document.createElement('div');
    icon.className = 'empty-icon';
    icon.textContent = '🚀';
    const title = document.createElement('h3');
    title.textContent = 'No Completed Tasks';
    const msg = document.createElement('p');
    msg.textContent = 'No tasks completed yet';
    wrapper.appendChild(icon);
    wrapper.appendChild(title);
    wrapper.appendChild(msg);
    return wrapper;
}
function dropdownAction(){
    input.addEventListener("click", () => {
      menu.style.display = menu.style.display === "block" ? "none" : "block";
      dropdowncontainer.classList.toggle("open");

    });
    menu.querySelectorAll("li").forEach(item => {
      item.addEventListener("click", () => {
        input.value = item.textContent; // put selected text in input
        menu.style.display = "none";
      });
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
        menu.style.display = "none"; // close dropdown if clicked outside
      }
    });
}





dropdownAction();
listenToTodos();









