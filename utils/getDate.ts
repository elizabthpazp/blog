const monthsTranslations: any = {
    enero: 'January',
    febrero: 'February',
    marzo: 'March',
    abril: 'April',
    mayo: 'May',
    junio: 'June',
    julio: 'July',
    agosto: 'August',
    septiembre: 'September',
    octubre: 'October',
    noviembre: 'November',
    diciembre: 'December',
};

export default function getDate(dateStr:any): any { 
    const parts = dateStr.split(" ");
    if (parts.length > 0) {
        const month = parts[1]?.toLowerCase(); 
        parts[1] = monthsTranslations[month] ?? month;
    }
    const dateSanitized = parts.join(" ");  
    return new Date(dateSanitized).getTime();
}
