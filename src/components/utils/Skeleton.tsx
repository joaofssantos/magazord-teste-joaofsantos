export const Skeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      aria-hidden="true"
    />
  );
};

export const ProfileSkeleton = () => {
  return (
    <aside className="md:p-4 py-4">
      <div className="sticky top-4">
        <div className="relative group mb-4">
          <div className="relative items-center flex justify-center mx-auto">
            <Skeleton className="md:w-[150px] w-[104px] h-[104px] md:h-[150px] rounded-full" />
            <div className="shadow-[0_0_16px_0_#4F4F5026] bottom-0 absolute mr-[50%] right-[-40px] sm:right-[-60px] w-7 h-7 md:w-[40px] md:h-[40px] flex justify-center items-center bg-white rounded-full">
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
          </div>
        </div>

        <div className="mb-4 sm:w-full w-60 mx-auto space-y-2">
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mx-auto" />
        </div>

        <div className="text-short mx-auto p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export const RepoListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="py-6 md:pl-8 sm:border-none border-b-[1px] border-light last:border-0"
        >
          <Skeleton className="h-5 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-4" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const RepoHeaderSkeleton = () => {
  return (
    <div className="border-none mb-8 md:px-8">
      <nav className="flex gap-3 sm:gap-8 justify-between sm:justify-start">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-32" />
      </nav>
    </div>
  );
};
