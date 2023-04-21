<template>
	<section class="container my-body">
		<h2 class="my-text-color">{{ translate("apiaryAllTitle") }}</h2>
		<section class="line-1"></section>
		<section class="row mt-4">
			<section
				class="col-12 col-md-6 col-lg-3"
				v-for="apiary of this.apiaries"
				:key="apiary._id"
			>
				<section
					class="card mb-5 mh-100"
					style="
						border-radius: 10px;
						box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
							0 6px 20px 0 rgba(0, 0, 0, 0.1);
					"
				>
					<img
						:src="img"
						class="card-img-top"
						alt="..."
						style="
							width: 30%;
							display: block;
							margin-right: auto;
							margin-left: auto;
						"
					/>
					<section class="card-body">
						<h5 class="card-title text-center">
							{{ translate("lblCardApiary") }} {{ apiary.num }}
						</h5>
						<p class="card-text text-center">
							<strong>{{ apiary.location }}</strong>
						</p>
						<hr />
						<section class="text-center">
							<section class="row">
								<section class="col-sm-3 mt-1">
									<button
										data-bs-toggle="tooltip"
										v-bind:title="translate('lblCardApiaryBtn')"
										data-bs-placement="bottom"
										data-bs-custom-class="custom-tooltip"
										class="btn text-center bn_card"
										@click="detailsModal(apiary._id)"
									>
										<i class="fas fa-search" aria-hidden="true"></i>
									</button>
								</section>
								<section class="col-sm-3 mt-1">
									<button
										data-bs-toggle="tooltip"
										v-bind:title="translate('lblCardDeleteBtn')"
										data-bs-placement="bottom"
										data-bs-custom-class="custom-tooltip"
										class="btn text-center bn_card"
										@click="deleteModal(apiary._id)"
									>
										<i class="fas fa-trash" aria-hidden="true"></i>
									</button>
								</section>
								<section class="col-sm-3 mt-1">
									<button
										data-bs-toggle="tooltip"
										v-bind:title="translate('lblCardDeviceBtn')"
										data-bs-placement="bottom"
										data-bs-custom-class="custom-tooltip"
										class="btn text-center bn_card"
										@click="getApiaryDevices(apiary._id)"
									>
										<i class="fas fa-wifi" aria-hidden="true"></i>
									</button>
								</section>
								<section class="col-sm-3 mt-1">
									<button
										data-bs-toggle="tooltip"
										v-bind:title="translate('lblCardInterventionsBtn')"
										data-bs-placement="bottom"
										data-bs-custom-class="custom-tooltip"
										class="btn text-center bn_card"
										@click="interventions(apiary._id)"
									>
										<i class="fas fa-wrench"></i>
									</button>
								</section>
							</section>
						</section>
					</section>
				</section>
			</section>
		</section>
		<section class="text-center">
			<section v-if="isShow" class="text-center">
				<section class="spinner-border mt-2" role="status">
					<span class="visually-hidden">Loading...</span>
				</section>
				<section class="mb-2">{{ translate("spinnerTxt") }}</section>
			</section>
		</section>
		<ModalDetails
			v-show="isModalDetailsVisible"
			@close="closeDetailsModal"
			@edit="edit"
			:address="address"
			:observations="observations"
			:regdate="regdate"
		/>
		<ModalDelete
			v-show="isModalDeleteVisible"
			@_close="closeDeleteModal"
			@deleteAction="_delete"
		/>
		<!--<section class="spacer"></section>-->
	</section>
</template>

