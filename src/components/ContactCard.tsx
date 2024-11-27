// components/ContactCard.js

import Image from "next/image";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { PrismicRichText, PrismicImage } from "@prismicio/react";

function ContactCard({ data }: any) {
  return (
    <div className="flex w-full">
      <div className="flex w-1/3 flex-col items-center justify-center bg-black p-10 text-center text-white">
        <PrismicRichText field={data.credo} />
      </div>
      <div className="w-2/3 bg-yellow-300 p-8">
        <h1 className="mb-4 text-2xl font-bold">{data.title}</h1>
        <div className="mb-4 flex items-center">
          <div className="mr-4 h-24 w-24">
            <PrismicImage field={data.image} style={{ borderRadius: "50%" }} />
          </div>
          <div>
            <p>{data.location}</p>
            <a
              href={`mailto:${data.email}`}
              className="text-blue-500 hover:text-blue-700"
            >
              {data.email}
            </a>
            <p>{data.phone}</p>
            <p>{data.open_hour_and_day}</p>
          </div>
        </div>
        <div className="flex justify-start space-x-4">
          <a
            href={data.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href={data.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href={data.spotlight}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-800"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
