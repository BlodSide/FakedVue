import observe from './Observer.js'
import Compiler from './Compiler.js'


class FakedVue {
    constructor (options) {
        this.$options = options;
        this._data = this.$options.data;
        for (let data_attr in this._data) {
            Object.defineProperty(this, data_attr, {
                configurable: false,
                enumerable: true,
                get: function() {
                    return this._data[data_attr];
                },
                set: function(value) {
                    this._data[data_attr] = value;
                }
            });
        }

        observe(this._data);
        let compiler = new Compiler(this, options.el);
        compiler.compile();
        compiler.mount();
    }
}


export default FakedVue;
