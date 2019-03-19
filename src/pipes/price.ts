export function priceFilter(value: number) {
    if (!value) {
        value = 0;
    }
    return '￥' + value;
}
