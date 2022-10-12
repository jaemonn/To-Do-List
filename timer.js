export default class Timer {

    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector('.timer-part-minutes'),
            seconds: root.querySelector('.timer-part-seconds'),
            control: root.querySelector('.timer-btn-control'),
            reset: root.querySelector('.timer-btn-reset')
        };

        this.interval = null;
        this.remainingSeconds = 0;


        this.updateInterfaceTime();
        this.updateInterfaceControls();

        this.el.control.addEventListener("click", () => {
            if (this.interval === null) {
                this.start();
            } else {
                this.stop();
            }

            if (this.remainingSeconds === 0) {
                alert("Set timer first!");
            }
        });

        this.el.reset.addEventListener("click", () => {
            const inputMinutes = prompt("Enter number of minutes:");

            if (inputMinutes <= 60) {
                this.stop();
                this.remainingSeconds = inputMinutes * 60;
                this.updateInterfaceTime();
            }

            if (inputMinutes > 60) {
                alert("Only a maximum of 60 minutes is allowed");
            }
        });
    }


    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        this.el.minutes.textContent = minutes.toString().padStart(2, "0 ");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0 ");
    }


    updateInterfaceControls() {
        if (this.interval === null) {
            this.el.control.innerHTML = `<i class="fa-solid fa-play"></i>`;
            this.el.control.classList.add('timer-btn-start');
            this.el.control.classList.remove('timer-btn-stop');
        } else {
            this.el.control.innerHTML = `<i class="fa-solid fa-pause deep-orange darken-4"></i>`;
            this.el.control.classList.add("timer-btn-stop");
            this.el.control.classList.remove('timer-btn-start');
        }
    }

    start() {
        if (this.remainingSeconds === 0) return;

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if (this.remainingSeconds === 0) {
                this.stop();

                const alarm_sound = new Audio("Sound Effects/alarm-clock.mp3");
                alarm_sound.play();
            }
        }, 1000);

        this.updateInterfaceControls();
    }

    stop() {
        clearInterval(this.interval);

        this.interval = null;

        this.updateInterfaceControls();
    }

    static getHTML() {
        return `
            <div class="row">
                <div class="col s12 m8 l6 offset-l3 offset-m2 center-align">
                    <div class="card card-custom">
                        <div class="card-content">
                            <span class="timer-part timer-part-minutes">00</span>
                            <span class="timer-part">:</span>
                            <span class="timer-part timer-part-seconds">00</span> <br>
                            <a class="btn-floating btn-large waves-effect waves-light light-blue darken-4 timer-btn-control timer-btn-start">
                                <i class="fa-solid fa-play"></i>
                            </a>
                            <a class="btn-floating btn-large waves-effect waves-light light-blue darken-4 timer-btn-reset">
                                <i class="fa-solid fa-clock"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}