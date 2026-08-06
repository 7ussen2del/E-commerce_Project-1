resource "aws_lb" "app" {
  name               = "${var.project}-lb"
  internal           = false
  load_balancer_type = "application"
  subnets            = [var.public_subnet_1_id, var.public_subnet_2_id]
  security_groups    = [var.security_group_lb_id]
}

resource "aws_lb_listener" "app" {
  load_balancer_arn = aws_lb.app.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}

resource "aws_lb_target_group" "app" {
  name     = "${var.project}-tg-lb"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  health_check {
    path     = "/"
    port     = 3000
    protocol = "HTTP"
    timeout  = 5
    interval = 10
  }
}

resource "aws_lb_target_group_attachment" "app" {
  target_group_arn = aws_lb_target_group.app.arn
  target_id        = var.ec2_id
  port             = 3000
}
