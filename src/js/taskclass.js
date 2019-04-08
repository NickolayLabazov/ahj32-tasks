export default class Task {
  constructor(task) {
    this.task = task;
    this.pinned = false;
    this.pinnedV = '<p></p>';
  }

  pinn() {
    if (this.pinned) {
      this.pinned = false;
      this.pinnedV = '<p></p>';
    } else {
      this.pinned = true;
      this.pinnedV = '<p>v</p>';
    }
  }
}
