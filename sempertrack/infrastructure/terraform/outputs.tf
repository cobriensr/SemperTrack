# Route53 Outputs
output "nameservers" {
  description = "Nameservers for the domain"
  value       = aws_route53_zone.main.name_servers
}

output "domain_name" {
  description = "Domain name"
  value       = var.domain
}

# CloudFront Outputs
output "cloudfront_distribution_id" {
  description = "CloudFront Distribution ID"
  value       = module.cdn.cloudfront_distribution_id
}

output "cloudfront_distribution_domain_name" {
  description = "CloudFront Distribution Domain Name"
  value       = module.cdn.cloudfront_distribution_domain_name
}

# S3 Outputs
output "s3_bucket_name" {
  description = "Name of the S3 bucket hosting the website"
  value       = module.site.s3_bucket_id
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = module.site.s3_bucket_arn
}

# Certificate Outputs
output "acm_certificate_arn" {
  description = "ARN of the ACM certificate"
  value       = aws_acm_certificate.this.arn
}

# General Info
output "aws_region" {
  description = "AWS region"
  value       = var.region
}