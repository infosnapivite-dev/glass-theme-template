// Calendar utility for Aarav & Ananya's Wedding
export const WEDDING_DETAILS = {
  title: "Wedding of Aarav & Ananya",
  description: "We are thrilled to celebrate our Shubh Vivah with you! Venue: The Oberoi Udaivilas, Udaipur, Rajasthan.",
  location: "The Oberoi Udaivilas, Haridas Ji Ki Magri, Udaipur, Rajasthan 313001",
  startDate: "20251128T160000",
  endDate: "20251128T235900",
  startISO: "2025-11-28T16:00:00",
  endISO: "2025-11-28T23:59:00",
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
    "PRODID:-//Aarav and Ananya Wedding//EN",
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
  link.setAttribute("download", "Aarav_and_Ananya_Wedding.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
