import Button, { TextButton } from "@/components/Elements/Button/Button";
import React, { useState, useEffect } from "react";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "New Company Registration Pending",
      description:
        "New company registration pending approval. Review and approve the company to grant platform access.",
      buttonText: "Approve",
      image: "https://via.placeholder.com/200x100",
    },
    {
      title: "New Company Registration Pending",
      description:
        "New company registration pending approval. Review and approve the company to grant platform access.",
      buttonText: "Approve",
      image: "https://via.placeholder.com/200x100",
    },
    {
      title: "New Company Registration Pending",
      description:
        "New company registration pending approval. Review and approve the company to grant platform access.",
      buttonText: "Approve",
      image: "https://via.placeholder.com/200x100",
    },
    {
      title: "New Company Registration Pending",
      description:
        "New company registration pending approval. Review and approve the company to grant platform access.",
      buttonText: "Approve",
      image: "https://via.placeholder.com/200x100",
    },
    {
      title: "New Company Registration Pending",
      description:
        "New company registration pending approval. Review and approve the company to grant platform access.",
      buttonText: "Approve",
      image: "https://via.placeholder.com/200x100",
    },
    {
      title: "New Company Registration Pending",
      description:
        "New company registration pending approval. Review and approve the company to grant platform access.",
      buttonText: "Approve",
      image: "https://via.placeholder.com/200x100",
    },
  ];

  // Auto scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [slides.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative flex flex-col items-center justify-around w-full lg:flex ">
      <div className="relative flex w-full p-4 bg-white rounded-2xl">
        {/* Left Content */}
        <div className="w-2/3 ">
          <h2 className="mb-1 text-sm font-semibold text-textBlack">
            {slides[currentSlide].title}
          </h2>
          <p className="mb-4 text-xs font-normal text-textSecondary">
            {slides[currentSlide].description}
          </p>
          <TextButton
            width="w-20"
            textColor="text-white"
            backgroundColor="bg-primary"
            title={slides[currentSlide].buttonText}
            className={
              "py-1 px-4 h-8 !w-[80px] !min-w-[80px] text-xs font-normal rounded-[10px]"
            }
          />
        </div>

        {/* Right Image */}
        <div className="flex justify-end w-1/3">
          <img
            src={slides[currentSlide].image}
            alt="Slide"
            className="rounded-lg w-[102px] h-[55px]"
          />
        </div>
      </div>

      {/* Dots Navigation */}
      <div className=" flex mt-2 space-x-2 absolute bottom-[12px] ">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-[6px] h-[6px] rounded-full ${
              currentSlide === index ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
