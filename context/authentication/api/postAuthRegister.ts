import { appApiClient } from "@/services/clients/app.client";

interface IPostAuthRegisterParams {
  email: string;
  password: string;
}

interface IPostAuthRegisterResponseInterface {
  user_id: string;
  email: string;
  token_expires_in: number;
  groups: Array<{ group_id: number; group_name: string }>;
}

export const postAuthRegister: (
  params: IPostAuthRegisterParams,
) => Promise<IPostAuthRegisterResponseInterface> = async (
  params,
) => {
  const result = await appApiClient.post("/auth/register", params);
  if(result && (result.status===201||result.status===200)) return result.data

  // if(result.statusText)
  // console.log(err?.response?.status);
  // if (err?.response?.status === 409) {
  //   toast.warning(`This e-mail is already registered`);
  // } else {
  //   toast.error(err?.response?.data?.detail ?? `Error while register`);
  // }

  return undefined

};

export const postAuthRegisterMockResponse: IPostAuthRegisterResponseInterface =
  {
    user_id: "some_id",
    email: "some@email.com",
    token_expires_in: 3600,
    groups: [{ group_id: 0, group_name: "some group" }],
  };
