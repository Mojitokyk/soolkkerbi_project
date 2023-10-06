package kr.or.skb.product.model.vo;

import lombok.Data;
import kr.or.skb.PageInfo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductListData {
	private String memberId;
	private int start;
	private int end;
}
