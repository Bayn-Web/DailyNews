import sourceStore from "./source-store";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    source: sourceStore,
  },
});
