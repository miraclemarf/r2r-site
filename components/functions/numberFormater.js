export const numberFormater = (num) => {
    const newNum = Math.abs(num);
    let calcNum, max;
    if(newNum > 999999999) {
        max = 1000000000;
        calcNum = Math.sign(num)*((Math.floor(num)/max).toFixed(2).slice(0,-1));
        return calcNum + 'B' + (num > (calcNum * max) ? '+' : '');
    } else if(newNum > 999999) {
        max = 1000000;
        calcNum = Math.sign(num)*((Math.floor(num)/max).toFixed(2).slice(0,-1));
        return calcNum + 'M' + (num > (calcNum * max) ? '+' : '');
    } else if (newNum > 999) {
        max = 1000;
        calcNum = Math.sign(num)*((Math.floor(num)/max).toFixed(2).slice(0,-1));
        return calcNum + 'K' + (num > (calcNum * max) ? '+' : '');
    }
    return Math.sign(num) * newNum;
}