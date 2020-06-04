Character.destroy_all
Puzzle.destroy_all
Score.destroy_all
# Puzzle 1: Rick's Lounge
ricksLoungePuzzle = Puzzle.create(name: "Rick's Lounge", image_url: "ricks-lounge.jpg")

mortysFace = Character.create(name: "Morty's Face", x_position: 667, y_position: 364, found: false, puzzle: ricksLoungePuzzle)

babysFace = Character.create(name: "Baby's Face", x_position: 349, y_position: 486, found: false, puzzle: ricksLoungePuzzle)
