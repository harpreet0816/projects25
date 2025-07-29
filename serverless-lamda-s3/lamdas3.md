# 🛠️ Shopify Frame Upload Setup (Serverless + AWS S3 + Lambda)
---

## ✅ STEP 1: Install Prerequisites  

- **Install AWS CLI** (for interacting with AWS from terminal):  
  ```bash
  brew install awscli   # For macOS  
  aws --version         # Confirm installation
 **note**  Node.js (required for Serverless & Lambda):

- **Install Serverless Framework** (CLI to deploy Lambda functions easily):

npm install -g serverless

##  ✅ STEP 2: Configure AWS Credentials
Authenticate your machine with AWS to allow deployments.
  npm i -g serverless@3
  
- **Configure using Serverless CLI** :

 serverless config credentials \
  --provider aws \
  --key YOUR_ACCESS_KEY \
  --secret YOUR_SECRET_KEY \
  --profile serverlessUser

- **configure using AWS CLI** :
 aws configure --profile serverlessUser
# Enter Access Key, Secret, Region (e.g. ap-south-1), and Output format (e.g. json)

- **Verify credentials are set correctly**:
 AWS_PROFILE=serverlessUser aws sts get-caller-identity


##  ✅ STEP 3: Create and Configure Your S3 Bucket
Create a bucket to store uploaded frame images.

- **Create a new S3 bucket**:
AWS_PROFILE=serverlessUser aws s3api create-bucket \
  --bucket frames-contriwhiz \
  --region ap-south-1 \
  --create-bucket-configuration LocationConstraint=ap-south-1

- **Make bucket public** (needed for direct access):
    AWS_PROFILE=serverlessUser aws s3api put-bucket-policy \
    --bucket frames-contriwhiz \
    --policy '{
        "Version": "2012-10-17",
        "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::frames-contriwhiz/*"
        }
        ]
    }'


## ✅ STEP 4: Create Your Serverless Project
mkdir shopify-frame-upload
cd shopify-frame-upload

serverless create --template aws-nodejs --path .
    🧱 Project structure:
    .
    ├── handler.js         # Lambda function source
    ├── serverless.yml     # Deployment config
    ├── package.json       # Node.js dependencies
    └── .gitignore         # Ignore rules


✅ STEP 5: Install Project Dependencies
Install AWS SDK v3 to interact with S3 inside Lambda.

npm init -y                    # If package.json not present
npm install @aws-sdk/client-s3


## ✅ STEP 6: Test Lambda Locally
Run your Lambda function on your local machine using test input.
 serverless deploy --aws-profile serverlessUser