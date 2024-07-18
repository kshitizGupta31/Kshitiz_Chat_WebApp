import { create } from "zustand";
import { createAuthSlice } from "./slice/auth-slice";
import { createChatSlice } from "./slice/chat-slice.js";

export const useAppStore= create()((...a)=>({
    ...createAuthSlice(...a),
    ...createChatSlice(...a),
}))