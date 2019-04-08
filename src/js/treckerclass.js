import Task from './taskclass.js';

export default class Trecker {
  constructor(tasks) {
    this.tasks = tasks;
    this.form = 0;
    this.input = 0;
    this.trecker = 0;
    this.pinned = 0;
    this.allTasksDiv = 0;
  }

  treckerCreate() {
    this.trecker = document.createElement('div');
    document.body.appendChild(this.trecker);
    const top = document.createElement('h2');
    const pin = document.createElement('h3');
    const all = document.createElement('h3');
    top.innerHTML = 'TOP Tasks';
    pin.innerHTML = 'Pinned';
    all.innerHTML = 'All Tasks';
    this.trecker.appendChild(top);
    this.inputForm();
    this.pinned = document.createElement('div');
    this.allTasksDiv = document.createElement('div');
    this.trecker.appendChild(pin);
    this.trecker.appendChild(this.pinned);
    this.trecker.appendChild(all);
    this.trecker.appendChild(this.allTasksDiv);
    this.insertMesage(this.allTasksDiv, 'No tasks found');
    this.insertMesage(this.pinned, 'No pinned tasks');
  }

  inputForm() {
    this.form = document.createElement('form');
    this.input = document.createElement('input');
    this.form.appendChild(this.input);
    this.trecker.appendChild(this.form);
    this.addListener();
  }

  allTasks(arrayTasks) {
    this.trecker.removeChild(this.allTasksDiv);
    this.allTasksDiv = document.createElement('div');
    this.trecker.appendChild(this.allTasksDiv);
    for (const task of arrayTasks) {
      if (!task.pinned) {
        this.allTasksDiv.appendChild(this.divTask(task));
      }
    }
    if (this.allTasksDiv.childNodes[0] === undefined) {
      this.insertMesage(this.allTasksDiv, 'No tasks found');
    }
  }

  insertMesage(div, mes) {
    const mesage = document.createElement('p');
    mesage.innerHTML = mes;
    div.appendChild(mesage);
  }

  pinnedTasks() {
    this.trecker.removeChild(this.pinned);
    this.pinned = document.createElement('div');
    const h = this.trecker.getElementsByTagName('h3')[1];
    this.trecker.insertBefore(this.pinned, h);

    for (const task of this.tasks) {
      if (task.pinned) {
        this.pinned.appendChild(this.divTask(task));
      }
    }
    if (this.pinned.childNodes[0] === undefined) {
      this.insertMesage(this.pinned, 'No pinned tasks');
    }
  }

  addListener() {
    this.input.addEventListener('input', () => {
      const tasksFilt = this.tasks.slice().filter(elem => elem.task.slice(0, this.input.value.length) === this.input.value);
      this.allTasks(tasksFilt);
    });

    this.input.addEventListener('keydown', (event) => {
      const er = document.createElement('div');
      er.innerHTML = 'Введите задачу';
      if (event.keyCode === 13) {
        event.preventDefault();
        if (this.input.value === '') {
          if (this.form.childNodes[1] === undefined) {
            this.form.appendChild(er);
          }
        } else {
          this.addTask(this.input.value);
          this.allTasks(this.tasks);
          this.input.value = '';
          console.log(this.tasks);
        }
      } else if (this.form.childNodes[1] != undefined) {
        this.form.removeChild(this.form.childNodes[1]);
      }
    });
  }

  addTask(taskValue) {
    const task = new Task(taskValue);
    this.tasks.push(task);
  }

  divTask(task) {
    const cont = document.createElement('div');
    cont.classList.add('task');
    const pin = document.createElement('div');
    pin.innerHTML = task.pinnedV;
    pin.classList.add('pin');
    pin.addEventListener('click', () => {
      task.pinn();

      this.pinnedTasks();
      this.allTasks(this.tasks);
    });
    cont.innerHTML = task.task;
    cont.appendChild(pin);


    return cont;
  }
}
