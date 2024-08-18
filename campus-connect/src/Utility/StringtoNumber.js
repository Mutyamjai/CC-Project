export default function StringtoNumber(data) {
    const convertedData = {};

    for (const [key, value] of Object.entries(data)) {
        if (value === "") {
            convertedData[key] = 0;
        } else {
            convertedData[key] = parseInt(value, 10);
        }
    }

    return convertedData;
}