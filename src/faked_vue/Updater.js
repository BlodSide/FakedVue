let Updater = {
    text (node, value) {
        if (value === undefined || value === null) {
            value = '';
        }
        node.textContent = value;
    },
    bind (node, value, node_attr) {
        if (value === undefined || value === null) {
            value = '';
        }
        if (node.tagName === 'INPUT' && node_attr === 'value') {
            // special case
            node.value = value;
        } else {
            node.setAttribute(node_attr, value);
        }
    }
}


export default Updater;
