output "vpc_id" {
  value = module.network.vpc_id
}

output "alb_dns_name" {
  value = module.alb_tg.alb_dns_name
}

output "jenkins_public_ip" {
  value = module.ec2.jenkins_public_ip
}

output "master_public_ips" {
  value = module.ec2.master_public_ips
}

output "worker_public_ips" {
  value = module.ec2.worker_public_ips
}

output "target_group_arn" {
  value = module.alb_tg.target_group_arn
}