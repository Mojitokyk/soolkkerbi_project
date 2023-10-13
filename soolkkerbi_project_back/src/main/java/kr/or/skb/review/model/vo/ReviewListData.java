package kr.or.skb.review.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReviewListData {
	private int start;
	private int end;
	private int productNo;
}
