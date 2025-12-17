import { Suspense } from "react"
import Home from "./pages/Home"
import ItemsListSkeleton from "./components/ItemsListSkeleton"
import ErrorBoundary from "./components/ErrorBoundary"

export default () => {
    return <div className="h-full bg-white">
        <Suspense fallback={<ItemsListSkeleton />}>
          <ErrorBoundary>
            <Suspense fallback={<ItemsListSkeleton />}>
              <Home />
            </Suspense>
          </ErrorBoundary >
        </Suspense>
    </div>
}