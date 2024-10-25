const EventSkeleton = () => {
  return (
    <article className="container px-5 sm:mx-auto sm:px-6 md:px-8 lg:px-10 xl:px-20">
      <header>
        <div className="bg-gray-600 w-1/2 h-[40px] rounded animate-pulse mb-5"></div>

        <div className="lg:flex lg:gap-8">
          <div className="lg:w-1/2">
            {/* Event Image */}
            <div className="bg-gray-600 w-full h-[360px] rounded-lg animate-pulse"></div>
          </div>

          <section className="lg:w-1/2">
            <div className="block sm:grid sm:grid-cols-2 lg:block">

              <div className="flex items-center gap-2 mb-5">
                <div className="bg-gray-600 size-8 rounded-full animate-pulse"></div>
                <div className="bg-gray-600 w-1/2 h-8 rounded animate-pulse"></div>
              </div>

              <div className="flex items-center gap-2 mb-5">
                <div className="bg-gray-600 size-8 rounded-full animate-pulse"></div>
                <div className="bg-gray-600 w-1/2 h-8 rounded animate-pulse"></div>
              </div>

              <div className="gap-x-3 mb-8 lg:text-left">
                {/* DATE */}
                <div className="flex gap-2 items-center text-white mb-5">
                  <div className="bg-gray-600 size-8 rounded-full animate-pulse"></div>
                  <div className="bg-gray-600 w-1/2 h-8 rounded animate-pulse"></div>
                </div>

                {/* Event Location */}
                <div className="flex gap-2 items-center text-white mb-5">
                  <div className="bg-gray-600 size-8 rounded-full animate-pulse"></div>
                  <div className="bg-gray-600 w-1/2 h-8 rounded animate-pulse"></div>
                </div>

                {/* Buy Ticket */}
                <div className="flex gap-3 items-center">
                  <div className="bg-gray-600 w-[150px] h-8 rounded animate-pulse"></div>
                </div>
              </div>

              {/* CATEGORY */}
              <div className="bg-gray-600 w-1/2 h-8 rounded animate-pulse mb-5"></div>

              <div className="mb-8 lg:justify-start">
                {/* TAGS */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-gray-600 w-[100px] h-10 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </header>

      <main>
        <div className="bg-gray-600 w-1/3 h-10 rounded animate-pulse mb-5"></div>
        <div className="bg-gray-600 w-full h-64 rounded animate-pulse mb-5"></div>
      </main>

      <div className="flex justify-end mb-5">
        <div className="bg-gray-600 w-[150px] h-10 rounded animate-pulse"></div>
      </div>

    </article>
  );
};

export default EventSkeleton;