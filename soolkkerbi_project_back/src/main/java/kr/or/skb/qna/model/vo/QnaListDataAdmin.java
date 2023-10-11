package kr.or.skb.qna.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class QnaListDataAdmin {
	private int start;
	private int end;
	private int answerStatus;
}
