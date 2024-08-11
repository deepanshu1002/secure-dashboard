import axios from "axios";
import { login, signUp } from "../utils/api";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully log in a user with valid email", async () => {
    const validEmail = "lindsay.ferguson@reqres.in";
    const mockData = { token: "fake-token", id: "fake-id" };
    mockedAxios.post.mockResolvedValue({ data: mockData });

    const response = await login(validEmail, "password");
    expect(response).toEqual(mockData);
    expect(mockedAxios.post).toHaveBeenCalledWith("/login", {
      email: validEmail,
      password: "password",
    });
  });

  it("should handle login error with invalid email", async () => {
    const invalidEmail = "invalid@example.com";
    const error = { response: { data: { error: "User not found" } } };
    mockedAxios.post.mockRejectedValue(error);

    await expect(login(invalidEmail, "password")).rejects.toThrow(
      "User not found"
    );
  });

  it("should successfully sign up a user with valid email", async () => {
    const validEmail = "lindsay.ferguson@reqres.in";
    const mockData = { id: "fake-id", token: "fake-token" };
    mockedAxios.post.mockResolvedValue({ data: mockData });

    const response = await signUp(validEmail, "password");
    expect(response).toEqual(mockData);
    expect(mockedAxios.post).toHaveBeenCalledWith("/register", {
      email: validEmail,
      password: "password",
    });
  });

  it("should handle signUp error with invalid email", async () => {
    const invalidEmail = "invalid@example.com";
    const error = { response: { data: { error: "User already exists" } } };
    mockedAxios.post.mockRejectedValue(error);

    await expect(signUp(invalidEmail, "password")).rejects.toThrow(
      "User already exists"
    );
  });
});
