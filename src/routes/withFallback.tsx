import React, { Suspense } from "react";

import SuspendFallbackLoading from "@components/SuspenseLoader";

export function withFallback<P>(Component: React.ComponentType & any) {
  return function WithSuspense({ ...props }: P) {
    return (
      <Suspense fallback={<SuspendFallbackLoading />}>
        <Component {...props} />
      </Suspense>
    );
  };
}
