export default function calculateTotalPrice(washingData, laundryQuantities) {
    let totalPrice = 0;

    washingData.forEach(item => {
        const quantity = laundryQuantities[item.name] || 0;
        totalPrice += quantity * item.price;
    });

    return totalPrice;
}