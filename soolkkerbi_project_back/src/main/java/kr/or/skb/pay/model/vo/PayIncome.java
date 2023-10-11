package kr.or.skb.pay.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="payIncome")
public class PayIncome {
	private String incomeDate;
	private int takju;
	private int yakju;
	private int spirit;
	private int fruit;
}
