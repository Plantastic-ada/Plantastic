import { http, HttpResponse } from "msw";
import { TEST_CONFIG } from "../config";
import { mockPlants } from "../mockPlantData";
import { mockUserPlants } from "../mockUserPlantsData";

export const plantSummariesHandlers = [
  http.get(`${TEST_CONFIG.API_BASE_URL}/api/plants/summaries`, () => {
    return HttpResponse.json(mockPlants, { status: 200 });
  }),
];
