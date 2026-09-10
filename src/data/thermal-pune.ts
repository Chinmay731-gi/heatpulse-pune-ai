export const sensors = [
  { id: "PUNE-001", place: "FC Road", temp: 36.8, humidity: 52, pressure: 1021 },
  { id: "PUNE-002", place: "Kothrud", temp: 41.3, humidity: 38, pressure: 1018 },
  { id: "PUNE-003", place: "Hinjewadi", temp: 39.7, humidity: 41, pressure: 1019 },
  { id: "PUNE-004", place: "Viman Nagar", temp: 37.9, humidity: 45, pressure: 1020 },
  { id: "PUNE-005", place: "Baner", temp: 35.4, humidity: 55, pressure: 1022 },
  { id: "PUNE-006", place: "Hadapsar", temp: 40.1, humidity: 40, pressure: 1017 },
] as const;

export const historicalTrend = [
  { year: "2015", risk: 47 }, { year: "2018", risk: 52 }, { year: "2021", risk: 59 },
  { year: "2024", risk: 66 }, { year: "2026", risk: 72 },
];

export const forecast = [
  { day: "Today", risk: 72, temp: 34.8 }, { day: "+1", risk: 75, temp: 35.4 },
  { day: "+2", risk: 79, temp: 36.2 }, { day: "+3", risk: 84, temp: 37.1 },
  { day: "+4", risk: 88, temp: 38.0 }, { day: "+5", risk: 82, temp: 36.8 },
  { day: "+6", risk: 76, temp: 35.7 }, { day: "+7", risk: 73, temp: 35.1 },
];

export const priorities = [
  { rank: 1, zone: "Kothrud", risk: 86, level: "Critical", temp: "41.3°C", ndvi: "0.09", action: "Trees + Cool Pavement" },
  { rank: 2, zone: "Hadapsar", risk: 82, level: "Critical", temp: "40.1°C", ndvi: "0.11", action: "Shade + Cool Roofs" },
  { rank: 3, zone: "Viman Nagar", risk: 78, level: "Very High", temp: "37.9°C", ndvi: "0.14", action: "Trees + Bus Stops" },
  { rank: 4, zone: "Swargate", risk: 74, level: "Very High", temp: "38.6°C", ndvi: "0.16", action: "Cool Pavement" },
  { rank: 5, zone: "Shivajinagar", risk: 71, level: "High", temp: "37.4°C", ndvi: "0.18", action: "Trees + Shade" },
] as const;

export const factors = [
  { label: "Low Vegetation", value: 90, tone: "heat" },
  { label: "Built-up Density", value: 89, tone: "heat" },
  { label: "Traffic Exposure", value: 78, tone: "amber" },
  { label: "Shade Availability", value: 21, tone: "cool" },
] as const;

export const interventions = [
  { icon: "trees", label: "Plant Trees", value: "200 trees", active: true },
  { icon: "roofs", label: "Cool Roofs", value: "20 buildings", active: true },
  { icon: "road", label: "Cool Pavement", value: "1 km", active: true },
  { icon: "shade", label: "Shaded Bus Stops", value: "5 stops", active: true },
  { icon: "rain", label: "Rain Gardens", value: "3 sites", active: false },
] as const;
