# Complete FTP Deployment Guide for 3d7tech.com

This is a step-by-step guide to deploy your website to https://3d7tech.com using GitHub Actions and FTP.

## Prerequisites Checklist

Before starting, make sure you have:
- ✅ Access to your cPanel account at 3d7tech.com
- ✅ FTP credentials (username and password)
- ✅ GitHub repository access (https://github.com/richardawe/3d7tech)
- ✅ All environment variables ready (HubSpot IDs, API keys, etc.)

---

## Step 1: Get Your FTP Credentials from cPanel

### 1.1 Log into cPanel
1. Go to your cPanel login page (usually: `https://3d7tech.com:2083` or `https://cpanel.3d7tech.com`)
2. Enter your cPanel username and password
3. Click **Log in**

### 1.2 Find FTP Account Information
1. In cPanel, look for **"FTP Accounts"** (usually under **"Files"** section)
2. Click on **"FTP Accounts"**
3. You'll see your FTP accounts listed
4. Find the account you want to use (usually matches your cPanel username)
5. Note down:
   - **FTP Server**: Usually `ftp.3d7tech.com` or your server IP
   - **Username**: Your cPanel username
   - **Password**: Your FTP password (if you don't remember it, you can reset it here)

### 1.3 Create API Data Directory (Manual Step)
After deployment, you'll need to manually create the `api/data` directory:
1. Log into cPanel
2. Go to **"File Manager"**
3. Navigate to `public_html/api/`
4. Click **"New Folder"**
5. Name it `data`
6. Right-click the folder → **"Change Permissions"**
7. Set to `755` (or check: Read, Write, Execute for Owner; Read, Execute for Group and Public)
8. Click **"Change Permissions"**

---

## Step 2: Prepare Your Environment Variables

Gather all the following values before proceeding:

### Required Environment Variables:
- **VITE_PORTAL_ID**: Your HubSpot portal ID
- **VITE_FORM_ID**: Your HubSpot form ID  
- **VITE_3D_STRATEGY_FORM_ID**: Your HubSpot strategy form ID
- **VITE_API_KEY**: Your HubSpot API key
- **VITE_CLARITY_ID**: Your Microsoft Clarity project ID

**Where to find these:**
- HubSpot: Log into HubSpot → Settings → Integrations → API
- Clarity: Log into Microsoft Clarity → Project Settings

---

## Step 3: Add Secrets to GitHub

### 3.1 Navigate to GitHub Secrets
1. Go to: https://github.com/richardawe/3d7tech
2. Click on **"Settings"** (top menu bar)
3. In the left sidebar, click **"Secrets and variables"**
4. Click **"Actions"**
5. You'll see a list of existing secrets (if any)

### 3.2 Add Environment Variable Secrets

Click **"New repository secret"** for each of the following:

#### Secret 1: VITE_PORTAL_ID
- **Name**: `VITE_PORTAL_ID`
- **Value**: Your HubSpot portal ID (e.g., `12345678`)
- Click **"Add secret"**

#### Secret 2: VITE_FORM_ID
- **Name**: `VITE_FORM_ID`
- **Value**: Your HubSpot form ID (e.g., `abc123-def456-ghi789`)
- Click **"Add secret"**

#### Secret 3: VITE_3D_STRATEGY_FORM_ID
- **Name**: `VITE_3D_STRATEGY_FORM_ID`
- **Value**: Your HubSpot strategy form ID
- Click **"Add secret"**

#### Secret 4: VITE_API_KEY
- **Name**: `VITE_API_KEY`
- **Value**: Your HubSpot API key (e.g., `pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
- Click **"Add secret"**

#### Secret 5: VITE_CLARITY_ID
- **Name**: `VITE_CLARITY_ID`
- **Value**: Your Microsoft Clarity project ID
- Click **"Add secret"**

### 3.3 Add FTP Deployment Secrets

#### Secret 6: FTP_SERVER
- **Name**: `FTP_SERVER`
- **Value**: Your FTP server address (e.g., `ftp.3d7tech.com` or `123.456.789.0`)
- Click **"Add secret"**

#### Secret 7: FTP_USERNAME
- **Name**: `FTP_USERNAME`
- **Value**: Your cPanel username
- Click **"Add secret"**

#### Secret 8: FTP_PASSWORD
- **Name**: `FTP_PASSWORD`
- **Value**: Your FTP password
- Click **"Add secret"**

### 3.4 Verify All Secrets
You should now have **8 secrets** total:
- 5 environment variables (VITE_*)
- 3 FTP deployment credentials (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)

---

## Step 4: Enable the FTP Workflow

### 4.1 Check Current Workflow
1. Go to: https://github.com/richardawe/3d7tech
2. Click on **"Actions"** (top menu)
3. You should see workflows listed
4. Look for **"Deploy to Production"** workflow

### 4.2 Verify Workflow File
1. Go to: https://github.com/richardawe/3d7tech/tree/main/.github/workflows
2. Make sure `deploy.yml` exists (this is the FTP workflow)
3. If you see `deploy-sftp.yml` or `deploy-cpanel-direct.yml`, those are alternative methods - you can ignore them for now

The FTP workflow (`deploy.yml`) should already be active. If not, it will activate automatically on the first push.

---

## Step 5: Test the Deployment

### 5.1 Make a Test Change
1. Go to your local project: `/Users/3d7tech/3d7tech-orod`
2. Open `README.md` (or create one if it doesn't exist)
3. Add a test line, for example:
   ```markdown
   # 3D7Tech Website
   
   Last deployment test: [Current Date]
   ```
4. Save the file

### 5.2 Commit and Push
Open your terminal and run:

```bash
cd /Users/3d7tech/3d7tech-orod
git add README.md
git commit -m "Test deployment workflow"
git push origin main
```

### 5.3 Monitor the Deployment
1. Go to: https://github.com/richardawe/3d7tech/actions
2. You should see a new workflow run appear (yellow circle = in progress)
3. Click on the workflow run to see details
4. Click on **"build-and-deploy"** job to see the steps
5. Watch each step:
   - ✅ Checkout code
   - ✅ Setup Node.js
   - ✅ Install dependencies
   - ✅ Build project
   - ✅ Deploy frontend to cPanel via FTP
   - ✅ Deploy API files to cPanel via FTP
   - ✅ Deployment notification

### 5.4 Check for Success
- **Green checkmark** ✅ = Deployment successful!
- **Red X** ❌ = Something went wrong (see troubleshooting below)

### 5.5 Verify Website
1. Wait 1-2 minutes after deployment completes
2. Visit: https://3d7tech.com
3. Check if your changes are live
4. Test the website functionality

---

## Step 6: Understanding the Deployment Process

### What Happens During Deployment:

1. **Code Checkout**: GitHub Actions downloads your code
2. **Node.js Setup**: Installs Node.js 18
3. **Install Dependencies**: Runs `npm ci` to install packages
4. **Build Project**: Runs `npm run build` which:
   - Compiles React code
   - Bundles assets
   - Creates optimized `dist/` folder
   - Injects environment variables
5. **Deploy Frontend**: Uploads `dist/` folder contents to `public_html/`
6. **Deploy API**: Uploads `api/` folder to `public_html/api/`
7. **Manual Step**: You need to create `api/data/` directory in cPanel File Manager (see Step 1.3)

### File Structure After Deployment:

```
public_html/
├── index.html
├── assets/
│   ├── index-*.js
│   └── index-*.css
├── favicons/
├── images/
└── api/
    ├── v1/
    │   ├── chat/
    │   │   └── completions.php
    │   └── save-strategy.php
    └── data/ (created automatically)
```

---

## Step 7: Regular Deployment Workflow

### For Future Updates:

1. **Make Changes Locally**
   ```bash
   # Edit your files
   # Test locally with: npm run dev
   ```

2. **Commit Changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push origin main
   ```

3. **Automatic Deployment**
   - GitHub Actions automatically triggers
   - Deployment happens in ~3-5 minutes
   - Website updates automatically

4. **Verify**
   - Check GitHub Actions for status
   - Visit https://3d7tech.com to see changes

---

## Troubleshooting Common Issues

### Issue 1: "Authentication failed" Error

**Symptoms**: Workflow fails at "Deploy to cPanel via FTP" step

**Solutions**:
1. Double-check FTP credentials in GitHub Secrets
2. Verify FTP server address is correct
3. Test FTP connection manually using an FTP client
4. Check if FTP is enabled in cPanel
5. Ensure password doesn't have special characters that need encoding

**Test FTP Connection**:
- Use FileZilla or similar FTP client
- Try connecting with the same credentials
- If it works there, credentials are correct

### Issue 2: "Build failed" Error

**Symptoms**: Workflow fails at "Build project" step

**Solutions**:
1. Check if all VITE_* secrets are set in GitHub
2. Verify secret values are correct (no extra spaces)
3. Check build logs for specific error messages
4. Test build locally: `npm run build`

### Issue 3: "Permission denied" Error

**Symptoms**: Files upload but website shows errors

**Solutions**:
1. Check file permissions in cPanel File Manager
2. Ensure `public_html/` directory is writable
3. Verify `api/data/` directory exists and has 755 permissions
4. Check PHP error logs in cPanel

### Issue 4: Files Not Updating on Website

**Symptoms**: Deployment succeeds but website doesn't change

**Solutions**:
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Wait 2-3 minutes for DNS/propagation
3. Check if files actually uploaded in cPanel File Manager
4. Verify you're looking at the correct domain
5. Check if CDN/caching is enabled (clear cache)

### Issue 5: API Not Working

**Symptoms**: API endpoints return errors

**Solutions**:
1. Verify `api/` folder exists in `public_html/api/`
2. Check PHP version in cPanel (needs PHP 7.4+)
3. Verify `api/data/` directory exists and is writable
4. Check PHP error logs in cPanel
5. Test API endpoint directly: `https://3d7tech.com/api/v1/chat/completions.php`

### Issue 6: Workflow Not Triggering

**Symptoms**: No workflow runs when pushing to main

**Solutions**:
1. Check if workflow file exists: `.github/workflows/deploy.yml`
2. Verify you're pushing to `main` branch
3. Check GitHub Actions tab for any disabled workflows
4. Try manual trigger: Actions → Deploy to Production → Run workflow

---

## Manual Deployment (If Needed)

If automatic deployment fails, you can deploy manually:

### Option 1: Using cPanel File Manager
1. Log into cPanel
2. Go to **File Manager**
3. Navigate to `public_html/`
4. Upload your `dist/` folder contents
5. Upload `api/` folder to `public_html/api/`

### Option 2: Using FTP Client
1. Connect using FileZilla or similar
2. Navigate to `public_html/`
3. Upload `dist/` folder contents
4. Upload `api/` folder

---

## Security Best Practices

1. **Never commit secrets** to the repository
2. **Rotate passwords** regularly (every 3-6 months)
3. **Use strong passwords** for FTP and SSH
4. **Review deployment logs** regularly
5. **Limit access** to GitHub repository
6. **Monitor failed deployments** for security issues

---

## Quick Reference: GitHub Secrets Checklist

Use this checklist to verify all secrets are set:

- [ ] VITE_PORTAL_ID
- [ ] VITE_FORM_ID
- [ ] VITE_3D_STRATEGY_FORM_ID
- [ ] VITE_API_KEY
- [ ] VITE_CLARITY_ID
- [ ] FTP_SERVER
- [ ] FTP_USERNAME
- [ ] FTP_PASSWORD

---

## Support and Additional Resources

- **GitHub Actions Documentation**: https://docs.github.com/en/actions
- **FTP Deploy Action**: https://github.com/SamKirkland/FTP-Deploy-Action
- **cPanel Documentation**: Check your hosting provider's docs
- **Workflow Logs**: Always check GitHub Actions logs for detailed error messages

---

## Next Steps After Successful Deployment

1. ✅ Set up monitoring (check website regularly)
2. ✅ Test all features (strategy generator, chatbot, etc.)
3. ✅ Set up backups (cPanel usually has automatic backups)
4. ✅ Configure custom domain if needed
5. ✅ Set up SSL certificate (if not already done)

---

## Summary

You now have:
- ✅ GitHub Actions workflow configured for FTP deployment
- ✅ All secrets configured in GitHub
- ✅ Automatic deployment on every push to main branch
- ✅ Complete troubleshooting guide

**Your website will automatically deploy every time you push code to the main branch!**

For questions or issues, check the troubleshooting section above or review the GitHub Actions logs for detailed error messages.
