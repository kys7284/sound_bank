package com.boot.sound.exchange;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExchangeRateDTO {

    @JsonProperty("cur_unit")
    private String currency_code; // 통화 코드

    @JsonProperty("cur_nm")
    private String currency_name; //	통화 이름

    @JsonProperty("deal_bas_r")
    private String base_rate;  // 기준 환율

    @JsonProperty("ttb")
    private String sell_rate;  // 고객이 외화를 팔 때 (은행 입장에서 매입)

    @JsonProperty("tts")
    private String buy_rate;   // 고객이 외화를 살 때 (은행 입장에서 매도)
    
    private LocalDate base_date;

}

