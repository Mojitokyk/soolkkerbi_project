package kr.or.skb.qna.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class QnaListData {
	private int start;
	private int end;
	private String memberId;
}
