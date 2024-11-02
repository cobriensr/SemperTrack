locals {
  site_domain = var.domain
  tags = merge(
    var.tags,
    {
      Name    = var.domain
      Owner   = var.first_name
      Project = "SemperTrack"
    }
  )
}