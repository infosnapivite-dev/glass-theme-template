// Calendar utility for Ivan & Anna's Wedding
export const WEDDING_DETAILS = {
  title: "Wedding of Ivan & Anna",
  description: "We are thrilled to celebrate our wedding day with you! Venue: 'All Seasons' Restaurant, 34 Bolshaya Morskaya St.",
  location: "'All Seasons' Restaurant, 34 Bolshaya Morskaya St.",
  startDate: "20250815T150000",
  endDate: "20250815T230000",
  startISO: "2025-08-15T15:00:00",
  endISO: "2025-08-15T23:00:00",
};

export const getGoogleCalendarUrl = () => {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const params = new URLSearchParams({
    text: WEDDING_DETAILS.title,
    dates: `${WEDDING_DETAILS.startDate}/${WEDDING_DETAILS.endDate}`,
    details: WEDDING_DETAILS.description,
    location: WEDDING_DETAILS.location,
  });
  return `${base}&${params.toString()}`;
};

export const downloadIcsFile = () => {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ivan and Anna Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `SUMMARY:${WEDDING_DETAILS.title}`,
    `DESCRIPTION:${WEDDING_DETAILS.description}`,
    `LOCATION:${WEDDING_DETAILS.location}`,
    `DTSTART:${WEDDING_DETAILS.startDate}`,
    `DTEND:${WEDDING_DETAILS.endDate}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Ivan_and_Anna_Wedding.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
