terraform {
    required_version = "~> 1.14"
backend "s3" {
    bucket       = "k8s-terraform-state-3212222" 
    key          = "k8s/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true 
    encrypt = true
  }
}