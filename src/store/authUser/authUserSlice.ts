import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserResponseType } from "@/types/User";

interface AuthUserState {
  authUser: UserResponseType;
}

const initialState: AuthUserState = {
  authUser: { id: "", usuario: "", nombreCompleto: "", rol: "", token: "" },
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<UserResponseType>) {
      state.authUser = action.payload
    },
    signOut(state) {
      state.authUser = initialState.authUser;
    }
  },
});

export const { setAuthUser, signOut } = authUserSlice.actions;

export default authUserSlice.reducer;
