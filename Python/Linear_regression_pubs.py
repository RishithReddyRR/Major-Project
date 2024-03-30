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

# # Prepare the data for each column
# X = df['periods'].values.reshape(-1, 1)
# y_cols = [ 'journals',"books", 'conferences', 'patents', 'copyrights']
# model=LinearRegression()
# for col in y_cols:
#     print(f"\nPredicting for column: {col}")
#     y = df[col]
#     model.fit(X,y)
#     data={"periods":[2025]}
#     dff = pd.DataFrame(data)
#     print(model.predict(dff))
#     pickle.dump(model,open(f"{col}_linear.pkl","wb"))
    
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
df=df.reset_index()
# print(df["periods"])
X_train=df[['periods','journals']]
y_train=df['publications']
model.fit(X_train,y_train)
y_pred = model.predict(X_train)

import matplotlib.pyplot as plt

plt.rcParams["figure.figsize"] = (11,6)
plt.plot(y_pred,label='Logistic_Regression_Predictions')
plt.plot(y_train,label='Actual Publications')
plt.legend(loc="upper left")
plt.show()