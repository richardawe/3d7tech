# Quick Setup Guide: GitHub Secrets for CI/CD

## Step-by-Step Instructions

### 1. Go to GitHub Repository Settings
1. Navigate to: https://github.com/richardawe/3d7tech
2. Click **Settings** (top menu)
3. Click **Secrets and variables** → **Actions** (left sidebar)
4. Click **New repository secret** for each secret below

### 2. Add Required Secrets

#### Environment Variables (Required for Build)

**VITE_PORTAL_ID**
- Value: Your HubSpot portal ID
- Example: `12345678`

**VITE_FORM_ID**
- Value: Your HubSpot form ID
- Example: `abc123-def456-ghi789`

**VITE_3D_STRATEGY_FORM_ID**
- Value: Your HubSpot strategy form ID
- Example: `xyz789-abc123-def456`

**VITE_API_KEY**
- Value: Your HubSpot API key
- Example: `pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

**VITE_CLARITY_ID**
- Value: Your Microsoft Clarity project ID
- Example: `abc123def456`

#### Deployment Credentials (Choose One Method)

### Option A: FTP Deployment

**FTP_SERVER**
- Value: Your FTP server address
- Example: `ftp.3d7tech.com` or `123.456.789.0`

**FTP_USERNAME**
- Value: Your cPanel username
- Example: `yourusername`

**FTP_PASSWORD**
- Value: Your FTP password
- Example: `your_secure_password`

**SSH_HOST** (for directory creation)
- Value: Your server IP or domain
- Example: `123.456.789.0` or `server.3d7tech.com`

**SSH_USERNAME**
- Value: Your cPanel username
- Example: `yourusername`

**SSH_PASSWORD**
- Value: Your SSH password
- Example: `your_ssh_password`

### Option B: SFTP/SSH Deployment (Recommended)

**SSH_HOST**
- Value: Your server IP or domain
- Example: `123.456.789.0` or `server.3d7tech.com`

**SSH_USERNAME**
- Value: Your cPanel username
- Example: `yourusername`

**SSH_PRIVATE_KEY**
- Value: Your SSH private key (full key including BEGIN/END lines)
- Example:
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
(multiple lines)
...
-----END RSA PRIVATE KEY-----
```

**SSH_PORT** (Optional)
- Value: SSH port number
- Default: `22`
- Example: `2222` (if using custom port)

## 3. Finding Your Credentials

### cPanel FTP Credentials:
1. Log into cPanel: https://3d7tech.com:2083 (or your cPanel URL)
2. Go to **FTP Accounts**
3. Find your FTP account details
4. Note: Server, Username, and Password

### cPanel SSH Credentials:
1. Log into cPanel
2. Go to **SSH Access** or **Terminal**
3. If SSH key doesn't exist:
   - Click **Manage SSH Keys**
   - Generate a new key pair
   - Download the private key
4. Copy the entire private key (including BEGIN and END lines)

### Server Information:
- **FTP Server**: Usually `ftp.yourdomain.com` or found in cPanel FTP section
- **SSH Host**: Your server IP (found in cPanel → Server Information)
- **Username**: Your cPanel username (usually your domain name without .com)

## 4. Enable the Workflow

After adding secrets, choose ONE workflow to use:

1. **For FTP**: Keep `deploy.yml` active
2. **For SFTP**: Rename `deploy-sftp.yml` to `deploy.yml` and disable others
3. **For Direct SCP**: Rename `deploy-cpanel-direct.yml` to `deploy.yml` and disable others

To disable a workflow, rename it (add `.disabled` extension):
```bash
git mv .github/workflows/deploy.yml .github/workflows/deploy.yml.disabled
```

## 5. Test the Deployment

1. Make a small change (e.g., update README)
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test deployment"
   git push origin main
   ```
3. Go to GitHub → **Actions** tab
4. Watch the workflow run
5. Check https://3d7tech.com after completion

## Security Best Practices

✅ **DO:**
- Use SSH keys instead of passwords when possible
- Rotate credentials regularly
- Use strong, unique passwords
- Review GitHub Actions logs regularly

❌ **DON'T:**
- Commit secrets to the repository
- Share secrets in public channels
- Use the same password for multiple services
- Leave default passwords unchanged

## Troubleshooting

### "Authentication failed"
- Double-check username and password
- Verify SSH key format (must include BEGIN/END lines)
- Check if SSH/FTP access is enabled in cPanel

### "Permission denied"
- Verify file permissions in cPanel
- Check if the target directory exists
- Ensure user has write permissions

### "Build failed"
- Verify all VITE_* secrets are set
- Check build logs for specific errors
- Ensure Node.js version is compatible

## Need Help?

1. Check workflow logs in GitHub Actions
2. Verify all secrets are correctly set
3. Test FTP/SSH connection manually
4. Contact your hosting provider for cPanel-specific issues
