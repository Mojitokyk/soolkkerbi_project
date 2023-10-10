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
	int cartStock;//장바구니 구매 수량
	int cartPrice;
	String memberId;
	String productName;
	String productFilepath;
	int productNumber;//장바구니 품목 수
	int totalPrice;//장바구니 합계 금액
	int productStock;//상품 재고 수량	
	String payStringNo;//주문 번호
	String pickupDate;//픽업일자
}
