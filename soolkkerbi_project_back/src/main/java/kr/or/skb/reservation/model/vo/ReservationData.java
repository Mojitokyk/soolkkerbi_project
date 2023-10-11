package kr.or.skb.reservation.model.vo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReservationData {
	private String memberId;
	private int start;
	private int end;
}
