# GitHub Actions CI/CD Setup for 3d7tech.com

This guide will help you configure GitHub Actions to automatically deploy your site to cPanel hosting at https://3d7tech.com.

## Prerequisites

1. **cPanel Access**: You need access to your cPanel account
2. **SSH Access**: Enable SSH access in cPanel (or use FTP)
3. **GitHub Repository**: Code should be in the repository

## Step 1: Choose Your Deployment Method

We've created three workflow options. Choose the one that matches your cPanel setup:

### Option A: FTP Deployment (Easiest)
- **File**: `.github/workflows/deploy.yml`
- **Best for**: cPanel with FTP access only
- **Requires**: FTP credentials

### Option B: SFTP Deployment (Recommended)
- **File**: `.github/workflows/deploy-sftp.yml`
- **Best for**: cPanel with SSH/SFTP access
- **Requires**: SSH private key

### Option C: Direct SCP Deployment
- **File**: `.github/workflows/deploy-cpanel-direct.yml`
- **Best for**: Full SSH access to cPanel
- **Requires**: SSH private key

## Step 2: Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add the following secrets:

### Required for All Methods:

```
VITE_PORTAL_ID=your_hubspot_portal_id
VITE_FORM_ID=your_hubspot_form_id
VITE_3D_STRATEGY_FORM_ID=your_strategy_form_id
VITE_API_KEY=your_hubspot_api_key
VITE_CLARITY_ID=your_clarity_id
```

### For FTP Method (Option A):

```
FTP_SERVER=ftp.3d7tech.com (or your FTP server)
FTP_USERNAME=your_cpanel_username
FTP_PASSWORD=your_ftp_password
SSH_HOST=your_server_ip (for creating directories)
SSH_USERNAME=your_cpanel_username
SSH_PASSWORD=your_ssh_password
```

### For SFTP/SCP Methods (Options B & C):

```
SSH_HOST=your_server_ip_or_domain
SSH_USERNAME=your_cpanel_username
SSH_PRIVATE_KEY=your_private_ssh_key
SSH_PORT=22 (optional, defaults to 22)
```

## Step 3: Get Your cPanel Credentials

### Finding FTP Credentials:
1. Log into cPanel
2. Go to "FTP Accounts" or "File Manager"
3. Note your FTP server, username, and password

### Finding SSH Credentials:
1. Log into cPanel
2. Go to "SSH Access" or "Terminal"
3. Generate or view your SSH key
4. Copy your private key (starts with `-----BEGIN RSA PRIVATE KEY-----`)

### Finding Your Server Details:
- **FTP Server**: Usually `ftp.yourdomain.com` or your server IP
- **SSH Host**: Your server IP or domain
- **Username**: Your cPanel username
- **Port**: Usually 21 for FTP, 22 for SSH

## Step 4: Enable the Workflow

1. **Rename the workflow file** you want to use to `deploy.yml` (or keep the current name)
2. **Disable other workflows** by renaming them (add `.disabled` extension)
3. **Commit and push** the workflow file

## Step 5: Test the Deployment

1. Make a small change to your code
2. Commit and push to the `main` branch
3. Go to GitHub → Actions tab
4. Watch the workflow run
5. Check https://3d7tech.com to verify deployment

## Step 6: Manual Deployment

You can also trigger deployments manually:
1. Go to GitHub → Actions
2. Select "Deploy to Production"
3. Click "Run workflow"
4. Select branch and click "Run workflow"

## Troubleshooting

### Deployment Fails with Authentication Error
- **FTP**: Verify FTP credentials are correct
- **SSH**: Ensure SSH key is properly formatted (include `-----BEGIN` and `-----END` lines)
- **SSH**: Check if SSH access is enabled in cPanel

### Files Not Uploading
- Check file permissions in cPanel
- Verify the target directory path (`public_html/`)
- Ensure the directory exists

### Build Fails
- Check if all environment variables are set in GitHub Secrets
- Verify Node.js version compatibility
- Check build logs in GitHub Actions

### API Files Not Deploying
- Verify the `api/` directory path
- Check if PHP is enabled on your server
- Ensure `api/data/` directory has write permissions (755)

## File Structure After Deployment

```
public_html/
├── index.html (and other dist files)
├── assets/
├── favicons/
├── images/
└── api/
    ├── v1/
    │   ├── chat/
    │   │   └── completions.php
    │   └── save-strategy.php
    └── data/ (created automatically)
```

## Security Notes

1. **Never commit secrets** to the repository
2. **Use SSH keys** instead of passwords when possible
3. **Rotate credentials** regularly
4. **Limit SSH access** to specific IPs if possible
5. **Review GitHub Actions logs** regularly

## Additional Configuration

### Custom Domain
If your cPanel uses a different directory structure, update the `server-dir` or `TARGET` paths in the workflow file.

### Environment-Specific Builds
You can create separate workflows for staging and production by:
1. Creating workflow files with different names
2. Using different branches (e.g., `staging`, `production`)
3. Using different secrets for each environment

## Support

If you encounter issues:
1. Check GitHub Actions logs for detailed error messages
2. Verify all secrets are correctly set
3. Test FTP/SSH connection manually
4. Contact your hosting provider for cPanel-specific issues
