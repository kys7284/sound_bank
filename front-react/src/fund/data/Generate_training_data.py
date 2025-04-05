import pandas as pd
import numpy as np
import os
from imblearn.over_sampling import SMOTE

# ----------- 투자성향 예측을 위한 샘플 데이터 전처리  -----------
# 샘플 데이터 생성
np.random.seed(42)
data = {    # 9개의 feature(문항 수) 생성
    "feature1": np.random.randint(1, 6, 100),   # 1~5 사이의 정수 (답변 수)를 100개 생성 
    "feature2": np.random.randint(1, 6, 100),   
    "feature3": np.random.randint(1, 6, 100),
    "feature4": np.random.randint(1, 6, 100),
    "feature5": np.random.randint(1, 6, 100),
    "feature6": np.random.randint(1, 6, 100),
    "feature7": np.random.randint(1, 6, 100),
    "feature8": np.random.randint(1, 6, 100),
    "feature9": np.random.randint(1, 6, 100),   
    "label": np.random.randint(0, 5, 100)  # 0~4 사이의 클래스  (투자 성향 종류 5개)
}

# 데이터프레임 생성
df = pd.DataFrame(data)

# CSV 파일로 저장
df.to_csv("../../../public/data/training_data.csv", index=False)
print("샘플 데이터가 생성되었습니다.")

file_path = "D:/DEV/workspace_springBoot_ict04/sound_bank/front-react/public/data/training_data.csv"
print("파일 경로 존재 여부:", os.path.exists(file_path))

# ----------- 투자성향에 맞는 펀드 상품추천을 위한 샘플 데이터 전처리 및 증강(SMOTE) 처리 -----------
def preprocess_data(input_file, output_file): # input_file: training_data.csv/ output_file: preprocessed_data.csv
    # 데이터 로드
    data = pd.read_csv(input_file)

    # 입력 데이터(X)와 출력 데이터(y) 분리
    X = data.drop(columns=["label"])  # 'label'은 투자 성향
    y = data["label"]

    # SMOTE로 데이터 증강
    smote = SMOTE(random_state=42)
    X_train_balanced, y_train_balanced = smote.fit_resample(X, y)

    # 증강된 데이터를 저장
    train_data = pd.concat([pd.DataFrame(X_train_balanced), pd.DataFrame(y_train_balanced, columns=["label"])], axis=1)
    train_data.to_csv(output_file, index=False)
    print(f"Preprocessed data saved to {output_file}")

# 생성된 training_data.csv 파일을 다시 로드하여 전처리 및 증강(SMOTE)을 수행
if __name__ == "__main__":  
    preprocess_data("../../../public/data/training_data.csv", 
                    "../../../public/data/preprocessed_data.csv")
    
    