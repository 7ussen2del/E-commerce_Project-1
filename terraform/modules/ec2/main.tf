data "aws_ami" "amazon" {

  most_recent = true

  owners = ["amazon"]

  filter {

    name = "name"

    values = ["al2023-ami-*-x86_64"]
  }
}


resource "aws_instance" "example" {
  ami                    = data.aws_ami.amazon.id
  instance_type          = var.instance_type
  key_name               = aws_key_pair.deployer.key_name
  subnet_id              = var.subnet_id
  vpc_security_group_ids = [var.security_group_id]
  root_block_device {
  volume_size = 30
  volume_type = "gp3"
}
  tags = {
    Name = "${var.project}-ec2"
  }
}
