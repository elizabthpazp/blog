const monthsTranslations: Record<string, string> = {
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

export default function getDate(dateStr: any): number { 
  if (!dateStr || typeof dateStr !== 'string') return 0;

  try {
    const cleaned = dateStr.replace(/["']/g, '').trim();
    const parts = cleaned.split(/\s+/);

    if (parts.length >= 3) {
      const day = parseInt(parts[0], 10);
      const monthRaw = parts[1]?.toLowerCase();
      const monthEnglish = monthsTranslations[monthRaw] || parts[1];
      const year = parseInt(parts[2], 10);

      const parsedDate = new Date(`${monthEnglish} ${day}, ${year}`);
      const timestamp = parsedDate.getTime();
      if (!isNaN(timestamp)) return timestamp;
    }

    const directTimestamp = new Date(cleaned).getTime();
    return isNaN(directTimestamp) ? 0 : directTimestamp;
  } catch (e) {
    return 0;
  }
}
