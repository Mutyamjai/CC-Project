export default function convert_date(date){
    const shortDateOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    const dateObject = new Date(date);
    const shortReadableDate = dateObject.toLocaleString('en-US', shortDateOptions);

    return shortReadableDate;
}