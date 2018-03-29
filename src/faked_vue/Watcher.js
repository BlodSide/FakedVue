import Dep from './Dep.js'


class Watcher {
    constructor(vm, data_attr, update_callback, node, ...update_callback_args) {
        this.$vm = vm;
        this.data = vm._data;
        this.data_attr = data_attr;
        this.update_callback = update_callback;
        this.node = node;
        this.update_callback_args = update_callback_args;
        this.value = this.get_value()
    }

    get_value() {
        Dep.new_watcher = this;
        let value = this.data[this.data_attr];
        Dep.new_watcher = null;
        return value;
    }

    update() {
        let old_value = this.value;
        let new_value = this.get_value();
        if (new_value !== old_value) {
            this.value = new_value;
            this.update_callback(this.node, new_value, ...this.update_callback_args);
        }
    }
}


export default Watcher;
