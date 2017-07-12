import http from './http';
http
	.rest({
		name: 'main',
		baseURL: `main/`,
		interceptors: [{
			request: function (request) {
                debugger;
				console.log(request);
				return request;
			},
			response: function (response) {
                debugger;
				console.log('main res', response);
				return response;
			}
		}]
	});

export default http;