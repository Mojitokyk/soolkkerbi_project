package kr.or.skb.reservation.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="reservation")
public class Reservation {
	private int reservationNo;
	private int reservationMemberNo;
	private int reservationTasteNo;
	private String reservationDate;
	private String reservationStringNo;
	private int reservationStatus;
	private String reservationMemberId;
	private String reservationTasteTitle;
}
