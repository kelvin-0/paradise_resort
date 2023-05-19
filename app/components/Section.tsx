import { FC, ReactNode } from "react";

interface SectionProps {
  title: string;
  shortDescription?: string;
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ title, shortDescription, children }) => {
  return (
    <section id={title} className="bg-custom-human-skin py-24 px-16">
      {shortDescription && (
        <p className="uppercase font-semibold text-center block text-custom-orange">
          {shortDescription}
        </p>
      )}
      <h2 className="mt-4 text-5xl font-bold text-center">{title}</h2>
      <div className="mt-6 w-12 h-1 bg-custom-orange rounded-md mx-auto"></div>
      {children}
    </section>
  );
};

export default Section;
