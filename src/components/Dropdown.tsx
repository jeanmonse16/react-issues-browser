import React, { useEffect, useMemo, useRef, useState } from "react";

export type Option = {
  value: string
  label: string
  disabled?: boolean
};

type FancyDropdownProps = {
  options: Option[]
  value?: string | string[] | null
  onChange?: (value: string | string[] | null) => void
  placeholder?: string
  multiple?: boolean
  clearable?: boolean
  id?: string
  className?: string
  renderOption?: (option: Option, isSelected: boolean) => React.ReactNode
};

/** Simple hook to call handler when clicking outside the given ref */
function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: () => void
) {
  useEffect(() => {
    function listener(e: MouseEvent | TouchEvent) {
      const el = ref.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return
      handler();
    }
    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)
    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    };
  }, [ref, handler])
}

export const FancyDropdown: React.FC<FancyDropdownProps> = ({
  options,
  value = null,
  onChange,
  placeholder = "Select...",
  multiple = false,
  clearable = true,
  id,
  className,
  renderOption,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)

  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState<number>(-1)

  useOnClickOutside(rootRef, () => setOpen(false))

  const selectedValues = useMemo(() => {
    if (multiple) {
      if (!value) return []
      return Array.isArray(value) ? value : [value]
    } else {
      return value ? [value as string] : [];
    }
  }, [value, multiple])

  // No filtering: always show full options
  const visible = options

  useEffect(() => {
    if (open) {
      // start highlight at first non-disabled option
      const first = visible.findIndex((o) => !o.disabled)
      setHighlight(first >= 0 ? first : -1)
    } else {
      setHighlight(-1)
    }
  }, [open, visible])

  function toggleOpen() {
    setOpen((s) => !s)
  }

  function clearSelection(e?: React.MouseEvent) {
    e?.stopPropagation()
    if (multiple) onChange?.([])
    else onChange?.(null)
  }

  function selectOption(opt: Option) {
    if (opt.disabled) return
    if (multiple) {
      const next = selectedValues.includes(opt.value)
        ? selectedValues.filter((v) => v !== opt.value)
        : [...selectedValues, opt.value]
      onChange?.(next)
    } else {
      onChange?.(opt.value)
      setOpen(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault()
        setOpen(true)
      }
      return
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlight((h) => {
        let next = h
        const len = visible.length
        for (let i = 0; i < len; i++) {
          next = Math.min(len - 1, next + 1)
          if (!visible[next]?.disabled) break
        }
        scrollTo(next)
        return next
      })
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlight((h) => {
        let next = h
        const len = visible.length
        for (let i = 0; i < len; i++) {
          next = Math.max(0, next - 1)
          if (!visible[next]?.disabled) break
        }
        scrollTo(next)
        return next
      });
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (highlight >= 0 && visible[highlight]) selectOption(visible[highlight])
    } else if (e.key === "Escape") {
      e.preventDefault()
      setOpen(false)
    }
  }

  function scrollTo(index: number) {
    const list = listRef.current
    if (!list || index < 0) return
    const item = list.children[index] as HTMLElement | undefined
    if (!item) return
    const itemTop = item.offsetTop
    const itemBottom = itemTop + item.clientHeight
    const viewTop = list.scrollTop
    const viewBottom = viewTop + list.clientHeight
    if (itemTop < viewTop) list.scrollTop = itemTop
    else if (itemBottom > viewBottom) list.scrollTop = itemBottom - list.clientHeight
  }

  const display = useMemo(() => {
    if (multiple) {
      const selected = options.filter((o) => selectedValues.includes(o.value))
      if (!selected.length) return placeholder;
      return selected.map((s) => s.label).join(", ")
    } else {
      const sel = options.find((o) => selectedValues.includes(o.value))
      return sel ? sel.label : placeholder
    }
  }, [options, selectedValues, multiple, placeholder])

  return (
    <div className={`relative w-72 ${className ?? ""}`} ref={rootRef}>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        className="w-full flex items-center justify-between px-3 py-2 bg-white/5 border border-white/5 rounded-md text-left hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <div className="truncate text-sm text-white/90">
          {display}
        </div>

        <div className="flex items-center gap-2">
          {clearable && selectedValues.length > 0 && (
            <button
              type="button"
              onClick={clearSelection}
              className="text-sm text-gray-300 hover:text-white p-1 rounded"
              aria-label="Clear selection"
            >
              ✕
            </button>
          )}
          <span className={`transition-transform ${open ? "rotate-180" : ""} text-gray-300`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </button>

      {open && (
        <div className="mt-2 bg-gray-100/90 border border-white/6 rounded-md shadow-lg z-50">
          <ul
            ref={listRef}
            role="listbox"
            aria-multiselectable={multiple || undefined}
            tabIndex={-1}
            className="max-h-52 overflow-auto divide-y divide-white/4"
            onKeyDown={handleKeyDown}
          >
            {visible.length === 0 && (
              <li className="px-3 py-2 text-sm text-white/50">No options</li>
            )}
            {visible.map((opt, i) => {
              const selected = selectedValues.includes(opt.value);
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setHighlight(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectOption(opt)}
                  className={`px-3 py-2 cursor-pointer text-sm flex items-center justify-between ${
                    opt.disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-white/5"
                  } ${highlight === i ? "bg-white/6" : ""}`}
                >
                  <div className="truncate">{renderOption ? renderOption(opt, selected) : opt.label}</div>
                  {multiple ? (
                    <input
                      type="checkbox"
                      checked={selected}
                      readOnly
                      tabIndex={-1}
                      className="w-4 h-4"
                      aria-hidden
                    />
                  ) : selected ? (
                    <span className="text-indigo-400">✓</span>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FancyDropdown