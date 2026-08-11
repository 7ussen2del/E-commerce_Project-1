output "instance_id" {
  value = aws_instance.example.id
}

output "control_instance_id" {
  value = aws_instance.control-ec2.id
}

output "public_ip" {
  value = aws_instance.example.public_ip
}

output "private_ip" {
  value = aws_instance.example.private_ip
}

output "control_public_ip" {
  value = aws_instance.control-ec2.public_ip
}