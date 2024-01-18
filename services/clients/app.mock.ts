import MockAdapter from "axios-mock-adapter";

import { appApiClient } from "./app.client";
import { postAuthLoginMockResponse, postAuthRegisterMockResponse } from "@/context/authentication/api";

export const appMock = () => {
  const appApiMockAdapter = new MockAdapter(appApiClient, {
    delayResponse: 3000,
    onNoMatch: "passthrough",
  });
  appApiMockAdapter
    .onPost("/auth/login")
    .reply(200, postAuthLoginMockResponse);
  appApiMockAdapter
    .onPost("/auth/register")
    .reply(200, postAuthRegisterMockResponse);
};
