import { Suspense } from "react"
import ErrorBoundary from "../components/ErrorBoundary"
import ItemsListSkeleton from "../components/ItemsListSkeleton"
import IssuesBrowserContent from "../features/Issues/IssuesBrowserContent"

export default () => {
    return <div className="h-full bg-white">
      <div className="pr-4 pl-8 py-4 flex flex-col gap-4">
        <header
          className={`flex items-center gap-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/6 shadow-md`}
          aria-label="App title"
        >
    
          <div className="flex-none w-12 h-12 rounded-md bg-indigo-500 flex items-center   justify-center text-white shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>

      
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-indigo-400">
              React Issues Browser
            </h1>

            
       
          </div>
        </header>

        <ErrorBoundary>
          <Suspense fallback={<ItemsListSkeleton />}>
            <IssuesBrowserContent />
          </Suspense>
        </ErrorBoundary >
      </div>
           
    </div>

}