export default function IssueDetailLoader() {
  const avatarClass = "w-10 h-10" 

  return (
    <section
      aria-busy="true"
      role="status"
      className="h-full bg-white pr-4 pl-8 py-4 flex flex-col gap-6"
    >
      {/* Back link (skeleton) */}
      <div className="w-40 h-4 rounded bg-gray-200/60 animate-pulse" />

      {/* Header: título + badge */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <div className="h-8 max-w-[60%] rounded bg-gray-200/60 animate-pulse mb-3" />
          <div className="h-4 max-w-[30%] rounded bg-gray-200/50 animate-pulse" />
        </div>

        <div className="flex-shrink-0 inline-flex items-center gap-3">
          {/* avatar skeleton */}
          <div className={`${avatarClass} rounded-md bg-gray-200/60 animate-pulse`} />

          {/* status badge skeleton */}
          <div className="px-3 py-1 rounded-full bg-gray-200/60 animate-pulse w-20 h-8" />
        </div>
      </div>

      {/* Body / content skeleton */}
      <article className="prose max-w-none">
        <div className="space-y-3">
          <div className="h-4 rounded bg-gray-200/50 animate-pulse w-5/6" />
          <div className="h-4 rounded bg-gray-200/50 animate-pulse w-full" />
          <div className="h-4 rounded bg-gray-200/50 animate-pulse w-11/12" />
          <div className="h-4 rounded bg-gray-200/50 animate-pulse w-4/6" />
          <div className="h-4 rounded bg-gray-200/50 animate-pulse w-2/3" />
        </div>
      </article>
    
    </section>
  );
}