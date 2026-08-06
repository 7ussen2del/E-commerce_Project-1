output "ec2_security_group_id" {
  value = aws_security_group.allow_ec2.id
}

output "lb_security_group_id" {
  value = aws_security_group.allow_lb.id
}