const  monthsTranslations: any = {
    enero: 'enero',
    febrero: 'febrero',
    marzo: 'marzo',
    abril: 'abril',
    mayo: 'mayo',
    junio: 'junio',
    julio: 'julio',
    agosto: 'agosto',
    septiembre: 'septiembre',
    octubre: 'octubre',
    noviembre: 'noviembre',
    diciembre: 'diciembre',
};

export default function getDate(dateStr:any): any {
    const parts = dateStr.split(" ");
    if (parts.length > 0) {
        const month = parts[1]?.toLowerCase(); 
        parts[1] = monthsTranslations[month] ?? month;
    }
    const dateSanitized = parts.join(" ");
    return new Date(dateSanitized);
}
