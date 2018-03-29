class Dep {
    constructor() {
        this.watchers = new Set();
    }

    add_watcher(watcher_) {
        let watcher = watcher_;
        if (watcher === undefined)
            watcher = Dep.new_watcher;
        if (watcher === null || watcher === undefined)
            return;
        this.watchers.add(watcher);
    }

    notify() {
        for (let watcher of this.watchers) {
            watcher.update();
        }
    }
}


Dep.new_watcher = null;
export default Dep;
