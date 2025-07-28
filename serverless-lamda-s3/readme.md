# AWS Free Tier Serverless Project – Shopify Frame Upload

Welcome! This README walks you step-by-step in setting up a simple, serverless Node.js project using AWS Lambda and S3. It’s designed for beginners and uses the AWS Free Tier, so you can try this with little or no cost.

---

## ⚡ Overview

This guide will help you:
- Sign up for AWS Free Tier (includes free credits and access to many always-free services).
- Install all required tools.
- Configure your environment for developing serverless applications.
- Set up an S3 bucket and permissions.
- Write code to upload files to S3 using AWS Lambda, managed by the Serverless Framework.

---

## ✅ STEP 1: Prerequisites

Before starting, ensure you have the following tools and accounts set up:

| Tool                  | Required? | Instructions                                                   |
|-----------------------|:---------:|----------------------------------------------------------------|
| AWS Account           | ✅        | [Sign up here](https://aws.amazon.com/free/)                   |
| AWS Access Key        | ✅        | Create an IAM user with Lambda & S3 access in the AWS Console. |
| Node.js               | ✅        | [Download here](https://nodejs.org/)                           |
| Serverless Framework  | ✅        | Install globally: `npm install -g serverless`                  |
| S3 Bucket             | ✅        | Create manually in AWS Console or use AWS CLI (see below)      |

---

## ✅ STEP 2: Configure AWS Credentials and Environment

Follow these steps to connect your development environment to AWS securely.

### (A) Configure credentials for Serverless Framework

Use the Serverless CLI to store your AWS credentials locally:

npm i -g serverless@3

serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY --profile myProfile


### (B) Install and set up AWS CLI (for advanced management)

- Install AWS CLI:

brew install awscli # For macOS users. On Windows, use the MSI installer from AWS docs.
aws --version # Verify installation.


- Configure a named AWS profile:

aws configure --profile serverlessUser

Enter your AWS Access Key, Secret, Region (like ap-south-1), and output format (json)

- Confirm your credentials are set correctly:

AWS_PROFILE=serverlessUser aws sts get-caller-identity

This should return your AWS account/user info

### (C) Create and manage your S3 bucket

- **To create a new S3 bucket:**

AWS_PROFILE=serverlessUser aws s3api create-bucket
--bucket frames-contriwhiz
--region ap-south-1
--create-bucket-configuration LocationConstraint=ap-south-1


- **To delete the S3 bucket (be careful, this removes all contents):**

AWS_PROFILE=serverlessUser aws s3 rb s3://frames-contriwhiz --force


### (D) Assign a public read policy to your S3 bucket

This makes all objects in your bucket readable. Only do this if your use-case requires it!

AWS_PROFILE=serverlessUser aws s3api put-bucket-policy
--bucket frames-contriwhiz
--policy '{
"Version": "2012-10-17",
"Statement": [
{
"Sid": "PublicReadGetObject",
"Effect": "Allow",
"Principal": "",
"Action": "s3:GetObject",
"Resource": "arn:aws:s3:::frames-contriwhiz/"
}
]
}'

---

#### 🎯 Alternative: Manually create credentials file

If you prefer, you can create a file at `~/.aws/credentials`:

[myProfile]
aws_access_key_id=YOUR_ACCESS_KEY
aws_secret_access_key=YOUR_SECRET_KEY


---

## ✅ STEP 3: Create Your Serverless Project

Follow these commands to set up your project structure.

1. **Make a new directory and enter it:**

mkdir shopify-frame-upload
cd shopify-frame-upload


2. **Initialize your project using the Node.js Serverless Framework template:**

serverless create --template aws-nodejs --path .


This will create the following files:

.
├── handler.js # Your AWS Lambda function's source code
├── serverless.yml # Main configuration for Serverless Framework
├── .gitignore # Files to ignore in Git
└── package.json # Node.js project dependencies

---

## ✅ STEP 4: Install Project Dependencies

You'll need the AWS SDK v3 (modern AWS SDK for JavaScript) for accessing S3 in your project.

npm init -y # Initialize a new Node.js project (skip if package.json already exists)
npm install @aws-sdk/client-s3 # Install the AWS SDK v3 for S3

---

## ✅ Extra Commands & Testing

- **Test your Lambda function locally (replace `uploadFrameImage` and `event.json` as needed):**
serverless config credentials \                                                                                                                                                                        
  --provider aws \
  --key "random" \
  --secret "ffsf"/ \
  --profile serverlessUser

AWS_PROFILE=serverlessUser serverless invoke local -f uploadFrameImage --path event.json