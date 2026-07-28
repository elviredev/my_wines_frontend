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
        className="block text-sm font-medium text-stone-200"
      >
        {label}

        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <div className="rounded-xl border border-white/10 bg-stone-950/50 p-5">
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
                    ? "border-rose-600/50 bg-rose-900/40 text-rose-100 shadow-lg shadow-rose-950/30"
                    : "border-white/10 bg-stone-900/60 text-stone-400 hover:border-rose-500/60 hover:bg-rose-900/20 hover:text-rose-200"
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