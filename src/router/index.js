import Vue from "vue";
import VueRouter from "vue-router";
import PageIndex from "../views/PageIndex.vue";
import PageDetails from "../views/PageDetails.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "page-home",
		component: PageIndex,
	},
	{
		path: "/pokemon/:name",
		name: "page-details",
		component: PageDetails,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
