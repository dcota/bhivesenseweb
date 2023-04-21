<template>
	<section class="container my-body">
		<h2 class="my-text-color">{{ translate("productionHiveTitle") }}</h2>
		<section class="line-1"></section>
		<section>
			<button @click="back" type="button" class="btn mt-4 me-3 my-button">
				<section v-if="!isShow">
					<i class="fas fa-arrow-left me-1 act-btn" aria-hidden="true"></i>
					{{ translate("btnBack") }}
				</section>
				<section
					v-else
					class="spinner-border spinner-border-sm"
					role="status"
				></section>
			</button>
			<button @click="modalHarvest" type="button" class="btn mt-4 my-button">
				<section v-if="!isShow">
					<i class="fas fa-plus me-1 act-btn" aria-hidden="true"></i>
					{{ translate("dashHarvestTitle") }}
				</section>
				<section
					v-else
					class="spinner-border spinner-border-sm"
					role="status"
				></section>
			</button>
			<section v-if="hasData" class="mt-3">
				<h5>{{ translate("totalHiveProduction") }} {{ total }} kg</h5>
			</section>
		</section>

		<section class="card p-2 mt-3" v-if="hasData" style="border-radius: 10px">
			<section class="h5 text-center" id="title" v-html="title"></section>
			<!--<Line v-if="loaded" :data="data" :options="options" />-->
			<line-chart
				v-if="loaded"
				:data="hiveProduction"
				:min="0"
				:max="max"
				:download="true"
				width="100%"
				class="ch"
				:colors="['#a17f05']"
				:dataset="{ borderWidth: 2 }"
				loading="Loading..."
				xtitle="Date"
				:ytitle="ytitle"
			></line-chart>
		</section>
		<ModalHarvest
			v-show="isModalHarvestVisible"
			:value="value"
			@close="closeModalHarvest"
			@register="register"
		/>
	</section>
</template>
  
  <style scoped>
.bn_card {
	background-color: #ebc002;
	border-radius: 10px;
	width: 100px;
}

