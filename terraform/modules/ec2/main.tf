data "aws_ami" "amazon" {

  most_recent = true

  owners = ["amazon"]

  filter {

    name = "name"

    values = ["al2023-ami-*-x86_64"]
  }
}

resource "aws_instance" "jenkins" {
  ami                    = data.aws_ami.amazon.id
  instance_type          = var.jenkins_instance_type
  associate_public_ip_address = true
  key_name               = aws_key_pair.deployer.key_name
  subnet_id              = var.subnet_id_1
  vpc_security_group_ids = [var.jenkins_security_group_id]
  root_block_device {
    volume_size = 30
    volume_type = "gp3"
  }
  tags = {
    Name = "${var.project}-jenkins"
  }
}


resource "aws_instance" "masters" {
  count                       = var.master_count
  ami                         = data.aws_ami.amazon.id
  instance_type               = var.k8s_instance_type
  subnet_id                   = var.subnet_id_1
  vpc_security_group_ids      = [var.k8s_security_group_id]
  key_name                    = aws_key_pair.deployer.key_name
  associate_public_ip_address = true

  tags = { Name = "k8s-master-${count.index + 1}" }
}

resource "aws_instance" "workers" {
  count                       = var.worker_count
  ami                         = data.aws_ami.amazon.id
  instance_type               = var.k8s_instance_type
  subnet_id                   = var.subnet_id_2
  vpc_security_group_ids      = [var.k8s_security_group_id]
  key_name                    = aws_key_pair.deployer.key_name
  associate_public_ip_address = true

  tags = { Name = "k8s-worker-${count.index + 1}" }
}
