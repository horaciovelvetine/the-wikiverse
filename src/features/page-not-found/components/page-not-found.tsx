export function PageNotFound() {
  return (
    <main className="relative isolate min-h-full">
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <div className="glass-card glass-padding-lg max-w-2xl mx-auto">
          <div className="mb-8">
            <p className="text-8xl font-black text-gray-200 mb-6 gradient-text">
              404
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-8">
              Page not found
            </h1>
            <p className="text-xl font-medium text-gray-600 sm:text-2xl mb-12 leading-relaxed">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href="/"
              className="btn-modern btn-primary inline-flex items-center px-8 py-4"
            >
              <span aria-hidden="true" className="mr-3 text-lg">
                &larr;
              </span>
              Back to home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