.bn_card:hover {
	background-color: #947902;
}
.spacer {
	height: 200px;
}
</style>
  
  <script>
	import en from "../assets/en.js";
	import pt from "../assets/pt.js";
	import axios from "axios";
	import ModalDetails from "../components/ModalApiaryDetails.vue";
	import ModalUnassign from "../components/ModalUnassign.vue";
	import ModalHarvest from "../components/ModalHarvest.vue";
	import { notify } from "@kyvg/vue3-notification";
	import { mapGetters } from "vuex";
	import {
		GET_USER_TOKEN_GETTER,
		GET_USER_LEVEL_GETTER,
		GET_USER_ID_GETTER,
	} from "../store/storeconstants";
	import { has } from "lodash";
	export default {
		name: "Apiaries",
		mixins: [en, pt],
		components: {
			ModalDetails,
			ModalUnassign,
			ModalHarvest,
		},
		data: function () {
			const lang = localStorage.getItem("lang") || "pt";
			return {
				green: require("../assets/green.png"),
				red: require("../assets/red.png"),
				devices: [],
				hiveProduction: [],
				img: require("../assets/IMG1220.png"),
				lang: lang,
				message: {
					type: "",
					msg: "",
				},
				address: "",
				observations: "",
				regdate: "",
				isShow: true,
				isModalHarvestVisible: false,
				showsection: false,
				toDeleteID: "",
				toEditID: "",
				toInterventionsID: "",
				hasData: false,
				ytitle: "",
				title: "",
				total: 0,
				value: 0,
			};
		},
		computed: {
			...mapGetters("auth", {
				token: GET_USER_TOKEN_GETTER,
				level: GET_USER_LEVEL_GETTER,
				_id: GET_USER_ID_GETTER,
				el: "#app",
			}),
		},
		created() {
			this.hasData = false;
		},
		mounted() {
			this.getHiveProduction();
			this.getLatestWeight();
		},
		methods: {
			async getHiveProduction() {
				this.ytitle = "WEIGHT";
				this.title = this.translate("charHarvestHiveTitle") + " (kg)";
				this.max = 100;
				this.loaded = false;
				this.isShow = true;
				this.hiveProduction = [];
				await axios
					.get(
						"https://bhsapi.duartecota.com/harvest/hive/" +
							localStorage.getItem("hiveIDtoget"),
						{
							headers: {
								Authorization: this.token,
							},
						}
					)
					.then((response) => {
						let d = response.data.body;
						if (d.length == 0) {
							this.hasData = false;
							this.isShow = false;
							notify({
								title: this.translate("notifWarningTitle"),
								text: this.translate("noDataForHive"),
								type: "warn",
								duration: 3000,
								speed: 500,
							});
						} else {
							this.hasData = true;
							for (let i = 0; i < d.length; i++) {
								let lastDate = new Date(
									d[i].registration_date.toLocaleString("sv-SE", {
										timeZone: "Atlantic/Azores",
									})
								);
								let tempArray = [];
								let year = lastDate.getFullYear();
								let month = lastDate.getMonth() + 1;
								let day = lastDate.getDate();
								let x = year + "-" + month + "-" + day;
								tempArray.push(x);
								let y = d[i].weight_registered;
								tempArray.push(y);
								this.hiveProduction.push(tempArray);
							}
							this.loaded = true;
						}
						this.isShow = false;
						this.hiveProduction.forEach((element) => {
							this.total = this.total + element[1];
						});
					})
					.catch(() => {});
			},
			translate(prop) {
				return this[this.lang][prop];
			},
			modalHarvest() {
				this.isModalHarvestVisible = true;
			},
			closeModalHarvest() {
				this.isModalHarvestVisible = false;
			},
			async deleteModal(id) {
				this.toDeleteID = id;
				this.isModalDeleteVisible = true;
			},
			interventions(id) {
				localStorage.setItem("idtointerventions", id);
				this.$router.push("interventions");
			},
			back() {
				this.$router.push("productionapiary");
			},
			loadDetails(id) {
				localStorage.setItem("lastroute", this.$route.path);
				localStorage.setItem("hiveIDtoget", id);
				this.$router.push("/hivedetails");
			},
			loadEditPage(id) {
				localStorage.setItem("hiveidtoedit", id);
				this.$router.push("/editdevice");
			},
			setToUnassign(id) {
				localStorage.setItem("idtounassign", id);
				this.isModalUnassignVisible = true;
			},
			harvest() {
				alert("clique");
			},
			async getLatestWeight() {
				this.isShow = true;
				//this.devices = [];
				await axios
					.get(
						"https://bhsapi.duartecota.com/device/latest/" +
							localStorage.getItem("hiveIDtoget") +
							"/" +
							localStorage.getItem("apiaryIDtoget"),
						{
							headers: {
								Authorization: this.token,
							},
						}
					)
					.then((response) => {
						let device = response.data.body.data;
						if (!device) {
							this.hasData = false;
							this.isShow = false;
						} else {
							this.value = device.w;
						}
						this.isShow = false;
					})
					.catch((error) => {
						console.log(error);
						this.isShow = false;
						this.showsection = true;
					});
			},
			async register() {
				this.isModalHarvestVisible = false;
				this.isShow = true;
				let apiary = localStorage.getItem("apiaryIDtoget");
				let hive = localStorage.getItem("hiveIDtoget");
				let weight_registered = parseFloat(localStorage.getItem("harvestValue"));
				console.log(apiary);
				console.log(hive);
				console.log(this.value);
				console.log(weight_registered);
				this.isShow = false;
				let postData = {
					user: this._id,
					apiary: apiary,
					device: hive,
					weight_reported: this.value,
					weight_registered: parseFloat(localStorage.getItem("harvestValue")),
				};
				await axios
					.post("https://bhsapi.duartecota.com/harvest", postData, {
						headers: {
							Authorization: this.token,
						},
					})
					.then((response) => {
						if (response.data.http == 201) {
							this.isShow = false;
							notify({
								title: this.translate("notifSuccessTitle"),
								text: this.translate("mesNewHarvest"),
								type: "success",
								duration: 3000,
								speed: 500,
							});
						} else {
							this.isShow = false;
							notify({
								title: this.translate("notifErrorTitle"),
								text: this.translate("mesProblem"),
								type: "error",
								duration: 3000,
								speed: 500,
							});
						}
					})
					.catch(() => {
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
		},
	};
</script>
  