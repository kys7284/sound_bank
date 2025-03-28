from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 설정 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

# 투자성향 분석을 위한 모델 로드 (모델을 직접 학습 후 저장해야 함)
model = load_model("investment_model.h5")

# 요청 데이터 모델 정의
class InvestmentRequest(BaseModel):
    answers: list

# 투자성향을 예측하는 엔드포인트
@app.post("/predict")
async def predict(data: InvestmentRequest):
    try:
        # 입력 데이터가 9개의 특성을 가지는지 확인
        if len(data.answers) != 9:
            raise HTTPException(status_code=400, detail="Input data must have exactly 9 features.")

        # 입력 데이터를 NumPy 배열로 변환하고 올바른 형상으로 변환
        answers = np.array(data.answers).reshape(1, -1)
        prediction = model.predict(answers)
        investment_type = int(np.argmax(prediction))  # 예측 결과에서 가장 높은 확률을 가진 클래스 선택
        return {"investment_type": investment_type}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)