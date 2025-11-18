export function getPaginationParams(page: number, pageSize: number) {
  return {
    _start: (page - 1) * pageSize,
    _limit: pageSize,
  };
}

export function getTotalPages(totalItems: number, pageSize: number) {
  return Math.ceil(totalItems / pageSize);
}

export function validatePage(page: number, totalPages: number) {
  if (page < 1) return 1;
  if (totalPages > 0 && page > totalPages) return totalPages;
  return page;
}
