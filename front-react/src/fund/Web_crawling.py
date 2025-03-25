import pandas as pd
import requests
from itertools import count

accessToken = 'XT9mT2J%2B83N0usXkqjWkPH4EgdIbRZ%2BeJuqmfrLNUYEERMf4mQeXxDqydemAr8i0c45qQKqvwP3SZNKtEvFN%2BA%3D%3D'
pageSize = 10
totallist = list()

for pageNumber in count():
    if pageNumber >= 10:  # pageNo가 10이 되었을 때 루프를 종료
        break
    numOfRows = str(pageSize)
    pageNo = str(pageNumber + 1)
    url = 'https://api.odcloud.kr/api/15020770/v1/uddi:255bef4b-49cd-4e6c-9c32-b86f51ffbef6?page=1&perPage=50&serviceKey='
    url += accessToken
    url += '&numOfRows=' + numOfRows + '&pageNo=' + pageNo
    url += '&resultType=json'
    print(url)

    try:
        response = requests.get(url, verify=False)  # SSL 인증서 검증 비활성화
        response.raise_for_status()  # HTTP 오류 발생 시 예외 발생
        print("response =>", response)
        jsondata = response.json()
        print(jsondata)  # JSON 응답 구조를 출력하여 확인

        try:
            datalist = jsondata['data']
            if not datalist:
                print('데이터가 비어 있습니다.')
                break
            for data in datalist:
                totallist.append(data)
        except KeyError as key_err:
            print('키 오류:', key_err)
            break
    except requests.exceptions.RequestException as req_err:
        print('HTTP 요청 실패:', req_err)
        break
    except Exception as err:
        print('오류 발생:', err)
        break

# JSON 데이터를 CSV 파일로 변환하여 저장
filename = 'D:/DEV/workspace_springBoot_ict04/sound_bank/front-react/src/fund/data/fundList.csv'
myFrame = pd.DataFrame(totallist)  # csv 파일로 open하기 위해 표형식으로 변환
myFrame.to_csv(filename, index=False)  # 인덱스 없이 저장

print('저장 =>', filename)

# 한글이 깨진 경우 > .csv 우클릭 > 연결 프로그램: 메모장 > 다른 이름으로 저장: 인코딩을 UTF-8(BOM)으로 바꾼 후 저장