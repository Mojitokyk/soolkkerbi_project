package kr.or.skb.product.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="product")
public class Product {
	private int productNo;
	private int productCase;
	private String productName;
	private double productAlc;
	private int productLiter;
	private String productInfo;
	private int productPrice;
	private int productStock;
	private int productDiscount;
	private String productFilepath;
	private double starRate;
	private String memberId;
	private int isLike;
}
