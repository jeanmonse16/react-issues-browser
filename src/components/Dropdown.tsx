import { useEffect, useRef, useState } from "react"
import Adjustments from "../assets/icons/Adjustments"
import ChevronDown from "../assets/icons/ChevronDown"

import useOnClickOutside from "../hooks/useOnClickOutside"

export type Option = {
  value: string
  label: string
}

type FancyDropdownProps = {
  options: Option[]
  value?: string
  onChange?: (value: string) => void
  id?: string
}

const Dropdown: React.FC<FancyDropdownProps> = ({
  options,
  value = null,
  onChange,
  id
}) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLUListElement>(null)
    
    const [open, setOpen] = useState(false)
    const [highlight, setHighlight] = useState<number>(-1)

    useOnClickOutside(rootRef, () => setOpen(false))

    useEffect(() => {
        if (open) {
          // start highlight at first non-disabled option
          setHighlight(options.length ? 0 : -1)
        } else 
          setHighlight(-1)
        
    }, [open])

    function selectOption(opt: Option) {
        onChange?.(opt.value)
        setOpen(false)
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
            const len = options.length
            for (let i = 0; i < len; i++) {
              next = Math.min(len - 1, next + 1)
            }
            scrollTo(next)
            return next
          })
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          setHighlight((h) => {
            let next = h
            const len = options.length
            for (let i = 0; i < len; i++) {
              next = Math.max(0, next - 1)
            }
            scrollTo(next)
            return next
          });
        } else if (e.key === "Enter") {
          e.preventDefault()
          if (highlight >= 0 && options[highlight]) selectOption(options[highlight])
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

    return <div className="relative" ref={rootRef}>
      <div 
        id={id}
        className="flex p-1 gap-2 rounded-md text-sm items-center hover:bg-indigo-200 cursor-pointer"
        onClick={() => setOpen((previousValue => !previousValue))}
        onKeyDown={handleKeyDown}
      >
        <Adjustments />
        { options.find(opt => opt.value === value)?.label ?? 'Sort' }
        <ChevronDown />
      </div>

      {open && (
        <div className="absolute mt-2 bg-gray-50 border border-white/6 rounded-md shadow-lg z-50">
          <ul
            ref={listRef}
            role="listbox"
            tabIndex={-1}
            className="max-h-52 overflow-auto divide-y divide-white/4"
            onKeyDown={handleKeyDown}
          >
            {options.length === 0 && (
              <li className="px-3 py-2 text-sm text-white/50">No options</li>
            )}
            {options.map((opt, i) => {
              const selected = value === opt.value
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setHighlight(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectOption(opt)}
                  className={`px-3 py-2 cursor-pointer text-sm flex gap-2 items-center justify-between
                   hover:bg-gray-500/5
                   ${highlight === i ? "bg-white/6" : ""}`}
                >
                  <div className="truncate">{opt.label}</div>
                    {
                      selected 
                        ? (
                          <span className="text-indigo-400">✓</span>
                        ) 
                        : null
                    }
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
}

export default Dropdown
