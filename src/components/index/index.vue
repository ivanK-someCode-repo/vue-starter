<template>
	<div class="test">
		<h1 @click="msg3 = 'was clicked'">{{ msg3 }}</h1>
	</div>
</template>

<script>
export default {
	name: 'index',
	data: function () {
		return {
			msg2: 'test msg 1',
			msg3: this.$store.state.welcome
		};
	},
	computed: {
		msg ()
		{
			return this.$store.state.welcome;
		}
	}
}
</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
.test {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
* {
	color: #42b983;
}
</style>