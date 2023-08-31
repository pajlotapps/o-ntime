export const linksArray = [
  {
    label: "Start",
    href: "/"
  },
  {
    label: "Target",
    href: "/target"
  },
  {
    label: "Execute",
    href: "/execute"
  },
  {
    label: "Disclaimer",
    href: "/disclaimer"
  },
  {
    label: "Contact",
    href: "/contact"
  }
];

export const latReg = /^([0-8]\d|90)([0-5]\d)([0-5]\d)/
export const longReg = /^(0\d{2}|1[0-7]\d|180)([0-5]\d)([0-5]\d)$/

export const toLMT = new Intl.DateTimeFormat("pl-PL", {
  hour: '2-digit', 
  minute: '2-digit', 
  second: '2-digit',
})

export const toUTC = new Intl.DateTimeFormat("pl-PL", {
  hour: '2-digit', 
  minute: '2-digit', 
  second: '2-digit',
  dayPeriod: "short",
  timeZone: "UTC",
})