<template>
	<section class="container my-body">
		<h2 class="my-text-color">{{ translate("interventionsTitle") }}</h2>
		<section class="line-1"></section>
		<section class="mt-4">
			<button @click="formNew" class="btn my-button me-3">
				<section v-if="!isShow">
					{{ translate("btnNew") }}
				</section>
				<section
					v-else
					class="spinner-border spinner-border-sm"
					role="status"
				></section>
			</button>
			<button @click="back" class="btn my-button">
				<section v-if="!isShow">
					{{ translate("btnBack") }}
				</section>
				<section
					v-else
					class="spinner-border spinner-border-sm"
					role="status"
				></section>
			</button>
		</section>

		<section class="mt-4" v-if="hasInterventions != false">
			<v-calendar
				:locale="lang"
				is-expanded
				:attributes="attributes"
				:rows="1"
				:columns="3"
				@dayclick="dayClicked"
			>
			</v-calendar>
		</section>
	</section>
</template>

<style scoped>
</style>

<script>
	import en from "../assets/en.js";
	import pt from "../assets/pt.js";
	import axios from "axios";
	import { notify } from "@kyvg/vue3-notification";
	export default {
		mixins: [en, pt],
		data() {
			const lang = localStorage.getItem("lang") || "pt";
			/*const todos = [
																																																																																																																						{
																																																																																																																							description: "Take Noah to basketball practice.",
																																																																																																																							isComplete: true,
																																																																																																																							dates: { days: 6 }, // Every Friday
																																																																																																																							color: "red",
																																																																																																																							order: 0,
																																																																																																																						},
																																																																																																																						{
																																																																																																																							description:
																																																																																																																								"Take Laura to basketball practice dadas asdasd asdas dasd asd asda sdas dsad .",
																																																																																																																							isComplete: false,
																																																																																																																							dates: new Date(year, month, 12),
																																																																																																																							color: "green",
																																																																																																																							order: 0,
																																																																																																																						},
																																																																																																																						{
																																																																																																																							description:
																																																																																																																								"Take Laura to basketball practice dadas asdasd asdas dasd asd asda sdas dsad .",
																																																																																																																							isComplete: false,
																																																																																																																							dates: {
																																																																																																																								start: new Date(year, month, 6),
																																																																																																																								end: new Date(year, month, 8),
																																																																																																																							},
																																																																																																																							color: "green",
																																																																																																																							order: 2,
																																																																																																																						},
																																																																																																																					];*/
			return {
				interventions: [],
				lang: lang,
				isShow: false,
				hasInterventions: false,
			};
		},
		computed: {
			attributes() {
				return [
					...this.interventions.map((todo) => ({
						_id: todo._id,
						dates: todo.dates,
						highlight: {
							color: todo.color,
							start: { fillMode: "solid", color: todo.color },
							base: { fillMode: "light", color: todo.color },
							end: { fillMode: "solid", color: todo.color },
							//order: todo.order,
							//class: todo.isComplete ? "opacity-50" : "",
						},
						popover: {
							label: todo.description,
							visibility: "hover",
						},
					})),
				];
			},
		},
		mounted() {
			this.getInterventions();
		},
		methods: {
			async getInterventions() {
				this.interventions = [];
				this.isShow = true;
				await axios
					.get(
						"https://bhsapi.duartecota.com/intervention/apiary/" +
							localStorage.getItem("idtointerventions"),
						{
							headers: {
								Authorization: this.token,
							},
						}
					)
					.then((response) => {
						this.isShow = false;
						if (response.data.body.length == 0) {
							this.hasInterventions = false;
							notify({
								title: this.translate("notifWarningTitle"),
								text: this.translate("mesNoInterventions"),
								type: "warn",
								duration: 3000,
								speed: 500,
							});
						} else {
							this.hasInterventions = true;
							this.interventions = [];
							let resArray = response.data.body;
							for (let i = 0; i < resArray.length; i++) {
								let sd = new Date(resArray[i].startDate);
								let ed = new Date(resArray[i].endDate);
								console.log(sd + ";" + ed);
								let dates = "";
								dates = {
									start: sd,
									end: ed,
								};
								let color;
								if (resArray[i].type == 1) color = "green";
								else if (resArray[i].type == 2) color = "orange";
								else color = "red";
								this.interventions.push({
									_id: resArray[i]._id,
									color: color,
									dates: dates,
									description: resArray[i].description,
									startTime: resArray[i].startTime,
									endTime: resArray[i].endTime,
									observations: resArray[i].observations,
								});
							}
							console.log(this.interventions);
						}
					})
					.catch((error) => {
						this.isShow = false;
						notify({
							title: this.translate("notifErrorTitle"),
							text: this.translate("mesProblem"),
							type: "error",
							duration: 3000,
							speed: 500,
						});
					});
			},
			translate(prop) {
				return this[this.lang][prop];
			},
			padTo2Digits(num) {
				return String(num).padStart(2, "0");
			},
			dayClicked(day) {
				let date = new Date(day.id);
				console.log(day.id);
				console.log("date: " + date.getTime()); //get timestamp of date
				for (let i = 0; i < this.interventions.length; i++) {
					let sd = new Date(this.interventions[i].dates.start);
					let sdConv = this.padTo2Digits(
						sd.toLocaleDateString("sv-SE", {
							year: "numeric",
							month: "2-digit",
							day: "2-digit",
						})
					);
					console.log(sdConv);
					let sdFinal = new Date(sdConv);
					let ed = new Date(this.interventions[i].dates.end);
					if (sdFinal.getTime() == date.getTime()) {
						console.log(this.interventions[i].observations);
					}
				}
			},
			back() {
				this.$router.push("apiaries");
			},
			formNew() {
				this.$router.push("newintervention");
			},
		},
	};
</script>