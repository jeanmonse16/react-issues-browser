export default ({ items = 15 }: { items?: number }) => {
  return (
    <ul className="divide-y">
      {Array.from({ length: items }).map((_, i) => (
        <li key={i} className="p-4">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/4" />
          </div>
        </li>
      ))}
    </ul>
  )
}