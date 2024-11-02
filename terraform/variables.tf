variable "domain" {
  description = "Domain"
  type        = string

  default = "sempertrack.com"
}

variable "first_name" {
  description = "Your first name"
  type        = string

  default = "charlie"
}

variable "region" {
  description = "AWS Region where resources will be deployed"
  type        = string

  default = "us-east-2"
}

variable "tags" {
  description = "Tags to be applied to resources"
  type        = map(string)

  default = {}
}