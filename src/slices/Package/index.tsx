import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Script from "next/script";

/**
 * Props for `Package`.
 */
export type PackageProps = SliceComponentProps<Content.PackageSlice>;

/**
 * Component for "Package" Slices.
 */
const Package = ({ slice }: PackageProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-wrap items-stretch justify-center gap-8" // Utilisation de flex-wrap pour éviter le scroll
    >
      {slice.primary.package.map((item, index) => (
        <div
          key={index}
          className="flex h-full w-full flex-col justify-between rounded-lg bg-gray-50 shadow-md sm:w-1/2 md:w-1/3 lg:w-1/4" // Les éléments prennent la largeur disponible selon la taille de l'écran
          style={{ minHeight: "450px" }} // Hauteur minimale pour chaque bloc
        >
          <div className="flex-grow p-6 pr-6">
            {/* Ajout du padding à droite */}
            {/* Catégorie en majuscule avec mt-1 et un texte plus grand */}
            <h2 className="mt-1 text-lg font-bold uppercase text-broocksprimary md:text-xl">
              {item.category}
            </h2>
            {/* Titre sur une seule ligne */}
            <h3 className="mb-2 truncate text-base font-semibold text-broocksgold md:text-lg lg:text-xl">
              {item.title}
            </h3>
            {/* Description ajustée */}
            <div className="mb-2 pr-6 text-xs text-gray-700 md:text-sm lg:text-base">
              <PrismicRichText field={item.description} />
            </div>
          </div>
          <div className="space-y-1 p-6 pr-6 text-xs text-gray-700 md:text-sm lg:text-base">
            {/* Réduction de l'espace vertical */}
            <p className="flex items-center">
              <span className="mr-2">⏰</span>
              {item.delivery}
            </p>
            <p className="flex items-center">
              <span className="mr-2">🔄</span>
              {item.revision}
            </p>
            <p className="flex items-center">
              <span className="mr-2">✔️</span>
              {item.duration}
            </p>
          </div>
          <div className="w-full rounded-b-lg bg-broocksprimary p-4 text-center text-xl font-bold text-broocksgold md:text-2xl lg:text-3xl">
            £{item.price}
          </div>
          <iframe
            title={`Booking calendar for ${item.title}`}
            src="https://app.acuityscheduling.com/schedule.php?owner=33940838&appointmentType=70786204"
            width="100%"
            height="800"
          />
          <Script
            src="https://embed.acuityscheduling.com/js/embed.js"
            strategy="lazyOnload"
          />
        </div>
      ))}
    </section>
  );
};

export default Package;
