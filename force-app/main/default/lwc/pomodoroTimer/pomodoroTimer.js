import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PomodoroTimer extends LightningElement {

  currentPageRef;
    @track timeLeft = 1500; // 25 minutes in seconds
    @track workDuration = 25; // minutes
    @track breakDuration = 5; // minutes
    @track isRunning = false;
    @track isBreak = false;
    @track completedSessions = 0;
    @track currentSession = 1;
    
    timer;
    totalTime = 1500;

    // Computed properties
    get formattedTime() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    get currentMode() {
        return this.isBreak ? 'Break Time' : 'Focus Time';
    }
    
    get startButtonLabel() {
        return this.isRunning ? 'Pause' : 'Start';
    }
    
    get startButtonVariant() {
        return this.isRunning ? 'neutral' : 'brand';
    }
    
    get startButtonIcon() {
        return this.isRunning ? 'utility:pause' : 'utility:play';
    }
    
    get progressOffset() {
        const circumference = 2 * Math.PI * 54;
        if (!this.totalTime || this.totalTime <= 0) return circumference;
        const progress = (this.totalTime - this.timeLeft) / this.totalTime;
        const raw = circumference * (1 - progress);
        // clamp to valid range
        return Math.max(0, Math.min(circumference, raw));
    }

    get progressStyle() {
        const circumference = 2 * Math.PI * 54;
        const offset = this.progressOffset;
        // return inline style string for reliable SVG animation
        return `stroke-dashoffset: ${offset}; stroke-dasharray: ${circumference};`;
    }

    get progressCssVar() {
        const offset = this.progressOffset;
        return `--dashoffset: ${offset};`;
    }

    get progressPercent() {
        if (!this.totalTime || this.totalTime <= 0) return 0;
        const progress = (this.totalTime - this.timeLeft) / this.totalTime;
        return Math.max(0, Math.min(100, Math.round(progress * 100)));
    }
    
    // Event Handlers
    toggleTimer() {
        if (this.isRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }
    
    startTimer() {
        this.isRunning = true;
        this.timer = setInterval(() => {
            this.timeLeft--;
            
            if (this.timeLeft <= 0) {
                this.handleSessionComplete();
            }
            // update visual every tick
            this.updateProgressVisual();
        }, 1000);
    }
    
    pauseTimer() {
        this.isRunning = false;
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    
    resetTimer() {
        this.pauseTimer();
        this.timeLeft = this.isBreak ? this.breakDuration * 60 : this.workDuration * 60;
        this.totalTime = this.timeLeft;
        this.updateProgressVisual();
    }
    
    skipSession() {
        this.pauseTimer();
        this.handleSessionComplete();
    }
    
    handleSessionComplete() {
        this.pauseTimer();
        
        if (this.isBreak) {
            // Break is over, start work session
            this.isBreak = false;
            this.timeLeft = this.workDuration * 60;
            this.totalTime = this.timeLeft;
            this.showNotification('Break Over!', 'Time to get back to work!', 'info');
        } else {
            // Work session complete
            this.completedSessions++;
            
            if (this.currentSession >= 4) {
                // Long break after 4 sessions
                this.currentSession = 1;
                this.timeLeft = this.breakDuration * 60 * 3; // 3x break duration for long break
                this.showNotification('Great Work!', 'You have completed 4 sessions! Take a long break.', 'success');
            } else {
                // Short break
                this.currentSession++;
                this.timeLeft = this.breakDuration * 60;
                this.showNotification('Session Complete!', 'Time for a short break!', 'success');
            }
            
            this.isBreak = true;
            this.totalTime = this.timeLeft;
        }
        // ensure visuals reflect new session timing
        this.updateProgressVisual();
    }
    
    handleWorkDurationChange(event) {
        this.workDuration = parseInt(event.target.value, 10);
        if (!this.isBreak && !this.isRunning) {
            this.timeLeft = this.workDuration * 60;
            this.totalTime = this.timeLeft;
        }
    }
    
    handleBreakDurationChange(event) {
        this.breakDuration = parseInt(event.target.value, 10);
        if (this.isBreak && !this.isRunning) {
            this.timeLeft = this.breakDuration * 60;
            this.totalTime = this.timeLeft;
        }
    }
    
    showNotification(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: 'sticky'
        });
        this.dispatchEvent(evt);
    }
    
    // Lifecycle hooks
    connectedCallback() {
        this.totalTime = this.timeLeft;
        // initial render of progress
        setTimeout(() => this.updateProgressVisual(), 0);
    }
    
    disconnectedCallback() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    updateProgressVisual() {
        // Directly set SVG circle styles to ensure animation works across browsers
        try {
            const circle = this.template.querySelector('.progress-bar');
            if (!circle) return;
            const circumference = 2 * Math.PI * 54;
            const offset = this.progressOffset;
            // Ensure stroke-dasharray is set on the element
            circle.style.strokeDasharray = `${circumference}`;
            circle.style.strokeDashoffset = `${offset}`;
        } catch (e) {
            // ignore in environments where DOM isn't available
            // console.warn('updateProgressVisual error', e);
        }
    }
}