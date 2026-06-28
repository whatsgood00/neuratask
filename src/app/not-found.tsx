import Link from "next/link";

export default function NotFound() {
  return (
    <div className="app-bg flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-semibold tracking-tight text-white">404</p>
      <h1 className="mt-4 text-xl font-medium text-zinc-200">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-zinc-500">
        This route does not exist. Head back to your workspace.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-gradient-to-r from-teal-500 to-sky-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-teal-500/20 transition-opacity hover:opacity-90"
      >
        Back to NeuraTask
      </Link>
    </div>
  );
}
