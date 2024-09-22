extends CharacterBody2D

var startPosition
var endPosition

func _ready():
	startPosition = position
	endPosition = startPosition - Vector2(0,3*16)
func updateVelocity():
	var moveDirection = endPosition - position
	velocity = moveDirection
func _physics_process(delta):
	updateVelocity()
	move_and_slide()


func _on_button_pressed() -> void:
	pass # Replace with function body.
