#!/bin/bash

rm -rf ./docs
npm run build-docs
AWS_PROFILE=personal aws s3 sync ./docs s3://mhoc-co-website/docs/aws-cred-report-ts
rm -rf ./docs
AWS_PROFILE=personal aws cloudfront create-invalidation \
  --distribution-id EO1O33M2R2N09 \
  --paths "/docs/aws-cred-report-ts/*"
