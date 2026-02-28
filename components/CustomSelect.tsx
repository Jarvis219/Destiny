'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  label: string | number;
  value: string | number;
}

interface CustomSelectProps {
  value: string | number;
  onChange: (value: any) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  label?: string;
}

export default function CustomSelect({ value, onChange, options, placeholder, className = '', label }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  // Scroll to selected option when opening
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const selectedEl = containerRef.current.querySelector('[data-selected="true"]');
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'center' });
      }
    }
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && <label className="text-gold-200 text-sm uppercase tracking-wider mb-2 block">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-mystic-800/50 border border-gold-500/20 rounded-xl px-2 sm:px-4 py-3 text-left flex items-center justify-between text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-all hover:bg-mystic-800/80"
      >
        <span className={`truncate text-sm sm:text-base ${selectedOption ? 'text-white' : 'text-gray-400'}`}>
          {selectedOption ? selectedOption.label : placeholder || 'Chọn...'}
        </span>
        <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-gold-500/50 transition-transform duration-200 shrink-0 ml-1 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute z-50 w-full mt-2 bg-mystic-900 border border-gold-500/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar ring-1 ring-black/5"
          >
            <div className="p-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  data-selected={option.value === value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                    option.value === value 
                      ? 'bg-gold-500/10 text-gold-400 font-medium' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {option.value === value && <Check className="w-4 h-4 text-gold-500" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
