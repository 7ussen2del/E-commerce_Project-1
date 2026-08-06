output "vpc_id" {
  value = aws_vpc.stw_vpc.id
}

output "public_subnet_1_id" {
  value = aws_subnet.stw_subnet_public_1.id
}

output "public_subnet_2_id" {
  value = aws_subnet.stw_subnet_public_2.id
}

output "igw_id" {
  value = aws_internet_gateway.stw_gw.id
}