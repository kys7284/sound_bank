import pandas as pd
import numpy as np
import os

# 샘플 데이터 생성
np.random.seed(42)
data = {
    "feature1": np.random.randint(1, 6, 100),
    "feature2": np.random.randint(1, 6, 100),
    "feature3": np.random.randint(1, 6, 100),
    "feature4": np.random.randint(1, 6, 100),
    "feature5": np.random.randint(1, 6, 100),
    "feature6": np.random.randint(1, 6, 100),
    "feature7": np.random.randint(1, 6, 100),
    "feature8": np.random.randint(1, 6, 100),
    "feature9": np.random.randint(1, 6, 100),
    "label": np.random.randint(0, 5, 100)  # 0~4 사이의 클래스
}

# 데이터프레임 생성
df = pd.DataFrame(data)

# CSV 파일로 저장
df.to_csv("../../../public/data/training_data.csv", index=False)
print("샘플 데이터가 생성되었습니다.")

file_path = "D:/DEV/workspace_springBoot_ict04/sound_bank/front-react/public/data/training_data.csv"
print("파일 경로 존재 여부:", os.path.exists(file_path))