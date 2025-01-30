import Image from "next/image";
import HelpComponent from "./HelpComponent";
import Backarrowthinner from "@/Icons/Backarrowthinner";

const FAQComponent = ({ selectedTopic, faqItems, onBackClick }) => {
  return (
    <div className="md:w-[70%] w-full mx-auto p-4 bg-white shadow-lg rounded-2xl">
      <div className="flex gap-2 mb-2">
        <button onClick={onBackClick}>
          <Backarrowthinner className="h-4 w-4" />
        </button>
        <div className="my-auto">
          <h2 className="m-auto text-sm font-medium">{selectedTopic}</h2>
        </div>
      </div>
      {selectedTopic in faqItems ? (
        faqItems[selectedTopic].map((faq, index) => (
          <HelpComponent
            key={index}
            isLastItem={faqItems[selectedTopic].length === index + 1}
            question={faq.question}
            answer={faq.answer}
          />
        ))
      ) : (
        <p className="text-xs">No content available for this topic.</p>
      )}
    </div>
  );
};

export default FAQComponent;
