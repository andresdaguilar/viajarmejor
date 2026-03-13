import { createMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MapPin, User, ShieldCheck } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Sobre mí — Andy | Viajar Mejor",
  description:
    "Conocé a Andy, asesor de viajes con experiencia en más de 55 países y 200 ciudades. La persona detrás de Viajar Mejor.",
  path: "/sobre-mi",
});

const WHATSAPP_URL = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

const EXPERIENCIAS = [
  {
    emoji: "🦁",
    titulo: "Safaris en África",
    texto:
      "Kenya, Tanzania, Sudáfrica. Aprendí que un safari bien planificado es completamente distinto a uno improvisado.",
  },
  {
    emoji: "🌌",
    titulo: "Auroras boreales",
    texto:
      "Islandia, Noruega, Finlandia. La magia de estar en el lugar correcto en el momento exacto.",
  },
  {
    emoji: "🏃",
    titulo: "Maratones internacionales",
    texto:
      "Corrí maratones en distintos continentes. Viajar para correr requiere una logística completamente diferente.",
  },
  {
    emoji: "🏄",
    titulo: "Viajes de surf",
    texto:
      "Costa Rica, Portugal, Sudáfrica. Saber dónde están las olas no es suficiente — hay que saber cómo llegar a ellas.",
  },
  {
    emoji: "🚗",
    titulo: "Road trips",
    texto:
      "Miles de kilómetros en auto por distintos países. Aprendés a leer un destino diferente cuando lo recorrés desde adentro.",
  },
  {
    emoji: "🚂",
    titulo: "Viajes en tren por Europa y Asia",
    texto:
      "El tren es otra forma de viajar. Hay rutas que transforman el trayecto en parte de la experiencia.",
  },
];

const REGIONES = [
  { nombre: "Europa", paises: 25, total: 50 },
  { nombre: "América", paises: 15, total: 35 },
  { nombre: "Asia", paises: 8, total: 48 },
  { nombre: "África", paises: 5, total: 54 },
  { nombre: "Oceanía", paises: 2, total: 14 },
];

const VALORES = [
  {
    icono: MapPin,
    titulo: "Experiencia real, no información de internet",
    texto:
      "Cada consejo que doy viene de haber estado ahí. No de copiar guías o leer blogs.",
  },
  {
    icono: User,
    titulo: "Tu viaje, no el mío",
    texto:
      "No te vendo destinos ni experiencias porque me gusten a mí. Te pregunto qué querés vos y lo optimizo.",
  },
  {
    icono: ShieldCheck,
    titulo: "Honestidad ante todo",
    texto:
      "Si un destino no es para vos, te lo digo. Si algo no vale la pena, también.",
  },
];

export default function SobreMiPage() {
  return (
    <main>
      {/* Hero personal */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden border-4 border-primary-100">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
                  alt="Andy - Asesor de viajes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                  <span className="font-semibold text-stone-800">
                    55+ países ✈️
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-display-lg text-stone-900 mb-2">Andy</h1>
              <p className="text-xl text-primary-600 font-medium mb-6">
                Asesor de viajes y fundador de Viajar Mejor
              </p>
              <p className="text-stone-600 text-lg leading-relaxed">
                Viajé a más de 55 países y 200 ciudades. No como influencer —
                sino como alguien que necesitaba entender cada destino antes de
                llegar.
              </p>
              <p className="mt-4 text-stone-600 text-lg leading-relaxed">
                Con el tiempo empecé a ayudar a amigos y familia a planificar sus
                viajes. Siempre había algo que podía mejorar: una reserva que no
                sabían que debían hacer, una estafa que podían evitar, una
                experiencia que no encontraban en internet.
              </p>
              <p className="mt-4 text-stone-600 text-lg leading-relaxed">
                Eso me llevó a crear Viajar Mejor.
              </p>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-stone-500">
                <span>55+ países</span>
                <span>|</span>
                <span>200+ ciudades</span>
                <span>|</span>
                <span>10+ años viajando</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mi historia */}
      <section className="section bg-stone-50">
        <div className="container-site max-w-2xl mx-auto">
          <h2 className="text-display-md text-stone-900 text-center mb-12">
            Mi historia
          </h2>

          <div className="space-y-10 text-stone-600 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">
                Cómo empecé a viajar
              </h3>
              <p>
                Mis primeros viajes fueron de prueba y error. No tenía guías ni
                influencers que me mostraran el camino. Aprendí a moverme por el
                mundo a base de preguntar, equivocarme y volver a intentar. Cada
                destino me enseñó algo nuevo sobre planificación, presupuesto y
                las cosas que nadie te dice hasta que llegás.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">
                Lo que me enseñaron 55 países
              </h3>
              <p>
                La diferencia entre ser turista y ser viajero es enorme. El
                turista sigue el itinerario de otros. El viajero entiende por qué
                está ahí y qué puede lograr. La planificación no limita la
                aventura — la multiplica. Los errores que cometí (vuelos mal
                elegidos, reservas que no hice a tiempo, destinos que no
                investigué bien) se convirtieron en el conocimiento que hoy
                comparto.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">
                Por qué creé Viajar Mejor
              </h3>
              <p>
                Durante años amigos y familia me consultaron sobre sus viajes.
                Noté un patrón: siempre había algo que podía mejorar, una
                oportunidad que se perdían, un dolor de cabeza que podían evitar.
                Darme cuenta de que ese conocimiento tenía valor y que podía
                ayudar a más gente fue el momento en que decidí formalizarlo como
                servicio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experiencias destacadas */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeader
            title="Experiencias que me formaron"
            subtitle="Cada tipo de viaje me enseñó algo distinto."
          />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXPERIENCIAS.map((exp) => (
              <div
                key={exp.titulo}
                className="card p-6 flex flex-col"
              >
                <span className="text-3xl mb-4">{exp.emoji}</span>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">
                  {exp.titulo}
                </h3>
                <p className="text-stone-600 flex-1">{exp.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa de países */}
      <section className="section bg-stone-50">
        <div className="container-site max-w-2xl">
          <h2 className="text-display-md text-stone-900 text-center mb-12">
            Países visitados por región
          </h2>
          <div className="space-y-6">
            {REGIONES.map((region) => (
              <div key={region.nombre}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-stone-700">
                    {region.nombre}
                  </span>
                  <span className="text-stone-500">
                    {region.paises}+ países
                  </span>
                </div>
                <div className="h-3 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (region.paises / region.total) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mis valores */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeader
            badge="Cómo trabajo"
            title="Mis valores como asesor"
          />
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {VALORES.map((v) => (
              <div
                key={v.titulo}
                className="text-center p-8 rounded-2xl bg-stone-50"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary-100 flex items-center justify-center mb-4">
                  <v.icono className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">
                  {v.titulo}
                </h3>
                <p className="text-stone-600">{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-site">
          <div className="max-w-2xl mx-auto text-center p-12 rounded-3xl bg-primary-50 border border-primary-100">
            <h2 className="text-display-md text-stone-900 mb-4">
              ¿Querés que te ayude a planificar tu próximo viaje?
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/reservar"
                className="btn-primary inline-flex justify-center"
              >
                Reservar llamada
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp inline-flex justify-center"
              >
                Escribime por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
