
function binarySearch(arr, val) {
    if (!arr.length || arr.length <= 0) {
        return false;
    }
    if (arr.length == 1) {
        return (arr[0] == val);
    }
    const search0 = binarySearch(arr.slice(0, Math.floor(arr.length / 2)), val)
    const search1 = binarySearch(arr.slice(Math.floor(arr.length / 2), arr.length), val)
    return (search0 || search1);
}

const query = process.argv[2];
const testValues = [9, 44, 89, 22, 81, 100, 1, 22, 19]
const result = binarySearch(testValues, query)
console.log(result)