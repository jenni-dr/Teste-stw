export class QueryParamsService {
  static convertObjToQuery(payload: { [key: string]: any }) {
    return (
      "?" +
      Object.keys(payload)
        .map(function (key) {
          return key + "=" + payload[key];
        })
        .join("&")
    );
  }
}
