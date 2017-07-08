import App from './components/app.vue';
import router from './router';
import store from './store';
import rest from './rest';

window.document.addEventListener('DOMContentLoaded', function () {
	Vue.prototype.$http = rest;
	Vue.prototype.axios = Axios;

	Vue.config.productionTip = false;

	new Vue({
		el: '#app',
		store,
		router,
		template: '<App/>',
		components: {App},
		render: function (createElement) {
			return createElement(App)
		}
	});
});