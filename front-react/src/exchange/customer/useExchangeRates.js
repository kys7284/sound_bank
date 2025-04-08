import { useState, useEffect } from "react";
import RefreshToken from "../../jwt/RefreshToken";

const normalizeRateData = (item) => {
  if (item.cur_unit) {
    return {
      currency_code: item.cur_unit,
      currency_name: item.cur_nm,
      base_rate: parseFloat(item.deal_bas_r.replace(",", "")),
      buy_rate: parseFloat(item.tts.replace(",", "")),
      sell_rate: parseFloat(item.ttb.replace(",", "")),
    };
  } else {
    return {
      currency_code: item.currency_code,
      currency_name: item.currency_name,
      base_rate: parseFloat(item.base_rate),
      buy_rate: parseFloat(item.buy_rate),
      sell_rate: parseFloat(item.sell_rate),
    };
  }
};

const useExchangeRates = (date) => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      try {
        const response = await RefreshToken.get("http://localhost:8081/api/exchange/rates", {
          params: { date: formattedDate },
        });
        if (Array.isArray(response.data) && response.data.length > 0) {
          setRates(response.data.map(normalizeRateData));
        } else {
          const fallback = await RefreshToken.get("http://localhost:8081/api/exchange/dbRates", {
            params: { date: formattedDate },
          });
          setRates(fallback.data.map(normalizeRateData));
        }
      } catch (err) {
        console.error("환율 로딩 실패", err);
        try {
          const fallback = await RefreshToken.get("http://localhost:8081/api/exchange/dbRates", {
            params: { date: formattedDate },
          });
          setRates(fallback.data.map(normalizeRateData));
        } catch (e) {
          console.error("DB 환율 로딩 실패", e);
          setError(e);
          setRates([]);
        }
      } finally {
        setLoading(false);
      }
    };

    if (date) fetchRates();
  }, [date]);

  return { rates, loading, error };
};

export default useExchangeRates;
