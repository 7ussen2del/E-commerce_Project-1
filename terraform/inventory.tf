resource "local_file" "inventory" {
  filename = "../ansible/inventory/hosts.ini"
  content  = <<EOF
    [web]
    ${module.ec2.public_ip} ansible_user=ec2-user
    EOF
}
