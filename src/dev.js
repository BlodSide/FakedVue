import FakedVue from './faked_vue/FakedVue.js'


var vm = new FakedVue({
    el: '#mvvm-app',
    data: {
        word: 'Hello World!'
    },
    methods: {
        sayHi: function() {
            this.word = 'Hi, everybody!';
        }
    }
});
