let obj = { value: 10 };
function modify(a, b) {
    a.value = a.value + 10;
    b = { value: 50 };
}
modify(obj, obj);
console.log(obj.value);