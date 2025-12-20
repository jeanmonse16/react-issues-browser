import type { IItemsSearchProps } from "../types/itemsSearch";

export default function ItemsSearch({ value, setValue, onSearch, clearSearch, searchIsActive }: IItemsSearchProps) {
    return <div className="pl-4 flex">
        <div className="relative">
          <input 
            className="h-full w-80 pl-2 border rounded-l ring-0 focus:outline-none f" 
            type="text" 
            placeholder="Search items..."
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          {
            searchIsActive && 
              <span onClick={clearSearch} className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-2 text-gray-400">X</span>
         }
        </div>
        
        <button onClick={onSearch} className="border-y border-r bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-r p-1">🔍</button>
    </div>
}
