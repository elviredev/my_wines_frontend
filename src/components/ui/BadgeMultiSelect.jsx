// @ts-nocheck
/**
 * @typedef {Object} BadgeOption
 * @property {string} value
 * @property {string} label
 * @property {string} [icon]
 */

/**
 * @typedef {Object} BadgeMultiSelectProps
 * @property {string} label
 * @property {string} name
 * @property {BadgeOption[]} options
 * @property {string[]} value
 * @property {(value: string[]) => void} onChange
 * @property {boolean} [required]
 * @property {string} [error]
 */

/**
 * @param {BadgeMultiSelectProps} props
 */
const BadgeMultiSelect = ({ label, name, options, value = [], onChange, required = false, error }) => {

  const toggleOption = (option) => {

    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
      return;
    }

    onChange([...value, option]);
  };


  return (
    <div className="space-y-3">

      <label
        htmlFor={name}
        className="block text-sm font-medium text-stone-700"
      >
        {label}

        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
        <div className="flex flex-wrap gap-3">

          {options.map((option) => {

            const selected = value.includes(option.value);
            const Icon = option.icon;

            return (

              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={`inline-flex items-center gap-1 sm:gap-2 rounded-full border px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium transition-all duration-200
                ${selected
                    ? "border-rose-600 bg-rose-600 text-white shadow-md"
                    : "border-stone-300 bg-white text-stone-700 hover:border-rose-400 hover:bg-rose-50"
                  }
              `}
              >
                {selected && (
                  <span className="text-xs">✓</span>
                )}

                {Icon && <Icon className="text-base w-4 h-4" />}
                {option.label}

              </button>

            );

          })}

        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

    </div>
  );
}

export default BadgeMultiSelect