import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Dense, Dropout
import pandas as pd
from imblearn.over_sampling import SMOTE
from sklearn.model_selection import train_test_split
from sklearn.utils.class_weight import compute_class_weight
from sklearn.metrics import confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

# ----------- 투자성향 예측을 위한 데이터 로드, 전처리 및 모델 학습 -----------
# 1. 학습에 사용할 데이터를 CSV 파일에서 로드
data = pd.read_csv("../../../public/data/training_data.csv")  # 학습 데이터 파일 경로

# 데이터가 클래스별로 얼마나 분포되어 있는지 확인
print("클래스별 데이터 분포:")
print(data["label"].value_counts())

# 2. 입력 데이터(X)와 레이블(y) 분리
# 'label' 컬럼은 예측 대상(투자 성향)이고, 나머지 컬럼은 입력 데이터임
X = data.drop(columns=["label"])
y = data["label"]

# 3. 데이터를 학습용(80%)과 테스트용(20%)으로 분리
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. SMOTE로 데이터 증강 (학습 데이터에서 클래스 불균형 문제를 해결 하기 위해)
smote = SMOTE(random_state=42)
X_train_balanced, y_train_balanced = smote.fit_resample(X_train, y_train)

# SMOTE 적용 후 클래스별 데이터 개수 확인 (증강된 데이터가 클래스별로 균형을 이루는지 확인)
print("SMOTE 적용 후 클래스별 데이터 분포:")
print(pd.Series(y_train_balanced).value_counts())

# 5. 클래스 가중치 계산
# 클래스별 데이터가 불균형한 경우, 학습 시 클래스 가중치를 적용하여 균형을 맞추기 위함
class_weights = compute_class_weight(
    class_weight="balanced",
    classes=np.unique(y_train_balanced),
    y=y_train_balanced
)
class_weights = dict(enumerate(class_weights))

# 6. 모델 정의
# 신경망 모델을 정의. 입력층, 은닉층, 출력층으로 구성됨
model = Sequential([
    Dense(128, activation='relu', input_shape=(X_train.shape[1],)),  # 입력층
    Dropout(0.3),  # 과적합 방지를 위한 드롭아웃
    Dense(64, activation='relu'),  # 은닉층 1
    Dropout(0.3),  # 과적합 방지를 위한 드롭아웃
    Dense(32, activation='relu'),  # 은닉층 2
    Dense(5, activation='softmax')  # 출력층 (5개의 클래스)
])

print("모델이 정상적으로 생성되었습니다.")

# 7. 모델 컴파일
# 모델을 학습할 수 있도록 컴파일합니다. 손실 함수와 옵티마이저를 설정.
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# 8. 모델 학습
history = model.fit(
    X_train_balanced, y_train_balanced,  # 학습 데이터
    validation_data=(X_test, y_test),  # 검증 데이터
    class_weight=class_weights,  # 클래스 가중치 적용
    epochs=50,  # 학습 반복 횟수
    batch_size=32  # 배치 크기
)

# 9. 학습 및 검증 정확도 시각화
plt.plot(history.history['accuracy'], label='Train Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.legend()
plt.title('Accuracy')
plt.show()

# 10. 학습 및 검증 손실을 그래프로 시각화
plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.legend()
plt.title('Loss')
plt.show()

# 11. 테스트 데이터를 사용하여 예측값 생성 및 혼동 행렬 생성
y_pred = model.predict(X_test).argmax(axis=1)
cm = confusion_matrix(y_test, y_pred)

# 혼동 행렬을 그래프로 시각화하여 모델의 성능을 확인
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("Confusion Matrix")
plt.show()

# 12. 테스트 데이터를 사용하여 모델의 정확도 평가
test_loss, test_accuracy = model.evaluate(X_test, y_test)
print(f"Test Accuracy: {test_accuracy}")

# 13. 모델 저장 (TensorFlow/Keras 버전 호환성 문제를 방지하기 위해 include_optimizer=False 설정)
# .h5 파일은 HDF5 (Hierarchical Data Format version 5) 형식의 파일로, 대용량 데이터를 저장하는 데 사용됨
model.save("../../../public/data/investment_model.h5", include_optimizer=False) # 모델의 구조와 가중치만 저장하고, 옵티마이저(학습률 등) 상태는 저장하지 않음.
print("모델이 저장되었습니다.")

# 14. 저장된 모델을 로드하여 테스트
model = load_model("../../../public/data/investment_model.h5", compile=False) # 모델 로드 시 컴파일을 생략 (예측만 수행할 경우 필요하지 않음)
print("모델이 로드되었습니다.")


# ----------- 투자성향 예측 모델 학습 및 저장 함수 정의 -----------
# 함수로 모델 학습 및 저장 로직을 분리
def train_model(input_file, model_file):
    # 데이터 로드
    data = pd.read_csv(input_file)
    X = data.drop(columns=["label"])
    y = data["label"]

    # 클래스 가중치 계산
    class_weights = compute_class_weight(class_weight="balanced", classes=np.unique(y), y=y)
    class_weights = dict(enumerate(class_weights))

    # 모델 정의
    model = Sequential([
        Dense(128, activation='relu', input_shape=(X.shape[1],)),
        Dropout(0.3),
        Dense(64, activation='relu'),
        Dropout(0.3),
        Dense(32, activation='relu'),
        Dense(6, activation='softmax')  # 6개의 투자 성향
    ])

    # 모델 컴파일
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    # 모델 학습
    model.fit(X, y, class_weight=class_weights, epochs=20, batch_size=32)

    # 모델 저장
    model.save(model_file)
    print(f"Model saved to {model_file}")

# 메인 실행
if __name__ == "__main__":
    train_model("../../../public/data/preprocessed_data.csv", "../../../public/data/investment_model.h5")