import Updater from './Updater.js'
import Watcher from './Watcher.js';


class Compiler {
    static _get_node_type(node) {
        let str_node_type = {
            1: 'element',
            3: 'text',
        }
        return str_node_type[node.nodeType];
    }
    
    constructor(vm, el) {
        this.$vm = vm;
        if (Compiler._get_node_type(el) === 'element'){
            this.$el = el;
        } else {
            this.$el = document.querySelector(el);
        }
        this.init_fragment();
    }

    init_fragment() {
        let fragment = document.createDocumentFragment();
        for (let child of Array.from(this.$el.childNodes)) {
            fragment.appendChild(child);
        }
        this.$fragment = fragment;
    }

    compile() {
        let _bind_watcher = (node, data_attr, update_method, ...args) => {
            let value = this.$vm._data[data_attr];
            update_method(node, value, ...args);
            let watcher = new Watcher(this.$vm, data_attr, update_method, node, ...args);
        }

        let _compile_text = (node) => {
            let groups = /\{\{(.*)\}\}/.exec(node.textContent);
            if (groups === null) {
                return;
            }
            let data_attr = groups[1];
            _bind_watcher(node, data_attr, Updater.text);
        }

        let _compile_element = (node) => {
            for (let node_attr of Array.from(node.attributes)) {
                let node_attr_name = node_attr.name;
                if (node_attr_name === "v-model") {
                    let data_attr = node_attr.value;
                    _bind_watcher(node, data_attr, Updater.bind, 'value');
                    node.addEventListener('input', (e) => { this.$vm._data[data_attr] = e.target.value; }, false);
                    node.removeAttribute(node_attr_name);
                }
                else if (node_attr_name.startsWith("v-bind")) {
                    let binded_node_attr = node_attr_name.split(':')[1];
                    let data_attr = node_attr.value;
                    _bind_watcher(node, data_attr, Updater.bind, binded_node_attr);
                    node.removeAttribute(node_attr_name);
                }
                else if (node_attr_name.startsWith("v-on")) {
                    let event_type = node_attr_name.split(':')[1];
                    let method_name = node_attr.value;
                    let method = this.$vm.$options.methods[method_name];                    
                    node.addEventListener(event_type, method.bind(this.$vm), false);
                    node.removeAttribute(node_attr_name);
                }
            }
        }

        let _complie = (node) => {
            for (let child of node.childNodes) {
                let child_node_type = Compiler._get_node_type(child);
                if (child_node_type === "text") {
                    _compile_text(child);
                } else if (child_node_type === "element") {
                    _compile_element(child);
                }
                _complie(child);
            }
        }

        _complie((this.$fragment));
    }

    mount() {
        this.$el.appendChild(this.$fragment);
    }
}


export default Compiler;
