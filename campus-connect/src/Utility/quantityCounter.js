export default function getTotalQuantity(quantities) {
    let total = 0;
    
    for (let key in quantities) {
        total += quantities[key];
    }

    return total;
}