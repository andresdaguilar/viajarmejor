"use client";

import Image from "next/image";

// País -> código ISO 3166-1 alpha-2 (minúsculas para flagcdn)
const COUNTRIES_DATA: { name: string; code: string }[] = [
  { name: "Argentina", code: "ar" },
  { name: "Bélgica", code: "be" },
  { name: "Alemania", code: "de" },
  { name: "Bolivia", code: "bo" },
  { name: "Brasil", code: "br" },
  { name: "Chile", code: "cl" },
  { name: "China", code: "cn" },
  { name: "Cuba", code: "cu" },
  { name: "Rep. Checa", code: "cz" },
  { name: "Rep. Dominicana", code: "do" },
  { name: "El Salvador", code: "sv" },
  { name: "España", code: "es" },
  { name: "Francia", code: "fr" },
  { name: "Inglaterra", code: "gb-eng" },
  { name: "Irlanda", code: "ie" },
  { name: "Italia", code: "it" },
  { name: "Jordania", code: "jo" },
  { name: "Camboya", code: "kh" },
  { name: "México", code: "mx" },
  { name: "Malasia", code: "my" },
  { name: "Países Bajos", code: "nl" },
  { name: "Perú", code: "pe" },
  { name: "Paraguay", code: "py" },
  { name: "Singapur", code: "sg" },
  { name: "Tailandia", code: "th" },
  { name: "Estados Unidos", code: "us" },
  { name: "Uruguay", code: "uy" },
  { name: "Vaticano", code: "va" },
  { name: "Vietnam", code: "vn" },
  { name: "Grecia", code: "gr" },
  { name: "Colombia", code: "co" },
  { name: "Portugal", code: "pt" },
  { name: "Escocia", code: "gb-sct" },
  { name: "Panamá", code: "pa" },
  { name: "Mónaco", code: "mc" },
  { name: "Croacia", code: "hr" },
  { name: "Montenegro", code: "me" },
  { name: "Albania", code: "al" },
  { name: "Macedonia del Norte", code: "mk" },
  { name: "Bosnia", code: "ba" },
  { name: "Eslovenia", code: "si" },
  { name: "Noruega", code: "no" },
  { name: "Malta", code: "mt" },
  { name: "Sudáfrica", code: "za" },
  { name: "Aruba", code: "aw" },
  { name: "Curazao", code: "cw" },
  { name: "Suiza", code: "ch" },
  { name: "Liechtenstein", code: "li" },
];

const CITIES = [
  "París", "Londres", "Praga", "New York", "Dubái", "Buenos Aires", "Río de Janeiro",
  "San Francisco", "Honolulu", "Bangkok", "Berlín", "Brujas", "Ámsterdam", "Edimburgo",
  "Dublín", "Madrid", "Barcelona", "Punta del Este", "Chicago", "Ciudad del Cabo",
  "Amán", "Bogotá", "Cancún", "Punta Cana", "Miami", "La Paz", "Lisboa", "Oporto",
  "Roma", "Dubrovnik", "Tromsø", "Marsella", "Málaga", "La Valeta", "Atenas",
  "Hanói", "Kuala Lumpur", "Johannesburgo", "Estambul", "Rodas", "Zagreb", "Berna",
  "Niza", "Glasgow", "Potsdam", "Estrasburgo", "Florencia", "Venecia", "Liubliana",
  "Verona", "Zúrich", "Salzburgo", "Vaduz", "Viena", "Budapest", "Múnich", "Volendam",
  "Hallstatt", "Bruselas", "Chicago", "Santiago", "Punta del Este", "Cuzco", "Copacabana",
  "Oranjestad", "Los Ángeles", "San Diego", "Sevilla", "Colmar", "Milán", "Cádiz",
  "Belfast", "Inverness", "Aberdeen", "Trebinje", "Hong Kong",
];

const FlagItem = ({
  country,
}: {
  country: { name: string; code: string };
}) => (
  <div className="flex flex-col items-center gap-2 shrink-0 group">
    <div className="w-16 aspect-[3/2] md:w-20 overflow-hidden bg-white shadow-sm border border-stone-100 rounded-sm transition-transform group-hover:scale-110">
      <Image
        src={`https://flagcdn.com/w80/${country.code}.png`}
        alt={country.name}
        width={80}
        height={53}
        className="w-full h-full object-cover"
      />
    </div>
    <span className="text-xs text-stone-500 max-w-[70px] text-center truncate group-hover:text-stone-700 transition-colors">
      {country.name}
    </span>
  </div>
);

export function CountryFlags() {
  return (
    <section className="section bg-stone-50">
      <div className="container-site">
        <div className="overflow-hidden -mx-4">
          <div className="flex gap-6 min-w-max animate-scroll-flags">
            {[...COUNTRIES_DATA, ...COUNTRIES_DATA].map((country, i) => (
              <FlagItem key={`${country.code}-${country.name}-${i}`} country={country} />
            ))}
          </div>
        </div>

        <div className="overflow-hidden -mx-4 mt-6">
          <div className="flex min-w-max animate-scroll-cities items-center">
            {[...CITIES, ...CITIES].map((city, i) => (
              <span key={`${city}-${i}`} className="flex items-center shrink-0">
                <span className="text-stone-400 text-sm md:text-base font-medium whitespace-nowrap">
                  {city}
                </span>
                <span className="text-stone-400 mx-2 text-sm">●</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
