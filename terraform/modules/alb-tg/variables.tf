variable "project" {
  type = string
}

variable "public_subnet_1_id" {
  type = string
}

variable "public_subnet_2_id" {
  type = string
}

variable "security_group_lb_id" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "worker_instance_ids" {
  type = list(string)
}

variable "node_port" {
  type    = number
  default = 30000
}