// allKeys = Object.keys(fullListObj);

// filter out deadKeys from all allkeys
// let newKeys = [];

// function checkDuplicates(allKeys, deadKeys) {
// 	returned = allKeys.reduce(function (prev, value) {
// 		var isDuplicate = false;
// 		for (var i = 0; i < deadKeys.length; i++) {
// 			if (value === deadKeys[i]) {
// 				isDuplicate = true;
// 				break;
// 			}
// 		}
// 		if (!isDuplicate) {
// 			prev.push(value);
// 		}
// 		return prev;
// 	}, []);
// }

// newKeys = allKeys.reduce(function (prev, value) {
// 	var isDuplicate = false;
// 	for (var i = 0; i < deadKeys.length; i++) {
// 		if (value === deadKeys[i]) {
// 			isDuplicate = true;
// 			break;
// 		}
// 	}
// 	if (!isDuplicate) {
// 		prev.push(value);
// 	}
// 	return prev;
// }, []);

// console.log(newKeys);
// finally create new object, with pairs from list of filtered keys
