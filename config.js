const params = typeof location !== "undefined"
  ? new URLSearchParams(location.search)
  : new URLSearchParams("");

const window = {
  GitHubUsername: params.get("github") ?? "JohnDoe",
  MinecraftUsername: params.get("minecraft") ?? "Steve",
};

export default window;
