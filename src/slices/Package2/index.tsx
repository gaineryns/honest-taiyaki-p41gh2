import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Package2`.
 */
export type Package2Props = SliceComponentProps<Content.Package2Slice>;

/**
 * Component for "Package2" Slices.
 */
const Package2 = ({ slice }: Package2Props): JSX.Element => {
  // Vérifie si la variation est "rightPicture" ou "leftPicture"
  const isRightPicture = slice.variation === "rightPicture";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-10"
    >
      <div
        className={`flex flex-col items-center md:flex-row ${
          isRightPicture ? "md:flex-row-reverse" : ""
        } gap-8`}
      >
        {/* Affichage de l'image */}
        <div className="w-full md:w-1/2">
          <PrismicNextImage
            field={slice.primary.image}
            className="h-auto w-full"
          />
        </div>

        {/* Affichage des autres éléments */}
        <div className="flex w-full flex-col items-start md:w-1/2">
          {/* Category en h2 et avec la couleur broocksprimary */}
          <h2 className="mb-0 text-2xl font-bold text-broocksprimary">
            {slice.primary.category}
          </h2>

          {/* Title en sous-titre */}
          <h3 className="mb-4 text-lg text-gray-600">{slice.primary.title}</h3>

          <div className="mb-4 text-base text-gray-700">
            <PrismicRichText
              field={slice.primary.description}
              components={{
                // Customisation du rendu des éléments <ul> et <li> avec Tailwind CSS
                list: ({ children }) => (
                  <ul className="pl-6">{children}</ul> // Ajout de padding à gauche
                ),
                listItem: ({ children }) => (
                  <li className="list-disc pl-4 text-lg text-gray-700">
                    {children}
                  </li>
                ),
              }}
            />
          </div>

          {/* Bouton REQUEST MORE INFO */}
          <PrismicNextLink
            field={slice.primary.link}
            className="rounded-md bg-broocksprimary px-4 py-2 text-white transition-colors duration-300"
          >
            REQUEST MORE INFO
          </PrismicNextLink>
        </div>
      </div>
    </section>
  );
};

export default Package2;
