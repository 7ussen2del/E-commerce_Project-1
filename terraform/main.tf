
module "ec2" {
  source = "./modules/ec2"

  project           = local.project
  instance_type     = var.instance_type
  subnet_id         = module.network.public_subnet_1_id
  security_group_id = module.security_group.ec2_security_group_id
}


module "alb_tg" {
  source = "./modules/alb-tg"

  project              = local.project
  vpc_id               = module.network.vpc_id
  public_subnet_1_id   = module.network.public_subnet_1_id
  public_subnet_2_id   = module.network.public_subnet_2_id
  security_group_lb_id = module.security_group.lb_security_group_id
  ec2_id               = module.ec2.instance_id
}

module "network" {
  source               = "./modules/network"
  project              = local.project
  az_1                 = var.az_1
  az_2                 = var.az_2
  public_subnet_1_cidr = var.public_subnet_1_cidr
  vpc_cidr             = var.vpc_cidr
  public_subnet_2_cidr = var.public_subnet_2_cidr
}

module "security_group" {
  vpc_id  = module.network.vpc_id
  source  = "./modules/security-group"
  project = local.project
}
