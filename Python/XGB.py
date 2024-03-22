import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error, r2_score
import pickle

df = pd.read_csv(r'IT.csv')
df=df.dropna()
print(df)

# Prepare the data for each column
X = df['periods'].values.reshape(-1, 1)
y_cols = [ 'journals',"books", 'conferences', 'patents', 'copyrights']
model=XGBRegressor(objective='reg:squarederror', random_state=42)
for col in y_cols:
    print(f"\nPredicting for column: {col}")
    y = df[col]
    model.fit(X,y)
    data={"periods":[2025]}
    dff = pd.DataFrame(data)
    print(model.predict(dff))
    pickle.dump(model,open(f"{col}_XGB.pkl","wb"))
    