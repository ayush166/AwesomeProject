// models.js
import { model } from "@convex-dev/server";

export const UserProfiles = model("UserProfiles", {
  username: String,
  email: String,
  usageStats: Object,
  goals: Array,
});