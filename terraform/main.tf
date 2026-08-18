module "network" {

  source = "./modules/network"

  project = local.project

  az_1 = var.az_1
  az_2 = var.az_2

  vpc_cidr = var.vpc_cidr

  public_subnet_1_cidr = var.public_subnet_1_cidr
  public_subnet_2_cidr = var.public_subnet_2_cidr
}


module "security_group" {

  source = "./modules/security-group"

  project = local.project

  vpc_id = module.network.vpc_id
}


module "ec2" {

  source = "./modules/ec2"

  master_count = var.master_count
  worker_count = var.worker_count

  project = local.project

  jenkins_instance_type = var.jenkins_instance_type
  k8s_instance_type     = var.k8s_instance_type

  subnet_id_1 = module.network.public_subnet_1_id
  subnet_id_2 = module.network.public_subnet_2_id

  jenkins_security_group_id = module.security_group.jenkins_security_group_id
  k8s_security_group_id     = module.security_group.k8s_security_group_id
}


module "alb_tg" {

  source = "./modules/alb-tg"

  project = local.project

  vpc_id = module.network.vpc_id

  public_subnet_1_id = module.network.public_subnet_1_id
  public_subnet_2_id = module.network.public_subnet_2_id

  security_group_lb_id = module.security_group.lb_security_group_id

  worker_instance_ids = module.ec2.worker_instance_ids

  node_port = 30000
}