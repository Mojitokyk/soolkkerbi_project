package kr.or.skb.pay.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="pay")
public class Pay {
	private int payNo;
	private int payMemberNo;
	private int payProductNo;
	private String payDate;
	private String payStringNo;
	private int payStatus;
	private String payPickup;
	private String payMemberId;
	private String payProductName;
	private int payStock;
	private int payPrice;
}