<style scoped>
.bn_card {
	background-color: #ebc002;
	border-radius: 10px;
	width: auto;
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
	import ModalDelete from "../components/ModalDeleteApiary.vue";
	import { notify } from "@kyvg/vue3-notification";
	import { mapGetters, mapActions } from "vuex";
	import {
		GET_USER_TOKEN_GETTER,
		GET_USER_LEVEL_GETTER,
		GET_USER_ID_GETTER,
	} from "../store/storeconstants";
	export default {
		name: "Apiaries",
		mixins: [en, pt],
		components: {
			ModalDetails,
			ModalDelete,
		},
		data() {
			const lang = localStorage.getItem("lang") || "pt";
			return {
				apiaries: [],
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
				isModalDetailsVisible: false,
				isModalDeleteVisible: false,
				showsection: false,
				toDeleteID: "",
				toEditID: "",
				toInterventionsID: "",
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
		mounted() {
			localStorage.setItem("idtoedit", "");
			this.getApiaries();
		},
		methods: {
			async getApiaries() {
				this.message.type = "";
				this.message.msg = "";
				this.isShow = true;
				this.apiaries = [];
				await axios
					.get("https://bhsapi.duartecota.com/apiary/" + this._id, {
						headers: {
							Authorization: this.token,
						},
					})
					.then((response) => {
						if (response.data.body.length == 0) {
							this.isShow = false;
							notify({
								title: this.translate("notifWarningTitle"),
								text: this.translate("mesNoApiaries"),
								type: "warn",
								duration: 3000,
								speed: 500,
							});
						} else {
							let apiaries = response.data.body;
							for (let i = 0; i < apiaries.length; i++) {
								this.apiaries.push({
									_id: apiaries[i]._id,
									num: i + 1,
									location: apiaries[i].location,
								});
							}
						}
						this.isShow = false;
					})
					.catch((error) => {
						console.log(error);
						this.isShow = false;
						this.showsection = true;
						this.message.type = "danger";
						this.message.msg = this.translate("mesProblem");
					});
			},
			translate(prop) {
				return this[this.lang][prop];
			},
			closeDetailsModal() {
				this.isModalDetailsVisible = false;
			},
			closeDeleteModal() {
				this.isModalDeleteVisible = false;
			},
			edit() {
				this.isModalDetailsVisible = false;
				localStorage.setItem("idtoedit", this.toEditID);
				this.$router.push("editapiary");
			},
			async detail(id) {
				this.isShow = true;
				this.message.type = "";
				this.message.msg = "";
				//(this.isShow = true((this.message.type = ""))), (this.message.msg = "");
				await axios
					.get("https://bhsapi.duartecota.com/apiary/one/" + id, {
						headers: {
							Authorization: this.token,
						},
					})
					.then((response) => {
						this.address = response.data.body.address;
						this.observations = response.data.body.observations;
						this.regdate = response.data.body.registration_date;
						this.isShow = false;
						return true;
					})
					.catch(() => {
						this.message.msg = "Ocorreu um problema";
						this.message.type = "warning";
						this.isShow = false;
						return false;
					});
			},
			async _delete() {
				this.isModalDeleteVisible = false;
				this.isShow = true;
				await axios
					.delete("https://bhsapi.duartecota.com/apiary/" + this.toDeleteID, {
						headers: {
							Authorization: this.token,
						},
					})
					.then((response) => {
						if (response.data.http == 200) {
							this.isShow = false;
							notify({
								title: this.translate("notifSuccessTitle"),
								text: this.translate("deleteApiarySuccess"),
								type: "success",
								duration: 3000,
								speed: 500,
							});
							this.getApiaries();
						} else if (response.data.http == 202) {
							this.isShow = false;
							notify({
								title: this.translate("notifErrorTitle"),
								text: this.translate("deleteApiaryFail"),
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
							text: this.translate("mesProblems"),
							type: "error",
							duration: 3000,
							speed: 500,
						});
					});
			},
			async detailsModal(id) {
				this.toEditID = id;
				await this.detail(id);
				this.isModalDetailsVisible = true;
			},
			async deleteModal(id) {
				this.toDeleteID = id;
				this.isModalDeleteVisible = true;
			},
			interventions(id) {
				localStorage.setItem("idtointerventions", id);
				this.$router.push("interventions");
			},
			getApiaryDevices(id) {
				localStorage.setItem("apiaryIDtoget", id);
				this.$router.push("hives");
			},
		},
	};
</script>
