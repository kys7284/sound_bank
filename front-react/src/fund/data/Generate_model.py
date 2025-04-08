import numpy as np
import pandas as pd
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Dense, Dropout
from sklearn.model_selection import train_test_split
from sklearn.utils.class_weight import compute_class_weight
from sklearn.metrics import confusion_matrix
from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import MinMaxScaler

# ----------- 투자성향 예측을 위한 데이터 준비 및 모델 학습 -----------
def train_model(input_file, model_file):
    """
    투자성향 예측 모델 학습 및 저장
    :param input_file: 학습 데이터 파일 경로
    :param model_file: 저장할 모델 파일 경로
    """
    # 1. 학습에 사용할 데이터로드 및 분리
    data = pd.read_csv(input_file)  # training_data.csv

    X = data.drop(columns=["label", "fund_risk_type"])  # 'label'과 'fund_risk_type' 컬럼 제거
    y = data["label"]   # 'label' 컬럼은 예측 대상(투자 성향)
    
    # 1-1). 학습용(80%)/테스트용(20%) 데이터 분리
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # feature 이상치 제거 (1 ~ 4 사이 값만 허용하도록 처리)
    X_train = X_train.clip(1, 4)
    X_test = X_test.clip(1, 4)

    # 1-2). 클래스 가중치 계산 => 클래스별 데이터가 불균형한 경우, 학습 시 클래스 가중치를 적용하여 균형을 맞추기 위함
    class_weights = compute_class_weight(class_weight="balanced", classes=np.unique(y_train), y=y_train)
    class_weights = dict(enumerate(class_weights))

    # 2. 모델 정의 => 신경망 모델을 정의. 입력층, 은닉층, 출력층으로 구성됨
    model = Sequential()
    model.add(Dense(256, activation='relu', input_dim=X_train.shape[1]))    # 입력층 (입력 데이터의 차원 수)
    model.add(Dropout(0.4))     # 과적합 방지를 위한 드롭아웃
    model.add(Dense(128, activation='relu'))    # 은닉층 1
    model.add(Dropout(0.4))     
    model.add(Dense(64, activation='relu'))   # 은닉층 2
    model.add(Dense(5, activation='softmax'))   # 출력층
    
    # 3. 모델 컴파일 및 학습 => 모델을 학습할 수 있도록 컴파일. 손실 함수와 옵티마이저를 설정.
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    history = model.fit(
        X_train, y_train,   # 학습 데이터 
        validation_data=(X_test, y_test),   # 검증 데이터
        class_weight=class_weights,     # 클래스 가중치 적용
        epochs=50,  # 학습 반복 횟수
        batch_size=32)  # 배치 크기
    
    # 4. 학습 결과 시각화
    plt.plot(history.history['accuracy'], label='Train Accuracy')
    plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
    plt.legend()
    plt.title('Accuracy')
    plt.show()
    
    # 5. 테스트 데이터를 사용하여 예측값 생성 및 혼동 행렬 생성, 혼동 행렬로 시각화하여 모델의 성능을 확인
    y_pred = model.predict(X_test).argmax(axis=1)
    cm = confusion_matrix(y_test, y_pred)
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues")
    plt.xlabel("Predicted")
    plt.ylabel("Actual")
    plt.title("Confusion Matrix")
    plt.show()
    
    # 6. 모델 저장 (TensorFlow/Keras 버전 호환성 문제를 방지하기 위해 include_optimizer=False 설정)
    # model_file = "investment_model.h5"  # 모델 저장 경로
    model.save(model_file, include_optimizer=False) # 모델의 구조와 가중치만 저장하고, 옵티마이저(학습률 등) 상태는 저장하지 않음.
    print(f"Model saved to {model_file}")
    print("모델이 정상적으로 생성되었습니다.")

# ----------- 투자성향에 따른 펀드상품 추천을 위한 투자 성향 예측 함수  -----------
def predict_fund_risk_type(model_path, input_file, output_file):
    # 학습된 모델 로드
    model = load_model(model_path, compile=False)

    # CSV 파일 로드
    data = pd.read_csv(input_file)
    
    # 문자열 데이터를 숫자로 변환
    label_encoders = {}
    for col in ["fund_type", "fund_company"]:
        le = LabelEncoder()
        data[col] = le.fit_transform(data[col].astype(str))
        label_encoders[col] = le
        
    # 예측에 사용할 입력 데이터 (수익률 관련 컬럼)
    input_features = ["return_1m", "return_3m", "return_6m", "return_12m", "fund_fee_rate", "fund_upfront_fee", "fund_grade", "fund_type", "fund_company"]
    X = data[input_features]

    # NaN 값 처리 (NaN 값을 0으로 대체)
    X = X.fillna(0)

    # 데이터 타입 변환 (모든 값을 float로 변환)
    X = X.astype(float)
    
    # 모델을 사용하여 투자 성향 예측
    predictions = model.predict(X)
    predicted_classes = predictions.argmax(axis=1)

    # 투자 성향 레이블 매핑
    risk_types = ["안정형", "보수형", "위험중립형", "적극형", "공격형"]
    data["fund_risk_type"] = [risk_types[pred] for pred in predicted_classes]

    # 업데이트된 데이터를 다시 CSV 파일로 저장
    data.to_csv(output_file, index=False, encoding="utf-8-sig")
    print(f"Updated fundList.csv saved to {output_file}")
    print(data.head())
    print(data.dtypes)

# ----------- 메인 실행 -----------
if __name__ == "__main__":
    train_model("../../../public/data/preprocessed_data.csv", "../../../public/data/investment_model.h5")
    
    # 투자 성향 예측 및 CSV 업데이트
    predict_fund_risk_type(
        "../../../public/data/investment_model.h5",
        "d:/DEV/workspace_springBoot_ict04/sound_bank/front-react/public/data/fundList.csv",
        "d:/DEV/workspace_springBoot_ict04/sound_bank/front-react/public/data/fundList_updated.csv"
    )
    
# .h5 파일은 HDF5 (Hierarchical Data Format version 5) 형식의 파일로, 대용량 데이터를 저장하는 데 사용됨. Keras에서는 모델의 구조와 가중치를 저장하는 데 사용됨. 
# HDF5는 바이너리 형식으로 데이터를 저장하므로, 텍스트 파일보다 더 효율적으로 대량의 데이터를 저장하고 읽을 수 있음. 
# HDF5 파일은 다양한 프로그래밍 언어에서 지원되며, 데이터 과학 및 머신러닝 분야에서 널리 사용됨.