extends Area2D

func collect(body):
	if body.name == "player":
		queue_free()
