type RequestParams = Record<string, any>;

export const objectToQueryParams = (obj: RequestParams) => {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (value === undefined || value === null) {
        return "";
      }

      if (Array.isArray(value)) {
        return value
          .map(
            (item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`,
          )
          .join("&");
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean)
    .join("&");
};
