resource "aws_vpc" "stw_vpc" {
  cidr_block = var.vpc_cidr

  tags = {
    Name  = "${var.project}_vpc"
  }
}

resource "aws_internet_gateway" "stw_gw" {
  vpc_id = aws_vpc.stw_vpc.id

  tags = {
    Name  = "${var.project}_gw"
  }
}

resource "aws_subnet" "stw_subnet_public_1" {
  vpc_id                  = aws_vpc.stw_vpc.id
  cidr_block              = var.public_subnet_1_cidr
  map_public_ip_on_launch = true
  availability_zone       = var.az_1
  tags = {
    Name  = "${var.project}_subnet_public_1"
  }
}

resource "aws_subnet" "stw_subnet_public_2" {
  vpc_id                  = aws_vpc.stw_vpc.id
  cidr_block              = var.public_subnet_2_cidr
  map_public_ip_on_launch = true
  availability_zone       = var.az_2
  tags = {
    Name  = "${var.project}_subnet_public_2"
  }
}

resource "aws_route_table" "stw_rt_public" {
  vpc_id = aws_vpc.stw_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.stw_gw.id
  }

  tags = {
    Name  = "${var.project}_rt_public"
  }
}


resource "aws_route_table_association" "stw_rta_public_1" {
  subnet_id      = aws_subnet.stw_subnet_public_1.id
  route_table_id = aws_route_table.stw_rt_public.id
}
resource "aws_route_table_association" "stw_rta_public_2" {
  subnet_id      = aws_subnet.stw_subnet_public_2.id
  route_table_id = aws_route_table.stw_rt_public.id
}