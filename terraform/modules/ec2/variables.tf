variable "jenkins_instance_type" {
type = string
}
variable "k8s_instance_type" {
  type    = string
}
variable "project" {
  type = string
}

variable "subnet_id_1" {
  type = string
}

variable "subnet_id_2" {
  type = string
}


variable "jenkins_security_group_id" {
  type = string
}

variable "k8s_security_group_id" {
  type = string
}

variable "master_count" {
  type = number
}
variable "worker_count" {
  type = number
}