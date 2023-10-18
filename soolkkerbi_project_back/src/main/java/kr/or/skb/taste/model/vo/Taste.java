package kr.or.skb.taste.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "taste")
public class Taste {
  private int tasteNo;
  private int tasteMemberNo;
  private String tasteTitle;
  private String tasteContent;
  private String tasteStart;
  private String tasteEnd;
  private String tasteFilepath;
//  private String tasteImg;
  private String memberId;
  private String tasteStatus;
}