import { useMemo } from "react";

export default function usePagination(
  items,
  currentPage,
  perPage
) {
  const totalPages = Math.ceil(
    items.length / perPage
  );

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * perPage;

    return items.slice(start, start + perPage);
  }, [items, currentPage, perPage]);

  return {
    paginatedItems,
    totalPages,
  };
}