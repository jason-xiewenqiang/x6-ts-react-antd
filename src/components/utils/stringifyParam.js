export default obj => {
	let keys = Object.keys(obj);
	if (keys.length) {
		let stringifys = [];
		for (let i = 0; i < keys.length; i++) {
			stringifys.push(keys[i] + "=" + obj[keys[i]]);
		}
		return stringifys.join("&");
	}
	return "";
};
