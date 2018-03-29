import Dep from './Dep.js'


function _define_reactive(data, attr, value) {
    if (typeof value === 'object')
        observe(value);
    let dep = new Dep();
    Object.defineProperty(data, attr, {
        enumerable: true,
        configurable: false,
        get: function() {
            dep.add_watcher();
            return value;
        },
        set: function(new_value) {
            if (value !== new_value) {
                value = new_value;
                dep.notify();
            }
        }
    })
}

function observe(data) {
    for (let attr in data) {
        _define_reactive(data, attr, data[attr]);
    }
}


export default observe;
