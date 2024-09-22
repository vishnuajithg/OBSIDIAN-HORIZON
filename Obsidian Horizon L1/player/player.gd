extends CharacterBody2D

@export var speed: int = 200
@onready var animations = $AnimationPlayer
func handleInput():
	var moveDirection = Input.get_vector("ui_left","ui_right","ui_up","ui_down")
	velocity = moveDirection*speed
func updateAnimation():
	if velocity.length() == 0:
		if animations.is_playing():
			animations.stop()
	else:
		var direction = "Down"
		if velocity.x < 0: direction = "Left"
		elif velocity.x > 0: direction = "Right"
		elif velocity.y < 0: direction = "Up"
		animations.play("walk" + direction)

func collect(area):
		if area.has_method("collect"):
			area.collect()

func _physics_process(delta):
	handleInput()
	move_and_slide()
	updateAnimation()
