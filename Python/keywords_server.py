from flask import Flask, request, jsonify
from yake import KeywordExtractor  # Assuming yake is installed

app = Flask(__name__)

# Configure keyword extractor (adjust parameters as needed)
kw_extractor = KeywordExtractor(top=10, stopwords=None)

@app.route('/keywords', methods=['POST'])
def extract_keywords():
  """
  Extracts keywords from the request body.
  """
  # Get text from request body
  text = request.json.get('text')  # Assuming text is a key in the JSON body

  # Check for valid request
  if not text:
    return []

  # Extract keywords
  keywords = []
  for kw, v in kw_extractor.extract_keywords(text):
    keywords.append(kw)

  # Return JSON response with keywords
  return jsonify({'keywords': keywords})

if __name__ == '__main__':
  app.run(debug=True)  # Set debug=False for production use
