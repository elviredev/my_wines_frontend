import tourArgent from "@/assets/images/tour-argent.jpg"
import chateauBellevue from "@/assets/images/chateau-bellevue.jpg"
import closStMartin from "@/assets/images/clos-st-martin.jpg"
import coteRhone from "@/assets/images/cote-rhone.jpg"
import gevreyChambertin from "@/assets/images/gevrey-chambertin.jpg"
import laBastide from "@/assets/images/la-bastide.jpg"
import rochebleue from "@/assets/images/rochebleue.jpg"
import sancerre from "@/assets/images/tourtes-sancerre.jpg"


const wines = [
  { src: tourArgent, alt: "Château La Tour d'Argent" },
  { src: gevreyChambertin, alt: "Gevrey Chambertin" },
  { src: chateauBellevue, alt: "Château Bellevue" },
  { src: coteRhone, alt: "Côtes du Rhône" },
  { src: rochebleue, alt: "Domaine de la Rochebleue" },
  { src: sancerre, alt: "Château des Tourtes" },
  { src: laBastide, alt: "Domaine de La Bastide" },
  { src: closStMartin, alt: "Domaine du Clos Saint-Martin" }
]

const duplicated = [...wines, ...wines]

const WineShowcase = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .header-animate {
          animation: fadeSlideUp 0.6s ease both;
        }
        .header-animate:nth-child(1) { animation-delay: 0.1s; }
        .header-animate:nth-child(2) { animation-delay: 0.25s; }
        .header-animate:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="header-animate text-xs font-bold uppercase tracking-widest text-rose-700 mb-2">
            Sélection
          </p>
          <h2 className="header-animate text-2xl font-extrabold text-gray-800">
             Quelques bouteilles de la cave de mes rêves
          </h2>
          <p className="header-animate text-sm text-gray-400 mt-1">
            Une sélection de vins que j'apprécierais particulièrement.
          </p>
        </div>

        {/* Fade edges */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10"
            style={{ background: 'linear-gradient(to right, #f9fafb, transparent)' }} />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10"
            style={{ background: 'linear-gradient(to left, #f9fafb, transparent)' }} />

          {/* Marquee */}
          <div className="overflow-hidden pt-2">
            <div className="marquee-track">
              {duplicated.map(({ src, alt }, i) => (
                <div
                  key={`${alt}-${i}`}
                  className="mx-4 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-xl hover:border-rose-300 hover:bg-rose-50/30 hover:-translate-y-1 transition-all duration-300 p-3 flex items-center justify-center shrink-0"
                  style={{ width: '125px', height: '125px' }}
                >
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default WineShowcase