export const SITE = {
  name: "Viajar Mejor",
  tagline: "Viajá con inteligencia. Aprovechá cada destino.",
  description:
    "Asesoría de viajes personalizada para personas de Argentina y Latinoamérica. Más de 55 países de experiencia real.",
  url: "https://viajarmejor.travel",
  locale: "es-AR",
};

export const CONTACT = {
  whatsapp: "+5493417424395",
  whatsappUrl: "https://wa.me/5493417424395",
  whatsappMessage:
    "Hola Andy, me gustaría conocer más sobre el servicio de asesoría de viajes.",
};

export const PLANES = {
  basico: {
    nombre: "Plan Básico",
    precio: 25,
    precioMax: 30,
    moneda: "USD",
    descripcion:
      "Planificación completa de tu viaje con itinerario personalizado.",
    incluye: [
      "Llamada inicial de 30–40 minutos",
      "Travel Blueprint personalizado (documento completo)",
      "Itinerario día a día",
      "Qué no perderse por destino",
      "Reservas con anticipación",
      "Transporte dentro y entre ciudades",
      "Seguridad y estafas por destino",
      "Checklist de equipaje",
    ],
  },
  avanzado: {
    nombre: "Plan Avanzado",
    precio: 40,
    precioMax: 50,
    moneda: "USD",
    descripcion:
      "Todo lo del Plan Básico más asesoría para trámites y documentación.",
    incluye: [
      "Todo lo del Plan Básico",
      "Asesoría para visa americana y ESTA",
      "Revisión de formularios de documentación",
      "Consejos sobre seguros de viaje",
      "Advertencias sobre errores comunes en trámites",
    ],
  },
  premium: {
    nombre: "Plan Premium",
    precio: 65,
    precioMax: 80,
    moneda: "USD",
    descripcion:
      "Acompañamiento completo antes, durante y ante cualquier imprevisto.",
    incluye: [
      "Todo lo del Plan Avanzado",
      "Soporte por WhatsApp durante el viaje (10 días)",
      "Asesoría ante imprevistos: vuelos cancelados, equipaje perdido, overbooking",
      "Derechos del pasajero y alternativas",
      "Disponible lunes a viernes, respuesta en 24 hs",
    ],
  },
};
