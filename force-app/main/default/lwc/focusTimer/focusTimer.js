import { LightningElement } from 'lwc';

export default class FocusTimer extends LightningElement {
    time = 1500; // 25 minutes in seconds
    timer = null;
    running = false;
    totalTime = 1500;

    get formattedTime() {
        const minutes = String(Math.floor(this.time / 60)).padStart(2, '0');
        const seconds = String(this.time % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    get buttonLabel() {
        return this.running ? 'Pause' : 'Start';
    }

    get circleStyle() {
        const percent = ((this.totalTime - this.time) / this.totalTime) * 100;
        const radius = 80;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percent / 100) * circumference;
        return `stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset}`;
    }

    handleStartPause() {
        if (this.running) {
            clearInterval(this.timer);
            this.running = false;
        } else {
            this.running = true;
            this.timer = setInterval(() => {
                if (this.time > 0) {
                    this.time--;
                } else {
                    clearInterval(this.timer);
                    this.running = false;
                    // Optional: Add sound or visual alert here
                }
            }, 1000);
        }
    }

    handleReset() {
        clearInterval(this.timer);
        this.time = this.totalTime;
        this.running = false;
    }
}