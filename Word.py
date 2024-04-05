def count_matching_letters(secret_word, guessed_word):
    """Count the number of correct letters between two words."""
    return sum(1 for x, y in zip(secret_word, guessed_word) if x == y)

def filter_possible_words(words, guessed_word, correct_letters):
    """Filter the list of words based on the correct letters in the guessed word."""
    return [word for word in words if count_matching_letters(word, guessed_word) == correct_letters]

def guess_secret_word(words):
    """Guess the secret word iteratively based on user input."""
    print("Welcome to the Word Guessing Script!")
    
    guessed_words = []  # List to store guessed words
    
    while True:
        guessed_word = input("Enter your guessed word (or 'exit' to quit): ").strip().lower()
        
        if guessed_word == 'exit':
            print("Exiting the game. Goodbye!")
            break
        
        if guessed_word not in words:
            print("Invalid guess. Please choose one of the provided words.")
            continue
        
        guessed_words.append(guessed_word)  # Add guessed word to the list of guessed words
        
        try:
            correct_letters = int(input("Enter the number of correct letters in your guessed word: "))
        except ValueError:
            print("Invalid input. Please enter a number.")
            continue
        
        possible_words = filter_possible_words(words, guessed_word, correct_letters)
        
        print("Possible words based on your input:")
        for word in possible_words:
            if word in guessed_words:
                pass
            else:
                print(word)
        
        if len(possible_words) == 1:
            secret_word = possible_words[0]
            print(f"The secret word is: {secret_word}")
            print("Congratulations! You guessed the word.")
            break

if __name__ == "__main__":
    words_input = input("Enter a space list of words to guess: ").strip().lower()
    words_to_guess = [word.strip() for word in words_input.split(' ')]
    guess_secret_word(words_to_guess[:])  # Pass a copy of the list to preserve the original list
