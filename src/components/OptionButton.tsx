import { clsx } from 'clsx';
import { QuestionOption } from '@/types';
import { Check, X } from 'lucide-react';

interface OptionButtonProps {
  option: QuestionOption;
  index: number;
  disabled: boolean;
  showResult: boolean;
  isCorrectOption: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export function OptionButton({
  option,
  index,
  disabled,
  showResult,
  isCorrectOption,
  isSelected,
  onClick,
}: OptionButtonProps) {
  const letterLabels = ['A', 'B', 'C', 'D'];

  const baseClasses =
    'group relative w-full px-6 py-5 rounded-2xl text-left transition-all duration-300 transform active:scale-[0.97]';
  const stateClasses = clsx({
    'bg-white border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer':
      !disabled && !showResult,
    'bg-gray-50 border-2 border-gray-200 opacity-70 cursor-not-allowed':
      disabled && !showResult,
    'bg-green-50 border-2 border-green-500 shadow-lg shadow-green-200':
      showResult && isCorrectOption,
    'bg-red-50 border-2 border-red-500 shadow-lg shadow-red-200':
      showResult && isSelected && !isCorrectOption,
    'bg-white border-2 border-gray-200 opacity-60':
      showResult && !isCorrectOption && !isSelected,
  });

  return (
    <button
      className={clsx(baseClasses, stateClasses)}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center gap-4">
        <div
          className={clsx(
            'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-all',
            {
              'bg-gray-100 text-gray-700 group-hover:bg-blue-500 group-hover:text-white':
                !showResult,
              'bg-green-500 text-white': showResult && isCorrectOption,
              'bg-red-500 text-white': showResult && isSelected && !isCorrectOption,
              'bg-gray-200 text-gray-500':
                showResult && !isCorrectOption && !isSelected,
            }
          )}
        >
          {showResult && isCorrectOption ? (
            <Check size={20} strokeWidth={3} />
          ) : showResult && isSelected && !isCorrectOption ? (
            <X size={20} strokeWidth={3} />
          ) : (
            letterLabels[index]
          )}
        </div>
        <span
          className={clsx(
            'flex-1 font-medium text-lg leading-snug',
            {
              'text-gray-800': !showResult || isCorrectOption || (!isSelected && !isCorrectOption),
              'text-red-700': showResult && isSelected && !isCorrectOption,
              'text-green-800': showResult && isCorrectOption,
            }
          )}
        >
          {option.text}
        </span>
      </div>
    </button>
  );
}
