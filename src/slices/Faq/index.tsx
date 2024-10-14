"use client";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Props for `Faq`.
 */
export type FaqProps = SliceComponentProps<Content.FaqSlice>;

/**
 * Component for "Faq" Slices.
 */
const Faq = ({ slice }: FaqProps): JSX.Element => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleOpen = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  // Custom components for styling lists and links within PrismicRichText
  const richTextComponents = {
    list: ({ children }: any) => <ul className="list-disc pl-8">{children}</ul>,
    listItem: ({ children }: any) => <li className="mb-2">{children}</li>,
    hyperlink: ({ node, children }: any) => (
      <a href={node.data.url} className="text-broocksprimary hover:underline">
        {children}
      </a>
    ),
  };

  return (
    <section className="bg-white p-8">
      <h2 className="mb-4 text-3xl font-bold">{slice.primary.title}</h2>
      <ul className="m-0 list-none p-0">
        {slice.primary.faq.map((item, index) => (
          <li key={index} className="mb-4">
            <button
              className="flex w-full cursor-pointer items-center border-none bg-none p-0 text-left text-lg font-normal text-gray-800"
              onClick={() => toggleOpen(index)}
            >
              <span className="mr-2 text-3xl text-broocksprimary">
                {openIndexes.includes(index) ? <HiMinus /> : <HiPlus />}
              </span>
              {item.question}
            </button>
            <AnimatePresence initial={false}>
              {openIndexes.includes(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-2 overflow-hidden pl-8 text-base text-gray-600"
                >
                  <PrismicRichText
                    field={item.answer}
                    components={richTextComponents}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <span className="mb-2 block text-2xl font-bold text-broocksprimary">
          {slice.primary.coaching}
        </span>
        <PrismicRichText
          field={slice.primary.description}
          components={richTextComponents}
        />
      </div>
    </section>
  );
};

export default Faq;
