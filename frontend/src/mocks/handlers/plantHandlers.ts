import { http, HttpResponse } from "msw";
import { TEST_API_BASE_URL } from "../config";
import { mockPlants } from "../mockPlantData";

export const plantSummariesHandlers = [
  http.get(`${TEST_API_BASE_URL}/api/plants/summaries`, () => {
    return HttpResponse.json(mockPlants, { status: 200 });
  }),
];
