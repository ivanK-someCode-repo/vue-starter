import Vue from 'vue';
import Router from 'vue-router';
import Index from '../components/index.vue';
import NotFoundComponent from '../components/common/404.vue';
Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/404', component: NotFoundComponent
		},
		{
			path: '/',
			name: 'index',
			component: Index
		},
		{
			path: '*', redirect: '/404'
		}
	]
});