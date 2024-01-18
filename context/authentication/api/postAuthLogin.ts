import { appApiClient } from "@/services/clients/app.client";

interface IPostAuthLoginParams {
  email: string;
  password: string;
}

interface IPostAuthLoginResponseInterface {
  user_id: string;
  group_ids: number[];
  access_token: string;
  token_expires_in: number;
}

export const postAuthLogin: (
  params: IPostAuthLoginParams,
) => Promise<IPostAuthLoginResponseInterface> = async (
  params,
) => {
  const result = await appApiClient.post("/auth/login", params);
  if(result && result.status===200) return result.data
  return undefined

};

export const postAuthLoginMockResponse: IPostAuthLoginResponseInterface = {
  user_id: "some_id",
  group_ids: [0],
  access_token: "MOCK ACCESS TOKEN",
  token_expires_in: new Date().getTime() + 10000,
};
