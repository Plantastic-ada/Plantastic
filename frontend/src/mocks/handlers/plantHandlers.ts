import { http, HttpResponse } from "msw";

export const createPlantHandlers = (baseUrl: string) => [
  http.get(`${baseUrl}/api/plants/summaries`, () => {
    return HttpResponse.json([], { status: 200 });
  }),
];
