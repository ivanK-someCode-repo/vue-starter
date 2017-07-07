import Index from '../components/index/index.vue';
import NotFound from '../components/common/404.vue';
Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/404',
			component: NotFound
		},
		{
			path: '',
			name: 'index',
            components: {
                default: Index,
                //nav: Nav,
                //main: Main
            }
		},
		{
			path: '*',
			redirect: '/404'
		}
	]
});