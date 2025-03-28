import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'react-google-charts';
import Papa from 'papaparse';
import '../../Css/fund/Fund.css';

const FundList = () => {
  const [data, setData] = useState([]);
  const [funds, setFunds] = useState([]);
  const [selectedFunds, setSelectedFunds] = useState([]);
  const [expandedManagers, setExpandedManagers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    fetch('/data/fundList.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            console.log('CSV Data:', results.data); // 데이터 로드 확인
            setFunds(results.data);
          }
        });
      });
  }, []);

  const handleFundClick = (fundName) => {
    setSelectedFunds(prevSelectedFunds => {
      if (prevSelectedFunds.includes(fundName)) {
        return prevSelectedFunds.filter(name => name !== fundName);
      } else {
        return [...prevSelectedFunds, fundName];
      }
    });
    setShowPopup(true);
  };

  const handleManagerClick = (managerName) => {
    setExpandedManagers(prevExpandedManagers => {
      if (prevExpandedManagers.includes(managerName)) {
        return prevExpandedManagers.filter(name => name !== managerName);
      } else {
        return [...prevExpandedManagers, managerName];
      }
    });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (selectedFunds.length > 0) {
      const chartData = [
        ['기간', ...selectedFunds.map(fund => `${fund} 수익률`)]
      ];

      const periods = ['1개월', '3개월', '6개월', '12개월'];
      periods.forEach(period => {
        const row = [period];
        selectedFunds.forEach(fund => {
          const fundData = funds.find(row => row.상품명 === fund);
          row.push(parseFloat(fundData[`${period}누적수익률(퍼센트)`]));
        });
        chartData.push(row);
      });

      console.log('Chart Data:', chartData); // 차트 데이터 확인
      setData(chartData);
    } else {
      setData([]);
    }
  }, [selectedFunds, funds]);

  const groupedFunds = funds.reduce((acc, fund) => {
    if (!acc[fund.운용사명]) {
      acc[fund.운용사명] = {};
    }
    if (!acc[fund.운용사명][fund.펀드유형]) {
      acc[fund.운용사명][fund.펀드유형] = [];
    }
    acc[fund.운용사명][fund.펀드유형].push(fund);
    return acc;
  }, {});

  const handleMouseDown = (e) => {
    const popup = popupRef.current;
    const shiftX = e.clientX - popup.getBoundingClientRect().left;
    const shiftY = e.clientY - popup.getBoundingClientRect().top;

    const moveAt = (pageX, pageY) => {
      popup.style.left = pageX - shiftX + 'px';
      popup.style.top = pageY - shiftY + 'px';
    };

    const onMouseMove = (e) => {
      moveAt(e.pageX, e.pageY);
    };

    document.addEventListener('mousemove', onMouseMove);

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mouseup', onMouseUp);
  };

  useEffect(() => {
    const popup = popupRef.current;
    if (popup) {
      popup.addEventListener('mousedown', handleMouseDown);
      popup.ondragstart = () => false;
    }
    return () => {
      if (popup) {
        popup.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, [showPopup]);

  return (
    <div className="Fund">
      <main>
        <div className="fund-list">
          {Object.keys(groupedFunds).map((manager, index) => (
            <div key={index}>
              <button onClick={() => handleManagerClick(manager)}>
                {manager}
              </button>
              {expandedManagers.includes(manager) && (
                <div>
                  <select onChange={handleCategoryChange} value={selectedCategory}>
                    <option value="">펀드 유형 선택</option>
                    {Object.keys(groupedFunds[manager]).map((category, catIndex) => (
                      <option key={catIndex} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {selectedCategory && groupedFunds[manager][selectedCategory] && (
                    <table>
                      <thead>
                        <tr>
                          <th>상품명</th>
                          <th>1개월 누적 수익률(%)</th>
                          <th>3개월 누적 수익률(%)</th>
                          <th>6개월 누적 수익률(%)</th>
                          <th>12개월 누적 수익률(%)</th>
                          <th>펀드 등급</th>
                          <th>선취 수수료(%)</th>
                          <th>총 보수(%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedFunds[manager][selectedCategory].map((fund, fundIndex) => (
                          <tr
                            key={fundIndex}
                            onClick={() => handleFundClick(fund.상품명)}
                            className={selectedFunds.includes(fund.상품명) ? 'selected' : ''}
                          >
                            <td>{fund.상품명}</td>
                            <td>{fund['1개월누적수익률(퍼센트)']}</td>
                            <td>{fund['3개월누적수익률(퍼센트)']}</td>
                            <td>{fund['6개월누적수익률(퍼센트)']}</td>
                            <td>{fund['12개월누적수익률(퍼센트)']}</td>
                            <td>{fund.펀드등급}</td>
                            <td>{fund['선취수수료(퍼센트)']}</td>
                            <td>{fund['총보수(퍼센트)']}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {showPopup && (
          <div className="popup" ref={popupRef}>
            <div className="popup-content">
              <span className="close" onClick={handleClosePopup}>&times;</span>
              <h3>Selected Funds Return Rate Comparison</h3>
              <Chart
                width={'100%'}
                height={'400px'}
                chartType="LineChart"
                loader={<div>Loading Chart...</div>}
                data={data}
                options={{
                  hAxis: {
                    title: '기간',
                  },
                  vAxis: {
                    title: '수익률 (%)',
                  },
                  legend: { position: 'bottom' },
                  colors: ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080'] // 색상 설정
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FundList;