"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useTransition } from "react";

const SearchForm = ({ query }: { query?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("query")?.toString();

    startTransition(() => {
      if (searchQuery) {
        router.push(`/?query=${encodeURIComponent(searchQuery)}`);
      } else {
        router.push("/");
      }
    });
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Get the form element and reset it
    const form = e.currentTarget.closest("form") as HTMLFormElement;
    if (form) {
      form.reset();
    }
    // Navigate back to home
    startTransition(() => {
      router.push("/");
    });
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        name="query"
        defaultValue={query}
        placeholder="Search Startups"
        className="search-input"
      />
      <div className="flex gap-2">
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="search-btn text-white"
          >
            <X className="size-5" />
          </button>
        )}
        <button
          type="submit"
          className="search-btn text-white"
          disabled={isPending}
        >
          <Search className="size-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
