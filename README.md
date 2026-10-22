# safepark.app

The marketing site for [SafePark](https://safepark.app): secure truck parking and cargo-crime mapping for drivers. It explains the app and sends drivers to the map at [map.safepark.app](https://map.safepark.app).

Built with [Astro](https://astro.build) and hosted on GitHub Pages.

## Run it locally

Needs Node 22.12 or later.

```bash
npm ci
npm run dev     # http://localhost:4321
```

`npm run build` writes the site to `dist/`. `npm run preview` serves that build.

## How changes get made

1. Open an issue describing the change.
2. Comment `@claude plan` for a plan, or `@claude implement` to have Claude make the change on a branch and open a pull request. Or make the change yourself on a branch.
3. CI builds and checks the PR. The built site is attached to the run for review.
4. Merge the PR. Merging to `main` deploys the site and creates a GitHub Release.

`main` is protected: every change goes through a pull request with a passing `ci` check.

## More

- [CLAUDE.md](CLAUDE.md): how the code is laid out and the rules for changing it
- [docs/STYLE.md](docs/STYLE.md): colours, type and voice
- [docs/deploy.md](docs/deploy.md): hosting, DNS and go-live
- [docs/forms.md](docs/forms.md): what the forms send to the backend
