import ArrowIcon from "../assets/Arrow.svg";

type FilterDropdownProps = {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  options: string[];
  selectedOptions: string[];
  onOptionChange: (option: string) => void;
  isMobile?: boolean;
};

export const FilterDropdown = ({
  label,
  isOpen,
  onToggle,
  options,
  selectedOptions,
  onOptionChange,
  isMobile = false,
}: FilterDropdownProps) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="pl-4 pr-6 py-1 text-highlight font-light bg-gradient text-white rounded-full"
      >
        <img src={ArrowIcon} alt="Arrow" className="inline w-4 h-4 mr-2 mb-1" />
        {label}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-[#00000066] z-10"
            onClick={onToggle}
          />

          <div
            className={`
              ${isMobile
                 ? "fixed inset-0 z-20 bg-white p-6"
                 : "absolute top-  left-0 md:right-0 mt-2 border-none rounded-lg py-2 px-2 min-w-[200px] z-20 bg-white sm:bg-blue-light"
               }
            `}
          >
            {isMobile && (
              <div className="flex justify-between items-center mb-4 border-none pb-3">
                <h2 className="text-xl font-semibold">{label}</h2>
                <button onClick={onToggle} className="text-[2rem] font-normal text-error border-none">
                  ×
                </button>
              </div>
            )}

            {options.map((option) => (
              <label
                key={option}
                className={`flex items-center gap-2 pl-2 py-3 text-base sm:hover:bg-[#E6F1FB] cursor-pointer ${selectedOptions.includes(option)
                    ? "bg-[#ebf2fe] text-secondary"
                    : ""
                  }`}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => onOptionChange(option)}
                  className="rounded w-5 h-5 text-secondary accent-secondary"
                />
                {option}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
