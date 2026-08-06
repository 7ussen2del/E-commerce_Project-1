output "vpc_id" {
  value = module.network.vpc_id
}

output "alb_dns_name" {
  value = module.load_balancer.alb_dns_name
}

output "instance_public_ip" {
  value = module.ec2.public_ip
}

output "instance_private_ip" {
  value = module.ec2.private_ip
}

output "target_group_arn" {
  value = module.load_balancer.target_group_arn
}