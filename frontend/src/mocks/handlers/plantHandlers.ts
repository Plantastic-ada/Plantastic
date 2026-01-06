import { http, HttpResponse } from "msw";

const BASE_URL = "http://localhost:8080";

export const createPlantHandlers = () => [
  http.get(`${BASE_URL}/api/plants/summaries`, () => {
    return HttpResponse.json([], { status: 200 });
  }),
];
