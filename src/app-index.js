import App from 'components/app.vue';
import router from '/router';
import store from '/store';
import rest from '/rest';

Vue.prototype.$http = rest;
Vue.prototype.axios = axios;

Vue.config.productionTip = false;

new Vue({
	el: '#app',
	store,
	router,
	template: '<App/>',
	components: {App}
});