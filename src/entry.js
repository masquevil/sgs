var imgs = require('./img.json');
var countries = {
    '吴': 'wu',
    '蜀': 'shu',
    '魏': 'wei',
    '群': 'qun',
    '神': 'shen'
};
imgs = imgs.map(function(name){
    return {
        key: countries[name.slice(5, 6)] + name.slice(6, 8) + name.slice(9),
        file: name,
        url: ''
    };
}).sort(function(a, b){
    return a.key < b.key ? -1 : 1;
});

window.page = new Vue({
    el: "#root",
    data: {
        imgs: imgs,
        keyword: '',
        country: '',
        countries: $.extend({'全': ''}, countries)
    },
    computed: {
        result: function(){
            var vm = this, result;
            result = imgs.filter(function(img){
                return !!~img.key.indexOf(vm.keyword.toLowerCase()) && img.key.indexOf(vm.country) === 0;
            });
            result[0].url = result[0].file;
            return result;
        }
    },
    methods: {
        showImg: function(index){
            this.result[index].url = this.result[index].file;
        }
    }
});
