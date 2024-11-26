{
  description = "Simple web project with Deno, Svelte, and relevant tools";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShell = pkgs.mkShell {
          name = "web-dev-shell";

          packages = with pkgs; [
            deno # Runtime for Deno
            biome # Linting and formatting tool
            svelte-language-server # LSP for Svelte
            tailwindcss-language-server # LSP for TailwindCSS
            tmux
          ];

          # Environment variables for convenience
          shellHook = ''
            echo "Deno is available at: $(which deno)"
            echo "Svelte LSP is available as: svelte-language-server"
            echo "TailwindCSS LSP is available as: tailwindcss-language-server"
          '';
        };
      }
    );
}
