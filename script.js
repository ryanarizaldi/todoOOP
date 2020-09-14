const input = document.getElementById("input"),
  buttonadd = document.getElementById("add"),
  list = document.getElementById("lists"),
  buttonsort = document.getElementById("sorting"),
  buttonFilCom = document.getElementById("filterCom"),
  buttonFilUnCom = document.getElementById("filterUncom"),
  buttonShowList = document.getElementById("showList");

// if (todo.length) {
//   todo.show();
// } else {
//   list.innerHTML = `no data found`;
// }

class Task {
  constructor(value) {
    this.text = value;
    this.date = new Date();
    this.completed = false;
  }
}

class Todo {
  constructor() {
    this.data = JSON.parse(window.localStorage.getItem("todo")) || [];
    if (this.data) {
      this.show();
    }
  }

  show() {
    list.innerHTML = "";
    let num = 1;
    for (let i in this.data) {
      const { text, date, completed } = this.data[i];
      list.innerHTML += completed
        ? `<li><s>${num}. ${text} | ${date} |  <button onclick="todo.remove(${i})">delete</button> 
              <button onclick="todo.edit(${i})">edit</button><button onclick="todo.complete(${i})">✔️</button></s></li>`
        : `<li>${num}. ${text} | ${date} |  <button onclick="todo.remove(${i})">delete</button> 
                  <button onclick="todo.edit(${i})">edit</button><button onclick="todo.complete(${i})">✔️</button></li>`;
      num++;
    }
  }

  setTodo(value) {
    this.data.push(new Task(value));
    console.log(this.data);
    this.saveTaskInLocalStorage();
    this.show();
  }

  remove(index) {
    this.data.splice(index, 1);
    this.show();
  }

  edit(index) {
    list.innerHTML = "";
    let num = 1;
    for (let i in this.data) {
      const { text, date } = this.data[i];
      list.innerHTML +=
        index == i
          ? `<li><input type="text" id="inputEdit" value=${text}><button onclick=todo.done(${i})>Done</button></li>`
          : `<li>${num}. ${text} | ${date} |  <button onclick="todo.remove(${i})">delete</button> <button onclick="todo.edit(${i})">edit</button> </li>`;
      num++;
    }
  }

  done(index) {
    const inputEdit = document.getElementById("inputEdit");
    this.data[index].text = inputEdit.value;
    this.show();
  }

  complete(index) {
    this.data[index].completed = true;
    this.show();
  }

  sorting() {
    this.data.sort((a, b) => a.completed - b.completed);
    this.show();
  }

  filterComplete() {
    list.innerHTML = "";
    let completedTodo = this.data.filter((comp) => comp.completed === true);
    // console.log(completedTodo);
    let i = 1;
    for (let key in completedTodo) {
      const { text, date } = completedTodo[key];
      list.innerHTML += `<li>${i}. ${text} | ${date} | </li>`;
      i++;
    }
  }

  filterUnComplete() {
    list.innerHTML = "";
    let unComplete = this.data.filter((comp) => comp.completed === false);
    let i = 1;
    for (let key in unComplete) {
      const { text, date } = unComplete[key];
      list.innerHTML += `<li>${i}. ${text} | ${date} | </li>`;
      i++;
    }
  }

  saveTaskInLocalStorage() {
    window.localStorage.setItem("todo", JSON.stringify(this.data));
  }
}

let todo = new Todo();

buttonadd.addEventListener("click", () => todo.setTodo(input.value));
buttonsort.addEventListener("click", () => todo.sorting());
buttonFilCom.addEventListener("click", () => todo.filterComplete());
buttonFilUnCom.addEventListener("click", () => todo.filterUnComplete());
buttonShowList.addEventListener("click", () => todo.show());
