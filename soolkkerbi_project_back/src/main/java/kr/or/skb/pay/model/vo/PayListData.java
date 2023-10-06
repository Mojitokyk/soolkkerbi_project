package kr.or.skb.pay.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PayListData {
	private int start;
	private int end;
	private String memberId;
}
