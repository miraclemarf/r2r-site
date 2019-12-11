export const accTotalPrice = (data) => {
    let total = 0
    data.forEach(element => {
        total += element.price*element.quantity
    });  
    return total
}