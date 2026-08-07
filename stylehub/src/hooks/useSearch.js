import { useMemo } from "react";

export default function useSearch(
  items,
  search,
  fields = []
) {
  return useMemo(() => {
    return items.filter((item) =>
      fields.some((field) =>
        item[field]
          ?.toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [items, search, fields]);
}