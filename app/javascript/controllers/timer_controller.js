import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["display", "startButton", "stopButton", "resetButton"];

  connect() {
    this.initialization();
    console.log("Timer controller connected");
  }

  initialization() {
    this.studyTime = 25 * 60;
    this.shortBreakTime = 5 * 60;
    this.longBreakTime = 15 * 60;
    this.setCountBeforeLongBreak = 4;
    this.currentSetCount = 0;
    this.remainingTime = this.studyTime;
    this.currentSessionType = "study";
    this.updateTimerDisplay();
  }

  loadSettings() {
    this.currentSessionType = "study";
    this.remainingTime = this.studyTime;
    this.currentSetCount = 0;
    this.updateTimerDisplay();
  }

  reset() {
    clearInterval(this.intervalId);
    this.loadSettings();
    this.startButtonTarget.disabled = false;
    this.stopButtonTarget.disabled = true;
  }

  start() {
    if (this.currentSessionType === "study") {
      this.currentSetCount += 1;
      this.updateTimerDisplay();
    }
    this.startButtonTarget.disabled = true;
    this.stopButtonTarget.disabled = false;
    this.intervalId = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime -= 1;
        this.updateTimerDisplay();
      } else {
        clearInterval(this.intervalId);
        this.switchSession();
        this.start();
      }
    }, 1000);
    console.log("Start button clicked");
    console.log(this.currentSessionType);
  }

  switchSession() {
    let nextRemainingTime = this.remainingTime;

    if (this.currentSetCount < this.setCountBeforeLongBreak) {
      if (this.currentSessionType === "study") {
        nextRemainingTime = this.shortBreakTime;
        this.currentSessionType = "shortBreak";
      } else if (this.currentSessionType === "shortBreak") {
        nextRemainingTime = this.studyTime;
        this.currentSessionType = "study";
      }
    } else {
      if (this.currentSessionType === "study") {
        nextRemainingTime = this.longBreakTime;
        this.currentSessionType = "longBreak";
      } else if (this.currentSessionType === "longBreak") {
        nextRemainingTime = this.studyTime;
        this.remainingTime = nextRemainingTime;
        this.currentSessionType = "study";
        this.currentSetCount = 0;
      }
    }
    if (this.currentSessionType !== "study" || this.currentSetCount > 0) {
      this.remainingTime = nextRemainingTime;
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this.startButtonTarget.disabled = false;
    this.stopButtonTarget.disabled = true;
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    const displayText =
      `${minutes}:${seconds.toString().padStart(2, "0")}` +
      ` (${this.currentSetCount}/${this.setCountBeforeLongBreak})`;
    this.displayTarget.textContent = displayText;
  }

  updateStudyTime(event) {
    const studyTime = parseInt(event.target.value);
    if (!isNaN(studyTime)) {
      this.studyTime = studyTime * 60;
      if (this.currentSessionType === "study") {
        this.remainingTime = studyTime * 60;
        this.updateTimerDisplay();
      }
    }
  }

  updateShortBreakTime(event) {
    const shortBreakTime = parseInt(event.target.value);
    if (!isNaN(shortBreakTime)) {
      this.shortBreakTime = shortBreakTime * 60;
      if (this.currentSessionType === "shortBreak") {
        this.remainingTime = shortBreakTime * 60;
        this.updateTimerDisplay();
      }
    }
  }

  updateLongBreakTime(event) {
    const longBreakTime = parseInt(event.target.value);
    if (!isNaN(longBreakTime)) {
      this.longBreakTime = longBreakTime * 60;
      if (this.currentSessionType === "longBreak") {
        this.remainingTime = longBreakTime * 60;
        this.updateTimerDisplay();
      }
    }
  }

  updateSetCountBeforeLongBreak(event) {
    const setCountBeforeLongBreak = parseInt(event.target.value);
    if (!isNaN(setCountBeforeLongBreak)) {
      this.setCountBeforeLongBreak = setCountBeforeLongBreak;
    }
  }
}
