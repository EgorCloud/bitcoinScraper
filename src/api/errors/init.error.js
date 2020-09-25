export default class InitError extends Error {
    constructor(message) {
        super(message);
        this.name = "initError";
    }
}
