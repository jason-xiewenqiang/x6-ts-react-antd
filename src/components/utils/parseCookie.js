/**
 * 解析cookie
 * @param {cookie: document.cookie}
 * @return {Object: key-value}
 */
export default cookie => {
	const cookieMap = {};
	cookie.split(";").forEach(coo => {
		let str = coo.trim();
		cookieMap[str.split("=")[0]] = str.split("=")[1];
	});
	return cookieMap;
};
