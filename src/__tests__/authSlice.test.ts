import authReducer, { loginSuccess, logout } from "../utils/authSlice";

describe("authSlice", () => {
  const initialState = {
    token: null,
    userId: null,
  };

  it("should handle initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle loginSuccess", () => {
    const action = loginSuccess({ token: "fakeToken", userId: "1" });
    const expectedState = {
      token: "fakeToken",
      userId: "1",
    };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle logout", () => {
    const loggedInState = {
      token: "fakeToken",
      userId: "1",
    };
    const action = logout();
    expect(authReducer(loggedInState, action)).toEqual(initialState);
  });
});
