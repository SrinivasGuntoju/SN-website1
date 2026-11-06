import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface SkinConcernQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SkinConcernQuiz: React.FC<SkinConcernQuizProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    feel: '',
    concern: '',
    routine: '',
  });

  if (!isOpen) return null;

  const questions = [
    {
      title: 'How does your skin feel 20 minutes after washing your face?',
      options: [
        { label: 'Tight, stretchy, or flaky', value: 'dry' },
        { label: 'Oily and shiny on forehead/nose', value: 'oily' },
        { label: 'Comfortable, neither dry nor oily', value: 'normal' },
        { label: 'Prone to redness or stinging', value: 'sensitive' },
      ],
    },
    {
      title: 'What is your primary skin wellness goal right now?',
      options: [
        { label: 'Deep cleanse urban pollution & excess oil', value: 'charcoal' },
        { label: 'Reverse sun tan & restore bridal golden glow', value: 'ubtan' },
        { label: 'Fade dark spots, acne marks & pigmentation', value: 'papaya' },
        { label: 'Intense moisture, suppleness & fine lines', value: 'goat_wine' },
        { label: 'Daily antioxidant boost & youthful radiance', value: 'red_wine' },
      ],
    },
    {
      title: 'What aroma profile soothes your senses most?',
      options: [
        { label: 'Traditional sandalwood, wild honey & kesar', value: 'ubtan' },
        { label: 'Fresh fruity enzymes & ripe sweet papaya', value: 'papaya' },
        { label: 'Rich vintage fermented grape polyphenols', value: 'red_wine' },
        { label: 'Earthy Multani clay & botanical cooling mint', value: 'charcoal' },
      ],
    },
  ];

  const handleSelectOption = (value: string) => {
    if (step === 0) setAnswers({ ...answers, feel: value });
    if (step === 1) setAnswers({ ...answers, concern: value });
    if (step === 2) setAnswers({ ...answers, routine: value });

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(questions.length); // Results step
    }
  };

  // Determine recommended soap
  let recommendedProduct = PRODUCTS[0];
  if (answers.concern === 'charcoal' || answers.feel === 'oily') {
    recommendedProduct = PRODUCTS.find((p) => p.slug === 'charcoal-multani-mitti-soap') || PRODUCTS[1];
  } else if (answers.concern === 'ubtan') {
    recommendedProduct = PRODUCTS.find((p) => p.slug === 'ubtan-honey-soap') || PRODUCTS[3];
  } else if (answers.concern === 'papaya') {
    recommendedProduct = PRODUCTS.find((p) => p.slug === 'papaya-with-licorice-soap') || PRODUCTS[4];
  } else if (answers.concern === 'red_wine') {
    recommendedProduct = PRODUCTS.find((p) => p.slug === 'red-wine-soap') || PRODUCTS[2];
  } else {
    recommendedProduct = PRODUCTS.find((p) => p.slug === 'goat-milk-red-wine-soap') || PRODUCTS[0];
  }

  const resetQuiz = () => {
    setStep(0);
    setAnswers({ feel: '', concern: '', routine: '' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-[#FFFDF9] border border-[#E8DCCF] rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#4A4036] hover:text-[#7E2433] rounded-full hover:bg-[#EADBCC]"
        >
          <X className="w-5 h-5" />
        </button>

        {step < questions.length ? (
          <div>
            <div className="text-center mb-6">
              <span className="font-script text-2xl text-[#7E2433]">Ayurvedic Skin Diagnostic</span>
              <h3 className="font-serif text-2xl font-semibold text-[#1E1E1E] mt-1">
                Find Your Sacred Match
              </h3>
              <p className="text-xs text-[#6B5E51] mt-1">
                Question {step + 1} of {questions.length}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-[#EADBCC] h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-[#7E2433] h-full transition-all duration-300"
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h4 className="font-serif text-lg font-medium text-[#1E1E1E] text-center mb-5">
              {questions[step].title}
            </h4>

            <div className="space-y-2.5">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(opt.value)}
                  className="w-full p-3.5 bg-white border border-[#E8DCCF] hover:border-[#7E2433] hover:bg-[#FAF4ED] rounded-xl text-left text-xs font-medium text-[#1E1E1E] transition-all flex items-center justify-between group"
                >
                  <span>{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#9C8E7E] group-hover:text-[#7E2433] transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-12 h-12 bg-[#FAF4ED] text-[#7E2433] rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>

            <span className="font-script text-2xl text-[#7E2433]">Your Prescribed Herbal Formula</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mt-1">
              {recommendedProduct.name}
            </h3>
            <p className="text-xs text-[#6B5E51] mt-1 italic">"{recommendedProduct.tagline}"</p>

            {/* Soap preview */}
            <div className="my-6 p-4 bg-[#FAF4ED] rounded-2xl border border-[#E8DCCF] flex items-center gap-4 text-left">
              <img
                src={recommendedProduct.posterImage}
                alt={recommendedProduct.name}
                referrerPolicy="no-referrer"
                className="w-20 h-24 object-cover rounded-xl shrink-0"
              />
              <div className="flex-1">
                <div className="text-[10px] font-semibold uppercase text-[#7E2433] tracking-wider">
                  Targeted for {recommendedProduct.concern}
                </div>
                <p className="text-xs text-[#4A4036] mt-1 line-clamp-2">
                  {recommendedProduct.description}
                </p>
                <div className="mt-2 font-mono font-semibold text-[#1E1E1E]">
                  ₹{recommendedProduct.price} · 100g
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={resetQuiz}
                className="px-4 py-2.5 border border-[#E8DCCF] rounded-xl text-xs text-[#4A4036] hover:bg-[#FAF4ED] flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onSelectProduct(recommendedProduct);
                }}
                className="flex-1 py-3 bg-[#7E2433] hover:bg-[#5C1723] text-white rounded-xl text-xs font-semibold uppercase tracking-wider shadow-md"
              >
                View Recommended Soap
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
