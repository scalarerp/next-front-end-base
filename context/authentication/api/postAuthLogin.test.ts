import MockAdapter from "axios-mock-adapter";
import { postAuthLogin, postAuthLoginMockResponse } from "./postAuthLogin";
import { appApiClient } from "@/services/clients/app.client";
import endpoint from "@/services/config/endpoints.config";

describe("postAuthLogin", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    // Antes de cada teste, criar uma nova instância do axios-mock-adapter
    mock = new MockAdapter(appApiClient, {
      delayResponse: 3000,
      onNoMatch: "passthrough",
    });
  });

  afterEach(() => {
    // Após cada teste, limpar a instância do axios-mock-adapter
    mock.reset();
  });

  it("should login successfully data from an API", async () => {
    
    mock.onPost(`${endpoint}/auth/login`).reply(200, postAuthLoginMockResponse);

    // Chamar a função que faz a chamada de API
    const result = await postAuthLogin({ email: "asdf@cbc.com", password: "abc123" });

    // Verificar se a resposta da chamada de API corresponde à resposta simulada
    expect(result).toEqual(postAuthLoginMockResponse);
  });

});
