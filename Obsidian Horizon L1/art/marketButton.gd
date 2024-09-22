extends Button

# Function to handle button press
func _on_Button_pressed():
	var url = "https://example.com"  # Replace with the external URL
	OS.shell_open(url)

# Connect the button's pressed signal to the function
func _ready():
	connect("pressed", Callable(self, "_on_Button_pressed"))
