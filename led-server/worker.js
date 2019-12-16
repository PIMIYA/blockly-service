class Worker {
    constructor() {
        this.interval = 100;

        this.currentWorker = null;
        this.locked = false;

        this.lastIdleTime = null;
        /** @type {number} milliseconds, default is 10 mins */
        this.resetToArtModeTime = 1000 * 60 * 10;
        /** @type {Function} action to reset to art mode */
        this.actionToArtMode = null;
    }

    /**
     *
     * @param {number} waitingTime milliseconds, default is 10 mins
     * @param {Function} action to reset to art mode
     */
    setResetToArtMode(waitingTime, callback) {
        this.resetToArtModeTime = waitingTime;
        this.actionToArtMode = callback;
    }

    startWaitingToArtMode() {
        this.lastIdleTime = Date.now();
    }

    stopWaitingToArtMode() {
        this.lastIdleTime = null;
    }

    resetToArtModeIfNeeded() {
        let _ = this;
        if (!_.lastIdleTime) {
            return;
        }

        let elapsed = Date.now() - _.lastIdleTime;
        // console.log(`Elapsed art mode time: ${elapsed}`);
        if (elapsed < _.resetToArtModeTime) {
            return;
        }

        if (_.actionToArtMode) {
            _.actionToArtMode();
        }

        _.lastIdleTime = Date.now();
    }

    loop() {
        let _ = this;

        if (_.locked) {
            return;
        }

        _.locked = true;

        try {
            _.resetToArtModeIfNeeded();
        } catch (error) {
            console.error(error);
        } finally {
            _.locked = false;
        }
    }

    start() {
        let _ = this;

        if (!_.currentWorker) {
            _.currentWorker = setInterval(() => {
                _.loop();
            }, _.interval);

            console.log('Worker started');
        } else {
            console.log('The Worker is already running');
        }
    }

    stop() {
        let _ = this;

        if (_.currentWorker) {
            clearInterval(_.currentWorker);
            _.currentWorker = null;
        }

        console.log('The Worker is stopped.');
    }
}

module.exports = new Worker();