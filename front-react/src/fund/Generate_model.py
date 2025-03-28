import numpy as np
import tensorflow as tf

print(tf.__version__)
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense


print(tf.__version__)

# 데이터 준비 (예제 데이터)
X_train = np.random.rand(100, 9)  # 100개의 샘플, 각 샘플은 9개의 특성을 가짐
y_train = np.random.randint(0, 5, 100)  # 0에서 4 사이의 정수 레이블

# 모델 정의
model = Sequential([
    Dense(64, activation='relu', input_shape=(9,)),
    Dense(64, activation='relu'),
    Dense(5, activation='softmax')  # 5개의 클래스
])

print("모델이 정상적으로 생성되었습니다.")

# 모델 컴파일
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# 모델 학습
model.fit(X_train, y_train, epochs=10, batch_size=32)

# 모델 저장
model.save("investment_model.h5")