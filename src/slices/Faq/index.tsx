"use client";
import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import { useState } from "react";
import { PrismicRichText } from "@prismicio/react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Faq.module.css";

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

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.faqSection}
    >
      <h2 className={styles.faqTitle}>{slice.primary.title}</h2>
      <ul className={styles.faqList}>
        {slice.primary.faq.map((item, index) => (
          <li key={index} className={styles.faqItem}>
            <button
              className={styles.faqQuestion}
              onClick={() => toggleOpen(index)}
            >
              <span className={styles.icon}>
                {openIndexes.includes(index) ? <HiMinus /> : <HiPlus />}
              </span>
              {item.question}
            </button>
            <AnimatePresence initial={false}>
              {openIndexes.includes(index) && (
                <motion.div
                  className={styles.faqAnswer}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <PrismicRichText field={item.answer} />
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
      <div className={styles.coachingSection}>
        <span>{slice.primary.coaching}</span>
        <PrismicRichText field={slice.primary.description} />
      </div>
    </section>
  );
};

export default Faq;
