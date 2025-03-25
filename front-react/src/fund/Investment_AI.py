from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model

app = Flask(__name__)

# 투자성향 분석을 위한 간단한 예제 모델 로드 (모델을 직접 학습 후 저장해야 함)
model = load_model("investment_model.h5")

# 투자성향을 예측하는 엔드포인트
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    answers = np.array(data['answers']).reshape(1, -1)  # 입력 데이터를 NumPy 배열로 변환
    prediction = model.predict(answers)
    investment_type = np.argmax(prediction)  # 예측 결과에서 가장 높은 확률을 가진 클래스 선택
    
    return jsonify({"investment_type": int(investment_type)})

if __name__ == '__main__':
    app.run(debug=True)