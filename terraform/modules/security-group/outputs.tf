output "jenkins_security_group_id" {
  value = aws_security_group.jenkins_sg.id
}

output "k8s_security_group_id" {
  value = aws_security_group.k8s_sg.id
}

output "lb_security_group_id" {
  value = aws_security_group.lb_sg.id
}