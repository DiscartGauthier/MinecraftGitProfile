const params = typeof location !== "undefined"
  ? new URLSearchParams(location.search)
  : new URLSearchParams("");

const window = {
  GitHubUsername: params.get("github") ?? "DiscartGauthier",
  MinecraftUsername: params.get("minecraft") ?? "XGORATH_",
};

export default window;
