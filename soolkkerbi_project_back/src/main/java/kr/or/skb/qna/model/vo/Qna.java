package kr.or.skb.qna.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="qna")
public class Qna {
	private int qnaNo;
	private int qnaMemberNo;
	private String qnaTitle;
	private String qnaContent;
	private String qnaDate;
	private int qnaStatus;
}
