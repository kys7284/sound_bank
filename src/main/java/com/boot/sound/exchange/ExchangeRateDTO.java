package com.boot.sound.exchange;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExchangeRateDTO {

    private

    @JsonProperty("cur_unit")
    private String currencyCode; // 통화 코드

    @JsonProperty("cur_nm")
    private String currencyName; //	통화 이름

    @JsonProperty("deal_bas_r")
    private String baseRate;  // 기준 환율

    @JsonProperty("ttb")
    private String sellRate;  // 고객이 외화를 팔 때 (은행 입장에서 매입)

    @JsonProperty("tts")
    private String buyRate;   // 고객이 외화를 살 때 (은행 입장에서 매도)
}

