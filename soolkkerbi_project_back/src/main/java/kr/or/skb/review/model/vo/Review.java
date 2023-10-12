package kr.or.skb.review.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="review")
public class Review {
	private int reviewNo;
	private int reviewMemberNo;
	private int reviewProductNo;
	private String reviewTitle;
	private String reviewContent;
	private double reviewRate;
	private int reviewReadCount;
	private String reviewDate;
	private String productName;
}
