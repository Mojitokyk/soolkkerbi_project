package kr.or.skb.reservation.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.PageInfo;
import kr.or.skb.member.model.vo.Member;
import kr.or.skb.reservation.model.vo.Reservation;
import kr.or.skb.reservation.model.vo.ReservationData;

@Mapper
public interface ReservationDao {

	int totalCount();

	List selectAllReservation(PageInfo pi);

	int updateReservationStatus(Reservation reservation);

	List myReservationList(ReservationData rld);

	int changeDate(Reservation reservation);

	int delete(int reservationNo);

	//시음회 중복 예약 방지 메서드
	List myReservationList2(int memberNo);

	int totalCount2(String memberId);

	Member getmember(String memberId);
	
}
