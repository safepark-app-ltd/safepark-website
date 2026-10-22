# Deploying safepark.app

## How it works

- Every pull request to `main` runs **CI** (`.github/workflows/ci.yml`): install, audit, type-check, build, internal link check. The `ci` check is required to merge.
- Merging to `main` runs **Deploy** (`deploy.yml`): it builds the site, publishes it to GitHub Pages and creates a GitHub Release tagged `vYYYY.MM.DD-<run>`.
- To redeploy without a change, run Deploy by hand from the Actions tab.
- To roll back, revert the bad PR and merge the revert.

The marketing site deploys on its own. It is not part of the platform's coordinated release in safepark-platform (ADR-0008): it shares no code, data or login with the apps, so its releases don't need to line up with app versions.

## Where it runs

- Repo: `safepark-app-ltd/safepark-website`. It is **public**, because the organisation is on GitHub's free plan and Pages needs a public repo on that plan. Keep internal documents (proposals, review notes, anything with prices or customer data) out of it.
- Hosting: GitHub Pages, published by Actions, not from a branch.
- Address: `https://preview.safepark.app` until go-live, then `https://safepark.app`.
- The `SITE_URL` repository variable sets the address. Any value other than `https://safepark.app` builds a site that asks search engines not to index it (noindex on every page, and a robots.txt that blocks everything).

## One-off setup

### GitHub

1. Create the repo `safepark-app-ltd/safepark-website` (public) and push `main`.
2. **Settings → Pages → Source:** GitHub Actions.
3. **Settings → Secrets and variables → Actions:**
   - Variables: `SITE_URL` = `https://preview.safepark.app`.
   - Secrets: `CLAUDE_CODE_OAUTH_TOKEN` (from `claude setup-token`) and `CLAUDE_GITHUB_TOKEN` (fine-grained PAT, this repo only: Contents, Issues and Pull requests read/write).
4. **Settings → Actions → General:** turn on "Allow GitHub Actions to create and approve pull requests", so the Claude workflow can open its PRs.
5. Install the [Claude GitHub app](https://github.com/apps/claude) on the safepark-app-ltd organisation, for this repo.
6. **Settings → Rules → Rulesets:** a ruleset for `main` that requires a pull request and the `ci` status check, and blocks force pushes and deletion.
7. **Organisation settings → Pages → Verified domains:** add `safepark.app`. GitHub shows a TXT record to create (below). Verifying stops anyone else's GitHub Pages site from claiming a safepark.app address.

### DNS (Route 53, by hand for now)

safepark.app's hosted zone (`Z0131313H0GDZZLT6OOO`) isn't managed by safepark-infra yet, so these changes are made with the AWS CLI. The `serverless-deploy` credentials in `~/.aws` can read and change the zone.

```bash
ZONE=$(aws route53 list-hosted-zones-by-name --dns-name safepark.app \
  --query 'HostedZones[0].Id' --output text | sed 's|/hostedzone/||')

# See what's there before changing anything.
aws route53 list-resource-record-sets --hosted-zone-id "$ZONE" \
  --query "ResourceRecordSets[?contains(Name, 'preview') || contains(Name, '_github')]"
```

**1. Domain verification.** Use the record name and value GitHub shows in step 7 above:

```bash
aws route53 change-resource-record-sets --hosted-zone-id "$ZONE" --change-batch '{
  "Comment": "GitHub Pages domain verification",
  "Changes": [{"Action": "UPSERT", "ResourceRecordSet": {
    "Name": "_github-pages-challenge-safepark-app-ltd.safepark.app", "Type": "TXT", "TTL": 300,
    "ResourceRecords": [{"Value": "\"<value from GitHub>\""}]}}]}'
```

**2. preview.safepark.app.** There's no existing record, so this is a single CREATE:

```bash
aws route53 change-resource-record-sets --hosted-zone-id "$ZONE" --change-batch '{
  "Comment": "preview.safepark.app to GitHub Pages",
  "Changes": [{"Action": "CREATE", "ResourceRecordSet": {"Name": "preview.safepark.app", "Type": "CNAME", "TTL": 300,
    "ResourceRecords": [{"Value": "safepark-app-ltd.github.io"}]}}]}'
```

Then, in the repo, **Settings → Pages → Custom domain:** `preview.safepark.app`. Wait for the certificate, then tick **Enforce HTTPS**.

## Go-live checklist

`.app` domains only work over HTTPS (every browser enforces it). GitHub can't issue the certificate for safepark.app until the DNS points at GitHub, so there is a short gap, usually under an hour, where safepark.app shows a certificate error. Do the switch at a quiet time.

1. A day before: lower the TTL on the `safepark.app` A record and the `www` CNAME to 300 seconds.
2. Change the repo variable `SITE_URL` to `https://safepark.app` and run Deploy by hand. The build is now indexable, with the live robots.txt.
3. **Settings → Pages → Custom domain:** `safepark.app`. GitHub then redirects www and the github.io address to it.
4. In Route 53, replace the apex A record (`109.228.34.170`) and AAAA record (`2a00:da00:100f:f000::200`), both at the old web host, with GitHub's addresses, and point `www` at GitHub. (`www` is currently a CNAME to `safepark.app`.)
   - A `safepark.app`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - AAAA `safepark.app`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - CNAME `www.safepark.app`: `safepark-app-ltd.github.io`
   - **Leave everything else alone**: the MX, SPF, DKIM and DMARC records (Google mail, SendGrid, Amazon SES), the app subdomains (map, admin, the APIs, auth) and the ACM validation record.
   - The two `_dep_ws_mutex` TXT records (on the apex and `www`) are left over from the old web host's deploy tool. Delete them once the old hosting is cancelled.
5. When the certificate is issued, tick **Enforce HTTPS**.
6. Check every old address still loads (the 13 from the proposal, including `/category/latest-news/` → `/guides/`).
7. Submit `https://safepark.app/sitemap-index.xml` in Google Search Console and watch Pages → Indexing for errors over the next few weeks.
8. Remove the preview: delete the `preview` CNAME. GitHub only serves one custom domain per repo, so once step 3 is done the preview address stops working anyway.
9. Keep the old WordPress hosting until the new site has been live for a couple of weeks, then cancel it.
