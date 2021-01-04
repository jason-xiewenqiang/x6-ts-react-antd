import Vue from "vue";
import routes from "./routes";
import Router from "vue-router";
import parseCookie from "../utils/parseCookie";

Vue.use(Router);

const router = new Router({
	mode: "hash",
	routes
});

// 本地登录3.88 拿到cookie，不同机器登录不一样
document.cookie = "X_GU_SID=XSS_KKUfilOiEp6MuQ7iYdZLaEyRpccX0zrfVjvlMehlPBA35kY";
// 登录态判断和路由拦截
// router.beforeEach((to, from, next) => {
// 	// 如果cookie为空则直接进入登录  or 有cookie则需要判断session是否存在
// 	if (!parseCookie(document.cookie)["X_GU_SID"]) {
// 		next(false);
// 		window.location.replace("/page/authority/login/login.html");
// 	} else {
// 		next(true);
// 	}
// });

export default router;
