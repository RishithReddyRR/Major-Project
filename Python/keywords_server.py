from flask import Flask, request, jsonify
from yake import KeywordExtractor  # Assuming yake is installed
import pickle
import pandas as pd
app = Flask(__name__)

# Configure keyword extractor (adjust parameters as needed)
kw_extractor = KeywordExtractor(top=10, stopwords=None)
journals_linear=pickle.load(open("journals_linear.pkl","rb"))
journals_XGB=pickle.load(open("journals_XGB.pkl","rb"))
conferences_linear=pickle.load(open("conferences_linear.pkl","rb"))
conferences_XGB=pickle.load(open("conferences_XGB.pkl","rb"))
books_linear=pickle.load(open("books_linear.pkl","rb"))
books_XGB=pickle.load(open("books_XGB.pkl","rb"))
patents_linear=pickle.load(open("patents_linear.pkl","rb"))
patents_XGB=pickle.load(open("patents_XGB.pkl","rb"))
patents_linear=pickle.load(open("patents_linear.pkl","rb"))
patents_XGB=pickle.load(open("patents_XGB.pkl","rb"))
copyrights_linear=pickle.load(open("patents_linear.pkl","rb"))
copyrights_XGB=pickle.load(open("patents_XGB.pkl","rb"))
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
@app.route('/predict', methods=['GET'])
def predict():
  data={"periods":[2025]}
  df= pd.DataFrame(data)
  predictions= [[round(journals_XGB.predict(df)[0]),round(journals_linear.predict(df)[0])],[round(conferences_XGB.predict(df)[0]),round(conferences_linear.predict(df)[0])],[round(books_XGB.predict(df)[0]),round(books_linear.predict(df)[0])],[round(patents_XGB.predict(df)[0]),round(patents_linear.predict(df)[0])],[round(copyrights_XGB.predict(df)[0]),round(copyrights_linear.predict(df)[0])]]
  # predictions=[round(journals_XGB.predict(df)[0])]
  s_x=0
  s_y=0
  for x in predictions:
    s_x+=x[0]
    s_y+=x[1]
  predictions.append([s_x,s_y])


  # Return JSON response with keywords
  return jsonify({'predictions':predictions})

if __name__ == '__main__':
  app.run(debug=True)  # Set debug=False for production use
