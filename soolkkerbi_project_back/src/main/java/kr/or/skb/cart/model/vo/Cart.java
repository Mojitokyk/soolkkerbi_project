package kr.or.skb.cart.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "cart")
public class Cart {
	int cartNo;
	int cartMemberNo;
	int cartProductNo;
	int cartStock;
	int cartPrice;
	String memberId;
}
