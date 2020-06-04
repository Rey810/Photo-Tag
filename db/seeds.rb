Character.destroy_all
Puzzle.destroy_all
Score.destroy_all
# Puzzle 1: Rick's Lounge
ricksLoungePuzzle = Puzzle.create(name: "Rick's Lounge", image_url: "ricks-lounge.jpg")

mortysFace = Character.create(name: "Morty's Face", x_position: 724, y_position: 363, found: false, puzzle: ricksLoungePuzzle)

babysFace = Character.create(name: "Baby's Face", x_position: 405, y_position: 487, found: false, puzzle: ricksLoungePuzzle)
