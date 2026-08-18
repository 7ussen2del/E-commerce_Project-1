output "jenkins_instance_id" {
  value = aws_instance.jenkins.id
}

output "jenkins_public_ip" {
  value = aws_instance.jenkins.public_ip
}

output "jenkins_private_ip" {
  value = aws_instance.jenkins.private_ip
}


output "master_public_ips" {
  value = [for master in aws_instance.masters : master.public_ip]
}

output "master_private_ips" {
  value = [for master in aws_instance.masters : master.private_ip
  ]
}


output "worker_public_ips" {
  value = [for worker in aws_instance.workers : worker.public_ip]
}

output "worker_private_ips" {
  value = [for worker in aws_instance.workers : worker.private_ip]
}


output "worker_instance_ids" {
  value = [for worker in aws_instance.workers : worker.id]
}