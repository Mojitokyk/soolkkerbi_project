package kr.or.skb.qna.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="answer")
public class Answer {
	private int answerNo;
	private int answerQnaNo;
	private int answerMemberNo;
	private String answerContent;
	private String answerDate;
}
