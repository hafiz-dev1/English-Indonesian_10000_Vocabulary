
import nltk
try:
    nltk.download('wordnet')
    nltk.download('omw-1.4')
    print("WordNet downloaded successfully.")
except Exception as e:
    print(f"Error downloading WordNet: {e}")
