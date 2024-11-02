# Create the hosted zone
resource "aws_route53_zone" "main" {
  name = var.domain

  tags = local.tags
}

# Create the record in the zone
resource "aws_route53_record" "site" {
  zone_id = aws_route53_zone.main.zone_id
  name    = local.site_domain
  type    = "A"

  alias {
    name                   = module.cdn.cloudfront_distribution_domain_name
    zone_id                = module.cdn.cloudfront_distribution_hosted_zone_id
    evaluate_target_health = true
  }
}