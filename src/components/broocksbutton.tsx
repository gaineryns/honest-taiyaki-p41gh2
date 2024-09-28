import React from "react";

type TalentButtonProps = {
  name: string;
  textColor?: string;
  font?: string;
  size?: string;
};

const TalentButton = ({
  name,
  textColor = "text-black",
  font = "font-montserrat",
  size = "w-[70%]",
}: TalentButtonProps) => {
  return (
    <button
      className={`mx-auto mt-2 block ${size} border-broocksprimary rounded-full border bg-transparent px-2 py-1 text-center uppercase ${textColor} ${font}`}
    >
      {name}
    </button>
  );
};

export default TalentButton;
