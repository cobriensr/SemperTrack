data "aws_cloudfront_origin_access_control" "existing_oac" {
  id = "E29Q2AR5QZF81V"
}

module "cdn" {
  source = "terraform-aws-modules/cloudfront/aws"

  aliases = [local.site_domain]

  comment             = "${var.first_name} Site CDN"
  enabled             = true
  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"
  retain_on_delete    = false
  wait_for_deployment = false

  # Remove default_root_object as Next.js handles routing differently
  # default_root_object = "index.html"

  create_origin_access_identity = true
  origin_access_identities = {
    site_bucket = "Site Bucket Access ID"
  }

  create_origin_access_control = false
  origin_access_control = {
    s3_oac = {
      id               = data.aws_cloudfront_origin_access_control.existing_oac.id
      description      = data.aws_cloudfront_origin_access_control.existing_oac.description
      origin_type      = data.aws_cloudfront_origin_access_control.existing_oac.origin_access_control_origin_type
      signing_behavior = data.aws_cloudfront_origin_access_control.existing_oac.signing_behavior
      signing_protocol = data.aws_cloudfront_origin_access_control.existing_oac.signing_protocol
    }
  }

  origin = {
    something = {
      domain_name = local.site_domain
      custom_origin_config = {
        http_port                = 80
        https_port               = 443
        origin_keepalive_timeout = 5
        origin_protocol_policy   = "match-viewer"
        origin_ssl_protocols     = ["TLSv1.2"]
      }
    }

    s3_one = {
      domain_name           = module.site.s3_bucket_bucket_domain_name
      origin_access_control = "s3_oac"
    }
  }

  default_cache_behavior = {
    target_origin_id       = "something"
    viewer_protocol_policy = "allow-all"
    # Allow all methods for SSR
    allowed_methods = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods  = ["GET", "HEAD"]
    compress        = true
    # query_string    = true

    # Cache configuration for Next.js
    cache_policy_id          = aws_cloudfront_cache_policy.next_js.id
    origin_request_policy_id = aws_cloudfront_origin_request_policy.next_js.id
    # README solution
    use_forwarded_values = false

    # Enable function associations if needed
    function_association = {
      viewer-request = {
        function_arn = aws_cloudfront_function.url_rewrite.arn
      }
    }
  }

  ordered_cache_behavior = [
    {
      path_pattern           = "/_next/static/*"
      target_origin_id       = "s3_one"
      viewer_protocol_policy = "redirect-to-https"

      allowed_methods = ["GET", "HEAD"]
      cached_methods  = ["GET", "HEAD"]
      compress        = true

      cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6" # CachingOptimized
      # README solution
      use_forwarded_values = false
    },
    {
      path_pattern           = "static/*"
      target_origin_id       = "s3_one"
      viewer_protocol_policy = "redirect-to-https"

      allowed_methods = ["GET", "HEAD"]
      cached_methods  = ["GET", "HEAD"]
      compress        = true

      cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6" # CachingOptimized
      # README solution
      use_forwarded_values = false
    }
  ]

  viewer_certificate = {
    acm_certificate_arn = aws_acm_certificate.this.arn
    ssl_support_method  = "sni-only"
  }

  tags = var.tags
}

# Create cache policy for Next.js
resource "aws_cloudfront_cache_policy" "next_js" {
  name        = "next-js-policy"
  comment     = "Policy for Next.js application"
  default_ttl = 0
  max_ttl     = 31536000
  min_ttl     = 0

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "all"
    }
    headers_config {
      header_behavior = "whitelist"
      headers {
        items = ["Authorization", "Host"]
      }
    }
    query_strings_config {
      query_string_behavior = "all"
    }
  }
}

# Create origin request policy for Next.js
resource "aws_cloudfront_origin_request_policy" "next_js" {
  name    = "next-js-origin-policy"
  comment = "Policy for Next.js origin requests"

  cookies_config {
    cookie_behavior = "all"
  }
  headers_config {
    header_behavior = "allViewer"
  }
  query_strings_config {
    query_string_behavior = "all"
  }
}

# URL rewrite function for handling Next.js routes
resource "aws_cloudfront_function" "url_rewrite" {
  name    = "url-rewrite"
  runtime = "cloudfront-js-1.0"
  comment = "URL rewrite function for Next.js"
  publish = true
  code    = <<-EOF
    function handler(event) {
      var request = event.request;
      var uri = request.uri;
      
      // Handle root path
      if (uri === '/') {
        request.uri = '/index';
      }
      
      // Handle clean URLs
      if (!uri.includes('.')) {
        request.uri = uri + '.html';
      }
      
      return request;
    }
  EOF
}