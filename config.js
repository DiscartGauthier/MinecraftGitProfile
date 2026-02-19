const params = typeof location !== "undefined"
  ? new URLSearchParams(location.search)
  : new URLSearchParams("");

const window = {
  GitHubUsername: params.get("github") ?? "John",
  MinecraftUsername: params.get("minecraft") ?? "Doe",
};

export default window;
