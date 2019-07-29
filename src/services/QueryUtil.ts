import { QueryParams } from "types";

class QueryUtil {
  public parseQueryString = (queryString: string): QueryParams =>
    decodeURI(queryString)
      .substr(1)
      .split("&")
      .reduce((obj: QueryParams, query) => {
        const [key, value] = query.split("=");
        obj[key] = value;
        return obj;
      }, {});
}

const QueryUtilSingleton = new QueryUtil();
export { QueryUtilSingleton as QueryUtil };
