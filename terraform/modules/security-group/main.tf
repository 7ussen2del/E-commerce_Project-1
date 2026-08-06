resource "aws_security_group" "allow_ec2" {
  name        = "allow_ec2"
  description = "Allow TLS inbound traffic and all outbound traffic"
  vpc_id      = var.vpc_id

  tags = {
    Name = "${var.project}-ec2-sg"
  }
}

resource "aws_vpc_security_group_ingress_rule" "allow_ec2_ipv4_tcp" {
  security_group_id = aws_security_group.allow_ec2.id
  referenced_security_group_id = aws_security_group.allow_lb.id
  from_port         = 3000
  ip_protocol       = "tcp"
  to_port           = 3000
}

resource "aws_vpc_security_group_ingress_rule" "allow_ec2_ipv4_ssh" {
  security_group_id = aws_security_group.allow_ec2.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ec2_ipv4" {
  security_group_id = aws_security_group.allow_ec2.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}


resource "aws_security_group" "allow_lb" {
  name        = "allow_lb"
  description = "Allow LB traffic"
  vpc_id      = var.vpc_id

  tags = {
    Name = "${var.project}-lb-sg"
  }
}

resource "aws_vpc_security_group_ingress_rule" "allow_lb_ipv4" {
  security_group_id = aws_security_group.allow_lb.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
}

resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_lb_ipv4" {
  security_group_id = aws_security_group.allow_lb.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}