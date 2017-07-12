<template>
	<div class="not-found">
		<div class="not-found__text">{{text}}</div>
			<div>
			<button @click="goToIndex">возврат</button>
		</div>
	</div>
</template>

<script>

export default {
	name: 'not-found',
	data () {
		return {
			text: 'иногда есть шанс избежать необратимых последствий, жми "возврат"'
		}
	},
	methods: {
		goToIndex(){
			this.$router.push({name: 'index'});
		}
	}
}
</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.not-found {
	width: 100%;
	text-align: center;
}
.not-found__text {
	font-size: 20px;
}
</style>