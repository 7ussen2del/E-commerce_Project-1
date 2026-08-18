# =========================================================
# Jenkins Security Group
# =========================================================

resource "aws_security_group" "jenkins_sg" {
  name        = "${var.project}-jenkins-sg"
  description = "Security group for Jenkins server"
  vpc_id      = var.vpc_id

  tags = {
    Name = "${var.project}-jenkins-sg"
  }
}

# SSH to Jenkins
resource "aws_vpc_security_group_ingress_rule" "jenkins_ssh" {
  security_group_id = aws_security_group.jenkins_sg.id

  cidr_ipv4 = "0.0.0.0/0"

  from_port   = 22
  to_port     = 22
  ip_protocol = "tcp"
}

# Jenkins Web UI
resource "aws_vpc_security_group_ingress_rule" "jenkins_web" {
  security_group_id = aws_security_group.jenkins_sg.id

  cidr_ipv4 = "0.0.0.0/0"

  from_port   = 8080
  to_port     = 8080
  ip_protocol = "tcp"
}

# Jenkins outbound
resource "aws_vpc_security_group_egress_rule" "jenkins_all_outbound" {
  security_group_id = aws_security_group.jenkins_sg.id

  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = "-1"
}


# =========================================================
# Kubernetes Security Group
# =========================================================

resource "aws_security_group" "k8s_sg" {
  name        = "${var.project}-k8s-sg"
  description = "Security group for Kubernetes cluster"
  vpc_id      = var.vpc_id

  tags = {
    Name = "${var.project}-k8s-sg"
  }
}

# SSH to Kubernetes nodes
resource "aws_vpc_security_group_ingress_rule" "k8s_ssh" {
  security_group_id = aws_security_group.k8s_sg.id

  cidr_ipv4 = "0.0.0.0/0"

  from_port   = 22
  to_port     = 22
  ip_protocol = "tcp"
}

# Kubernetes API Server
# Jenkins will use this to communicate with Control Plane
resource "aws_vpc_security_group_ingress_rule" "k8s_api_from_jenkins" {
  security_group_id = aws_security_group.k8s_sg.id

  referenced_security_group_id = aws_security_group.jenkins_sg.id

  from_port   = 6443
  to_port     = 6443
  ip_protocol = "tcp"
}

# Kubernetes API Server from inside the cluster
resource "aws_vpc_security_group_ingress_rule" "k8s_api_internal" {
  security_group_id = aws_security_group.k8s_sg.id

  referenced_security_group_id = aws_security_group.k8s_sg.id

  from_port   = 6443
  to_port     = 6443
  ip_protocol = "tcp"
}

# Kubelet API
resource "aws_vpc_security_group_ingress_rule" "k8s_kubelet" {
  security_group_id = aws_security_group.k8s_sg.id

  referenced_security_group_id = aws_security_group.k8s_sg.id

  from_port   = 10250
  to_port     = 10250
  ip_protocol = "tcp"
}

# etcd
resource "aws_vpc_security_group_ingress_rule" "k8s_etcd" {
  security_group_id = aws_security_group.k8s_sg.id

  referenced_security_group_id = aws_security_group.k8s_sg.id

  from_port   = 2379
  to_port     = 2380
  ip_protocol = "tcp"
}

# Controller Manager
resource "aws_vpc_security_group_ingress_rule" "k8s_controller_manager" {
  security_group_id = aws_security_group.k8s_sg.id

  referenced_security_group_id = aws_security_group.k8s_sg.id

  from_port   = 10257
  to_port     = 10257
  ip_protocol = "tcp"
}

# Scheduler
resource "aws_vpc_security_group_ingress_rule" "k8s_scheduler" {
  security_group_id = aws_security_group.k8s_sg.id

  referenced_security_group_id = aws_security_group.k8s_sg.id

  from_port   = 10259
  to_port     = 10259
  ip_protocol = "tcp"
}

# Internal Kubernetes TCP communication
resource "aws_vpc_security_group_ingress_rule" "k8s_internal_tcp" {
  security_group_id = aws_security_group.k8s_sg.id

  referenced_security_group_id = aws_security_group.k8s_sg.id

  from_port   = 0
  to_port     = 65535
  ip_protocol = "tcp"
}

# Internal Kubernetes UDP communication
resource "aws_vpc_security_group_ingress_rule" "k8s_internal_udp" {
  security_group_id = aws_security_group.k8s_sg.id

  referenced_security_group_id = aws_security_group.k8s_sg.id

  from_port   = 0
  to_port     = 65535
  ip_protocol = "udp"
}

# NodePort from Load Balancer
resource "aws_vpc_security_group_ingress_rule" "k8s_nodeport_from_lb" {
  security_group_id = aws_security_group.k8s_sg.id

  referenced_security_group_id = aws_security_group.lb_sg.id

  from_port   = 30000
  to_port     = 32767
  ip_protocol = "tcp"
}

# Kubernetes outbound
resource "aws_vpc_security_group_egress_rule" "k8s_all_outbound" {
  security_group_id = aws_security_group.k8s_sg.id

  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = "-1"
}


# =========================================================
# Load Balancer Security Group
# =========================================================

resource "aws_security_group" "lb_sg" {
  name        = "${var.project}-lb-sg"
  description = "Security group for Application Load Balancer"
  vpc_id      = var.vpc_id

  tags = {
    Name = "${var.project}-lb-sg"
  }
}

# HTTP
resource "aws_vpc_security_group_ingress_rule" "lb_http" {
  security_group_id = aws_security_group.lb_sg.id

  cidr_ipv4 = "0.0.0.0/0"

  from_port   = 80
  to_port     = 80
  ip_protocol = "tcp"
}

# HTTPS
resource "aws_vpc_security_group_ingress_rule" "lb_https" {
  security_group_id = aws_security_group.lb_sg.id

  cidr_ipv4 = "0.0.0.0/0"

  from_port   = 443
  to_port     = 443
  ip_protocol = "tcp"
}

# Load Balancer outbound
resource "aws_vpc_security_group_egress_rule" "lb_all_outbound" {
  security_group_id = aws_security_group.lb_sg.id

  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = "-1"
}