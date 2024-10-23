const EventSkeleton = () => {
  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <div className="w-full md:max-w-[480px]">
        <div className="w-full h-[320px] bg-gray-600 rounded-lg animate-pulse"></div>
      </div>

      <section className="w-full flex flex-col justify-center gap-2">
        <div className="w-full h-10 bg-gray-600 rounded animate-pulse mb-5"></div>
        <div className="w-full h-7 bg-gray-600 rounded animate-pulse"></div>
        <div className="w-full h-7 bg-gray-600 rounded animate-pulse"></div>
        <div className="w-full h-7 bg-gray-600 rounded animate-pulse"></div>
        <div className="w-full h-7 bg-gray-600 rounded animate-pulse"></div>

        <div className="flex flex-col sm:flex-row gap-5 my-5">
          <div className="w-full flex gap-2 items-center">
            <div className="size-[30px] bg-gray-600 rounded-full animate-pulse"></div>
            <div className="w-full h-[30px] bg-gray-600 rounded animate-pulse"></div>
          </div>
          <div className="w-full flex gap-2 items-center">
            <div className="size-[30px] bg-gray-600 rounded-full animate-pulse"></div>
            <div className="w-full h-[30px] bg-gray-600 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="w-[150px] h-[40px] bg-gray-600 rounded animate-pulse"></div>
        </div>
      </section>
    </div>
  );
};

export default EventSkeleton;
