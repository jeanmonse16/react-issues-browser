import type { IItemsSearchProps } from "../types/itemsSearch";

export default function ItemsSearch({ value, setValue, onSearch, clearSearch, searchIsActive }: IItemsSearchProps) {
    return <div className="flex">
        <div className="relative">
          <input 
            className="h-full w-full sm:w-80 pl-2 border rounded-l focus:outline-none focus:ring-1 focus:ring-indigo-400" 
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
        
        <button onClick={onSearch} className="border-y border-r bg-indigo-100 hover:bg-indigo-200 cursor-pointer rounded-r p-1">🔍</button>
    </div>
}
