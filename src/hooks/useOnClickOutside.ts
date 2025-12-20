import { useEffect } from "react"

function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void
) {
  useEffect(() => {
    function listener(e: MouseEvent | TouchEvent) {
      const el = ref.current
      if (!el) return
      if (e.target instanceof Node && el.contains(e.target)) return
      handler()
    }
    document.addEventListener("mousedown", listener)
    
    return () => {
      document.removeEventListener("mousedown", listener)
    }
  }, [ref, handler])
}

export default useOnClickOutside