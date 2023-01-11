<template>
	<section class="dashboard">
		<section>
			<Sidebar />
		</section>
		<section class="content">
			<router-view />
		</section>
	</section>
</template>

<script>
	import Sidebar from "../components/Sidebar";
	export default {
		name: "home",
		components: {
			Sidebar,
		},
	};
</script>

<style scoped>
.dashboard {
	display: grid;
	grid-template-columns: 250px auto;
}

.content {
	background-color: #ebc002;
	overflow-y: auto;
}
</style>