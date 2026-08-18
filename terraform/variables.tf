variable "jenkins_instance_type" {
  type    = string
}

variable "k8s_instance_type" {
  type    = string
}
variable "vpc_cidr" {
  type = string
}

variable "public_subnet_1_cidr" {
  type = string
}

variable "public_subnet_2_cidr" {
  type = string
}

variable "az_1" {
  type = string
}

variable "az_2" {
  type = string
}

variable "master_count" {
  type = number
}

variable "worker_count" {
  type = number
}