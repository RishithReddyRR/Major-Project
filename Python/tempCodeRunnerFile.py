for col in y_cols:
    print(f"\nPredicting for column: {col}")
    y = df[col]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model.fit(X, y)
    data={"periods":[2025]}
    df = pd.DataFrame(data)
    print(model.predict(df))
    pickle.dump(model,open(f"{col}_linear.pkl","wb"))